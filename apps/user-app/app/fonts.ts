import { Poppins, Nunito, JetBrains_Mono } from 'next/font/google'

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'], // or as needed
  variable: '--font-poppins',
  display: 'swap',
})

export const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-nunito',
  display: 'swap',
})

export const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
})
