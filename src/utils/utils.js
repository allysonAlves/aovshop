export const convertToBrPriceString = (s) =>
    s.toLocaleString("pt-br", { style: "currency", currency: "BRL" });

export const convertToCardNumber = (cardNumber) => {

    
    const divider = cardNumber.toString().match(/.{1,4}/g);
    
    return divider.reduce((acumulator, item, index) => {
        console.log(index, acumulator)
        if(index == 1) return "**** **** ";
        if(index < 3) return acumulator + "**** ";
        return acumulator + item;
    });

    
}