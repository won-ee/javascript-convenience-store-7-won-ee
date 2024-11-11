import { Console } from '@woowacourse/mission-utils';

class InputView {
  async getProductAndQuantityInput() {
    return await Console.readLineAsync("구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])");
  }

  async askMembershipDiscount() {
    return await Console.readLineAsync("멤버십 할인을 받으시겠습니까? (Y/N)");
  }

  async askAdditionalPurchase() {
    return await Console.readLineAsync("감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)");
  }

  async askAddFreeItem(productName, freeItemQty) {
    return await Console.readLineAsync(`현재 ${productName}은(는) ${freeItemQty}개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)`);
  }

  async askRegularPricePurchase(productName, qty) {
    return await Console.readLineAsync(`현재 ${productName} ${qty}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)`);
  }

  async handleError(message) {
    await Console.print(message);
  }
}

export default InputView;
