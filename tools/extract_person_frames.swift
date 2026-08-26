import Foundation
import AVFoundation
import CoreImage
import Vision
import AppKit

func fail(_ message: String) -> Never {
  FileHandle.standardError.write((message + "\n").data(using: .utf8)!)
  exit(1)
}

guard CommandLine.arguments.count >= 3 else {
  fail("usage: extract_person_frames <input.mov> <output-dir> [frame-count]")
}

let inputURL = URL(fileURLWithPath: CommandLine.arguments[1])
let outputURL = URL(fileURLWithPath: CommandLine.arguments[2])
let frameCount = CommandLine.arguments.count >= 4 ? (Int(CommandLine.arguments[3]) ?? 18) : 18

try? FileManager.default.createDirectory(at: outputURL, withIntermediateDirectories: true)

let asset = AVAsset(url: inputURL)
let duration = CMTimeGetSeconds(asset.duration)
guard duration.isFinite, duration > 0 else {
  fail("Could not read video duration")
}

let generator = AVAssetImageGenerator(asset: asset)
generator.appliesPreferredTrackTransform = true
generator.requestedTimeToleranceBefore = CMTime(seconds: 0.08, preferredTimescale: 600)
generator.requestedTimeToleranceAfter = CMTime(seconds: 0.08, preferredTimescale: 600)
generator.maximumSize = CGSize(width: 900, height: 900)

let ciContext = CIContext(options: [.workingColorSpace: CGColorSpaceCreateDeviceRGB()])
let request = VNGeneratePersonSegmentationRequest()
request.qualityLevel = .balanced
request.outputPixelFormat = kCVPixelFormatType_OneComponent8

func cropRectForAlpha(_ image: NSImage) -> CGRect? {
  guard let tiff = image.tiffRepresentation,
        let bitmap = NSBitmapImageRep(data: tiff),
        let data = bitmap.bitmapData else { return nil }
  let width = bitmap.pixelsWide
  let height = bitmap.pixelsHigh
  let spp = bitmap.samplesPerPixel
  let bpr = bitmap.bytesPerRow
  var minX = width
  var minY = height
  var maxX = 0
  var maxY = 0
  for y in 0..<height {
    for x in 0..<width {
      let alpha = data[y * bpr + x * spp + min(3, spp - 1)]
      if alpha > 12 {
        minX = min(minX, x)
        minY = min(minY, y)
        maxX = max(maxX, x)
        maxY = max(maxY, y)
      }
    }
  }
  if minX > maxX || minY > maxY { return nil }
  let pad = 28
  minX = max(0, minX - pad)
  minY = max(0, minY - pad)
  maxX = min(width - 1, maxX + pad)
  maxY = min(height - 1, maxY + pad)
  return CGRect(x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1)
}

func savePNG(_ cgImage: CGImage, to url: URL) throws {
  let rep = NSBitmapImageRep(cgImage: cgImage)
  guard let data = rep.representation(using: .png, properties: [:]) else {
    throw NSError(domain: "png", code: 1)
  }
  try data.write(to: url)
}

for index in 0..<frameCount {
  let seconds = duration * (Double(index) + 0.5) / Double(max(frameCount, 1))
  let time = CMTime(seconds: seconds, preferredTimescale: 600)
  do {
    let cgImage = try generator.copyCGImage(at: time, actualTime: nil)
    let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
    try handler.perform([request])
    guard let maskBuffer = request.results?.first?.pixelBuffer else {
      print("no-mask \(index)")
      continue
    }

    let source = CIImage(cgImage: cgImage).oriented(.up)
    var mask = CIImage(cvPixelBuffer: maskBuffer)
    let sx = source.extent.width / mask.extent.width
    let sy = source.extent.height / mask.extent.height
    mask = mask.transformed(by: CGAffineTransform(scaleX: sx, y: sy))

    let transparent = CIImage(color: .clear).cropped(to: source.extent)
    let blended = source.applyingFilter(
      "CIBlendWithAlphaMask",
      parameters: [
        kCIInputBackgroundImageKey: transparent,
        kCIInputMaskImageKey: mask
      ]
    )

    guard let fullCG = ciContext.createCGImage(blended, from: source.extent) else {
      print("render-failed \(index)")
      continue
    }

    let nsImage = NSImage(cgImage: fullCG, size: NSSize(width: fullCG.width, height: fullCG.height))
    let crop = cropRectForAlpha(nsImage) ?? CGRect(x: 0, y: 0, width: fullCG.width, height: fullCG.height)
    guard let croppedCG = fullCG.cropping(to: crop) else {
      print("crop-failed \(index)")
      continue
    }
    let out = outputURL.appendingPathComponent(String(format: "frame-%03d.png", index + 1))
    try savePNG(croppedCG, to: out)
    print(out.path)
  } catch {
    print("failed \(index): \(error)")
  }
}
