import { COPY } from '../data/projects'
import ConfirmModal from './ConfirmModal'
import PixelButton from './PixelButton'

interface IntroModalProps {
  onStart: () => void
}

export default function IntroModal({ onStart }: IntroModalProps) {
  return (
    <ConfirmModal
      title={COPY.introTitle}
      boxClassName="modal-box--intro"
      actions={
        <PixelButton
          variant="primary"
          className="intro-start-button"
          onClick={onStart}
        >
          {COPY.introButton}
        </PixelButton>
      }
    >
      {COPY.introBody.map((line) => (
        <p
          key={line.text}
          className={line.tone === 'warn' ? 'intro-warn' : undefined}
        >
          {line.text}
        </p>
      ))}
      <p className="intro-callout">{COPY.introCallout}</p>
    </ConfirmModal>
  )
}
