"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/admin-auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: "Login failed" }));
      setError(data.error || "Login failed");
      return;
    }

    router.push("/learning/admin");
    router.refresh();
  };

  return (
    <div className="card learning-journal-page">
      <Link href="/learning" className="back-link">&larr; Back to Life Log</Link>
      <div className="section" style={{ maxWidth: 520, width: "100%" }}>
        <h2>Admin Sign In</h2>
        <p className="subtitle">Private area for managing weekly journal entries.</p>
        <form onSubmit={onSubmit} className="journal-admin-form">
          <label>
            Username
            <input value={username} onChange={(e) => setUsername(e.target.value)} required />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          {error && <p style={{ color: "#c62828", margin: 0 }}>{error}</p>}
          <button type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</button>
        </form>
      </div>
    </div>
  );
}
