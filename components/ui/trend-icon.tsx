import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface TrendIconProps {
  trend?: "up" | "down" | "stable"
  size?: "sm" | "md"
}

export function TrendIcon({ trend, size = "sm" }: TrendIconProps) {
  const iconSize = size === "sm" ? "w-3 h-3" : "w-4 h-4"

  switch (trend) {
    case "up":
      return <TrendingUp className={`${iconSize} text-green-500`} />
    case "down":
      return <TrendingDown className={`${iconSize} text-red-500`} />
    default:
      return <Minus className={`${iconSize} text-gray-400`} />
  }
}
