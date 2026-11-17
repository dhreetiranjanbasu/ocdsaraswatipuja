import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "অফিসার্স ক্লাব ঢাকা | শ্রীশ্রী সরস্বতী পূজা",
  description: "অফিসার্স ক্লাব ঢাকা শ্রীশ্রী সরস্বতী পূজা উদযাপন কমিটির ডিজিটাল ওয়েব পোর্টাল।",
  keywords: ["অফিসার্স ক্লাব ঢাকা", "সরস্বতী পূজা", "Saraswati Puja", "Puja Committee"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
