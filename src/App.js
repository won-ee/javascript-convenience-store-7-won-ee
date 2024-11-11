import ProductManager from './managers/ProductManager.js';
import PromotionManager from './managers/PromotionManager.js';
import OrderManager from './managers/OrderManager.js';
import MembershipManager from './managers/MembershipManager.js';
import InputView from './views/InputView.js';
import OutputView from './views/OutputView.js';
import InputValidator from './utils/InputValidator.js';
import { Console } from '@woowacourse/mission-utils';

class App {
  constructor() {
    this.productManager = new ProductManager();
    this.promotionManager = new PromotionManager();
    this.orderManager = new OrderManager();
    this.membershipManager = new MembershipManager();
    this.inputView = new InputView();
    this.outputView = new OutputView();
  }

  async run() {
    try {
      // 데이터 로드
      await this.productManager.loadProducts('../public/products.md');
      await this.promotionManager.loadPromotions('../public/promotions.md');
      
      let continueShopping = true;

      while (continueShopping) {
        try {
          // 상품 목록 출력
          await this.outputView.displayAvailableProducts(this.productManager.products);

          // 상품 및 수량 입력 받기
          let productInput = '';
          while (true) {
            try {
              productInput = await this.inputView.getProductAndQuantityInput();
              InputValidator.validateProductName(productInput, this.productManager);
              InputValidator.validateQuantity(productInput);
              break;
            } catch (error) {
              await this.inputView.handleError(error.message);
            }
          }

          // 구매할 상품 파싱
          const cart = this.parsePurchaseRequest(productInput);

          // 프로모션 적용
          this.promotionManager.applyPromotions(this.orderManager.order, this.productManager);

          // 멤버십 할인 여부 묻기
          let isMember = false;
          while (true) {
            try {
              const membershipInput = await this.inputView.askMembershipDiscount();
              InputValidator.validateYesNo(membershipInput);
              isMember = membershipInput.toUpperCase() === 'Y';
              break;
            } catch (error) {
              await this.inputView.handleError(error.message);
            }
          }

          // 주문 총액 계산 및 멤버십 할인 적용
          this.orderManager.applyMembershipDiscount(this.membershipManager, isMember);

          // 영수증 출력
          await this.outputView.displayReceipt(this.orderManager.getOrderSummary());

          // 추가 구매 여부 묻기
          let addMore = false;
          while (true) {
            try {
              const additionalInput = await this.inputView.askAdditionalPurchase();
              InputValidator.validateYesNo(additionalInput);
              addMore = additionalInput.toUpperCase() === 'Y';
              break;
            } catch (error) {
              await this.inputView.handleError(error.message);
            }
          }

          continueShopping = addMore;
        } catch (error) {
          Console.print(`[ERROR] ${error.message}`);
        }
      }

      // 최종 메시지 출력
      await this.outputView.displayFinalMessage();
    } catch (error) {
      Console.print(`[ERROR] ${error.message}`);
    }
  }

  parsePurchaseRequest(input) {
    const regex = /\[(.*?)\]/g;
    const matches = [...input.matchAll(regex)];
    return matches.map(match => {
      const [name, qty] = match[1].split("-");
      const product = this.productManager.getProduct(name);
      if (product) {
        this.productManager.updateStock(name, parseInt(qty));
        return { name, quantity: parseInt(qty), price: product.price };
      } else {
        throw new Error(`Product "${name}" not found.`);
      }
    });
  }
}

export default App;
