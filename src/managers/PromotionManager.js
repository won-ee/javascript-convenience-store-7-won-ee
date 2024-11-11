import fs from 'fs';

class PromotionManager {
  constructor() {
    this.promotions = [];
  }

  async loadPromotions(filePath) {
    try {
      const data = await fs.promises.readFile(filePath, 'utf-8');
      this.promotions = this.parsePromotionData(data);
      console.log(this.promotions);
    } catch (error) {
      throw new Error(`[ERROR] 할인행사정보를 불러오는데 실패했습니다.`);
    }
  }

  parsePromotionData(data) {
    const lines = data.split('\n');
    return lines.map(line => {
      const [promotion, details] = line.split(',');
      return { promotion, details };
    });
  }

  getPromotion(type) {
    return this.promotions.find(promo => promo.type === type);
  }

  applyPromotions(order, productManager) {
    order.items.forEach(item => {
      const product = productManager.getProduct(item.name);
      if (product && product.promotion) {
        const { discount, freeItems } = product.applyPromotion(item.quantity);
        item.discount = discount;
        item.freeItems = freeItems;
      }
    });
  }

  calculateEventDiscount(order) {
    return order.items.reduce((acc, item) => acc + item.discount, 0);
  }
}

export default PromotionManager;
