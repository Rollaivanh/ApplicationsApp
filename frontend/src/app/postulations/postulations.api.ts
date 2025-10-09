export async function getPostulations() {
  const data = await fetch("http://localhost:4000/api/postulations", {
    cache: "no-store",
  });
  return data.json();
}

export async function createPostulation(postulationData: any) {
  const formattedData = {
    ...postulationData,
    interviewAt: postulationData.interviewAt
      ? new Date(`${postulationData.interviewAt}T00:00:00Z`).toISOString()
      : null,
  };

  const res = await fetch("http://localhost:4000/api/postulations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formattedData),
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
