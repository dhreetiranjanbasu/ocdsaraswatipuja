import HomePage from "@/components/home-page";
import { publicRecords } from "@/lib/demo-data";
export default function Page() {
  return <HomePage records={publicRecords.map(({ id, type, title, subtitle, body, image, year }) => ({ id, type, title, subtitle, body, image, year }))} />;
}
