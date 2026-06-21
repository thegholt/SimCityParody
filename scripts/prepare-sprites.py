#!/usr/bin/env python3
"""Strip baked-in white/checkerboard backgrounds from sprite PNGs."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SPRITES_DIR = ROOT / 'src/assets/Sprites'
SKIP = {'SpriteMap.png'}


def is_background(r: int, g: int, b: int, a: int) -> bool:
    if a == 0:
        return True
    if r >= 235 and g >= 235 and b >= 235:
        return True
    if abs(r - g) < 8 and abs(g - b) < 8 and r >= 200:
        return True
    return False


def is_checker_halo(r: int, g: int, b: int, a: int) -> bool:
    if a == 0:
        return False
    # Warm off-white checkerboard tones around the art, not building whites.
    return r >= 240 and g >= 240 and b >= 228 and not (r == 255 and g == 255 and b == 255)


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
        r, g, b, _ = pixels[x, y]
        pixels[x, y] = (r, g, b, 0)
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < width and 0 <= ny < height and not visited[ny][nx]:
                if is_background(*pixels[nx, ny]):
                    visited[ny][nx] = True
                    queue.append((nx, ny))

    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if is_checker_halo(r, g, b, a):
                pixels[x, y] = (r, g, b, 0)

    for _ in range(2):
        to_clear: list[tuple[int, int]] = []
        for y in range(height):
            for x in range(width):
                r, g, b, a = pixels[x, y]
                if a == 0:
                    continue
                if r >= 200 and g >= 200 and b >= 200:
                    transparent_neighbors = 0
                    for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
                        if 0 <= nx < width and 0 <= ny < height and pixels[nx, ny][3] == 0:
                            transparent_neighbors += 1
                    if transparent_neighbors >= 2:
                        to_clear.append((x, y))
        for x, y in to_clear:
            r, g, b, _ = pixels[x, y]
            pixels[x, y] = (r, g, b, 0)

    return rgba


def main() -> None:
    if not SPRITES_DIR.exists():
        raise SystemExit(f'Missing sprites directory: {SPRITES_DIR}')

    for path in sorted(SPRITES_DIR.glob('*.png')):
        if path.name in SKIP:
            continue

        original = Image.open(path)
        prepared = remove_background(original)
        prepared.save(path, optimize=True)
        print(f'Prepared {path.name}')


if __name__ == '__main__':
    main()
