class Product {
    constructor(name, price, stock, promotion = null) {
      this.name = name;
      this.price = price;
      this.stock = stock;
      this.promotion = promotion;
    }
  
    applyPromotion(quantity) {
      if (this.promotion) {
        return this.promotion.calculateDiscount(quantity, this.price);
      }
      return { discount: 0, freeItems: 0 };
    }
  
    reduceStock(quantity) {
      if (quantity > this.stock) {
        throw new Error(`[ERROR] 재고 수량을 초과하여 구매할 수 없습니다.`);
      }
      this.stock -= quantity;
    }
  }
  
  export default Product;
  