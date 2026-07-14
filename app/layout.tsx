import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LiFR → TPAMI | Submission Roadmap",
  description: "LiFR Anything TPAMI extension roadmap: method, experiments, dataset, and writing from July 14 to August 31.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
