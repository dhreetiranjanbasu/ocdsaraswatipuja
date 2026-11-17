"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Bell, BookOpen, CalendarDays,
  CheckCircle2, ChevronDown, CircleHelp, Clock3, Flower2, HandHeart, Images,
  Landmark, Mail, MapPin, Menu, MessageCircle, Music2, Phone, Quote, Send,
  ShieldCheck, Sparkles, Users, Wallet, X,
} from "lucide-react";

type RecordItem = { id: number; type: string; title: string; subtitle?: string | null; body?: string | null; image?: string | null; year?: number | null };

const slides = [
  { image: "/assets/saraswati-cover.jpg", title: "বিদ্যার আলোয় আলোকিত হোক আগামীর পথ", kicker: "শ্রীশ্রী সরস্বতী পূজা ২০২৭", text: "ঐতিহ্য, জ্ঞান, সংস্কৃতি ও সম্প্রীতির এক মিলনমেলা।", mode: "art" },
  { image: "/assets/committee-meeting-1.webp", title: "সম্মিলিত উদ্যোগে সুন্দর আয়োজন", kicker: "পূজা উদযাপন কমিটি", text: "পরিকল্পনা থেকে বাস্তবায়ন—প্রতিটি পদক্ষেপে স্বচ্ছতা ও সমন্বয়।", mode: "photo" },
  { image: "/assets/committee-meeting-wide.webp", title: "ঐতিহ্যের ধারায়, আগামীর প্রত্যয়ে", kicker: "অফিসার্স ক্লাব ঢাকা", text: "সদস্য, শুভানুধ্যায়ী ও সহযোগীদের অংশগ্রহণে আমাদের আয়োজন।", mode: "photo" },
];

const navItems = [
  ["হোম", "home"], ["আমাদের কথা", "about"], ["ইতিহাস", "history"], ["পূজা আয়োজন", "puja"], ["কমিটি", "committee"],
  ["নিমন্ত্রণপত্র", "invitation"], ["স্মরণিকা", "swaronika"], ["দাতা ও অনুদান", "donation"], ["গ্যালারি", "gallery"], ["যোগাযোগ", "contact"],
];

export default function HomePage({ records }: { records: RecordItem[] }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [donationMessage, setDonationMessage] = useState("");
  const [adMessage, setAdMessage] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [busy, setBusy] = useState("");

  const byType = (type: string) => records.filter((item) => item.type === type);
  const banners = byType("BANNER");
  const heroSlides = useMemo(() => banners.length ? banners.map((item) => ({
    image: item.image || "/assets/saraswati-cover.jpg",
    title: item.title,
    kicker: item.subtitle || "শ্রীশ্রী সরস্বতী পূজা ২০২৭",
    text: item.body || "ঐতিহ্য, জ্ঞান, সংস্কৃতি ও সম্প্রীতির এক মিলনমেলা।",
    mode: item.image?.includes("saraswati") ? "art" : "photo",
  })) : slides, [records]);

  useEffect(() => {
    const timer = setInterval(() => setActiveSlide((current) => (current + 1) % heroSlides.length), 6200);
    return () => clearInterval(timer);
  }, [heroSlides.length]);
  const notices = byType("NOTICE");
  const activities = [...byType("NEWS"), ...byType("ACTIVITY")];
  const schedules = byType("SCHEDULE");
  const invitations = byType("INVITATION");
  const committees = byType("COMMITTEE");
  const subcommittees = byType("SUBCOMMITTEE");
  const swaronika = byType("SWARONIKA");
  const albums = byType("ALBUM");
  const quotes = byType("QUOTE");
  const faqs = byType("FAQ");
  const acknowledgements = byType("ACKNOWLEDGEMENT");
  const advertisements = byType("ADVERTISEMENT");
  const histories = byType("HISTORY");

  async function sendForm(event: FormEvent<HTMLFormElement>, endpoint: string, setMessage: (message: string) => void, key: string) {
    event.preventDefault();
    setMessage("এটি শুধুমাত্র ডেমো। এই সংস্করণে ফর্মের তথ্য জমা নেওয়া হচ্ছে না।");
  }

  const current = heroSlides[activeSlide % heroSlides.length];
  const currentQuote = quotes[0];
  const swaronikaCover = swaronika[0]?.image && !swaronika[0].image.toLowerCase().endsWith(".pdf") ? swaronika[0].image : "/assets/swaronika-covers.webp";

  return (
    <main id="home">
      <div className="topline">
        <div className="container topline-inner">
          <span><MapPin size={13} /> ২৬, বেইলি রোড, ঢাকা</span>
          <span className="topline-right"><span>অফিসার্স ক্লাব ঢাকা</span><span className="topline-dot" /> <span>শ্রীশ্রী সরস্বতী পূজা উদযাপন কমিটি</span></span>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#home" aria-label="হোম">
            <span className="brand-mark"><Flower2 size={27} strokeWidth={1.6} /></span>
            <span className="brand-copy"><strong>অফিসার্স ক্লাব ঢাকা</strong><small>শ্রীশ্রী সরস্বতী পূজা উদযাপন কমিটি</small></span>
          </a>
          <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="মেনু খুলুন">{mobileOpen ? <X /> : <Menu />}</button>
          <nav className={mobileOpen ? "main-nav open" : "main-nav"}>
            {navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMobileOpen(false)}>{label}</a>)}
            <a className="nav-donate" href="#donation" onClick={() => setMobileOpen(false)}><HandHeart size={16} /> অনুদান দিন</a>
          </nav>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-ornament ornament-one" /><div className="hero-ornament ornament-two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> {current.kicker}</div>
            <h1>{current.title}</h1>
            <p>{current.text}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#puja">আয়োজন সম্পর্কে জানুন <ArrowUpRight size={17} /></a>
              <a className="btn btn-outline" href="#about">আমাদের সম্পর্কে <ArrowRight size={16} /></a>
            </div>
            <div className="hero-trust"><span><ShieldCheck size={16} /> ঐতিহ্য ও স্বচ্ছতা</span><span><Users size={16} /> সম্মিলিত উদ্যোগ</span></div>
          </div>
          <div className={`hero-visual ${current.mode === "art" ? "hero-visual-art" : "hero-visual-photo"}`}>
            <div className="hero-image-wrap">
              <img key={current.image} src={current.image} alt={current.mode === "art" ? "সরস্বতী দেবীর প্রতিমার প্রচ্ছদচিত্র" : "পূজা উদযাপন কমিটির কার্যক্রম"} />
              <div className="hero-image-shade" />
              <div className="hero-image-caption"><span className="caption-dot" /> {activeSlide === 0 ? "মা সরস্বতীর বন্দনায়" : "কমিটির কার্যক্রম"}</div>
            </div>
            <div className="hero-slide-controls">
              <div className="slide-dots">{heroSlides.map((slide, index) => <button key={slide.image} className={index === activeSlide ? "slide-dot active" : "slide-dot"} onClick={() => setActiveSlide(index)} aria-label={`স্লাইড ${index + 1}`} />)}</div>
              <div className="slide-arrows"><button onClick={() => setActiveSlide((activeSlide + heroSlides.length - 1) % heroSlides.length)} aria-label="পূর্ববর্তী"><ArrowLeft size={17} /></button><button onClick={() => setActiveSlide((activeSlide + 1) % heroSlides.length)} aria-label="পরবর্তী"><ArrowRight size={17} /></button></div>
            </div>
            <div className="hero-stamp"><span>শুভ</span><strong>সরস্বতী</strong><span>পূজা ২০২৭</span></div>
          </div>
        </div>
        <div className="container hero-bottomline"><span><Sparkles size={14} /> জ্ঞান, সৃজনশীলতা ও সংস্কৃতির উদযাপন</span><a href="#notice">সর্বশেষ নোটিশ দেখুন <ArrowDown size={14} /></a></div>
      </section>

      <section className="notice-ribbon" id="notice">
        <div className="container notice-ribbon-inner">
          <div className="notice-label"><Bell size={17} /> নোটিশ বোর্ড</div>
          <div className="notice-text"><strong>{notices[0]?.title || "২০২৭ সালের সরস্বতী পূজা উদযাপন"}</strong><span>{notices[0]?.subtitle || "কমিটির বিজ্ঞপ্তি ও গুরুত্বপূর্ণ ঘোষণা"}</span></div>
          <button className="notice-open" onClick={() => setNoticeOpen(true)}>বিস্তারিত <ArrowUpRight size={15} /></button>
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="container about-grid">
          <div className="about-photo-stack">
            <div className="about-photo-main"><img src="https://upload.wikimedia.org/wikipedia/commons/6/63/Officers%27_Club%2C_Dhaka.jpg" alt="অফিসার্স ক্লাব ঢাকা ভবন" /></div>
            <div className="about-photo-note"><Landmark size={19} /><span><strong>অফিসার্স ক্লাব ঢাকা</strong><small>২৬, বেইলি রোড, ঢাকা</small></span></div>
            <div className="photo-flower"><Flower2 size={40} /></div>
          </div>
          <div className="about-copy">
            <div className="section-kicker">আমাদের পরিচয়</div>
            <h2>আলোক, জ্ঞান ও ঐতিহ্যের বন্ধনে</h2>
            <p className="lead">অফিসার্স ক্লাব ঢাকার শ্রীশ্রী সরস্বতী পূজা উদযাপন কমিটির এই ডিজিটাল উদ্যোগ—আয়োজন, ঐতিহ্য, প্রকাশনা ও সাংগঠনিক তথ্যকে এক জায়গায় তুলে ধরার একটি আধুনিক মাধ্যম।</p>
            <p>পূজা উদযাপনের প্রস্তুতি, কমিটির কার্যক্রম, সদস্যদের অংশগ্রহণ, দাতা ও শুভানুধ্যায়ীদের সহযোগিতা এবং বছরভিত্তিক প্রকাশনা—সবকিছু সহজে খুঁজে পাওয়ার জন্য এই ওয়েব পোর্টাল পরিকল্পিত। অনুমোদিত তথ্য ও নথি প্রশাসনিক প্যানেল থেকে হালনাগাদ করা যাবে।</p>
            <div className="about-points"><span><CheckCircle2 size={17} /> বছরভিত্তিক আর্কাইভ</span><span><CheckCircle2 size={17} /> স্বচ্ছ তথ্য ব্যবস্থাপনা</span><span><CheckCircle2 size={17} /> সহজ অনলাইন অংশগ্রহণ</span></div>
            <a className="text-link" href="#committee">কমিটি সম্পর্কে জানুন <ArrowUpRight size={16} /></a>
            <small className="image-credit">ভবনের ছবি: Alvi Rahman Khan · Wikimedia Commons · CC BY-SA 3.0</small>
          </div>
        </div>
      </section>

      <section className="history-section" id="history">
        <div className="container history-inner"><div className="history-heading"><div className="section-kicker">ইতিহাস ও ঐতিহ্য</div><h2>স্মৃতির ধারাবাহিকতা, আগামীর প্রেরণা</h2></div><div className="history-copy"><p>{histories[0]?.body || "প্রতিষ্ঠানের অনুমোদিত ইতিহাস, ঐতিহ্য ও পূজা উদযাপনের গুরুত্বপূর্ণ মাইলফলক এখানে সংরক্ষিত হবে।"}</p><div className="history-tags"><span><Landmark size={15} /> প্রতিষ্ঠানের ইতিহাস</span><span><CalendarDays size={15} /> বছরভিত্তিক নথি</span><span><BookOpen size={15} /> প্রকাশনা ও স্মারক</span></div></div></div>
      </section>

      <section className="quick-values">
        <div className="container values-grid">
          <div className="value-item"><span className="value-icon"><CalendarDays /></span><div><strong>বছরভিত্তিক আয়োজন</strong><small>প্রতিটি পূজার আলাদা তথ্য ও নথি</small></div></div>
          <div className="value-item"><span className="value-icon"><BookOpen /></span><div><strong>ডিজিটাল স্মরণিকা</strong><small>প্রকাশনার সংরক্ষণ ও পাঠ</small></div></div>
          <div className="value-item"><span className="value-icon"><HandHeart /></span><div><strong>সহযোগিতার সুযোগ</strong><small>অনুদান ও বিজ্ঞাপন আবেদন</small></div></div>
          <div className="value-item"><span className="value-icon"><ShieldCheck /></span><div><strong>নিয়ন্ত্রিত ব্যবস্থাপনা</strong><small>অনুমোদনভিত্তিক প্রশাসনিক প্যানেল</small></div></div>
        </div>
      </section>

      <section className="section puja-section" id="puja">
        <div className="container">
          <div className="section-heading center"><div className="section-kicker">পূজা ২০২৭</div><h2>পূজা আয়োজন ও সময়সূচি</h2><p>অনুষ্ঠানের চূড়ান্ত তারিখ ও সময় কমিটি কর্তৃক অনুমোদিত হলে এখানে প্রকাশ করা হবে।</p></div>
          <div className="schedule-grid">
            {(schedules.length ? schedules : [{ id: 1, title: "পূজা ও পুষ্পাঞ্জলি", subtitle: "সময়সূচি প্রকাশের অপেক্ষায়", body: "অনুমোদিত সময়সূচি এখানে প্রকাশিত হবে।" }, { id: 2, title: "প্রসাদ বিতরণ", subtitle: "সময়সূচি প্রকাশের অপেক্ষায়", body: "অনুমোদিত সময়সূচি এখানে প্রকাশিত হবে।" }]).map((item, index) => <div className="schedule-card" key={item.id}><div className="schedule-icon">{index === 0 ? <Flower2 /> : <Clock3 />}</div><div className="schedule-number">০{index + 1}</div><h3>{item.title}</h3><span className="schedule-time">{item.subtitle}</span><p>{item.body}</p></div>)}
            <div className="schedule-card schedule-card-accent"><div className="schedule-icon"><Music2 /></div><div className="schedule-number">০৩</div><h3>সাংস্কৃতিক আয়োজন</h3><span className="schedule-time">বিস্তারিত শীঘ্রই</span><p>সাংস্কৃতিক অনুষ্ঠান ও অন্যান্য আয়োজনের তথ্য অনুমোদনের পর যুক্ত হবে।</p></div>
          </div>
          <div className="schedule-footnote"><Bell size={15} /> সময়সূচি পরিবর্তন হলে নোটিশ বোর্ডে জানানো হবে।</div>
        </div>
      </section>

      <section className="section invitation-section" id="invitation">
        <div className="container invitation-card">
          <div className="invitation-copy"><div className="section-kicker">সাদর আমন্ত্রণ</div><h2>শ্রীশ্রী সরস্বতী পূজা ২০২৭</h2><p>পূজা উদযাপনের আনুষ্ঠানিক নিমন্ত্রণপত্র, অনুষ্ঠানসূচি ও প্রয়োজনীয় নির্দেশনা প্রকাশিত হলে এই বিভাগে পাওয়া যাবে।</p><div className="invitation-meta"><span><CalendarDays size={16} /> তারিখ: কমিটি কর্তৃক ঘোষণার অপেক্ষায়</span><span><MapPin size={16} /> অফিসার্স ক্লাব ঢাকা</span></div><span className="invitation-coming"><Bell size={14} /> {invitations[0]?.subtitle || "নিমন্ত্রণপত্র প্রকাশের অপেক্ষায়"}</span></div>
          <div className="invitation-paper">{invitations[0]?.image ? (invitations[0].image.toLowerCase().endsWith(".pdf") ? <a className="invitation-file-link" href={invitations[0].image} target="_blank" rel="noreferrer"><BookOpen size={28} /><strong>নিমন্ত্রণপত্র PDF</strong><small>দেখুন / ডাউনলোড</small></a> : <img className="invitation-uploaded-image" src={invitations[0].image} alt="সরস্বতী পূজার নিমন্ত্রণপত্র" />) : <><Flower2 size={28} /><small>অফিসার্স ক্লাব ঢাকা</small><strong>সাদর আমন্ত্রণ</strong><span>শ্রীশ্রী সরস্বতী পূজা</span><em>২০২৭</em><div className="invitation-divider"/><small>আপনার উপস্থিতি আমাদের আয়োজনকে পূর্ণতা দেবে</small></>}</div>
        </div>
      </section>

      <section className="section notice-feature-section">
        <div className="container notice-feature-grid">
          <div className="notice-feature-copy"><div className="section-kicker">গুরুত্বপূর্ণ ঘোষণা</div><h2>কমিটির নোটিশ ও বিজ্ঞপ্তি</h2><p>সভা, সিদ্ধান্ত, দায়িত্ব বণ্টন ও পূজা প্রস্তুতি সংক্রান্ত গুরুত্বপূর্ণ নথি এক জায়গায় সংরক্ষিত থাকবে।</p>
            {notices.slice(0, 2).map((item) => <div className="notice-list-item" key={item.id}><span className="notice-file-icon"><Bell size={18} /></span><span><strong>{item.title}</strong><small>{item.subtitle}</small></span><button onClick={() => setNoticeOpen(true)} aria-label="নোটিশ খুলুন"><ArrowUpRight size={18} /></button></div>)}
            <button className="btn btn-outline" onClick={() => setNoticeOpen(true)}>নোটিশ দেখুন <ArrowRight size={16} /></button>
          </div>
          <button className="notice-paper" onClick={() => setNoticeOpen(true)} aria-label="মূল সভার নোটিশ দেখুন"><img src={notices[0]?.image || "/assets/notice-2027.webp"} alt="২০২৭ সালের সরস্বতী পূজা উদযাপন কমিটির সভার নোটিশ" /><span><Images size={15} /> মূল নোটিশের স্ক্যান কপি</span></button>
        </div>
      </section>

      <section className="section committee-section" id="committee">
        <div className="container">
          <div className="section-heading"><div className="section-kicker">সাংগঠনিক কাঠামো</div><h2>কমিটি ও উপকমিটি</h2><p>অনুমোদিত কমিটি, দায়িত্ব ও সদস্য তালিকা বছর অনুযায়ী ব্যবস্থাপনা করা যাবে।</p></div>
          <div className="committee-grid">
            {(committees.length ? committees : [{ id: 1, title: "সভাপতি", subtitle: "পূজা উদযাপন কমিটি", body: "নাম সংযোজনযোগ্য" }, { id: 2, title: "সদস্য সচিব", subtitle: "পূজা উদযাপন কমিটি", body: "নাম সংযোজনযোগ্য" }]).map((item, i) => <div className="committee-card" key={item.id}><div className="committee-avatar"><Users size={27} /></div><div className="committee-role">মূল কমিটি</div><h3>{item.title}</h3><p>{item.subtitle}</p><small>{item.body}</small></div>)}
            {(subcommittees.length ? subcommittees : [{ id: 3, title: "আয়োজন ও ব্যবস্থাপনা", subtitle: "উপকমিটি", body: "দায়িত্বপ্রাপ্ত সদস্য তালিকা সংযোজনযোগ্য" }, { id: 4, title: "সাংস্কৃতিক ও অঞ্জলি", subtitle: "উপকমিটি", body: "দায়িত্বপ্রাপ্ত সদস্য তালিকা সংযোজনযোগ্য" }]).map((item) => <div className="committee-card committee-card-light" key={item.id}><div className="committee-avatar"><Flower2 size={27} /></div><div className="committee-role">উপকমিটি</div><h3>{item.title}</h3><p>{item.subtitle}</p><small>{item.body}</small></div>)}
          </div>
          <div className="committee-note"><ShieldCheck size={17} /> কমিটির নাম, ছবি ও দায়িত্ব প্রকাশের আগে কর্তৃপক্ষের অনুমোদন নিশ্চিত করা হবে।</div>
        </div>
      </section>

      <section className="section swaronika-section" id="swaronika">
        <div className="container swaronika-grid">
          <div className="swaronika-visual"><img src={swaronikaCover} alt="বাণী অর্চনা প্রকাশনার পুরোনো প্রচ্ছদ" /><span className="swaronika-seal"><BookOpen size={22} /><strong>ডিজিটাল</strong><small>আর্কাইভ</small></span></div>
          <div className="swaronika-copy"><div className="section-kicker">প্রকাশনা ও স্মৃতির সংরক্ষণ</div><h2>স্মরণিকা — বছরভিত্তিক ডিজিটাল আর্কাইভ</h2><p>পূর্ববর্তী ও নতুন স্মরণিকার প্রচ্ছদ, PDF, প্রকাশনা কমিটি, বিজ্ঞাপনদাতা এবং গুরুত্বপূর্ণ স্মারক তথ্য বছর অনুযায়ী সাজানো থাকবে।</p>
            <div className="archive-features"><span><CheckCircle2 size={16} /> বছর অনুযায়ী সংস্করণ</span><span><CheckCircle2 size={16} /> PDF দেখুন ও ডাউনলোড</span><span><CheckCircle2 size={16} /> বিজ্ঞাপন ও শুভেচ্ছা সংরক্ষণ</span></div>
            <div className="archive-editions">{(swaronika.length ? swaronika : [{ id: 1, title: "বাণী অর্চনা", subtitle: "প্রচ্ছদ সংগ্রহ", image: "" }]).map((item) => <div key={item.id}><BookOpen size={17} /><span><strong>{item.title}</strong><small>{item.subtitle}</small></span>{item.image?.toLowerCase().endsWith(".pdf") ? <a className="edition-status" href={item.image} target="_blank" rel="noreferrer">PDF দেখুন</a> : <span className="edition-status">নমুনা</span>}</div>)}</div>
          </div>
        </div>
      </section>

      <section className="section activity-section" id="activities">
        <div className="container">
          <div className="section-heading heading-row"><div><div className="section-kicker">সাম্প্রতিক সংবাদ ও কার্যক্রম</div><h2>আমাদের আয়োজনের মুহূর্ত</h2><p>সভা, পরিকল্পনা ও সাংগঠনিক কার্যক্রমের নির্বাচিত ছবি ও সংবাদ।</p></div><a className="text-link" href="#gallery">সব ছবি দেখুন <ArrowUpRight size={16} /></a></div>
          <div className="activity-grid">{activities.slice(0, 3).map((item, i) => <article className="activity-card" key={item.id}><div className="activity-image"><img src={item.image || "/assets/committee-meeting-1.webp"} alt={item.title} /><span>কার্যক্রম</span></div><div className="activity-content"><small>{item.subtitle || "অফিসার্স ক্লাব ঢাকা"}</small><h3>{item.title}</h3><p>{item.body}</p><a href="#gallery">ছবি দেখুন <ArrowUpRight size={15} /></a></div></article>)}</div>
        </div>
      </section>

      <section className="section gallery-section" id="gallery">
        <div className="container">
          <div className="section-heading center"><div className="section-kicker">ছবি ও স্মৃতি</div><h2>ফটো গ্যালারি</h2><p>একাধিক অ্যালবামে আয়োজনের ছবি সাজানো ও সংরক্ষণ করা যাবে।</p></div>
          <div className="gallery-grid">
            {(albums.length ? albums : [
              { id: 1, title: "কমিটির সভা ও আলোচনা", image: "/assets/committee-meeting-1.webp" },
              { id: 2, title: "আয়োজন পরিকল্পনা", image: "/assets/committee-meeting-wide.webp" },
              { id: 3, title: "সদস্যদের মতবিনিময়", image: "/assets/committee-table.webp" },
              { id: 4, title: "সাংগঠনিক কার্যক্রম", image: "/assets/committee-group.webp" },
              { id: 5, title: "সমন্বয় সভা", image: "/assets/meeting-session.webp" },
            ]).slice(0, 5).map((item, index) => <div className={index === 0 ? "gallery-large" : ""} key={item.id}><img src={item.image || "/assets/committee-meeting-1.webp"} alt={item.title} /><span>{item.title}</span></div>)}
          </div>
          <div className="gallery-footnote"><Images size={15} /> গ্যালারির ছবি ও অ্যালবাম প্রশাসনিক প্যানেল থেকে যোগ করা যাবে।</div>
        </div>
      </section>

      <section className="quote-band">
        <div className="container quote-inner"><Quote size={38} /><div><div className="quote-sanskrit">{currentQuote?.title || "বিদ্যা দদাতি বিনয়ম্"}</div><p>{currentQuote?.subtitle || "বিদ্যা বিনয় দান করে"}</p><small>{currentQuote?.body || "জ্ঞান মানুষকে আলোকিত করে, বিনয়ী করে এবং কল্যাণের পথে পরিচালিত করে।"}</small></div><Flower2 className="quote-flower" size={80} /></div>
      </section>

      <section className="section donor-section" id="donation">
        <div className="container donor-grid">
          <div className="donor-copy"><div className="section-kicker">আপনার সহযোগিতা</div><h2>অনুদান ও শুভানুধ্যায়ী</h2><p>পূজা আয়োজন, প্রকাশনা ও সাংস্কৃতিক কার্যক্রমে আপনার সহযোগিতা আমাদের অনুপ্রেরণা। অনুদানের আগ্রহ জানাতে ফর্মটি পূরণ করুন।</p>
            <div className="donor-benefits"><span><HandHeart size={18} /> সম্মানজনক স্বীকৃতি</span><span><ShieldCheck size={18} /> যাচাইকৃত হিসাব</span><span><Wallet size={18} /> রসিদ ও লেনদেনের রেকর্ড</span></div>
            <div className="donor-privacy">দাতার নাম বা অনুদানের পরিমাণ প্রকাশের আগে সম্মতি ও কমিটির অনুমোদন নেওয়া হবে।</div>
          </div>
          <form className="form-card" onSubmit={(e) => sendForm(e, "/api/donations", setDonationMessage, "donation")}>
            <div className="form-card-heading"><span className="form-icon"><HandHeart /></span><div><h3>অনুদানের আগ্রহ জানান</h3><small>ফর্ম জমা দিলে প্রশাসনিক দল যোগাযোগ করবে</small></div></div>
            <label>আপনার নাম<input name="donorName" required placeholder="পূর্ণ নাম লিখুন" /></label>
            <div className="form-two"><label>মোবাইল নম্বর<input name="mobile" required placeholder="01XXXXXXXXX" /></label><label>অনুদানের পরিমাণ (৳)<input name="amount" type="number" min="100" required placeholder="যেমন ২০০০" /></label></div>
            <label>অনুদানের উদ্দেশ্য<select name="purpose"><option>সাধারণ অনুদান</option><option>পূজা আয়োজন</option><option>স্মরণিকা প্রকাশনা</option><option>সাংস্কৃতিক অনুষ্ঠান</option></select></label>
            <button className="btn btn-primary btn-full" disabled={busy === "donation"}>{busy === "donation" ? "জমা হচ্ছে…" : "অনুদানের আবেদন জমা দিন"} <ArrowRight size={16} /></button>
            {donationMessage && <p className="form-feedback">{donationMessage}</p>}
            <small className="form-disclaimer">ডেমো সাইটে এটি একটি আবেদন রেকর্ড করে; বাস্তব পেমেন্ট গেটওয়ে এখনো সংযুক্ত নয়।</small>
          </form>
        </div>
      </section>

      <section className="section advertisement-section" id="advertisement">
        <div className="container ad-grid">
          <div className="ad-copy"><div className="section-kicker">প্রচার ও সহযোগিতা</div><h2>বিজ্ঞাপন দিন, পাশে থাকুন</h2><p>স্মরণিকা, ওয়েবসাইট ও পূজা আয়োজনের নির্ধারিত মাধ্যমে বিজ্ঞাপন বা শুভেচ্ছা বার্তা প্রকাশের আবেদন করুন। প্রকাশের আগে সব বিজ্ঞাপন যাচাই ও অনুমোদন করা হবে।</p><div className="ad-points"><span><CheckCircle2 size={16} /> বিজ্ঞাপন আবেদন</span><span><CheckCircle2 size={16} /> ডিজাইন / আর্টওয়ার্ক জমা</span><span><CheckCircle2 size={16} /> অনুমোদন ও প্রকাশনা ব্যবস্থাপনা</span></div></div>
          <form className="ad-form" onSubmit={(e) => sendForm(e, "/api/advertisements", setAdMessage, "advertisement")}>
            <h3>বিজ্ঞাপনের আবেদন</h3>
            <label>প্রতিষ্ঠান / বিজ্ঞাপনদাতার নাম<input name="organization" required placeholder="প্রতিষ্ঠানের নাম" /></label>
            <div className="form-two"><label>যোগাযোগের ব্যক্তি<input name="contactName" required placeholder="নাম" /></label><label>মোবাইল<input name="mobile" required placeholder="01XXXXXXXXX" /></label></div>
            <div className="form-two"><label>ইমেইল<input name="email" type="email" placeholder="name@example.com" /></label><label>বিজ্ঞাপনের ধরন<select name="packageName"><option>স্মরণিকা বিজ্ঞাপন</option><option>ওয়েবসাইট ব্যানার</option><option>পূজা স্পন্সরশিপ</option><option>শুভেচ্ছা বার্তা</option></select></label></div>
            <label>অতিরিক্ত তথ্য<textarea name="message" rows={3} placeholder="বিজ্ঞাপনের আকার, সময় বা প্রয়োজনীয় তথ্য" /></label>
            <button className="btn btn-dark btn-full" disabled={busy === "advertisement"}>{busy === "advertisement" ? "জমা হচ্ছে…" : "আবেদন জমা দিন"} <Send size={15} /></button>
            {adMessage && <p className="form-feedback">{adMessage}</p>}
          </form>
        </div>
      </section>

      <section className="section acknowledgement-section" id="acknowledgement">
        <div className="container acknowledgement-card"><div className="ack-icon"><Flower2 size={32} /></div><div><div className="section-kicker">কৃতজ্ঞতা</div><h2>{acknowledgements[0]?.title || "সকল সহযোগীর প্রতি কৃতজ্ঞতা"}</h2><p>{acknowledgements[0]?.body || "আয়োজনের সঙ্গে যুক্ত সকল সদস্য, দাতা, স্বেচ্ছাসেবক ও শুভানুধ্যায়ীদের প্রতি আমাদের আন্তরিক কৃতজ্ঞতা।"}</p></div><a href="#donation" className="text-link">সহযোগিতায় যুক্ত হোন <ArrowUpRight size={16} /></a></div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="container faq-grid"><div className="section-heading"><div className="section-kicker">জিজ্ঞাসা ও উত্তর</div><h2>সাধারণ প্রশ্ন</h2><p>ওয়েবসাইট ব্যবহার, অনুদান ও প্রকাশনা সম্পর্কে প্রয়োজনীয় তথ্য।</p><div className="faq-help"><CircleHelp size={18} /> আরও কিছু জানতে যোগাযোগ ফর্ম ব্যবহার করুন।</div></div><div className="faq-list">{(faqs.length ? faqs : [{ id: 1, title: "অনুদান কীভাবে প্রদান করব?", body: "অনুদান ফর্ম পূরণ করে আগ্রহ জানাতে পারবেন।" }, { id: 2, title: "স্মরণিকা কীভাবে পাওয়া যাবে?", body: "প্রকাশিত সংস্করণের PDF আর্কাইভে পাওয়া যাবে।" }]).map((item, i) => <details key={item.id} open={i === 0}><summary>{item.title}<ChevronDown size={18} /></summary><p>{item.body}</p></details>)}</div></div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="container contact-grid">
          <div className="contact-copy"><div className="section-kicker">যোগাযোগ</div><h2>আপনার মতামত ও জিজ্ঞাসা জানান</h2><p>পূজা আয়োজন, অনুদান, বিজ্ঞাপন, স্মরণিকা বা ওয়েবসাইট সংক্রান্ত যেকোনো বিষয়ে আমাদের বার্তা পাঠাতে পারেন।</p><div className="contact-info"><span><MapPin size={18} /><span><strong>ঠিকানা</strong><small>অফিসার্স ক্লাব ঢাকা, ২৬ বেইলি রোড, ঢাকা</small></span></span><span><Mail size={18} /><span><strong>ইমেইল</strong><small>ক্লাবের অনুমোদিত ইমেইল সংযোজনযোগ্য</small></span></span><span><Phone size={18} /><span><strong>ফোন</strong><small>যোগাযোগ নম্বর সংযোজনযোগ্য</small></span></span></div></div>
          <form className="contact-form" onSubmit={(e) => sendForm(e, "/api/contact", setContactMessage, "contact")}><h3>বার্তা পাঠান</h3><div className="form-two"><label>আপনার নাম<input name="name" required placeholder="পূর্ণ নাম" /></label><label>মোবাইল<input name="mobile" placeholder="01XXXXXXXXX" /></label></div><label>ইমেইল<input name="email" type="email" placeholder="name@example.com" /></label><label>বিষয়<input name="subject" required placeholder="বার্তার বিষয়" /></label><label>আপনার বার্তা<textarea name="message" required rows={4} placeholder="আপনার বার্তা লিখুন…" /></label><button className="btn btn-primary btn-full" disabled={busy === "contact"}>{busy === "contact" ? "পাঠানো হচ্ছে…" : "বার্তা পাঠান"} <Send size={15} /></button>{contactMessage && <p className="form-feedback">{contactMessage}</p>}</form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-main"><div className="footer-brand"><a className="brand brand-light" href="#home"><span className="brand-mark"><Flower2 size={27} /></span><span className="brand-copy"><strong>অফিসার্স ক্লাব ঢাকা</strong><small>শ্রীশ্রী সরস্বতী পূজা উদযাপন কমিটি</small></span></a><p>ঐতিহ্য, জ্ঞান, সংস্কৃতি ও সম্প্রীতির ডিজিটাল ঠিকানা।</p></div><div className="footer-links"><strong>দ্রুত লিংক</strong><a href="#about">আমাদের পরিচয়</a><a href="#puja">পূজা আয়োজন</a><a href="#swaronika">স্মরণিকা</a><a href="#gallery">ফটো গ্যালারি</a></div><div className="footer-links"><strong>অংশগ্রহণ</strong><a href="#donation">অনুদান</a><a href="#advertisement">বিজ্ঞাপন</a><a href="#contact">যোগাযোগ</a><Link href="/admin">প্রশাসনিক প্যানেল</Link></div><div className="footer-note"><span className="footer-lotus"><Flower2 size={38} /></span><strong>শুভ সরস্বতী পূজা</strong><small>জ্ঞান ও আলোর জয় হোক</small></div></div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} অফিসার্স ক্লাব ঢাকা · ডেমো ওয়েব পোর্টাল</span><span>ডিজাইন কনসেপ্ট ও ডেভেলপমেন্ট ডেমো</span></div>
        <div className="footer-credit">ভবনের ছবি: <a href="https://commons.wikimedia.org/wiki/File:Officers%27_Club,_Dhaka.jpg" target="_blank" rel="noreferrer">Alvi Rahman Khan / Wikimedia Commons</a> · <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">CC BY-SA 3.0</a></div>
      </footer>

      {noticeOpen && <div className="modal-backdrop" onClick={() => setNoticeOpen(false)}><div className="notice-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setNoticeOpen(false)} aria-label="বন্ধ করুন"><X /></button><div className="modal-heading"><span className="section-kicker">মূল নথি</span><h2>{notices[0]?.title || "সভা নোটিশ — ২০২৭ সালের সরস্বতী পূজা"}</h2><p>{notices[0]?.subtitle || "প্রকাশের তারিখ: ১২ নভেম্বর ২০২৬ · সভার তারিখ: ১৪ নভেম্বর ২০২৬"}</p></div><img src={notices[0]?.image || "/assets/notice-2027.webp"} alt="অফিসার্স ক্লাব ঢাকা পূজা উদযাপন কমিটির সভার নোটিশ" /><a className="btn btn-primary" href="/assets/notice-2027.webp" target="_blank">নোটিশ পূর্ণ আকারে দেখুন <ArrowUpRight size={16} /></a></div></div>}
    </main>
  );
}
