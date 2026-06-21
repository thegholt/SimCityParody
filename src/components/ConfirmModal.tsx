import type { ReactNode } from 'react'

interface ConfirmModalProps {
  /** Accessible label / heading text for the modal. */
  title: string
  children: ReactNode
  /** Extra class for theming (e.g. danger glitch styling). */
  tone?: 'default' | 'danger'
  /** Footer action buttons. */
  actions?: ReactNode
}

/**
 * Generic pixel-art modal box. Reused by IntroModal and JimChoiceReveal so the
 * overlay, framing and layout stay consistent.
 */
export default function ConfirmModal({
  title,
  children,
  tone = 'default',
  actions,
}: ConfirmModalProps) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={title}>
      <div className={`modal-box modal-box--${tone}`}>
        <h2 className="modal-title">{title}</h2>
        <div className="modal-body">{children}</div>
        {actions ? <div className="modal-actions">{actions}</div> : null}
      </div>
    </div>
  )
}
