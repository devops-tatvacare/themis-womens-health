import { Badge } from "@/components/ui/badge"
import { getStatusColor } from "@/lib/utils/status"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: string
  variant?: "default" | "outline"
  size?: "sm" | "md"
}

export function StatusBadge({ status, variant = "default", size = "md" }: StatusBadgeProps) {
  const colorClass = getStatusColor(status)
  const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-xs px-2 py-1"

  return <Badge className={cn(colorClass, sizeClass, "font-medium border")}>{status}</Badge>
}
