import fs from 'fs';

class ProductManager {
  constructor() {
    this.products = [];
  }

  async loadProducts(filePath) {
    try {
      const data = await fs.promises.readFile(filePath, 'utf-8');
      this.products = this.parseProductData(data);
    } catch (error) {
      throw new Error(`[ERROR] 재고를 불러오는데 실패했습니다.`);
    }
  }

  parseProductData(data) {
    const lines = data.split('\n');
    return lines.map(line => {
      const [name, price, quantity, promotion] = line.split(',');
      return { name, price, quantity, promotion };
    });
  }

  

  getProduct(name) {
    return this.products.find(product => product.name === name);
  }

  checkProductStock(name, quantity) {
    const product = this.getProduct(name);
    if (!product) throw new Error(`[ERROR] 존재하지 않는 상품입니다.`);
    if (product.stock < quantity) throw new Error(`[ERROR] 재고 수량을 초과하여 구매할 수 없습니다.`);
    return product;
  }

  updateStock(name, quantity) {
    const product = this.getProduct(name);
    product.reduceStock(quantity);
  }
}

export default ProductManager;
