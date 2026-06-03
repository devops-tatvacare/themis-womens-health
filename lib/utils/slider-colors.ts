/**
 * Utility functions for slider color scales
 * Provides consistent color coding across all slider components
 */

export interface SliderColorConfig {
  value: number
  min: number
  max: number
  /**
   * Invert the color scale (green for high values, red for low values)
   * Default is false (red for high values, green for low values)
   */
  inverted?: boolean
}

/**
 * Get the color for a slider value based on its position in the range
 * @returns CSS color value (hex or rgb)
 */
export function getSliderColor(config: SliderColorConfig): string {
  const { value, min, max, inverted = false } = config

  // Normalize value to 0-1 range
  const normalized = (value - min) / (max - min)

  // Determine color based on normalized position
  // For pain scales: low = green, mid = orange, high = red
  // For inverted scales: low = red, mid = orange, high = green
  let color: string

  if (inverted) {
    // Inverted scale (higher is better)
    if (normalized <= 0.33) {
      color = "#ef4444" // red-500
    } else if (normalized <= 0.66) {
      color = "#f97316" // orange-500
    } else {
      color = "#22c55e" // green-500
    }
  } else {
    // Normal scale (lower is better)
    if (normalized <= 0.33) {
      color = "#22c55e" // green-500
    } else if (normalized <= 0.66) {
      color = "#f97316" // orange-500
    } else {
      color = "#ef4444" // red-500
    }
  }

  return color
}

/**
 * Get the background gradient for HTML range inputs
 */
export function getSliderGradient(config: SliderColorConfig): string {
  const { value, min, max } = config
  const color = getSliderColor(config)
  const percentage = ((value - min) / (max - min)) * 100

  return `linear-gradient(to right, ${color} 0%, ${color} ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
}

/**
 * Get text color class for severity labels
 */
export function getSliderTextColor(config: SliderColorConfig): string {
  const color = getSliderColor(config)

  switch (color) {
    case "#22c55e":
      return "text-green-500"
    case "#f97316":
      return "text-orange-500"
    case "#ef4444":
      return "text-red-500"
    default:
      return "text-gray-900"
  }
}
