import { demoData } from "@/lib/demo-data";
export async function GET() {
  const income = demoData.financeEntries.filter(x => x.entryType === "INCOME" && x.status === "APPROVED").reduce((s,x) => s+x.amount,0);
  const expenses = demoData.financeEntries.filter(x => x.entryType === "EXPENSE" && x.status === "APPROVED").reduce((s,x) => s+x.amount,0);
  return Response.json({ records:demoData.contentRecords.length, donations:demoData.donations.length, donationAmount:demoData.donations.reduce((s,x)=>s+x.amount,0), adRequests:0, contacts:0, income, expenses, years:demoData.festivalYears });
}
