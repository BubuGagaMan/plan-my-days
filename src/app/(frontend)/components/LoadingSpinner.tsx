type Props = {
  size?: number
  color?: string
  thickness?: number
}

export function LoadingSpinner({ size = 21, color = 'red', thickness = 4 }: Props) {
  return (
    <div
      className="rounded-full border-solid animate-spin mx-auto"
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
