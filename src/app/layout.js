import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider"; // Adjusted path
import "./globals.css";
import CommonLayout from "@/components/client-view/common-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio",
  description: "Personal Portfolio Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning> {/* Remove conditional className—script handles it */}
      <head>
        {/* Basic meta for mobile/performance */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Early theme script—runs before any paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  let isDark = false;
                  if (theme === 'dark') {
                    isDark = true;
                  } else if (!theme) {
                    // Fallback to system if no saved theme
                    const systemDark = (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) || false;
                    isDark = systemDark;
                    localStorage.setItem('theme', isDark ? 'dark' : 'light');
                  } // If theme === 'light', isDark stays false
                  document.documentElement.classList.toggle('dark', isDark);
                } catch (err) {
                  // Ignore errors (e.g., localStorage blocked in private mode)
                }
              })();
            `,
          }}
          // Ensure it runs ASAP
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${inter.className} antialiased`}> {/* Added antialiased for smoother fonts; keep mt-5 if needed */}
        <ThemeProvider>
          <CommonLayout>{children}</CommonLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}