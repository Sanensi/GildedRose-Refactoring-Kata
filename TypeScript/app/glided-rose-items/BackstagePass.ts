import { GildedRoseItem } from "./GildedRoseItem";
import { Item } from "../Item";


export class BackstagePass extends GildedRoseItem {
  constructor(sellIn, quality: number) {
    super(new Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality));
  }

  updateQuality(): void {
    if (this.item.quality < 50) {
      this.item.quality++;

      if (this.item.sellIn < 11 && this.item.quality < 50) {
        this.item.quality++;
      }

      if (this.item.sellIn < 6 && this.item.quality < 50) {
        this.item.quality++;
      }

      if (this.item.sellIn <= 0) {
        this.item.quality = 0;
      }
    }

    this.item.sellIn--;
  }
}
