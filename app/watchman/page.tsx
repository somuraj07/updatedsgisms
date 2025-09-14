"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import WatchmanPage from "@/components/Watchman";

 // your existing code

export default function WatchmanProtected() {
  return (
    <ProtectedRoute roles={["WATCHMAN"]}>
        <WatchmanPage/>
    </ProtectedRoute>
  );
}