"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register as registerApi } from "@/app/auth/auth.service";
import { useAuth } from "@/context/AuthContext"; // ✅ usamos el contexto global

export default function RegisterForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // ✅ obtenemos login del AuthContext
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await registerApi(fullname, email, password);
      login(res.access_token); // guarda el token en el contexto + localStorage
      router.push("/dashboard"); // redirige al dashboard
    } catch (err) {
      console.error(err);
      alert("Error al registrarse");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        placeholder="Nombre completo"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo electrónico"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
      />
      <button type="submit">Registrarse</button>
    </form>
  );
}
