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

interface GildedRoseItem {
  updateQuality(): void
}

export class AgedBrie extends Item implements GildedRoseItem {
  constructor(sellIn: number, quality: number) {
    super("Aged Brie", sellIn, quality)
  }

  updateQuality(): void {
    if (this.quality < 50) {
      this.quality++
      if (this.sellIn <= 0 && this.quality < 50) {
        this.quality++
      }
    }

    this.sellIn--
  }
}

export class Sulfuras extends Item {
  constructor(sellIn) {
    super("Sulfuras, Hand of Ragnaros", sellIn, 80)
  }
}

export class BackstagePass extends Item implements GildedRoseItem {
  constructor(sellIn, quality: number) {
    super("Backstage passes to a TAFKAL80ETC concert", sellIn, quality)
  }

  updateQuality(): void {
    if (this.quality < 50) {
      this.quality++

      if (this.sellIn < 11 && this.quality < 50) {
        this.quality++
      }

      if (this.sellIn < 6 && this.quality < 50) {
        this.quality++
      }

      if (this.sellIn <= 0) {
        this.quality = 0
      }
    }

    this.sellIn--
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

      if (item instanceof AgedBrie) {
        item.updateQuality()
      }

      if (item instanceof BackstagePass) {
        item.updateQuality()
      }

      if (!(item instanceof AgedBrie) && !(item instanceof BackstagePass) && item.quality > 0) {
        item.quality--
        if (item.sellIn <= 0 && item.quality > 0) {
          item.quality--
        }

        item.sellIn--
      }
    })

    return this.items
  }
}
