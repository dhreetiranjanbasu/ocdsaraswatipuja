import demo from "@/data/demo.json";
export const demoData = demo;
export type ContentRecord = { id:number; type:string; title:string; subtitle?:string|null; body?:string|null; image?:string|null; year?:number|null; status:string; sortOrder:number; createdAt:string; updatedAt:string };
export const publicRecords: ContentRecord[] = (demo.contentRecords as ContentRecord[]).filter((record) => record.status === "PUBLISHED").sort((a,b) => a.sortOrder-b.sortOrder);
export const readOnlyResponse = () => Response.json({ error: "এটি শুধুমাত্র প্রদর্শনীর জন্য। Vercel JSON সংস্করণে তথ্য সংরক্ষণ করা হয় না।" }, { status: 503 });
