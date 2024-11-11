class InputValidator {
  static validateProductName(input, productManager) {
    const matches = input.split('[').filter(item => item.includes(']'));
    if (matches.length === 0) {
      throw new Error("[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.");
    }

    matches.forEach(match => {
      const namePart = match.split(']')[0]; 
      const [name] = namePart.split("-");  

      if (!productManager.getProduct(name)) {
        throw new Error("[ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.");
      }
    });
  }


  static validateQuantity(input) {
    const matches = input.split('[').filter(item => item.includes(']'));
    if (matches.length === 0) {
      throw new Error("[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.");
    }

    matches.forEach(match => {
      const qtyPart = match.split(']')[0];  
      const [, qty] = qtyPart.split("-"); 

      if (isNaN(parseInt(qty)) || parseInt(qty) <= 0) {
        throw new Error("[ERROR] 유효하지 않은 수량입니다. 다시 입력해 주세요.");
      }
    });
  }


  static validateYesNo(input) {
    const upperInput = input.toUpperCase();  
    if (upperInput !== 'Y' && upperInput !== 'N') {
      throw new Error("[ERROR] 잘못된 입력입니다. 다시 입력해 주세요.");
    }
  }
}

export default InputValidator;
