import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EzEdits",
  description: "AI image upscaler",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider
            appearance={{ baseTheme: shadesOfPurple }}
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          >
            <ConvexClientProvider>
              <div className="relative flex min-h-screen flex-col overflow-x-hidden">
                {/* Background visual effects */}
                <BackgroundLines className="absolute inset-0 -z-10" />

                {/* Header */}
                <Header className="w-full fixed top-0 left-0 z-50" />

                {/* Main content */}
                <main className="flex-1 pt-20 text-white px-4">{children}</main>
              </div>
            </ConvexClientProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
