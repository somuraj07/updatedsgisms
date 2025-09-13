"use client";

import AttendancePage from "@/components/Attendence";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// your existing code

export default function AttendenceProtected() {
  return (
    <ProtectedRoute roles={["ADMIN"]}>
        <AttendancePage />
    </ProtectedRoute>
  );
}