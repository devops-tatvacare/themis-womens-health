"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, X } from "lucide-react"

interface VoiceRecordingScreenProps {
  onTranscriptReady: (transcript: string) => void
  onCancel: () => void
}

export function VoiceRecordingScreen({ onTranscriptReady, onCancel }: VoiceRecordingScreenProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isListening, setIsListening] = useState(false)

  const samplePhrases = [
    "I took my HRT this morning",
    "My period started today",
    "I slept for 8 hours last night",
    "I walked 5000 steps today",
    "I had a few hot flushes today",
    "I have cramps and a headache",
    "My mood has been low this week",
    "I logged my cycle symptoms",
  ]

  useEffect(() => {
    // Simulate voice recognition starting
    const timer = setTimeout(() => {
      setIsListening(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleStartRecording = () => {
    setIsRecording(true)
    // Simulate voice detection after a delay
    setTimeout(() => {
      const randomPhrase = samplePhrases[Math.floor(Math.random() * samplePhrases.length)]
      setTranscript(randomPhrase)
    }, 2000)
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    if (transcript) {
      onTranscriptReady(transcript)
    }
  }

  const handleUseTranscript = () => {
    if (transcript) {
      onTranscriptReady(transcript)
    }
  }

  const handleCancel = () => {
    onCancel()
  }

  return (
    <div className="absolute inset-0 bg-white z-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        {/* Recording Animation */}
        <div className="relative mb-8">
          {/* Outer pulsing rings */}
          {(isRecording || isListening) && (
            <>
              <div
                className="absolute inset-0 rounded-full bg-[var(--app-primary)]/20 animate-ping"
                style={{ animationDuration: "2s" }}
              />
              <div
                className="absolute inset-2 rounded-full bg-[var(--app-primary)]/30 animate-ping"
                style={{ animationDuration: "1.5s", animationDelay: "0.2s" }}
              />
              <div
                className="absolute inset-4 rounded-full bg-[var(--app-primary)]/40 animate-ping"
                style={{ animationDuration: "1s", animationDelay: "0.4s" }}
              />
            </>
          )}

          {/* Main microphone button */}
          <Button
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            className={`w-24 h-24 rounded-full transition-all duration-300 ${
              isRecording
                ? "bg-red-500 hover:bg-red-600 scale-110"
                : "bg-[var(--app-primary)] hover:bg-[var(--app-primary-hover)]"
            }`}
            size="icon"
          >
            {isRecording ? <MicOff className="w-10 h-10 text-white" /> : <Mic className="w-10 h-10 text-white" />}
          </Button>
        </div>

        {/* Status Text */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {isRecording ? "Recording..." : isListening ? "Listening..." : "Ready to Record"}
          </h2>
          <p className="text-gray-600">
            {isRecording
              ? "Speak clearly into your device"
              : isListening
                ? "Tap the microphone to start recording"
                : "Preparing voice recognition..."}
          </p>
        </div>

        {/* Detected Text */}
        {transcript && (
          <div className="w-full max-w-md mb-6">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Detected:</h3>
              <p className="text-gray-800">{transcript}</p>
            </div>

            <div className="flex gap-3 mt-4">
              <Button
                onClick={handleUseTranscript}
                className="flex-1 bg-[var(--app-primary)] hover:bg-[var(--app-primary-hover)] text-white"
              >
                Use This Text
              </Button>
              <Button onClick={() => setTranscript("")} variant="outline" className="flex-1">
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Sample Phrases - Only show when no transcript */}
        {!transcript && isListening && (
          <div className="w-full max-w-md">
            <h3 className="text-sm font-medium text-gray-700 mb-3 text-center">Try saying:</h3>
            <div className="space-y-2">
              {samplePhrases.slice(0, 4).map((phrase, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-3 border border-gray-200 text-sm text-gray-600 text-center"
                >
                  "{phrase}"
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cancel Button */}
      <div className="p-6">
        <Button
          onClick={handleCancel}
          variant="outline"
          className="w-full py-3 text-gray-700 border-gray-300 hover:bg-gray-50 bg-transparent"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>
    </div>
  )
}
