import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCardOnCart from '../../components/ProductCardOnCart/ProductCardOnCart'
import './Cart.css'
import { CartContext } from '../../commom/context/CartProvider'
import { convertToBrPriceString } from '../../utils/utils'


const Cart = () => {
    const navigate = useNavigate(); 
    const {cart, total, totalCredit} = useContext(CartContext);
    
  return (
    <div className='cart-page'>
        <div className='cart-content'>            
            {Object.keys(cart).length > 0 && total?
                (<>
                    <div className='product-scroll'>                        
                        {Object.values(cart).map((value) => <ProductCardOnCart key={value.id} className='product-item' product={value}/>)}
                    </div>
                    <div className='div-btn-finalizar'>
                        <div className='box-total-cart'>
                            <div className='valor-vista'>{convertToBrPriceString(total)} pix ou boleto</div> 
                            <div className='valor-parcela'>ou em até 12x de {convertToBrPriceString(totalCredit/12)} sem juros</div>               
                        </div>
                        <button onClick={() => navigate('./payment')} className='btn-finalizar-compra'>FINALIZAR PEDIDO</button>
                    </div>           
                </>):(<>
                <p>carrihno vazio</p>
                </>)
            }
        </div>
    </div>
  )
}

export default Cart