
const addToCart = ({setCart,cart,produto}) => {   
    setCart(previous => {      
      let amountInCart = cart[produto.id] ? cart[produto.id]?.amount + 1 : 1;
      let productToCart = {...produto, amount: amountInCart};
      //console.log("[ amount ==>>]", amountInCart," [product =>>]", productToCart)
      return {...previous, [produto.id]: productToCart}
    });
          
  }

  const removeCart = ({setCart,cart,produto}) => {
    if(cart[produto.id]?.amount <= 1)
    {
      let objeto = {};
      Object.keys(cart).forEach(element => {
        if(element != produto.id){
          objeto[element] = cart[element]          
        } 
      })
      setCart(objeto);
      
    }else{
      let currentProduct = cart[produto.id];
      currentProduct.amount--;      
      setCart(previous => {return {...previous, [produto.id]: currentProduct}})
    }

  }

  export { removeCart, addToCart }