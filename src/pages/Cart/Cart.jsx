import React, {useContext, useEffect} from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import ProductCardOnCart from '../../components/productCardOnCart/productCardOnCart'
import './Cart.css'
import { CartContext } from '../../commom/context/CartProvider'

const Cart = () => {
    const navigate = useNavigate();
    //const {user,cart, setCart} = useOutletContext();
    const {cart, addProduct, removeProduct} = useContext(CartContext);

  
    const convert_moeda = (s) => s.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}); 

    const calculeCart = () => {
        let total = 0;

        for(let item of Object.values(cart)){
            let itemPrice = item.price * (1-(item.sale/100));
            total += itemPrice * item.amount;
        }

        return convert_moeda(total);
    }
    const calculeParcela = (x) => {
       let total = 0;
        
        for(let item of Object.values(cart)){
            let itemPrice = item.price * (1-(10/100));
            total += itemPrice * item.amount;
        }

        return convert_moeda(total/x);
    }

    useEffect(() => {
        console.log( 'testando no carrinho ===>>>>' , cart);
    }, [cart])
    
  return (
    <div className='cart-page'>
        <div className='cart-content'>
            <h1>Carrinho</h1>
            {Object.keys(cart)?
            <div className='product-scroll'>
                {/*<ProdutoGrid produtos={Object.values(cart)}/>*/}
                {Object.values(cart).map((value) => <ProductCardOnCart key={value.id} className='product-item' product={value}/>)}
            </div>:
            <>
            <p>carrihno vazio</p>
            </>
            }
            <div className='div-btn-finalizar'>
                <div className='box-total-cart'>
                    <div className='valor-vista'>{calculeCart()} pix ou boleto</div> 
                    <div className='valor-parcela'>ou em até 12x de {calculeParcela(12)} sem juros</div>               
                </div>
                <button className='btn-finalizar-compra'>FINALIZAR PEDIDO</button>
            </div>
        </div>
    </div>
  )
}

export default Cart