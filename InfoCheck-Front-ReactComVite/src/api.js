// src/api.js
// Allow overriding the backend URL via env; fallback to local Spring Boot default.
const envBaseUrl = typeof import.meta !== "undefined" ? import.meta.env?.VITE_API_BASE_URL : null;
export const API_BASE_URL = (envBaseUrl || "http://localhost:53842").replace(/\/$/, "");

export async function apiGet(path) {
  const resp = await fetch(`${API_BASE_URL}${path}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  let data;
  try {
    data = await resp.json();
  } catch {
    data = null;
  }

  if (!resp.ok) {
    const msg = data?.message || data || `Erro HTTP: ${resp.status}`;
    const error = new Error(msg);
    error.response = { status: resp.status, data };
    throw error;
  }

  return data;
}

export async function apiPost(path, body) {
  const resp = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  let data;
  try {
    data = await resp.json();
  } catch {
    data = null;
  }

  if (!resp.ok) {
    const msg = data?.message || data || `Erro HTTP: ${resp.status}`;
    const error = new Error(msg);
    error.response = { status: resp.status, data };
    throw error;
  }

  return data;
}
