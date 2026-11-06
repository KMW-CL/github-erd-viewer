"""Fit a real extension screenshot into Chrome Web Store's 1280x800 canvas."""

import argparse
from pathlib import Path

from PIL import Image


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("destination", type=Path)
    args = parser.parse_args()

    with Image.open(args.source) as source:
        source = source.convert("RGB")
        source.thumbnail((1280, 800), Image.Resampling.LANCZOS)
        canvas = Image.new("RGB", (1280, 800), source.getpixel((0, min(40, source.height - 1))))
        canvas.paste(source, ((1280 - source.width) // 2, (800 - source.height) // 2))
        args.destination.parent.mkdir(parents=True, exist_ok=True)
        canvas.save(args.destination, format="PNG", optimize=True)
    print(args.destination)


if __name__ == "__main__":
    main()
