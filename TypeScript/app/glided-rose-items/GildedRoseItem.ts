import { Item } from "../Item";

export abstract class GildedRoseItem {
  get name() { return this.item.name; }
  get sellIn() { return this.item.sellIn; }
  get quality() { return this.item.quality; }

  protected item: Item;

  constructor(item: Item);
  constructor(name: string, sellIn: number, quality: number);
  constructor(...args: [Item] | [string, number, number]) {
    if (args.length === 1) {
      const [item] = args;
      this.item = item;
    }
    else {
      const [name, sellIn, quality] = args;
      this.item = new Item(name, sellIn, quality);
    }
  }

  abstract updateQuality(): void;
}
