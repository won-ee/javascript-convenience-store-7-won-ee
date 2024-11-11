import Order from '../models/Order.js';

class OrderManager {
  constructor() {
    this.order = new Order();
  }

  createOrder(productList) {
    productList.forEach(({ name, quantity }) => {
      // 상품 정보는 ProductManager에서 관리
      // 여기서는 단순히 주문에 추가
      // 실제 구현 시 ProductManager와 연동 필요
      this.order.items.push({ name, quantity, price: 0, discount: 0, freeItems: 0 });
    });
  }

  calculateTotalAmount() {
    return this.order.getTotalAmount();
  }

  applyPromotions(promotionManager, productManager) {
    promotionManager.applyPromotions(this.order, productManager);
    this.order.promoDiscount = promotionManager.calculateEventDiscount(this.order);
  }

  applyMembershipDiscount(membershipManager, isMember) {
    if (isMember) {
      const discount = membershipManager.calculateMembershipDiscountAmount(this.order.getTotalAmount() - this.order.promoDiscount);
      this.order.applyMembershipDiscount(discount);
    }
  }

  getOrderSummary() {
    return this.order;
  }
}

export default OrderManager;
