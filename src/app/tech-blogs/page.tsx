import { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Tech Blogs | Techbits",
  description: "Read the latest technical deep dives, tutorials, and insights on backend architecture, frontend design, and full-stack development.",
  openGraph: {
    title: "Tech Blogs | Techbits",
    description: "Read the latest technical deep dives, tutorials, and insights on backend architecture, frontend design, and full-stack development.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Blogs | Techbits",
    description: "Read the latest technical deep dives, tutorials, and insights.",
  },
};

export default function Page() {
  return <ClientPage />;
}
