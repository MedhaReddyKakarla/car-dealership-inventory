const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000";


// =========================================================
// COMMON REQUEST HANDLER
// =========================================================

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("access_token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers,
    },
  );

  // -------------------------------------------------------
  // UNAUTHORIZED
  // -------------------------------------------------------

  if (response.status === 401) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    window.location.href = "/login";

    throw new Error(
      "Your session has expired.",
    );
  }

  // -------------------------------------------------------
  // OTHER ERRORS
  // -------------------------------------------------------

  if (!response.ok) {
    let message =
      "Something went wrong.";

    try {
      const data =
        await response.json();

      message =
        data.detail || message;
    } catch {
      // Ignore JSON parsing errors.
    }

    throw new Error(message);
  }

  // -------------------------------------------------------
  // NO CONTENT
  // -------------------------------------------------------

  if (response.status === 204) {
    return null;
  }

  // -------------------------------------------------------
  // JSON RESPONSE
  // -------------------------------------------------------

  return response.json();
}


// =========================================================
// AUTHENTICATION
// =========================================================

export async function registerUser(
  userData,
) {
  return request(
    "/api/auth/register",
    {
      method: "POST",
      body: JSON.stringify(userData),
    },
  );
}


export async function loginUser(
  credentials,
) {
  return request(
    "/api/auth/login",
    {
      method: "POST",
      body: JSON.stringify(credentials),
    },
  );
}


// =========================================================
// VEHICLES - GET
// =========================================================

export async function getVehicles(
  page = 1,
  limit = 10,
) {
  return request(
    `/api/vehicles?page=${page}&limit=${limit}`,
    {
      method: "GET",
    },
  );
}


// =========================================================
// VEHICLES - SEARCH
// =========================================================

export async function searchVehicles(
  params = {},
) {
  const query =
    new URLSearchParams();

  if (params.query) {
    query.append(
      "query",
      params.query,
    );
  }

  if (params.category) {
    query.append(
      "category",
      params.category,
    );
  }

  if (
    params.minPrice !== undefined &&
    params.minPrice !== ""
  ) {
    query.append(
      "min_price",
      params.minPrice,
    );
  }

  if (
    params.maxPrice !== undefined &&
    params.maxPrice !== ""
  ) {
    query.append(
      "max_price",
      params.maxPrice,
    );
  }

  const queryString =
    query.toString();

  return request(
    `/api/vehicles${
      queryString
        ? `/search?${queryString}`
        : "/search"
    }`,
    {
      method: "GET",
    },
  );
}


// =========================================================
// VEHICLES - CREATE
// =========================================================

export async function createVehicle(
  vehicleData,
) {
  return request(
    "/api/vehicles",
    {
      method: "POST",
      body: JSON.stringify(
        vehicleData,
      ),
    },
  );
}


// =========================================================
// VEHICLES - UPDATE
// =========================================================

export async function updateVehicle(
  vehicleId,
  vehicleData,
) {
  return request(
    `/api/vehicles/${vehicleId}`,
    {
      method: "PUT",
      body: JSON.stringify(
        vehicleData,
      ),
    },
  );
}


// =========================================================
// VEHICLES - PURCHASE
// =========================================================

export async function purchaseVehicle(
  vehicleId,
) {
  return request(
    `/api/vehicles/${vehicleId}/purchase`,
    {
      method: "POST",
    },
  );
}


// =========================================================
// VEHICLES - RESTOCK
// =========================================================

export async function restockVehicle(
  vehicleId,
  quantity,
) {
  return request(
    `/api/vehicles/${vehicleId}/restock`,
    {
      method: "POST",
      body: JSON.stringify({
        quantity: Number(quantity),
      }),
    },
  );
}


// =========================================================
// VEHICLES - DELETE
// =========================================================

export async function deleteVehicle(
  vehicleId,
) {
  return request(
    `/api/vehicles/${vehicleId}`,
    {
      method: "DELETE",
    },
  );
}


// =========================================================
// LOGOUT
// =========================================================

export function logout() {
  localStorage.removeItem(
    "access_token",
  );

  localStorage.removeItem(
    "user",
  );

  window.location.href =
    "/login";
}