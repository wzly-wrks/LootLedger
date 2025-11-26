import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { InventoryItem, InsertInventoryItem } from "@shared/schema";
import { localStorageApi } from "./storage";

// Check if we're in Tauri (no server) or web mode (has server)
const isTauri = typeof window !== 'undefined' && '__TAURI__' in window;

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Helper to create a Response object from data
function createJsonResponse(data: unknown, status = 200): Response {
  const body = JSON.stringify(data);
  return new Response(body, {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// Handle requests locally using localStorage
function handleLocalRequest(method: string, url: string, data?: unknown): Response {
  const path = url.replace(/^\/api/, "");
  
  // Route matching
  if (path === "/inventory" && method === "GET") {
    const items = localStorageApi.getAllInventoryItems();
    return createJsonResponse(items);
  }
  
  if (path === "/inventory" && method === "POST") {
    const item = localStorageApi.createInventoryItem(data as InsertInventoryItem);
    return createJsonResponse(item);
  }
  
  // Match /inventory/:id
  const inventoryMatch = path.match(/^\/inventory\/([^/]+)$/);
  if (inventoryMatch) {
    const id = inventoryMatch[1];
    
    if (method === "GET") {
      const item = localStorageApi.getInventoryItem(id);
      if (!item) return createJsonResponse({ error: "Not found" }, 404);
      return createJsonResponse(item);
    }
    
    if (method === "PATCH" || method === "PUT") {
      const item = localStorageApi.updateInventoryItem(id, data as Partial<InventoryItem>);
      if (!item) return createJsonResponse({ error: "Not found" }, 404);
      return createJsonResponse(item);
    }
    
    if (method === "DELETE") {
      const success = localStorageApi.deleteInventoryItem(id);
      if (!success) return createJsonResponse({ error: "Not found" }, 404);
      return createJsonResponse({ success: true });
    }
  }
  
  // Match /inventory/:id/sold
  const soldMatch = path.match(/^\/inventory\/([^/]+)\/sold$/);
  if (soldMatch && method === "POST") {
    const id = soldMatch[1];
    const { buyerName, buyerEmail } = data as { buyerName: string; buyerEmail: string };
    const item = localStorageApi.markItemAsSold(id, buyerName, buyerEmail);
    if (!item) return createJsonResponse({ error: "Not found" }, 404);
    return createJsonResponse(item);
  }
  
  // Match /inventory/:id/unsold
  const unsoldMatch = path.match(/^\/inventory\/([^/]+)\/unsold$/);
  if (unsoldMatch && method === "POST") {
    const id = unsoldMatch[1];
    const item = localStorageApi.unmarkItemAsSold(id);
    if (!item) return createJsonResponse({ error: "Not found" }, 404);
    return createJsonResponse(item);
  }
  
  // Default: not found
  return createJsonResponse({ error: "Not found" }, 404);
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // If in Tauri mode, use localStorage
  if (isTauri) {
    return handleLocalRequest(method, url, data);
  }

  // Otherwise use fetch for server
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey.join("/") as string;
    
    try {
      const res = await apiRequest("GET", url);
      return await res.json();
    } catch (error) {
      if (unauthorizedBehavior === "returnNull") {
        return null;
      }
      throw error;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
