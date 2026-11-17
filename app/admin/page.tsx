import AdminDashboard from "@/components/admin-dashboard";
export const metadata = { title: "ডেমো প্রশাসনিক প্যানেল | অফিসার্স ক্লাব ঢাকা" };
export default function AdminPage() {
 return <><div className="vercel-demo-notice" role="status"><strong>Vercel JSON Demo — Read-only preview</strong><span>এই সংস্করণে তথ্য পরিবর্তন, ফাইল আপলোড ও ফর্ম জমা দেওয়া বন্ধ আছে। স্থায়ী CMS-এর জন্য অনলাইন ডাটাবেজ প্রয়োজন।</span></div><div className="vercel-readonly-admin"><AdminDashboard /></div></>;
}
