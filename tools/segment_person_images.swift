import Foundation
import Vision
import CoreImage
import AppKit

func fail(_ message: String) -> Never {
  FileHandle.standardError.write((message + "\n").data(using: .utf8)!)
  exit(1)
}

guard CommandLine.arguments.count >= 3 else {
  fail("usage: segment_person_images <input-dir> <output-dir>")
}

let inputURL = URL(fileURLWithPath: CommandLine.arguments[1])
let outputURL = URL(fileURLWithPath: CommandLine.arguments[2])
try? FileManager.default.createDirectory(at: outputURL, withIntermediateDirectories: true)

let files = (try? FileManager.default.contentsOfDirectory(
  at: inputURL,
  includingPropertiesForKeys: nil
))?
  .filter { ["png", "jpg", "jpeg"].contains($0.pathExtension.lowercased()) }
  .sorted { $0.lastPathComponent < $1.lastPathComponent } ?? []

guard !files.isEmpty else {
  fail("No input images found")
}

let ciContext = CIContext(options: [.workingColorSpace: CGColorSpaceCreateDeviceRGB()])
let request = VNGeneratePersonSegmentationRequest()
request.qualityLevel = .accurate
request.outputPixelFormat = kCVPixelFormatType_OneComponent8
request.usesCPUOnly = true

func savePNG(_ cgImage: CGImage, to url: URL) throws {
  let rep = NSBitmapImageRep(cgImage: cgImage)
  guard let data = rep.representation(using: .png, properties: [:]) else {
    throw NSError(domain: "png", code: 1)
  }
  try data.write(to: url)
}

func cropRectForAlpha(_ cgImage: CGImage) -> CGRect? {
  let image = NSImage(cgImage: cgImage, size: NSSize(width: cgImage.width, height: cgImage.height))
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
      if alpha > 10 {
        minX = min(minX, x)
        minY = min(minY, y)
        maxX = max(maxX, x)
        maxY = max(maxY, y)
      }
    }
  }

  if minX > maxX || minY > maxY { return nil }
  let pad = 36
  minX = max(0, minX - pad)
  minY = max(0, minY - pad)
  maxX = min(width - 1, maxX + pad)
  maxY = min(height - 1, maxY + pad)
  return CGRect(x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1)
}

for (index, file) in files.enumerated() {
  guard let nsInput = NSImage(contentsOf: file),
        let cgInput = nsInput.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    print("read-failed \(file.lastPathComponent)")
    continue
  }
  let source = CIImage(cgImage: cgInput)

  do {
    let handler = VNImageRequestHandler(cgImage: cgInput, options: [:])
    try handler.perform([request])
    guard let maskBuffer = request.results?.first?.pixelBuffer else {
      print("no-mask \(file.lastPathComponent)")
      continue
    }

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
      print("render-failed \(file.lastPathComponent)")
      continue
    }

    let crop = cropRectForAlpha(fullCG) ?? CGRect(x: 0, y: 0, width: fullCG.width, height: fullCG.height)
    guard let croppedCG = fullCG.cropping(to: crop) else {
      print("crop-failed \(file.lastPathComponent)")
      continue
    }

    let out = outputURL.appendingPathComponent(String(format: "person-%03d.png", index + 1))
    try savePNG(croppedCG, to: out)
    print(out.path)
  } catch {
    print("failed \(file.lastPathComponent): \(error)")
  }
}
