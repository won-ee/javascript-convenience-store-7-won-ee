class Order {
  constructor() {
    this.items = [];
    this.promoDiscount = 0;
    this.membershipDiscount = 0;
  }

  addItem(name, quantity, price, discount, freeItems) {
    this.items.push({ name, quantity, price, discount, freeItems });
    this.promoDiscount += discount;
  }

  applyMembership(discount) {
    this.membershipDiscount = discount;
  }

  getTotalAmount() {
    return this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  getFinalAmount() {
    return this.getTotalAmount() - this.promoDiscount - this.membershipDiscount;
  }
}

export default Order;
