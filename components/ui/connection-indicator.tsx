interface ConnectionIndicatorProps {
  isConnected: boolean
  size?: "sm" | "md"
}

export function ConnectionIndicator({ isConnected, size = "sm" }: ConnectionIndicatorProps) {
  const iconSize = size === "sm" ? "w-3 h-3" : "w-4 h-4"

  return (
    <div className="flex items-center gap-1">
      {isConnected ? (
        <>
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
          <span className="text-xs text-green-600 font-medium">Online</span>
        </>
      ) : (
        <>
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
          <span className="text-xs text-red-600 font-medium">Offline</span>
        </>
      )}
    </div>
  )
}
