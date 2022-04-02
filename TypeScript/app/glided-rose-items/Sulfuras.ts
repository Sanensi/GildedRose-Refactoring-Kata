import { GildedRoseItem } from "./GildedRoseItem";
import { Item } from "../Item";


export class Sulfuras extends GildedRoseItem {
  constructor(sellIn) {
    super(new Item("Sulfuras, Hand of Ragnaros", sellIn, 80));
  }

  updateQuality(): void { }
}
