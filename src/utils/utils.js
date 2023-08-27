export const convertToBrPriceString = (s) =>
    s.toLocaleString("pt-br", { style: "currency", currency: "BRL" });

export const convertToCardNumber = (cardNumber) => {
    return "**** **** **** " + cardNumber.slice(-4);
}