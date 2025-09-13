"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import TimetablePage from "@/components/Timetabel";

// your existing code

export default function TimeTabelProtected() {
  return (
    <ProtectedRoute roles={["ADMIN"]}>
    <TimetablePage />
    </ProtectedRoute>
  );
}