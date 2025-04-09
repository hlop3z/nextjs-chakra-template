"use client"

import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
  defaultSystem,
} from "@chakra-ui/react"

import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"

const config = defineConfig({
  strictTokens: true,
  theme: {
    tokens: {
      colors: {},
    },
  },
})

const system = createSystem(defaultConfig, config)

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ColorModeProvider>
      <ChakraProvider value={defaultSystem}>
        {children}
      </ChakraProvider>
    </ColorModeProvider>
  )
}
