import { GildedRose, GildedRoseItemFactory } from "@/gilded-rose";
import { BackstagePass } from "@/glided-rose-items/BackstagePass";
import { Sulfuras } from "@/glided-rose-items/Sulfuras";
import { AgedBrie } from "@/glided-rose-items/AgedBrie";
import { ExpirableItem } from "@/glided-rose-items/ExpirableItem";
import { Item } from "@/Item";

describe("Gilded Rose Item Factory", () => {
  const itemFactory = new GildedRoseItemFactory()

  it("creates an AgedBrie if the item name is 'Aged Brie'", () => {
    const item = new Item("Aged Brie", 1, 1)

    const agedBrie = itemFactory.create(item)

    expect(agedBrie).toBeInstanceOf(AgedBrie)
  })

  it("creates a BackstagePass if the item name is 'Backstage passes to a TAFKAL80ETC concert'", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 1, 1)

    const backstagePass = itemFactory.create(item)

    expect(backstagePass).toBeInstanceOf(BackstagePass)
  })

  it("creates a Sulfuras if the item name is 'Sulfuras, Hand of Ragnaros'", () => {
    const item = new Item("Sulfuras, Hand of Ragnaros", 1, 1)

    const backstagePass = itemFactory.create(item)

    expect(backstagePass).toBeInstanceOf(Sulfuras)
  })

  it("creates an ExpirableItem otherwise", () => {
    const item = new Item("some-item", 1, 1)

    const expirableItem = itemFactory.create(item)

    expect(expirableItem).toBeInstanceOf(ExpirableItem)
  })
})

describe("Gilded Rose", () => {
  it("creates a GildedRoseItem for every item received", () => {
    const gildedRoseItemFactory = { create: jest.fn() }
    const items = Array.from({ length: 7 }, (_, i) => new Item(`some-item-${i}`, 1, 1))

    new GildedRose(items, gildedRoseItemFactory)

    items.forEach((item, i) => {
      expect(gildedRoseItemFactory.create).toHaveBeenNthCalledWith(i + 1, item)
    })
  })

  it("update the quality of every item in the shop", () => {
    const items = Array.from({ length: 7 }, (_, i) => new Item(`some-item-${i}`, 1, 1))
    const gildedRose = new GildedRose(items)

    gildedRose.updateQuality()

    items.forEach((item) => expect(item.quality).toEqual(0))
  })
});

describe("Item", () => {
  it("has a name, a 'sell in' expiration date and a quality index", () => {
    const item = new Item("some-item", 1, 2)

    expect(item.name).toEqual("some-item")
    expect(item.sellIn).toEqual(1)
    expect(item.quality).toEqual(2)
  })
})

describe("Expirable Item", () => {
  it("decrease its quality and its 'sell in' date by 1 at the end of the day", () => {
    const item = new ExpirableItem("some-item", 1, 1)

    item.updateQuality()

    expect(item.quality).toEqual(0)
    expect(item.sellIn).toEqual(0)
  })

  it("decrease its quality by 2 when its 'sell in' date is passed", () => {
    const expiredItem = new ExpirableItem("expired-item", 0, 2)

    expiredItem.updateQuality()

    expect(expiredItem.quality).toEqual(0)
  })

  it("can not lower its quality under 0", () => {
    const trash = new ExpirableItem("trash", 0, 0)

    trash.updateQuality()

    expect(trash.quality).toEqual(0)
  })
})

describe("Aged Brie", () => {
  it("increases its quality by 1 at the end of the day", () => {
    const agedBrie = new AgedBrie(1, 0)

    agedBrie.updateQuality()

    expect(agedBrie.quality).toEqual(1)
  })

  it("increases its quality by 2 when its 'sell in' date is passed", () => {
    const agedBrie = new AgedBrie(0, 0)

    agedBrie.updateQuality()

    expect(agedBrie.quality).toEqual(2)
  })

  it("can not increase its quality passed 50", () => {
    const agedBrie = new AgedBrie(1, 50)

    agedBrie.updateQuality()

    expect(agedBrie.quality).toEqual(50)
  })
})

describe("Sulfuras", () => {
  it("never decrease its quality or its 'sell in' date", () => {
    const sulfuras = new Sulfuras(1)

    sulfuras.updateQuality()

    expect(sulfuras.quality).toEqual(80)
    expect(sulfuras.sellIn).toEqual(1)
  })
})

describe("Backstage passes", () => {
  it("has no quality after its 'sell in' date", () => {
    const pass = new BackstagePass(0, 25)

    pass.updateQuality()

    expect(pass.quality).toEqual(0)
  })

  it("increases its quality by 3 when its 'sell in' date is of 5 days or less", () => {
    const pass = new BackstagePass(5, 0)

    pass.updateQuality()

    expect(pass.quality).toEqual(3)
  })

  it("increases its quality by 2 when its 'sell in' date is of 10 days or less", () => {
    const pass = new BackstagePass(10, 0)

    pass.updateQuality()

    expect(pass.quality).toEqual(2)
  })

  it("increases its quality by 1 when its 'sell in' date is in more than 10 days", () => {
    const pass = new BackstagePass(11, 0)

    pass.updateQuality()

    expect(pass.quality).toEqual(1)
  })
})

describe.skip("Conjured items", () => {
  it("decreases its quality by 2 at the end of the day", () => {
    const conjuredItem = new ExpirableItem("Conjured", 1, 2)

    conjuredItem.updateQuality()

    expect(conjuredItem.quality).toEqual(0)
  })

  it("decreases its quality by 4 when its 'sell in' date is passed", () => {
    const expiredConjuredItem = new ExpirableItem("expired-item", 0, 4)

    expiredConjuredItem.updateQuality()

    expect(expiredConjuredItem.quality).toEqual(0)
  })
})