"use client"

import { Box, Container, Heading, Text, Button, SimpleGrid, Icon, VStack, HStack, Spinner } from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";
import { Tooltip } from "@/components/ui/tooltip";
import { useColorModeValue, ColorModeButton } from "@/components/ui/color-mode";
import { useTheme } from "next-themes";
import { FiCode, FiZap, FiShield, FiGlobe } from "react-icons/fi";
import { useEffect, useState } from "react";
import { BreakpointPreview } from "@/components/debug/breakpoint-preview";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const bgColor = useColorModeValue("white", "gray.900");
  const sectionBg = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("white", "gray.800");

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: FiCode,
      title: "Modern Development",
      description: "Built with the latest technologies and best practices"
    },
    {
      icon: FiZap,
      title: "Lightning Fast",
      description: "Optimized for performance and speed"
    },
    {
      icon: FiShield,
      title: "Secure by Default",
      description: "Enterprise-grade security out of the box"
    },
    {
      icon: FiGlobe,
      title: "Global Scale",
      description: "Ready to handle millions of users worldwide"
    }
  ];

  if (!mounted) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg={bgColor} position="relative">
      <Box position="absolute" top={4} right={4} zIndex={10}>
        <Tooltip content={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
          <Button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            variant="ghost"
            size="lg"
            aria-label="Toggle color mode"
          >
            {isDark ? "🌞" : "🌙"}
          </Button>
        </Tooltip>
      </Box>
      <Toaster />
      
      {/* Hero Section */}
      <Box 
        py={20} 
        bg={sectionBg}
        borderBottom="1px"
        borderColor={borderColor}
      >
        <Container maxW="container.xl">
          <VStack gap={8} textAlign="center">
            <Heading 
              size="2xl" 
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
            >
              Welcome to Your Next.js App
            </Heading>
            <Text fontSize="xl" color={textColor} maxW="2xl">
              A modern, performant, and secure application built with Next.js and Chakra UI.
              Start building something amazing today.
            </Text>
            <HStack gap={4}>
              <Tooltip content="Get started with your project">
                <Button size="lg" colorScheme="blue">
                  Get Started
                </Button>
              </Tooltip>
              <Tooltip content="Learn more about our features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Tooltip>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={10}>
            {features.map((feature, index) => (
              <Tooltip key={index} content={feature.description}>
                <VStack
                  p={6}
                  bg={cardBg}
                  rounded="xl"
                  shadow="lg"
                  border="1px"
                  borderColor={borderColor}
                  _hover={{
                    transform: "translateY(-5px)",
                    transition: "all 0.2s ease-in-out"
                  }}
                >
                  <Icon as={feature.icon} w={10} h={10} color="blue.500" />
                  <Heading size="md">{feature.title}</Heading>
                  <Text color={textColor} textAlign="center">
                    {feature.description}
                  </Text>
                </VStack>
              </Tooltip>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        py={20} 
        bg={sectionBg}
        borderTop="1px"
        borderColor={borderColor}
      >
        <Container maxW="container.xl">
          <VStack gap={8} textAlign="center">
            <Heading size="xl">Ready to Get Started?</Heading>
            <Text fontSize="lg" color={textColor} maxW="2xl">
              Join thousands of developers building amazing applications with our platform.
            </Text>
            <Tooltip content="Start your free trial">
              <Button size="lg" colorScheme="blue">
                Start Free Trial
              </Button>
            </Tooltip>
          </VStack>
        </Container>
      </Box>

      {/* Debug Tools */}
      {process.env.NODE_ENV === "development" && <BreakpointPreview />}
    </Box>
  );
}
