import { AgedBrie } from "./glided-rose-items/AgedBrie";
import { BackstagePass } from "./glided-rose-items/BackstagePass";
import { ExpirableItem } from "./glided-rose-items/ExpirableItem";
import { GildedRoseItem } from "./glided-rose-items/GildedRoseItem";
import { Sulfuras } from "./glided-rose-items/Sulfuras";
import { Item } from "./Item";

export class GildedRoseItemFactory {
  create(item: Item): GildedRoseItem {
    if (item.name === "Aged Brie") return new AgedBrie(item.sellIn, item.quality)
    if (item.name === "Backstage passes to a TAFKAL80ETC concert") return new BackstagePass(item.sellIn, item.quality)
    if (item.name === "Sulfuras, Hand of Ragnaros") return new Sulfuras(item.sellIn)

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
