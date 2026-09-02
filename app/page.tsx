import { HomeContent } from "@/components/HomeContent";
import { LanguageProvider } from "@/components/LanguageProvider";

export default function Home() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}
