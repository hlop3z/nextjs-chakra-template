"use client"

import { Box, Button, HStack, Text, VStack, useBreakpointValue } from "@chakra-ui/react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

const breakpoints = {
  base: "0px",
  sm: "480px",
  md: "768px",
  lg: "992px",
  xl: "1280px",
  "2xl": "1536px",
}

export function BreakpointPreview() {
  const [isOpen, setIsOpen] = useState(false)
  const currentBreakpoint = useBreakpointValue(breakpoints, { ssr: false })
  const [previewWidth, setPreviewWidth] = useState<number | null>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    const viewport = document.querySelector('meta[name="viewport"]')
    const originalContent = viewport?.getAttribute('content')

    if (previewWidth) {
      // Set viewport width
      if (viewport) {
        viewport.setAttribute('content', `width=${previewWidth}, initial-scale=1`)
      }
      // Set window size
      window.resizeTo(previewWidth, window.innerHeight)
    } else {
      // Reset viewport
      if (viewport && originalContent) {
        viewport.setAttribute('content', originalContent)
      }
      // Reset window size
      window.resizeTo(window.screen.width, window.innerHeight)
    }

    return () => {
      // Cleanup: restore original viewport
      if (viewport && originalContent) {
        viewport.setAttribute('content', originalContent)
      }
      // Reset window size
      window.resizeTo(window.screen.width, window.innerHeight)
    }
  }, [previewWidth])

  if (process.env.NODE_ENV === "production") {
    return null
  }

  return (
    <Box
      position="fixed"
      bottom={4}
      right={4}
      zIndex={9999}
      bg="white"
      _dark={{ bg: "gray.800" }}
      p={4}
      borderRadius="lg"
      boxShadow="lg"
      border="1px"
      borderColor={isDark ? "gray.700" : "gray.200"}
    >
      <VStack gap="4" align="stretch">
        <HStack justify="space-between">
          <Text fontWeight="bold">Breakpoint Preview</Text>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "Hide" : "Show"}
          </Button>
        </HStack>

        {isOpen && (
          <>
            <Text fontSize="sm">
              Current: {currentBreakpoint}
            </Text>
            <Text fontSize="sm">
              Preview: {previewWidth ? `${previewWidth}px` : "Auto"}
            </Text>
            <VStack gap="2" align="stretch">
              {Object.entries(breakpoints).map(([name, width]) => (
                <Button
                  key={name}
                  size="sm"
                  variant={currentBreakpoint === width ? "solid" : "outline"}
                  onClick={() => setPreviewWidth(parseInt(width))}
                >
                  {name} ({width})
                </Button>
              ))}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPreviewWidth(null)}
              >
                Reset to Auto
              </Button>
            </VStack>
          </>
        )}
      </VStack>
    </Box>
  )
} 