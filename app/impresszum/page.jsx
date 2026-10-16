import LegalPage from "../components/LegalPage";
import LegalDoc from "../components/LegalDoc";
import { getLegalDoc } from "@/lib/legal";

export const metadata = {
  title: "Impresszum | Legal notice — Stillsoul Production",
};

export default async function ImprintPage() {
  const [hu, en] = await Promise.all([getLegalDoc("impresszum", "hu"), getLegalDoc("impresszum", "en")]);
  return <LegalPage hu={<LegalDoc blocks={hu} />} en={<LegalDoc blocks={en} />} />;
}
