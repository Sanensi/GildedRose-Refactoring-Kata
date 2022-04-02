import { GildedRoseItem } from "./GildedRoseItem";


export class ExpirableItem extends GildedRoseItem {
  updateQuality(): void {
    if (this.item.quality > 0) {
      this.item.quality--;
      if (this.item.sellIn <= 0 && this.item.quality > 0) {
        this.item.quality--;
      }

      this.item.sellIn--;
    }
  }
}
