import sys
from pathlib import Path

sys.path.insert(0, "/tmp/codex-video-deps")

from PIL import Image, ImageFilter
from rembg import new_session, remove


SOURCE = Path("/Users/mac/Desktop/微信图片_20260807005637_2_232.jpg")
OUTPUT = Path("public/portfolio/pet/xia-tray-cutout.png")
PREVIEW = Path("/tmp/xia-tray-white-preview.jpg")


def remove_dark_edge(image):
    alpha = image.getchannel("A")
    inner_alpha = alpha.filter(ImageFilter.MinFilter(7))
    pixels = image.load()
    inner = inner_alpha.load()

    for y in range(image.height):
        for x in range(image.width):
            r, g, b, a = pixels[x, y]
            if not a or inner[x, y] >= 8:
                continue

            luminance = r * 0.299 + g * 0.587 + b * 0.114
            if luminance < 145:
                pixels[x, y] = (r, g, b, 0)
            elif luminance < 205:
                pixels[x, y] = (r, g, b, min(a, 90))

    alpha = image.getchannel("A")
    alpha = alpha.filter(ImageFilter.GaussianBlur(0.22)).point(lambda value: 0 if value < 10 else value)
    image.putalpha(alpha)
    return image


def main():
    source = Image.open(SOURCE).convert("RGBA")
    session = new_session("u2netp")
    image = remove(source, session=session, alpha_matting=False).convert("RGBA")
    image = remove_dark_edge(image)

    alpha = image.getchannel("A")
    box = alpha.getbbox()
    if box:
        image = image.crop(box)

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    image.save(OUTPUT)

    white = Image.new("RGBA", image.size, (255, 255, 255, 255))
    white.alpha_composite(image)
    white.convert("RGB").save(PREVIEW)
    print(f"{OUTPUT} {image.size[0]}x{image.size[1]}")


if __name__ == "__main__":
    main()
