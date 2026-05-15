import { Poppins, Outfit, JetBrains_Mono, Lexend } from "next/font/google";
import "./globals.css";
import FloatingLines from '../components/ui/background';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/footer';
import { LanguageProvider } from '../context/LanguageContext';

const poppins = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const outfitMono = JetBrains_Mono({
  variable: "--font-outfit-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Certify",
  description: "The Future of Certificate Verification",
  icons: {
    icon: "/images/certify.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${outfit.variable} ${outfitMono.variable} h-full antialiased`}
    >
      <body className="flex flex-col relative overflow-x-hidden">
        <LanguageProvider>
          <div className="fixed inset-0 -z-10">
            <FloatingLines
              enabledWaves={["top", "middle", "bottom"]}
              lineCount={8}
              lineDistance={8}
              bendRadius={5.0}
              bendStrength={-2.0}
              interactive={true}
              parallax={true}
              animationSpeed={1}
              linesGradient={["#005461", "#6f6f6f", "#6a6a6a"]}
              mixBlendMode={"screen"}
            />
          </div>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}