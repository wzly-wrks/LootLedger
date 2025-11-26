import { InventoryItem, InsertInventoryItem } from "@shared/schema";

const STORAGE_KEY = "whatstock_inventory";

function generateId(): string {
  return crypto.randomUUID();
}

function getItems(): InventoryItem[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    const items = JSON.parse(data);
    // Convert date strings back to Date objects
    return items.map((item: any) => ({
      ...item,
      createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
      soldDate: item.soldDate ? new Date(item.soldDate) : null,
    }));
  } catch {
    return [];
  }
}

function saveItems(items: InventoryItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export const localStorageApi = {
  // Get all inventory items
  getAllInventoryItems(): InventoryItem[] {
    return getItems();
  },

  // Get single inventory item
  getInventoryItem(id: string): InventoryItem | undefined {
    return getItems().find((item) => item.id === id);
  },

  // Create new inventory item
  createInventoryItem(insertItem: InsertInventoryItem): InventoryItem {
    const items = getItems();
    const newItem: InventoryItem = {
      id: generateId(),
      title: insertItem.title,
      category: insertItem.category,
      condition: insertItem.condition,
      purchasePrice: insertItem.purchasePrice.toString(),
      sellingPrice: insertItem.sellingPrice.toString(),
      quantity: insertItem.quantity ?? 1,
      status: insertItem.status || "in_stock",
      subCategory: insertItem.subCategory ?? null,
      weight: insertItem.weight != null ? insertItem.weight.toString() : null,
      description: insertItem.description ?? null,
      imageUrl: insertItem.imageUrl ?? null,
      tags: insertItem.tags ?? null,
      buyerName: insertItem.buyerName ?? null,
      buyerEmail: insertItem.buyerEmail ?? null,
      soldDate: insertItem.soldDate ?? null,
      isGiveaway: insertItem.isGiveaway ?? 0,
      createdAt: new Date(),
    };
    items.push(newItem);
    saveItems(items);
    return newItem;
  },

  // Update inventory item
  updateInventoryItem(id: string, updates: Partial<InventoryItem>): InventoryItem | undefined {
    const items = getItems();
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return undefined;

    const updatedItem = { ...items[index], ...updates };
    items[index] = updatedItem;
    saveItems(items);
    return updatedItem;
  },

  // Delete inventory item
  deleteInventoryItem(id: string): boolean {
    const items = getItems();
    const filtered = items.filter((item) => item.id !== id);
    if (filtered.length === items.length) return false;
    saveItems(filtered);
    return true;
  },

  // Mark item as sold
  markItemAsSold(id: string, buyerName: string, buyerEmail: string): InventoryItem | undefined {
    return this.updateInventoryItem(id, {
      status: "sold",
      buyerName,
      buyerEmail,
      soldDate: new Date(),
    });
  },

  // Unmark item as sold
  unmarkItemAsSold(id: string): InventoryItem | undefined {
    return this.updateInventoryItem(id, {
      status: "in_stock",
      buyerName: null,
      buyerEmail: null,
      soldDate: null,
    });
  },

  // Export data as JSON
  exportData(): string {
    return JSON.stringify(getItems(), null, 2);
  },

  // Import data from JSON
  importData(jsonString: string): boolean {
    try {
      const items = JSON.parse(jsonString);
      if (Array.isArray(items)) {
        saveItems(items);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  // Clear all data
  clearAll(): void {
    localStorage.removeItem(STORAGE_KEY);
  },
};
