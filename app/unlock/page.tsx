"use client";

import { FormEvent, useState } from "react";

export default function UnlockPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/access/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        cache: "no-store",
      });
      if (!response.ok) {
        const result = await response.json();
        setError(result.error || "Unable to unlock website.");
        return;
      }
      window.location.replace("/");
    } catch {
      setError("Connection failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "linear-gradient(140deg,#fff9ec,#f7ead9 60%,#f4e3cf)", fontFamily: "system-ui,sans-serif" }}>
      <section style={{ width: "100%", maxWidth: 420, background: "#fff", borderRadius: 20, padding: "38px 32px", boxShadow: "0 15px 55px #56251920", textAlign: "center", border: "1px solid #e9d7b8" }}>
        <div aria-hidden="true" style={{ fontSize: 42, color: "#8b2434" }}>✦</div>
        <h1 style={{ color: "#75273a", fontSize: 27, margin: "10px 0 8px" }}>OCD Saraswati Puja</h1>
        <p style={{ color: "#655c55", marginBottom: 28 }}>Private demo preview · পাসওয়ার্ড দিয়ে প্রবেশ করুন</p>
        <form onSubmit={submit}>
          <label htmlFor="access-password" style={{ display: "block", textAlign: "left", color: "#463b35", fontWeight: 600, marginBottom: 8 }}>Access password</label>
          <input id="access-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter demo password" style={{ width: "100%", boxSizing: "border-box", border: "1px solid #cdbfb3", borderRadius: 9, padding: "13px 14px", fontSize: 16, color: "#342c27", background: "white" }} />
          {error && <p role="alert" style={{ color: "#a21e30", textAlign: "left", fontSize: 14, margin: "12px 0 0" }}>{error}</p>}
          <button type="submit" disabled={busy} style={{ width: "100%", background: "#842b3d", color: "white", border: 0, borderRadius: 9, padding: 14, fontSize: 16, fontWeight: 650, cursor: busy ? "wait" : "pointer", marginTop: 18 }}>{busy ? "Checking…" : "Unlock Website"}</button>
        </form>
        <p style={{ color: "#85776c", fontSize: 12, marginTop: 22 }}>Restricted preview for authorized visitors only.</p>
      </section>
    </main>
  );
}
