"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { finished, isAuthenticated } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (finished && !isAuthenticated) {
      push("/");
    }
  }, [finished, isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}