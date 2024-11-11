class Promotion {
    constructor(type, buy, get) {
      this.type = type;
      this.buy = buy; 
      this.get = get;
    }
  
    calculateDiscount(quantity, price) {
      const freeItems = Math.floor(quantity / this.buy) * this.get;
      const discount = freeItems * price;
      return { discount, freeItems };
    }
  }
  
  export default Promotion;
  