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
    <html lang="en" suppressHydrationWarning className={typeof window !== "undefined" && localStorage.getItem("theme") === "dark" ? "dark" : ""}>
      <head />
    <body className={`${inter.className} mt-5`}>
  {/* Script to apply initial theme before hydration */}
  <script
    dangerouslySetInnerHTML={{
      __html: `
        (function() {
          try {
            const theme = localStorage.getItem('theme');
            const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (theme === 'dark' || (!theme && systemDark)) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          } catch (err) {}
        })();
      `,
    }}
  />
  <ThemeProvider>
    <CommonLayout>{children}</CommonLayout>
  </ThemeProvider>
</body>

    </html>
  );
}