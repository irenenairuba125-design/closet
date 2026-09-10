"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete "${name}"? This can't be undone.`)) return;
    setDeleting(true);
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    setDeleting(false);
    if (res.ok) router.refresh();
    else alert("Failed to delete product.");
  };

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="btn btn-sm btn-outline-danger"
      title="Delete"
    >
      <i className="bi bi-trash" />
    </button>
  );
}
