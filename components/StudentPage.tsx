"use client";

import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useAuth } from "@/app/context/AuthContext";
import { User, Mail, Building2, CheckCircle } from "lucide-react";

type Attendance = {
  id: string;
  monthh: string;
  percentage: string;
};

type Complaint = {
  id: string;
  reason: string;
  photo?: string;
  createdAt: string;
};

type Student = {
  id: string;
  name: string;
  email: string;
  department: string;
  complaintsAsStudent?: Complaint[];
};

export default function StudentPage() {
  const { user } = useAuth();
  const [student, setStudent] = useState<Student | null>(null);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === undefined) return;
    const token = localStorage.getItem("token");
    if (!token || !user) {
      window.location.replace("/user/signin");
      return;
    }

    const fetchData = async () => {
      try {
        const resStudent = await fetch(`/api/student/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resStudent.ok) throw new Error("Unauthorized");
        const studentData = await resStudent.json();
        setStudent(studentData);

        try {
          const resAttendance = await fetch(
            `/api/attendence/student/${studentData.id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (resAttendance.ok) {
            const attendanceData = await resAttendance.json();
            setAttendance(attendanceData);
          } else {
            setAttendance([]);
          }
        } catch {
          setAttendance([]);
        }

        setLoading(false);
      } catch {
        window.location.replace("/user/signin");
      }
    };

    fetchData();
  }, [user]);

  if (loading || user === undefined) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading student info...
      </div>
    );
  }

  if (!student) return null;

  const totalPercentage =
    attendance.length > 0
      ? (
          attendance.reduce((acc, curr) => acc + parseFloat(curr.percentage), 0) /
          attendance.length
        ).toFixed(2)
      : "N/A";

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center p-4">
      <div className="w-full max-w-md rounded-3xl p-6 space-y-6 bg-gradient-to-br from-purple-600 to-purple-200 shadow-xl">
        {/* Student Info */}
        <div className="space-y-3 text-white">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <User size={24} /> {student.name}
          </h1>
          <p className="flex items-center gap-2 text-sm">
            <Mail size={18} /> {student.email}
          </p>
          <p className="flex items-center gap-2 text-sm">
            <Building2 size={18} /> {student.department}
          </p>
          <p className="flex items-center gap-2 font-semibold text-sm">
            <CheckCircle size={18} /> Attendance: {totalPercentage}%
          </p>
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center mt-4">
          <h2 className="font-semibold text-white mb-2">Your QR Code</h2>
          <div className="p-4 bg-white rounded-xl">
            <QRCodeCanvas value={student.email} size={150} />
          </div>
        </div>

        {/* Attendance Table */}
        <div className="mt-6 bg-white p-4 rounded-xl shadow-sm">
          <h2 className="font-semibold text-purple-700 mb-2">Attendance</h2>
          {attendance.length > 0 ? (
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-purple-100">
                <tr>
                  <th className="px-3 py-2 text-left">Month</th>
                  <th className="px-3 py-2 text-left">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((a) => (
                  <tr key={a.id} className="border-t">
                    <td className="px-3 py-2">{a.monthh}</td>
                    <td className="px-3 py-2">{a.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-700 text-sm">No attendance records yet.</p>
          )}
        </div>

        {/* Complaints */}
        <div className="mt-6 bg-white p-4 rounded-xl shadow-sm">
          <h2 className="font-semibold text-purple-700 mb-2">
            Complaints Against You
          </h2>
          {student.complaintsAsStudent && student.complaintsAsStudent.length > 0 ? (
            <div className="flex flex-col gap-3">
              {student.complaintsAsStudent.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-3 border border-purple-200 px-3 py-2 rounded-lg bg-purple-50 shadow-sm"
                >
                  {c.photo && (
                    <img
                      src={c.photo}
                      alt="Evidence"
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  )}
                  <div className="flex flex-col">
                    <p className="font-medium text-black text-sm">{c.reason}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {new Date(c.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700 text-center text-sm">No complaints yet 🎉</p>
          )}
        </div>
      </div>
    </div>
  );
}
