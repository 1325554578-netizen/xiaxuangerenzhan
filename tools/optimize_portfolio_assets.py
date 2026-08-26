from pathlib import Path

from PIL import Image


ROOT = Path("public/portfolio")
PET_DIR = ROOT / "pet"
MAX_DIMENSION = 1800
JPEG_QUALITY = 82

UNUSED_PET_FILES = [
    PET_DIR / "xia-wave-real.gif",
    PET_DIR / "xia-video-pet-sprite.png",
    PET_DIR / "xia-wave-frame-1.png",
    PET_DIR / "xia-wave-frame-2.png",
    PET_DIR / "xia-wave-frame-3.png",
    PET_DIR / "xia-wave-frame-4.png",
]


def resize_if_needed(image, max_dimension=MAX_DIMENSION):
    width, height = image.size
    longest = max(width, height)
    if longest <= max_dimension:
        return image

    scale = max_dimension / longest
    size = (max(1, int(width * scale)), max(1, int(height * scale)))
    return image.resize(size, Image.Resampling.LANCZOS)


def optimize_jpeg(path):
    before = path.stat().st_size
    with Image.open(path) as source:
        image = resize_if_needed(source.convert("RGB"))
        image.save(path, quality=JPEG_QUALITY, optimize=True, progressive=True)
    return before, path.stat().st_size


def optimize_png(path):
    before = path.stat().st_size
    with Image.open(path) as source:
        image = resize_if_needed(source)
        image.save(path, optimize=True, compress_level=9)
    return before, path.stat().st_size


def make_home_portrait_webp():
    source = PET_DIR / "xia-tray-cutout.png"
    target = PET_DIR / "xia-tray-cutout.webp"
    if not source.exists():
        return None

    before = source.stat().st_size
    with Image.open(source) as original:
        image = original.convert("RGBA")
        image.thumbnail((360, 430), Image.Resampling.LANCZOS)
        image.save(target, "WEBP", quality=86, method=6, lossless=False)
    return before, target.stat().st_size


def remove_unused_pet_assets():
    removed = []
    frames_dir = PET_DIR / "video-person-frames"
    for path in UNUSED_PET_FILES:
        if path.exists():
            removed.append((str(path), path.stat().st_size))
            path.unlink()

    if frames_dir.exists():
        for path in frames_dir.glob("*.png"):
            removed.append((str(path), path.stat().st_size))
            path.unlink()
        try:
            frames_dir.rmdir()
        except OSError:
            pass
    return removed


def main():
    changed = []
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        suffix = path.suffix.lower()
        if suffix in {".jpg", ".jpeg"}:
            before, after = optimize_jpeg(path)
        elif suffix == ".png" and path.name != "xia-tray-cutout.png":
            before, after = optimize_png(path)
        else:
            continue
        if after < before:
            changed.append((str(path), before, after))

    portrait = make_home_portrait_webp()
    removed = remove_unused_pet_assets()

    saved = sum(before - after for _, before, after in changed)
    removed_bytes = sum(size for _, size in removed)
    print(f"optimized_files={len(changed)} saved={saved}")
    if portrait:
        print(f"home_portrait_png_to_webp={portrait[0]}->{portrait[1]}")
    print(f"removed_unused={len(removed)} removed_bytes={removed_bytes}")
    for path, before, after in sorted(changed, key=lambda item: item[1] - item[2], reverse=True)[:24]:
        print(f"{before}->{after} {path}")


if __name__ == "__main__":
    main()
