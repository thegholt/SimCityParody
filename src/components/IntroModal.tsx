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
        <PixelButton variant="primary" onClick={onStart}>
          {COPY.introButton}
        </PixelButton>
      }
    >
      {COPY.introBody.map((line, i) => (
        <p
          key={i}
          className={i === COPY.introBody.length - 1 ? 'intro-warn' : undefined}
        >
          {line}
        </p>
      ))}
    </ConfirmModal>
  )
}
