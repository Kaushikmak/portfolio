import { ReactNode } from "react";
import { AdminTokenProvider } from "./AdminTokenProvider";

export default function AdminLayout({ children }: { children: ReactNode }) {
  // Read the secret on the server
  const token = process.env.ADMIN_SESSION_SECRET;

  if (!token) {
    return <div>Admin auth not configured.</div>;
  }

  // Pass it safely to the client via context Provider.
  // This is safe because ONLY authenticated requests make it past middleware.ts,
  // so the token is only sent to authorized clients.
  return (
    <AdminTokenProvider token={token}>
      {children}
    </AdminTokenProvider>
  );
}
