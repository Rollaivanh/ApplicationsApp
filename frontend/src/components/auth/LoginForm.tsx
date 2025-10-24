"use client";

import { useState } from "react";
import { login as loginApi } from "@/app/auth/auth.service";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // ✅ contexto correcto

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // ✅ usamos el AuthContext
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await loginApi(email, password);
      login(res.access_token); // guarda el token en contexto + localStorage
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}
