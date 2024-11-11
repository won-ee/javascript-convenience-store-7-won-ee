class MembershipManager {
    constructor() {
      this.discountRate = 0.3; 
      this.maxDiscount = 8000;  
    }
  
    calculateMembershipDiscountAmount(total) {
      const discount = total * this.discountRate;
      return discount > this.maxDiscount ? this.maxDiscount : discount;
    }
  
    applyMembershipDiscount(order) {
      const discount = this.calculateMembershipDiscountAmount(order.getTotalAmount() - order.promoDiscount);
      order.applyMembershipDiscount(discount);
    }
  }
  
  export default MembershipManager;
  