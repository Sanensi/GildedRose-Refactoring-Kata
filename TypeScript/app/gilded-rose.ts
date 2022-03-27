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
    this.items.forEach((item) => {
      if (item instanceof Sulfuras) return

      if (item instanceof AgedBrie && item.quality < 50) {
        item.quality++
        if (item.sellIn <= 0 && item.quality < 50) {
          item.quality++
        }
      }

      if (item instanceof BackstagePass && item.quality < 50) {
        item.quality++

        if (item.sellIn < 11 && item.quality < 50) {
          item.quality++
        }

        if (item.sellIn < 6 && item.quality < 50) {
          item.quality++
        }

        if (item.sellIn <= 0) {
          item.quality = 0
        }
      }

      if (!(item instanceof AgedBrie) && !(item instanceof BackstagePass) && item.quality > 0) {
        item.quality--
        if (item.sellIn <= 0 && item.quality > 0) {
          item.quality--
        }
      }

      item.sellIn--
    })

    return this.items
  }
}
