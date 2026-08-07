from pathlib import Path

from PIL import Image


PUBLIC = Path("public/portfolio")
SOURCE_ROOTS = [
    PUBLIC / "assets",
    PUBLIC / "off-duty",
]
TARGET_ROOT = PUBLIC / "optimized"
MAX_DIMENSION = 1600
QUALITY = 82
RASTER_SUFFIXES = {".png", ".jpg", ".jpeg"}


def resize_if_needed(image):
    width, height = image.size
    longest = max(width, height)
    if longest <= MAX_DIMENSION:
        return image

    scale = MAX_DIMENSION / longest
    return image.resize(
        (max(1, int(width * scale)), max(1, int(height * scale))),
        Image.Resampling.LANCZOS,
    )


def target_path_for(source):
    relative = source.relative_to(PUBLIC)
    return (TARGET_ROOT / relative).with_suffix(".webp")


def convert_one(source):
    target = target_path_for(source)
    target.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as original:
        image = resize_if_needed(original.convert("RGBA"))
        image.save(target, "WEBP", quality=QUALITY, method=6)
    return source.stat().st_size, target.stat().st_size, target


def main():
    converted = []
    for root in SOURCE_ROOTS:
        for source in root.rglob("*"):
            if source.is_file() and source.suffix.lower() in RASTER_SUFFIXES:
                converted.append((source, *convert_one(source)))

    removed_bytes = 0
    for root in SOURCE_ROOTS:
        for source in root.rglob("*"):
            if source.is_file() and source.suffix.lower() in RASTER_SUFFIXES:
                removed_bytes += source.stat().st_size
                source.unlink()

    saved = sum(before - after for _, before, after, _ in converted)
    print(f"converted={len(converted)} webp_saved={saved} removed_original_bytes={removed_bytes}")
    for source, before, after, target in sorted(converted, key=lambda item: item[1] - item[2], reverse=True)[:24]:
        print(f"{before}->{after} {source} => {target}")


if __name__ == "__main__":
    main()
