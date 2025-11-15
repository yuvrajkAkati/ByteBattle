"use client";

import { useUser } from "@clerk/clerk-react";
import { ADMIN_EMAILS } from "@/lib/admin";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminGuard({ children }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    // Not signed in → redirect
    if (!user) {
      router.replace("/home");
      return;
    }

    // Get user email
    const email = user.primaryEmailAddress?.emailAddress;

    // Not admin → redirect
    if (!email || !ADMIN_EMAILS.includes(email)) {
      router.replace("/admin/home");
    }

  }, [user, isLoaded, router]);

  if (!isLoaded) {
    return <p className="text-gray-400 p-6">Loading Admin...</p>;
  }

  return <>{children}</>;
}
