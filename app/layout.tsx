import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import "@radix-ui/themes/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather8 App",
  description: "A simple weather app dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("bg-background", inter.className)}>
        {/* Wrapper div to hold all elements */}
        <div className="w-full">
          {/* Wrapper for both headers */}
          <div className="header-wrapper">
            {/* Menu Header */}
            <div
              className={cn(
                "menu-header",
                //"bg-blue-200",
                "h-16",
                "w-full",
                "flex",
                "items-center",
                "justify-center"
              )}
            >
              {/* Inner Div centered within the Menu */}
              <div
                className={cn(
                  "menu-header",
                  //"bg-blue-500",
                  "h-full", // Use full height for inner div
                  "w-[1250px]",
                  "2xl:w-[80%]",
                  "flex",
                  "border-2",
                  "border-t-0",
                  "border-gray-300",
                  "justify-between", // Space out the children in the flex container
                  "items-center" // Center the items vertically
                )}
              >
                {/* LOGO Section */}
                <div
                  className={cn(
                    "menu-header",
                    //   "bg-red-300",
                    "h-full", // Take full height of the parent
                    "w-full",
                    "flex",
                    "text-lg",
                    "text-gray-700",
                    "font-bold",
                    "items-center",
                    "justify-center"
                  )}
                >
                  Weather8
                </div>
              </div>
            </div>
          </div>{" "}
          {/* End of header-wrapper */}
          {/* Children content */}
          {children}
        </div>
      </body>
    </html>
  );
}
