import { COPY } from '../data/projects'
import ConfirmModal from './ConfirmModal'
import JimPortrait from './JimPortrait'
import PixelButton from './PixelButton'

interface JimChoiceRevealProps {
  onConfirm: () => void
}

/**
 * The dark, glitchy reveal that Jim is spending the whole budget on Option 4D.
 */
export default function JimChoiceReveal({ onConfirm }: JimChoiceRevealProps) {
  return (
    <div className="reveal-glitch" data-testid="jim-reveal">
      <JimPortrait className="jim-portrait--page jim-portrait--reveal" />
      <ConfirmModal
        title="⚠ OPTION 4D ⚠"
        tone="danger"
        actions={
          <PixelButton variant="danger" onClick={onConfirm}>
            {COPY.revealButton}
          </PixelButton>
        }
      >
        <p className="reveal-body">{COPY.revealBody}</p>
      </ConfirmModal>
    </div>
  )
}
