import { ExpirableItem } from "./glided-rose-items/ExpirableItem";
import { GildedRoseItem } from "./glided-rose-items/GildedRoseItem";
import { Item } from "./Item";

export class GildedRoseItemFactory {
  create(item: Item): GildedRoseItem {
    return new ExpirableItem(item)
  }
}

export class GildedRose {
  items: Array<GildedRoseItem>;

  constructor(items: Array<Item> = [], itemFactory: GildedRoseItemFactory = new GildedRoseItemFactory()) {
    this.items = items.map((item) => itemFactory.create(item));
  }

  updateQuality() {
    this.items.forEach((item) => item.updateQuality())

    return this.items
  }
}
