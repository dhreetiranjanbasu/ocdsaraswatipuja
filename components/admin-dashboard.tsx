"use client";

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import {
  Activity, ArrowDownToLine, ArrowLeft, Bell, BookOpen, CalendarDays, BarChart3,
  CheckCircle2, ChevronDown, ClipboardList, FileImage, FileText, HandHeart,
  Image, Landmark, LayoutDashboard, LogOut, Mail, Megaphone, Menu, Plus, Search,
  Settings, ShieldCheck, Trash2, Users, Wallet, X, Pencil,
} from "lucide-react";

type AdminRecord = { id: number; type?: string; title?: string; subtitle?: string | null; body?: string | null; image?: string | null; year?: number | null; status?: string; amount?: number; donorName?: string; mobile?: string; purpose?: string; createdAt?: string; organization?: string; contactName?: string; packageName?: string; name?: string; subject?: string; message?: string; entryType?: string; category?: string; description?: string };
type Summary = { records: number; donations: number; donationAmount: number; adRequests: number; contacts: number; income: number; expenses: number; years: { year: number; title: string; isCurrent: boolean }[] };

const modules = [
  { key: "overview", label: "ড্যাশবোর্ড", icon: LayoutDashboard, type: "" },
  { key: "pages", label: "ওয়েবসাইট কনটেন্ট", icon: FileText, type: "PAGE" },
  { key: "banners", label: "ব্যানার ও স্লাইডার", icon: Image, type: "BANNER" },
  { key: "history", label: "ইতিহাস ব্যবস্থাপনা", icon: Landmark, type: "HISTORY" },
  { key: "notices", label: "নোটিশ ও বিজ্ঞপ্তি", icon: Bell, type: "NOTICE" },
  { key: "schedules", label: "পূজা ও সময়সূচি", icon: CalendarDays, type: "SCHEDULE" },
  { key: "committee", label: "কমিটি ও উপকমিটি", icon: Users, type: "COMMITTEE" },
  { key: "subcommittee", label: "উপকমিটি", icon: Users, type: "SUBCOMMITTEE" },
  { key: "members", label: "সদস্য ব্যবস্থাপনা", icon: Users, type: "MEMBER" },
  { key: "donors", label: "দাতা ব্যবস্থাপনা", icon: HandHeart, type: "DONOR" },
  { key: "donations", label: "অনুদান আবেদন", icon: Wallet, type: "donations" },
  { key: "swaronika", label: "স্মরণিকা আর্কাইভ", icon: BookOpen, type: "SWARONIKA" },
  { key: "invitations", label: "নিমন্ত্রণপত্র", icon: FileImage, type: "INVITATION" },
  { key: "activities", label: "কার্যক্রম", icon: Activity, type: "ACTIVITY" },
  { key: "news", label: "সাম্প্রতিক সংবাদ", icon: FileText, type: "NEWS" },
  { key: "gallery", label: "ফটো গ্যালারি", icon: Image, type: "ALBUM" },
  { key: "advertisements", label: "বিজ্ঞাপন ব্যবস্থাপনা", icon: Megaphone, type: "ADVERTISEMENT" },
  { key: "adrequests", label: "বিজ্ঞাপন আবেদন", icon: ClipboardList, type: "advertisement-requests" },
  { key: "finance", label: "আয়-ব্যয় ব্যবস্থাপনা", icon: BarChart3, type: "finance" },
  { key: "acknowledgements", label: "কৃতজ্ঞতা ও স্বীকৃতি", icon: CheckCircle2, type: "ACKNOWLEDGEMENT" },
  { key: "quotes", label: "মনীষীদের বাণী", icon: BookOpen, type: "QUOTE" },
  { key: "faq", label: "FAQ ব্যবস্থাপনা", icon: Settings, type: "FAQ" },
  { key: "settings", label: "সাইট সেটিংস", icon: Settings, type: "SETTING" },
  { key: "seo", label: "SEO সেটিংস", icon: Search, type: "SEO" },
  { key: "inbox", label: "যোগাযোগ বার্তা", icon: Mail, type: "contact-messages" },
];

const labels: Record<string, string> = {
  overview: "ড্যাশবোর্ড", pages: "ওয়েবসাইট কনটেন্ট", banners: "ব্যানার ও স্লাইডার", history: "ইতিহাস ব্যবস্থাপনা", notices: "নোটিশ ও বিজ্ঞপ্তি", schedules: "পূজা ও সময়সূচি", committee: "কমিটি ব্যবস্থাপনা", subcommittee: "উপকমিটি", members: "সদস্য ব্যবস্থাপনা", donors: "দাতা ব্যবস্থাপনা", donations: "অনুদান আবেদন", swaronika: "স্মরণিকা আর্কাইভ", invitations: "নিমন্ত্রণপত্র", activities: "কার্যক্রম", news: "সাম্প্রতিক সংবাদ", gallery: "ফটো গ্যালারি", advertisements: "বিজ্ঞাপন ব্যবস্থাপনা", adrequests: "বিজ্ঞাপন আবেদন", finance: "আয়-ব্যয় ব্যবস্থাপনা", acknowledgements: "কৃতজ্ঞতা ও স্বীকৃতি", quotes: "মনীষীদের বাণী", faq: "FAQ ব্যবস্থাপনা", settings: "সাইট সেটিংস", seo: "SEO সেটিংস", inbox: "যোগাযোগ বার্তা",
};

export default function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [active, setActive] = useState("overview");
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [records, setRecords] = useState<AdminRecord[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<AdminRecord | null>(null);
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [financeType, setFinanceType] = useState("INCOME");
  const [imagePath, setImagePath] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => { if (sessionStorage.getItem("ocd-demo-admin") === "yes") setLoggedIn(true); }, []);
  useEffect(() => { if (loggedIn) loadSummary(); }, [loggedIn]);
  useEffect(() => { if (loggedIn && active !== "overview") loadRecords(); }, [loggedIn, active]);

  const module = modules.find((item) => item.key === active) || modules[0];
  const filteredRecords = useMemo(() => records.filter((item) => `${item.title || ""} ${item.subtitle || ""} ${item.donorName || ""} ${item.organization || ""} ${item.description || ""} ${item.name || ""}`.toLowerCase().includes(search.toLowerCase())), [records, search]);

  async function loadSummary() {
    try { const response = await fetch("/api/admin/summary"); const data = await response.json(); if (response.ok) setSummary(data); }
    catch { setNotice("ডাটাবেজ সংযোগ পাওয়া যায়নি। README অনুযায়ী সেটআপ সম্পন্ন করুন।"); }
  }
  async function loadRecords() {
    setLoading(true); setNotice("");
    try {
      const response = await fetch(`/api/admin/records?type=${encodeURIComponent(module.type)}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "তথ্য লোড হয়নি।");
      setRecords(Array.isArray(data) ? data : []);
    } catch (error) { setNotice(error instanceof Error ? error.message : "তথ্য লোড হয়নি।"); setRecords([]); }
    finally { setLoading(false); }
  }
  function login(event: FormEvent) {
    event.preventDefault();
    if (username.trim() === "admin" && password === "puja2027") {
      sessionStorage.setItem("ocd-demo-admin", "yes"); setLoggedIn(true); setLoginError("");
    } else setLoginError("ডেমো লগইন তথ্য সঠিক নয়। আবার চেষ্টা করুন।");
  }
  function logout() { sessionStorage.removeItem("ocd-demo-admin"); setLoggedIn(false); setPassword(""); setActive("overview"); }
  function openCreate() { setEditRecord(null); setImagePath(""); setModalOpen(true); }
  function openEdit(record: AdminRecord) { setEditRecord(record); setImagePath(record.image || ""); setModalOpen(true); }
  async function uploadAsset(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]; if (!file) return;
    const form = new FormData(); form.append("file", file); setUploading(true);
    try { const response = await fetch("/api/admin/upload", { method: "POST", body: form }); const result = await response.json(); if (!response.ok) throw new Error(result.error || "আপলোড ব্যর্থ হয়েছে।"); setImagePath(result.path); setNotice(`ফাইল আপলোড হয়েছে: ${result.path}`); }
    catch (error) { setNotice(error instanceof Error ? error.message : "আপলোড ব্যর্থ হয়েছে।"); }
    finally { setUploading(false); event.target.value = ""; }
  }

  async function saveRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      if (active === "finance") {
        const response = await fetch("/api/admin/finance", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, entryType: financeType }) });
        const result = await response.json(); if (!response.ok) throw new Error(result.error);
      } else {
        const payload = { ...data, type: module.type };
        const response = await fetch(editRecord ? `/api/admin/records/${editRecord.id}` : "/api/admin/records", { method: editRecord ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        const result = await response.json(); if (!response.ok) throw new Error(result.error);
      }
      setModalOpen(false); setNotice("তথ্য সফলভাবে সংরক্ষণ হয়েছে।"); await loadRecords(); await loadSummary();
    } catch (error) { setNotice(error instanceof Error ? error.message : "সংরক্ষণ করা যায়নি।"); }
  }
  async function deleteRecord(id: number) {
    if (!confirm("এই রেকর্ডটি মুছে ফেলতে চান?")) return;
    const response = await fetch(`/api/admin/records/${id}`, { method: "DELETE" });
    if (response.ok) { setNotice("রেকর্ড মুছে ফেলা হয়েছে।"); loadRecords(); loadSummary(); }
    else setNotice("রেকর্ড মুছে ফেলা যায়নি।");
  }
  function exportCsv() {
    const rows = ["শিরোনাম,বিবরণ,স্ট্যাটাস", ...filteredRecords.map((r) => `"${r.title || r.donorName || r.organization || r.name || ""}","${r.subtitle || r.description || r.message || ""}","${r.status || ""}"`)];
    const blob = new Blob(["\uFEFF" + rows.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `ocd-${active}-records.csv`; a.click(); URL.revokeObjectURL(url);
  }

  if (!loggedIn) return <div className="admin-login-wrap"><form className="admin-login-card" onSubmit={login}><span className="brand-mark"><Landmark size={26} /></span><h1>প্রশাসনিক প্রবেশ</h1><p>অফিসার্স ক্লাব ঢাকা · সরস্বতী পূজা পোর্টাল</p><label>ইউজারনেম<input value={username} onChange={(e) => setUsername(e.target.value)} /></label><label>পাসওয়ার্ড<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="ডেমো পাসওয়ার্ড" /></label><button type="submit">ড্যাশবোর্ডে প্রবেশ করুন</button>{loginError && <div className="admin-error">{loginError}</div>}<div className="admin-demo-hint">ডেমো লগইন: <strong>admin</strong> · পাসওয়ার্ড: <strong>puja2027</strong><br />এটি স্থানীয় প্রদর্শনী সংস্করণ; প্রোডাকশনে নিরাপদ অথেনটিকেশন যুক্ত করতে হবে।</div><div style={{ marginTop: 18 }}><Link href="/" style={{ fontSize: 11, color: "#8a6a68" }}>← ওয়েবসাইটে ফিরে যান</Link></div></form></div>;

  return <div className="admin-shell">
    <aside className={mobileExpanded ? "admin-sidebar mobile-expanded" : "admin-sidebar"}>
      <div className="admin-brand"><span className="brand-mark"><Landmark size={22} /></span><span><strong>অফিসার্স ক্লাব ঢাকা</strong><small>পূজা প্রশাসন · Demo CMS</small></span><button className="admin-mobile-toggle" onClick={() => setMobileExpanded(!mobileExpanded)}><Menu size={14} /> মেনু</button></div>
      <div className="admin-nav-label">প্রধান মেনু</div>
      <nav className="admin-nav">{modules.map((item) => { const Icon = item.icon; return <button key={item.key} className={active === item.key ? "active" : ""} onClick={() => { setActive(item.key); setMobileExpanded(false); setSearch(""); }}><Icon size={16} /> {item.label}</button>; })}</nav>
      <div className="admin-sidebar-bottom"><Link href="/"><ArrowLeft size={15} /> ওয়েবসাইট দেখুন</Link><button onClick={logout}><LogOut size={15} /> লগআউট</button></div>
    </aside>
    <section className="admin-main">
      <header className="admin-topbar"><div><h1>{labels[active]}</h1><p>অফিসার্স ক্লাব ঢাকা · শ্রীশ্রী সরস্বতী পূজা ২০২৭</p></div><div className="admin-user"><span className="admin-user-avatar"><Users size={18} /></span><span><strong>ডেমো অ্যাডমিন</strong><small>Super Administrator</small></span></div></header>
      <div className="admin-content">
        {active === "overview" ? <>
          <div className="admin-welcome"><div><h2>স্বাগতম, অ্যাডমিন</h2><p>আপনার পূজা পোর্টালের সার্বিক কার্যক্রম এক নজরে দেখুন।</p></div><select className="admin-year-select"><option>২০২৭ সাল</option><option>২০২৬ সাল</option></select></div>
          <div className="admin-stats">
            <div className="admin-stat"><span className="admin-stat-icon"><FileText size={19} /></span><div><small>কনটেন্ট রেকর্ড</small><strong>{summary?.records ?? "—"}</strong></div></div>
            <div className="admin-stat"><span className="admin-stat-icon"><HandHeart size={19} /></span><div><small>অনুদান আবেদন</small><strong>{summary?.donations ?? "—"}</strong></div></div>
            <div className="admin-stat"><span className="admin-stat-icon"><Megaphone size={19} /></span><div><small>বিজ্ঞাপন আবেদন</small><strong>{summary?.adRequests ?? "—"}</strong></div></div>
            <div className="admin-stat"><span className="admin-stat-icon"><Mail size={19} /></span><div><small>যোগাযোগ বার্তা</small><strong>{summary?.contacts ?? "—"}</strong></div></div>
          </div>
          <div className="admin-panel-grid"><div className="admin-panel"><div className="admin-panel-heading"><h3>আর্থিক সারসংক্ষেপ · ২০২৭</h3><small>ডেমো ডাটাবেজ</small></div><div className="finance-summary"><div><small>মোট আয়</small><strong>৳{(summary?.income || 0).toLocaleString("en-IN")}</strong></div><div><small>মোট ব্যয়</small><strong>৳{(summary?.expenses || 0).toLocaleString("en-IN")}</strong></div><div><small>নিট স্থিতি</small><strong>৳{((summary?.income || 0) - (summary?.expenses || 0)).toLocaleString("en-IN")}</strong></div></div><div className="admin-chart"><span style={{ height: "66%" }} /><span style={{ height: "43%" }} /><span style={{ height: "80%" }} /><span style={{ height: "55%" }} /><span style={{ height: "92%" }} /><span style={{ height: "72%" }} /><span style={{ height: "48%" }} /><span style={{ height: "87%" }} /></div><small className="chart-note">গ্রাফটি UI ডেমো; বাস্তব মাসভিত্তিক হিসাব সংযুক্ত হলে ডাটাভিত্তিক হবে।</small></div>
            <div className="admin-panel"><div className="admin-panel-heading"><h3>দ্রুত কাজ</h3><small>Quick actions</small></div><div className="admin-quick-actions"><button onClick={() => { setActive("notices"); openCreate(); }}><Bell size={16} /> নতুন নোটিশ</button><button onClick={() => { setActive("activities"); openCreate(); }}><Activity size={16} /> কার্যক্রম যোগ</button><button onClick={() => { setActive("swaronika"); openCreate(); }}><BookOpen size={16} /> স্মরণিকা আপলোড</button><button onClick={() => { setActive("finance"); openCreate(); }}><Wallet size={16} /> আয় / ব্যয় এন্ট্রি</button></div></div></div>
          <div className="admin-panel" style={{ marginTop: 17 }}><div className="admin-panel-heading"><h3>প্রশাসনিক মডিউল</h3><small>সকল ব্যবস্থাপনা বিভাগ</small></div><div className="admin-module-shortcuts">{modules.filter((item) => item.key !== "overview").map((item) => { const Icon = item.icon; return <button key={item.key} onClick={() => setActive(item.key)}><Icon size={17} /><span>{item.label}</span><ArrowLeft size={13} /></button>; })}</div></div>
        </> : <>
          <div className="admin-module-head"><div><h2>{labels[active]}</h2><small>রেকর্ড ব্যবস্থাপনা · স্থানীয় SQLite ডাটাবেজ</small></div><div className="admin-module-actions"><div className="admin-search"><Search size={14} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="খুঁজুন…" /></div>{["donations", "adrequests", "inbox"].includes(active) ? null : <button className="admin-add-btn" onClick={openCreate}><Plus size={15} /> নতুন যোগ করুন</button>}</div></div>
          {notice && <div className="admin-alert">{notice}<button onClick={() => setNotice("")}><X size={14} /></button></div>}
          <div className="admin-records"><div className="admin-panel-heading"><h3>{labels[active]} তালিকা</h3><button className="admin-export" onClick={exportCsv}><ArrowDownToLine size={14} /> CSV এক্সপোর্ট</button></div>
            {loading ? <div className="admin-empty">তথ্য লোড হচ্ছে…</div> : filteredRecords.length === 0 ? <div className="admin-empty">কোনো রেকর্ড পাওয়া যায়নি। নতুন রেকর্ড যোগ করুন।</div> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>শিরোনাম / নাম</th><th>বিবরণ</th><th>বছর / পরিমাণ</th><th>স্ট্যাটাস</th><th>অ্যাকশন</th></tr></thead><tbody>{filteredRecords.map((item) => <tr key={item.id}><td><div className="admin-record-title">{item.title || item.donorName || item.organization || item.name || item.description || `রেকর্ড #${item.id}`}</div><div className="admin-record-sub">{item.subtitle || item.mobile || item.contactName || item.subject || item.purpose || "—"}</div></td><td>{item.body || item.message || item.description || item.packageName || item.category || "—"}</td><td>{item.amount ? `৳${item.amount.toLocaleString("en-IN")}` : item.year || (item.createdAt ? new Date(item.createdAt).toLocaleDateString("bn-BD") : "—")}</td><td><span className={`status-pill ${item.status === "PENDING" || item.status === "NEW" ? "pending" : item.status === "DRAFT" ? "draft" : ""}`}>{item.status === "PENDING" ? "অপেক্ষমাণ" : item.status === "NEW" ? "নতুন" : item.status === "DRAFT" ? "খসড়া" : item.status === "APPROVED" ? "অনুমোদিত" : item.status || "প্রকাশিত"}</span></td><td><div className="admin-row-actions">{module.type !== "donations" && module.type !== "advertisement-requests" && module.type !== "contact-messages" && module.type !== "finance" && <><button onClick={() => openEdit(item)} title="সম্পাদনা"><Pencil size={13} /></button><button onClick={() => deleteRecord(item.id)} title="মুছুন"><Trash2 size={13} /></button></>}</div></td></tr>)}</tbody></table></div>}
          </div>
        </>}
        {notice && active === "overview" && <div className="admin-alert" style={{ marginTop: 16 }}>{notice}<button onClick={() => setNotice("")}><X size={14} /></button></div>}
        <div className="admin-footer-note"><ShieldCheck size={14} /> ডেমো সংস্করণ: বাস্তব ব্যবহারের আগে ব্যবহারকারী অনুমতি, নিরাপদ লগইন, পেমেন্ট গেটওয়ে ও ব্যাকআপ নীতিমালা যুক্ত করতে হবে।</div>
      </div>
    </section>
    {modalOpen && <div className="admin-form-modal" onClick={() => setModalOpen(false)}><form className="admin-form-box" onSubmit={saveRecord} onClick={(e) => e.stopPropagation()}><h3>{editRecord ? "রেকর্ড সম্পাদনা" : `নতুন ${labels[active]} যোগ করুন`}</h3>{active === "finance" ? <><label>লেনদেনের ধরন<select value={financeType} onChange={(e) => setFinanceType(e.target.value)}><option value="INCOME">আয়</option><option value="EXPENSE">ব্যয়</option></select></label><label>খাত<input name="category" required placeholder="যেমন অনুদান / সাজসজ্জা" /></label><label>বিবরণ<input name="description" required placeholder="লেনদেনের বিবরণ" /></label><label>পরিমাণ (৳)<input name="amount" type="number" min="1" required /></label><label>বছর<input name="year" type="number" defaultValue="2027" /></label></> : <><label>শিরোনাম<input name="title" required defaultValue={editRecord?.title || ""} placeholder="শিরোনাম লিখুন" /></label><label>উপশিরোনাম<input name="subtitle" defaultValue={editRecord?.subtitle || ""} placeholder="সংক্ষিপ্ত পরিচিতি" /></label><label>বিস্তারিত<textarea name="body" rows={4} defaultValue={editRecord?.body || ""} placeholder="বিস্তারিত লিখুন" /></label><label>ছবি / PDF আপলোড<input type="file" accept="image/jpeg,image/png,image/webp,image/gif,application/pdf" onChange={uploadAsset} /></label><label>ফাইলের পাথ<input name="image" value={imagePath} onChange={(e) => setImagePath(e.target.value)} placeholder="/uploads/your-file.webp" /></label>{uploading && <small>ফাইল আপলোড হচ্ছে…</small>}<label>সাল<input name="year" type="number" defaultValue={editRecord?.year || 2027} /></label><label>স্ট্যাটাস<select name="status" defaultValue={editRecord?.status || "DRAFT"}><option value="DRAFT">খসড়া</option><option value="PUBLISHED">প্রকাশিত</option><option value="APPROVED">অনুমোদিত</option></select></label></>}<div className="admin-form-actions"><button type="button" onClick={() => setModalOpen(false)}>বাতিল</button><button type="submit">সংরক্ষণ করুন</button></div></form></div>}
  </div>;
}
