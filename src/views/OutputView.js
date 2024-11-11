import { Console } from '@woowacourse/mission-utils';

class OutputView {
  async displayAvailableProducts(products) {
    let message = "안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n\n";
    products.forEach(product => {
      const promotionText = product.promotion ? `${product.promotion}` : '재고 없음';
      message += `- ${product.name} ${product.price}원 ${product.quantity}개 ${promotionText}\n`;
    });
    await Console.print(message);
  }

  async displayReceipt(order) {
    let receipt = "==============W 편의점================\n";
    receipt += "상품명\t\t수량\t금액\n";
    order.items.forEach(item => {
      receipt += `${item.name}\t\t${item.quantity}\t${item.price * item.quantity}\n`;
    });
    receipt += "=============증\t정===============\n";
    order.items.forEach(item => {
      if (item.freeItems > 0) {
        receipt += `${item.name}\t\t${item.freeItems}\n`;
      }
    });
    receipt += "====================================\n";
    receipt += `총구매액\t\t${order.getTotalAmount()}\n`;
    receipt += `행사할인\t\t-${order.promoDiscount}\n`;
    receipt += `멤버십할인\t\t-${order.membershipDiscount}\n`;
    receipt += `내실돈\t\t${order.getFinalAmount()}\n`;
    await Console.print(receipt);
  }

  async displayFinalMessage() {
    await Console.print("구매를 종료합니다. 감사합니다!");
  }
}

export default OutputView;
