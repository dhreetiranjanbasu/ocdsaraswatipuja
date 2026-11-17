import { demoData, readOnlyResponse } from "@/lib/demo-data";
export async function GET(request: Request) {
 const type = new URL(request.url).searchParams.get("type") || "NOTICE";
 if(type === "donations") return Response.json(demoData.donations);
 if(type === "advertisement-requests" || type === "contact-messages") return Response.json([]);
 if(type === "finance") return Response.json(demoData.financeEntries);
 return Response.json(demoData.contentRecords.filter(x=>x.type===type));
}
export async function POST() { return readOnlyResponse(); }
