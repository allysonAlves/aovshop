import React, {useEffect} from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import ProdutoGrid from '../../components/ProdutoGrid'
import './Cart.css'

const Cart = () => {
    const navigate = useNavigate();
    const {user,cart, setCart} = useOutletContext();

    useEffect(() => {
        if(!user)
        {
            navigate('/login');
        }
    },[])

    const convert_moeda = (s) => s.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}); 

    const calculeCart = () => {
        let total = 0;
        for(let item of Object.values(cart)){
            total += item.precoAtual * item.amount;
        }
        return convert_moeda(total);
    }
    const calculeParcela = () => {
        let total = 0;
        for(let item of Object.values(cart)){
            total += item.precoParcelado * item.amount;
        }
        return total;
    }
    
  return (
    <div className='cart-page'>
        <div className='cart-content'>
            <h1>Carrinho</h1>
            {Object.keys(cart).length ?
            <div className='product-item'>
            <ProdutoGrid produtos={Object.values(cart)}/>
            </div>:
            <>
            <p>carrihno vazio</p>
            </>
            }
            <div className='box-total-cart'>
              <p className='valor-vista'>TOTAL A VISTA {calculeCart()}</p> 
              <p className='valor-parcela'>ou até 12x de {convert_moeda(calculeParcela()/12)} sem juros</p>               
            </div>
            <button className='btn-finalizar-compra'>FINALIZAR PEDIDO</button>
        </div>
    </div>
  )
}

export default Cart