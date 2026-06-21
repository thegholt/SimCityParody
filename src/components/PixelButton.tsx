import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type PixelButtonVariant = 'primary' | 'danger' | 'ghost'

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PixelButtonVariant
  children: ReactNode
}

export default function PixelButton({
  variant = 'primary',
  className,
  children,
  ...rest
}: PixelButtonProps) {
  return (
    <button
      {...rest}
      className={`pixel-btn pixel-btn--${variant}${
        className ? ` ${className}` : ''
      }`}
    >
      {children}
    </button>
  )
}
