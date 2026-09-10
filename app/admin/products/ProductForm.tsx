"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PRODUCT_COLORS } from "@/lib/colors";

const SECTIONS = ["Men", "Women", "Unisex", "Sports"];
const SIZES = ["M", "L", "XL", "2XL", "3XL", "4XL"];

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  section: string;
  sizes: string[];
  colors: string[];
};

export default function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const isEdit = !!product;

  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product?.price?.toString() ?? "");
  const [image, setImage] = useState(product?.image ?? "");
  const [section, setSection] = useState(product?.section ?? "Men");
  const [sizes, setSizes] = useState<string[]>(product?.sizes ?? [...SIZES]);
  const [colors, setColors] = useState<string[]>(product?.colors ?? []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const toggleSize = (s: string) => {
    setSizes((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));
  };

  const toggleColor = (name: string) => {
    setColors((cur) => (cur.includes(name) ? cur.filter((x) => x !== name) : [...cur, name]));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !description || !price || !image) {
      setError("Please fill in all required fields.");
      return;
    }

    setSaving(true);
    const payload = { name, description, price: Number(price), image, section, sizes, colors };

    const res = await fetch(isEdit ? `/api/products/${product!.id}` : "/api/products", {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong. Please try again.");
      return;
    }

    router.push("/admin/products");
    router.refresh();
  };

  return (
    <form onSubmit={submit} className="row g-4" style={{ maxWidth: 760 }}>
      {error && (
        <div className="col-12">
          <div className="alert alert-danger py-2" style={{ fontSize: 13 }}>
            {error}
          </div>
        </div>
      )}

      <div className="col-12">
        <label className="form-label fw-bold small">Product name</label>
        <input
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Silk 100% Limited Collection"
          required
        />
      </div>

      <div className="col-12">
        <label className="form-label fw-bold small">Description</label>
        <textarea
          className="form-control"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Premium cloth, fit, material, delivery details..."
          required
        />
      </div>

      <div className="col-6 col-md-4">
        <label className="form-label fw-bold small">Price (Shs)</label>
        <input
          type="number"
          min={0}
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="35000"
          required
        />
      </div>

      <div className="col-6 col-md-4">
        <label className="form-label fw-bold small">Section</label>
        <select className="form-select" value={section} onChange={(e) => setSection(e.target.value)}>
          {SECTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="col-12 col-md-4">
        <label className="form-label fw-bold small">Image URL</label>
        <input
          className="form-control"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://..."
          required
        />
      </div>

      {image && (
        <div className="col-12">
          <img
            src={image}
            alt=""
            style={{ width: 120, height: 150, objectFit: "cover", borderRadius: 8 }}
            onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
          />
        </div>
      )}

      <div className="col-12">
        <label className="form-label fw-bold small d-block">Sizes in stock</label>
        <div className="d-flex flex-wrap gap-2">
          {SIZES.map((s) => {
            const active = sizes.includes(s);
            return (
              <button
                type="button"
                key={s}
                onClick={() => toggleSize(s)}
                style={{
                  width: 56,
                  height: 44,
                  borderRadius: 10,
                  border: active ? "2px solid #000" : "1px solid #ccc",
                  background: active ? "#000" : "#fff",
                  color: active ? "#fff" : "#000",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="col-12">
        <label className="form-label fw-bold small d-block">Color variants</label>
        <div className="d-flex flex-wrap gap-3">
          {PRODUCT_COLORS.map((c) => {
            const active = colors.includes(c.name);
            return (
              <button
                type="button"
                key={c.name}
                onClick={() => toggleColor(c.name)}
                className="d-flex flex-column align-items-center gap-1 bg-transparent border-0"
                style={{ width: 64 }}
                title={c.name}
              >
                <span
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: c.hex,
                    border: c.hex === "#FFFFFF" ? "1px solid #ccc" : "1px solid rgba(0,0,0,.1)",
                    outline: active ? "2px solid #FF6A00" : "none",
                    outlineOffset: 2,
                    boxShadow: active ? "0 0 0 1px #FF6A00" : "none",
                  }}
                />
                <small style={{ fontSize: 9, fontWeight: active ? 700 : 500 }}>{c.name}</small>
              </button>
            );
          })}
        </div>
      </div>

      <div className="col-12 d-flex gap-2 mt-2">
        <button type="submit" disabled={saving} className="btn btn-dark fw-bold px-4" style={{ borderRadius: 50 }}>
          {saving ? "Saving..." : isEdit ? "Save changes" : "Create product"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="btn btn-outline-dark fw-bold px-4"
          style={{ borderRadius: 50 }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
