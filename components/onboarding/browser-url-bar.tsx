export function BrowserUrlBar() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-white border-t border-gray-200 flex items-center justify-center z-40">
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full max-w-[90%]">
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <span className="text-sm text-gray-700 font-medium">psp.goodflip.com</span>
      </div>
    </div>
  )
}
