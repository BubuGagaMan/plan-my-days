'use client'

type Props = {
  size?: number
  color?: string
  thickness?: number
}

export function LoadingSpinner({ size = 20, color = '#000', thickness = 2 }: Props) {
  return (
    <div
      className="inline-block rounded-full border-solid animate-spin"
      style={{
        width: size,
        height: size,
        borderWidth: thickness,
        borderColor: `${color} transparent transparent transparent`,
      }}
      aria-label="Loading"
    />
  )
}
