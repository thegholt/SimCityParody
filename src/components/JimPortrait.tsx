import jimSprite from '../assets/jim-option-4d.png'

interface JimPortraitProps {
  /** Short label shown under the sprite. */
  caption?: string
  /** Extra class for layout/theming hooks. */
  className?: string
}

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
        src={jimSprite}
        alt="Jim giving a thumbs-up in 8-bit pixel art"
      />
      {caption ? <figcaption className="jim-portrait__caption">{caption}</figcaption> : null}
    </figure>
  )
}
