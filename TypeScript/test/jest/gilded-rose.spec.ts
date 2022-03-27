import { AgedBrie, BackstagePass, ExpirableItem, GildedRose, Item, Sulfuras } from "@/gilded-rose";

describe("Gilded Rose", () => {
  describe("Item", () => {
    it("has a name, a 'sell in' expiration date and a quality index", () => {
      const item = new ExpirableItem("some-item", 1, 2)

      expect(item.name).toEqual("some-item")
      expect(item.sellIn).toEqual(1)
      expect(item.quality).toEqual(2)
    })
  })

  describe("Inventory System", () => {
    it("lowers the quality of an item and its 'sell in' date by 1 at the end of the day", () => {
      const item = new ExpirableItem("some-item", 1, 1)
      const system = new GildedRose([item])

      system.updateQuality()

      expect(item.quality).toEqual(0)
      expect(item.sellIn).toEqual(0)
    })

    it("lowers the quality of an item by 2 when its 'sell in' date is passed", () => {
      const expiredItem = new ExpirableItem("expired-item", 0, 2)
      const system = new GildedRose([expiredItem])

      system.updateQuality()

      expect(expiredItem.quality).toEqual(0)
    })

    it("can not lower the quality of an item under 0", () => {
      const trash = new ExpirableItem("trash", 0, 0)
      const system = new GildedRose([trash])

      system.updateQuality()

      expect(trash.quality).toEqual(0)
    })
  })

  describe("Aged Brie", () => {
    it("increases its quality by 1 at the end of the day", () => {
      const agedBrie = new AgedBrie(1, 0)
      const system = new GildedRose([agedBrie])

      system.updateQuality()

      expect(agedBrie.quality).toEqual(1)
    })

    it("increases its quality by 2 when its 'sell in' date is passed", () => {
      const agedBrie = new AgedBrie(0, 0)
      const system = new GildedRose([agedBrie])

      system.updateQuality()

      expect(agedBrie.quality).toEqual(2)
    })

    it("can not increase its quality passed 50", () => {
      const agedBrie = new AgedBrie(1, 50)
      const system = new GildedRose([agedBrie])

      system.updateQuality()

      expect(agedBrie.quality).toEqual(50)
    })
  })

  describe("Sulfuras", () => {
    it("never decrease its quality or its 'sell in' date", () => {
      const sulfuras = new Sulfuras(1)
      const system = new GildedRose([sulfuras])

      system.updateQuality()

      expect(sulfuras.quality).toEqual(80)
      expect(sulfuras.sellIn).toEqual(1)
    })
  })

  describe("Backstage passes", () => {
    it("has no quality after its 'sell in' date", () => {
      const pass = new BackstagePass(0, 25)
      const system = new GildedRose([pass])

      system.updateQuality()

      expect(pass.quality).toEqual(0)
    })

    it("increases its quality by 3 when its 'sell in' date is of 5 days or less", () => {
      const pass = new BackstagePass(5, 0)
      const system = new GildedRose([pass])

      system.updateQuality()

      expect(pass.quality).toEqual(3)
    })

    it("increases its quality by 2 when its 'sell in' date is of 10 days or less", () => {
      const pass = new BackstagePass(10, 0)
      const system = new GildedRose([pass])

      system.updateQuality()

      expect(pass.quality).toEqual(2)
    })

    it("increases its quality by 1 when its 'sell in' date is in more than 10 days", () => {
      const pass = new BackstagePass(11, 0)
      const system = new GildedRose([pass])

      system.updateQuality()

      expect(pass.quality).toEqual(1)
    })
  })

  describe.skip("Conjured items", () => {
    it("decreases its quality by 2 at the end of the day", () => {
      const conjuredItem = new ExpirableItem("Conjured", 1, 2)
      const system = new GildedRose([conjuredItem])

      system.updateQuality()

      expect(conjuredItem.quality).toEqual(0)
    })

    it("decreases its quality by 4 when its 'sell in' date is passed", () => {
      const expiredConjuredItem = new ExpirableItem("expired-item", 0, 4)
      const system = new GildedRose([expiredConjuredItem])

      system.updateQuality()

      expect(expiredConjuredItem.quality).toEqual(0)
    })
  })
});
