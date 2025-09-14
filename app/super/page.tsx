"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import AdminHostelPage from "@/components/Super";


export default function SuperProtected() {
  return (
    <ProtectedRoute roles={["SUPER"]}>
    <AdminHostelPage />
    </ProtectedRoute>
  );
}