import { HomeContent } from "@/components/HomeContent";
import { LanguageProvider } from "@/components/LanguageProvider";

export default function EventsPage() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}
