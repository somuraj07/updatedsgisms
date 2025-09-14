"use client";

import HostelForm from "@/components/HostelComplaint";
import { ProtectedRoute } from "@/components/ProtectedRoute";

 // your existing code

export default function HostelProtected() {
  return (
    <ProtectedRoute roles={["STUDENT"]}>
      <HostelForm />
    </ProtectedRoute>
  );
}