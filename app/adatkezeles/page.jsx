import LegalPage from "../components/LegalPage";
import LegalDoc from "../components/LegalDoc";
import { getLegalDoc } from "@/lib/legal";

export const metadata = {
  title: "Adatkezelési tájékoztató | Privacy Policy — Stillsoul Production",
};

export default async function PrivacyPage() {
  const [hu, en] = await Promise.all([getLegalDoc("adatkezeles", "hu"), getLegalDoc("adatkezeles", "en")]);
  return <LegalPage hu={<LegalDoc blocks={hu} />} en={<LegalDoc blocks={en} />} />;
}
