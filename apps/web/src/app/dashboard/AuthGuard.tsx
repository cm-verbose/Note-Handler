"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
    } else {
      setTimeout(() => {
        setIsLoading(false);
      });
    }
  }, [router]);

  if (isLoading) {
    return <div></div>;
  }

  return <section>{children}</section>;
}
