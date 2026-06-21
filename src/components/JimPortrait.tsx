interface JimPortraitProps {
  /** Short label shown under the sprite. */
  caption?: string
  /** Extra class for layout/theming hooks. */
  className?: string
}

/** Served from public/ after running `pnpm prepare:jim` on the original source PNG. */
const JIM_SPRITE_URL = `${import.meta.env.BASE_URL}jim-option-4d.png`

/**
 * 8-bit Jim sprite used when Option 4D is revealed or confirmed.
 */
export default function JimPortrait({ caption, className }: JimPortraitProps) {
  return (
    <figure
      className={['jim-portrait', className].filter(Boolean).join(' ')}
      data-testid="jim-portrait"
    >
      <img
        className="jim-portrait__sprite"
        src={JIM_SPRITE_URL}
        alt="Jim giving a thumbs-up in 8-bit pixel art"
      />
      {caption ? <figcaption className="jim-portrait__caption">{caption}</figcaption> : null}
    </figure>
  )
}
