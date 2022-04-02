import { GildedRoseItem } from "./GildedRoseItem";
import { Item } from "../Item";


export class AgedBrie extends GildedRoseItem {
  constructor(sellIn: number, quality: number) {
    super(new Item("Aged Brie", sellIn, quality));
  }

  updateQuality(): void {
    if (this.item.quality < 50) {
      this.item.quality++;
      if (this.item.sellIn <= 0 && this.item.quality < 50) {
        this.item.quality++;
      }
    }

    this.item.sellIn--;
  }
}
