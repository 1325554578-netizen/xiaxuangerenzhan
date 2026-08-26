import os
import sys

sys.path.insert(0, "/tmp/codex-video-deps")

from PIL import Image
from rembg import new_session, remove


INPUT_DIR = "public/portfolio/pet/source-frames"
MASKED_DIR = "public/portfolio/pet/video-person-frames"
SPRITE_PATH = "public/portfolio/pet/xia-video-pet-sprite.png"


def trim_alpha(image, padding=18):
    alpha = image.getchannel("A")
    box = alpha.getbbox()
    if not box:
        return image
    left, top, right, bottom = box
    left = max(0, left - padding)
    top = max(0, top - padding)
    right = min(image.width, right + padding)
    bottom = min(image.height, bottom + padding)
    return image.crop((left, top, right, bottom))


def fit_frame(image, size=(96, 128)):
    image = trim_alpha(image)
    image = clean_alpha_edge(image)
    image.thumbnail((size[0] - 8, size[1] - 8), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", size, (255, 255, 255, 0))
    x = (size[0] - image.width) // 2
    y = size[1] - image.height
    canvas.alpha_composite(image, (x, y))
    return canvas


def clean_alpha_edge(image):
    rgba = image.copy()
    alpha = rgba.getchannel("A")
    alpha = alpha.point(lambda value: 0 if value < 42 else min(255, int(value * 1.08)))
    rgba.putalpha(alpha)
    return rgba


def main():
    os.makedirs(MASKED_DIR, exist_ok=True)
    files = sorted(f for f in os.listdir(INPUT_DIR) if f.lower().endswith(".png"))
    session = new_session("u2netp")
    frames = []

    for index, filename in enumerate(files, 1):
        source = Image.open(os.path.join(INPUT_DIR, filename)).convert("RGBA")
        masked_path = os.path.join(MASKED_DIR, f"person-{index:03d}.png")
        if os.path.exists(masked_path):
            masked = Image.open(masked_path).convert("RGBA")
        else:
            masked = remove(
                source,
                session=session,
                alpha_matting=True,
                alpha_matting_foreground_threshold=240,
                alpha_matting_background_threshold=10,
                alpha_matting_erode_size=8,
            ).convert("RGBA")
            masked.save(masked_path)
        frames.append(fit_frame(masked))
        print(masked_path)

    if not frames:
        raise SystemExit("No frames processed")

    frame_width, frame_height = frames[0].size
    sprite = Image.new("RGBA", (frame_width * len(frames), frame_height), (255, 255, 255, 0))
    for index, frame in enumerate(frames):
        sprite.alpha_composite(frame, (index * frame_width, 0))
    sprite.save(SPRITE_PATH)
    print(f"{SPRITE_PATH} {len(frames)} {frame_width}x{frame_height}")


if __name__ == "__main__":
    main()
