export async function getPostulations() {
  const data = await fetch("http://localhost:4000/api/postulations", {
    cache: "no-store",
  });
  return data.json();
}

export async function getPostulation(id: string) {
  const data = await fetch(`http://localhost:4000/api/postulations/ ${id}`);
  return data.json();
}

export async function createPostulation(postulationData: any) {
  const payload = {
    ...postulationData,
    interviewAt:
      postulationData.interviewAt && postulationData.interviewAt.trim() !== ""
        ? `${postulationData.interviewAt}T00:00:00.000Z`
        : new Date().toISOString(), // 🔹 Si no la elige, usa fecha actual
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
