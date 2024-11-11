class Membership {
    constructor() {
      this.discountRate = 0.3; 
      this.maxDiscount = 8000;  
    }
  
    calculateDiscount(amount) {
      return Math.min(amount * this.discountRate, this.maxDiscount);
    }
  }
  
  export default Membership;
  