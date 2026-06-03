import type React from "react"
import type { Metadata } from "next"

import "./globals.css"

import { Manrope, Source_Serif_4, Inter, JetBrains_Mono } from "next/font/google"
import { FABProvider } from "@/contexts/fab-context"

// Initialize fonts
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
})

const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-source-serif-4",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--v0-font-geist",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--v0-font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Themis Women's Health — GoodFlip Care",
  description: "Your women's health support program",
  icons: {
    icon: "/images/themismedicare_logo.jpeg",
    shortcut: "/images/themismedicare_logo.jpeg",
    apple: "/images/themismedicare_logo.jpeg",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body
        className={`${manrope.variable} ${sourceSerif4.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <FABProvider>{children}</FABProvider>
      </body>
    </html>
  )
}
