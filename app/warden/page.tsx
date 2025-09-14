"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import WardenHostelPage from "@/components/Warden";

 // your existing code

export default function DetailsProtected() {
  return (
    <ProtectedRoute roles={["WARDEN"]}>
        <WardenHostelPage/>
    </ProtectedRoute>
  );
}