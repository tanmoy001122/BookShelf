const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function handleResponse(response) {
  let data;
  try {
    data = await response.json();
  } catch (err) {
    data = null;
  }

  if (!response.ok) {
    const message = data && data.error ? data.error : `HTTP error: ${response.status} ${response.statusText}`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export async function getBooks() {
  const response = await fetch(`${API_BASE}/books`, {
    headers: {
      'Accept': 'application/json',
    },
  });
  return handleResponse(response);
}

export async function createBook({ title, author }) {
  const response = await fetch(`${API_BASE}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ title, author }),
  });
  return handleResponse(response);
}

export async function markBookAsRead(id) {
  const response = await fetch(`${API_BASE}/books/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
    },
  });
  return handleResponse(response);
}

export async function deleteBook(id) {
  const response = await fetch(`${API_BASE}/books/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
    },
  });
  return handleResponse(response);
}