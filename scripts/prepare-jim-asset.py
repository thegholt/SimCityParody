#!/usr/bin/env python3
"""Strip the black backdrop from the supplied Jim sprite without editing the art."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'src/assets/jim-option-4d-source.png'
OUTPUT = ROOT / 'public/jim-option-4d.png'
THRESH = 18


def is_background(r: int, g: int, b: int, a: int) -> bool:
    return a > 0 and r <= THRESH and g <= THRESH and b <= THRESH


def remove_background(img: Image.Image) -> Image.Image:
    rgba = img.convert('RGBA')
    width, height = rgba.size
    pixels = rgba.load()
    visited = [[False] * width for _ in range(height)]
    queue: deque[tuple[int, int]] = deque()

    for x in range(width):
        for y in (0, height - 1):
            if is_background(*pixels[x, y]):
                visited[y][x] = True
                queue.append((x, y))

    for y in range(height):
        for x in (0, width - 1):
            if not visited[y][x] and is_background(*pixels[x, y]):
                visited[y][x] = True
                queue.append((x, y))

    while queue:
        x, y = queue.popleft()
        r, g, b, a = pixels[x, y]
        pixels[x, y] = (r, g, b, 0)
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < width and 0 <= ny < height and not visited[ny][nx]:
                if is_background(*pixels[nx, ny]):
                    visited[ny][nx] = True
                    queue.append((nx, ny))

    bbox = rgba.getbbox()
    return rgba.crop(bbox) if bbox else rgba


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(
            f'Missing source sprite: {SOURCE}\n'
            'Add the original Jim PNG there, then rerun this script.'
        )

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    prepared = remove_background(Image.open(SOURCE))
    prepared.save(OUTPUT, optimize=True)
    print(f'Wrote {OUTPUT} ({prepared.size[0]}x{prepared.size[1]})')


if __name__ == '__main__':
    main()
