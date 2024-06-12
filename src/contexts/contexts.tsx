"use client";

import { LoadingProvider } from "./loading/context";

export const ContextsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <LoadingProvider>{children}</LoadingProvider>;
};
