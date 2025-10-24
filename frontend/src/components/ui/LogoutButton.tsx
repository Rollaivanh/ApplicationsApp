"use client";

import { useAuth } from "@/context/AuthContext";

export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="text-sm font-medium text-red-600 hover:underline"
    >
      Cerrar sesión
    </button>
  );
}
