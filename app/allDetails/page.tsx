"use client";

import HostelDetailsPage from "@/components/Alldetails";
import { ProtectedRoute } from "@/components/ProtectedRoute";

 // your existing code

export default function DetailsProtected() {
  return (
    <ProtectedRoute roles={["ADMIN"]}>
        <HostelDetailsPage/>
    </ProtectedRoute>
  );
}