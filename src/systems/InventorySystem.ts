export enum ItemType {
  WEAPON,
  ARMOR,
  CONSUMABLE,
  KEY_ITEM
}

export type ItemConfig = {
  id: string;
  name: string;
  type: ItemType;
  value: number;
  usable: boolean;
  effect?: (target: any) => void;
};

export class Item {
  private _id: string;
  private _name: string;
  private _type: ItemType;
  private _value: number;
  private _usable: boolean;
  private _effect?: (target: any) => void;
  
  constructor(config: ItemConfig) {
    this._id = config.id;
    this._name = config.name;
    this._type = config.type;
    this._value = config.value;
    this._usable = config.usable;
    this._effect = config.effect;
  }
  
  public get id(): string {
    return this._id;
  }
  
  public get name(): string {
    return this._name;
  }
  
  public get type(): ItemType {
    return this._type;
  }
  
  public get value(): number {
    return this._value;
  }
  
  public get usable(): boolean {
    return this._usable;
  }
  
  public use(target: any): boolean {
    if (!this._usable || !this._effect) return false;
    
    this._effect(target);
    return true;
  }
}

export class InventorySystem {
  private _items: Map<string, number>; // item id -> quantity
  private _capacity: number;
  
  constructor(capacity = 18) { // Default 6x3 grid
    this._items = new Map<string, number>();
    this._capacity = capacity;
  }
  
  public addItem(item: Item, quantity = 1): boolean {
    // Check if inventory is full
    if (this.countUniqueItems() >= this._capacity && !this._items.has(item.id)) {
      return false;
    }
    
    // Update quantity if item already exists, otherwise add new entry
    const currentQuantity = this._items.get(item.id) || 0;
    this._items.set(item.id, currentQuantity + quantity);
    
    return true;
  }
  
  public removeItem(itemId: string, quantity = 1): boolean {
    const currentQuantity = this._items.get(itemId);
    
    if (!currentQuantity) return false;
    
    if (currentQuantity <= quantity) {
      // Remove the item completely
      this._items.delete(itemId);
    } else {
      // Decrease the quantity
      this._items.set(itemId, currentQuantity - quantity);
    }
    
    return true;
  }
  
  public getItemQuantity(itemId: string): number {
    return this._items.get(itemId) || 0;
  }
  
  public hasItem(itemId: string): boolean {
    return this._items.has(itemId);
  }
  
  public countUniqueItems(): number {
    return this._items.size;
  }
  
  public getTotalItems(): number {
    let total = 0;
    for (const quantity of this._items.values()) {
      total += quantity;
    }
    return total;
  }
  
  public get capacity(): number {
    return this._capacity;
  }
  
  public getItemIds(): string[] {
    return Array.from(this._items.keys());
  }
}
