export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class AgedBrie extends Item {
  constructor(sellIn: number, quality: number) {
    super("Aged Brie", sellIn, quality)
  }
}

export class Sulfuras extends Item {
  constructor(sellIn) {
    super("Sulfuras, Hand of Ragnaros", sellIn, 80)
  }
}

export class BackstagePass extends Item {
  constructor(sellIn, quality: number) {
    super("Backstage passes to a TAFKAL80ETC concert", sellIn, quality)
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items: Array<Item> = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item, i) => {
      if (item instanceof Sulfuras) return

      if (item.name != "Aged Brie" && item.name != "Backstage passes to a TAFKAL80ETC concert") {
        if (item.quality > 0) {
          item.quality--
        }
      } else {
        if (item.quality < 50) {
          item.quality++
          if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality++
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality++
              }
            }
          }
        }
      }
      item.sellIn = item.sellIn - 1;
      if (item.sellIn < 0) {
        if (item.name != "Aged Brie") {
          if (item.name != "Backstage passes to a TAFKAL80ETC concert") {
            if (item.quality > 0) {
              item.quality--
            }
          } else {
            item.quality = item.quality - item.quality
          }
        } else {
          if (item.quality < 50) {
            item.quality++
          }
        }
      }
    })

    return this.items;
  }
}
