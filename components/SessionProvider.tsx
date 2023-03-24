"use client";

import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";
import { RecoilRoot } from "recoil";

type Props = {
  children: React.ReactNode;
  session: Session | null;
};

export function SessionProvider({ children, session }: Props) {
  return (
    <RecoilRoot>
      <Provider>{children}</Provider>
    </RecoilRoot>
  );
}
