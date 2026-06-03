import type { ReactNode } from "react"

interface MobileFrameProps {
  children: ReactNode
}

export function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* Phone Frame */}
        <div className="w-[375px] h-[812px] bg-black rounded-[3rem] p-2 shadow-2xl">
          <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 h-11 bg-white z-50 flex items-center justify-between px-6 text-sm font-medium">
              <span>9:41</span>
              <div className="flex items-center">
                <div className="w-6 h-3 border border-black rounded-sm relative">
                  <div className="absolute right-0 top-0 bottom-0 w-4 bg-black rounded-sm"></div>
                </div>
                <span className="ml-1 text-xs">74%</span>
              </div>
            </div>

            {/* Content */}
            <div className="pt-11 h-full">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
