import Header from "@/components/Header";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import "@/styles/globals.css";
import { SessionProvider } from "@/components/SessionProvider";
import LoginComponent from "@/components/LoginComponent";
// import "../styles/globals.css";
export const metadata = {
  title: "Insta 2.0 REVISION",
  description: "Generated by YW",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <>
              <Header />

              <LoginComponent />
            </>
          ) : (
            <div className="bg-gray-200 h-screen overflow-y-scroll ">
              <Header />

              {children}
            </div>
          )}
          {/* scrollbar-hidr */}
        </SessionProvider>
      </body>
    </html>
  );
}
