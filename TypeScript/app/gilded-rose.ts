export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

abstract class GildedRoseItem {
  get name() { return this.item.name }
  get sellIn() { return this.item.sellIn }
  get quality() { return this.item.quality }

  protected item: Item;

  constructor(item: Item)
  constructor(name: string, sellIn: number, quality: number)
  constructor(...args: [Item] | [string, number, number]) {
    if (args.length === 1) {
      const [item] = args
      this.item = item
    }
    else {
      const [name, sellIn, quality] = args
      this.item = new Item(name, sellIn, quality)
    }
  }

  abstract updateQuality(): void
}

export class ExpirableItem extends GildedRoseItem {
  updateQuality(): void {
    if (this.item.quality > 0) {
      this.item.quality--
      if (this.item.sellIn <= 0 && this.item.quality > 0) {
        this.item.quality--
      }

      this.item.sellIn--
    }
  }
}

export class AgedBrie extends GildedRoseItem {
  constructor(sellIn: number, quality: number) {
    super(new Item("Aged Brie", sellIn, quality))
  }

  updateQuality(): void {
    if (this.item.quality < 50) {
      this.item.quality++
      if (this.item.sellIn <= 0 && this.item.quality < 50) {
        this.item.quality++
      }
    }

    this.item.sellIn--
  }
}

export class Sulfuras extends GildedRoseItem {
  constructor(sellIn) {
    super(new Item("Sulfuras, Hand of Ragnaros", sellIn, 80))
  }

  updateQuality(): void { }
}

export class BackstagePass extends GildedRoseItem {
  constructor(sellIn, quality: number) {
    super(new Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality))
  }

  updateQuality(): void {
    if (this.item.quality < 50) {
      this.item.quality++

      if (this.item.sellIn < 11 && this.item.quality < 50) {
        this.item.quality++
      }

      if (this.item.sellIn < 6 && this.item.quality < 50) {
        this.item.quality++
      }

      if (this.item.sellIn <= 0) {
        this.item.quality = 0
      }
    }

    this.item.sellIn--
  }
}

export class GildedRose {
  items: Array<GildedRoseItem>;

  constructor(items: Array<Item> = []) {
    this.items = items.map((item) => new ExpirableItem(item));
  }

  updateQuality() {
    this.items.forEach((item) => item.updateQuality())

    return this.items
  }
}
