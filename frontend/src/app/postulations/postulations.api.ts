export async function getPostulations() {
  try {
    const res = await fetch("http://localhost:4000/api/postulations", {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Error al obtener postulaciones:", errorText);
      return [];
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.warn("⚠️ Respuesta inesperada de postulations:", data);
      return [];
    }

    return data;
  } catch (error) {
    console.error("❌ Error de red o parsing en getPostulations:", error);
    return [];
  }
}

export async function getPostulation(id: string) {
  const data = await fetch(`http://localhost:4000/api/postulations/ ${id}`);
  return data.json();
}

export async function createPostulation(postulationData: any) {
  const payload = {
    ...postulationData,
    fechaEntrevista:
      postulationData.fechaEntrevista &&
      postulationData.fechaEntrevista.trim() !== ""
        ? new Date(postulationData.fechaEntrevista).toISOString() // ✅ formato válido
        : null, // ✅ sin fecha -> null
  };

  const res = await fetch("http://localhost:4000/api/postulations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

export async function deletePostulation(id: string) {
  const res = await fetch(`http://localhost:4000/api/postulations/ ${id}`, {
    method: "DELETE",
  });
  return await res.json();
}

export async function updatePostulation(id: string, newPostulation: any) {
  const res = await fetch(`http://localhost:4000/api/postulations/ ${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },

    body: JSON.stringify(newPostulation),
    cache: "no-store",
  });
  return await res.json();
}

export async function getPostulationMetrics() {
  const res = await fetch("http://localhost:4000/api/postulations/metrics", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Error al obtener métricas");
  return res.json();
}
