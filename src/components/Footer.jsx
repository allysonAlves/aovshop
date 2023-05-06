import React from 'react'

import './FooterStyle.css'

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footerSubMenu'>
            <div>
                <h5>INSTITUCIONAL</h5>
                <ul>
                    <ol>Quem Somos</ol>
                    <ol>Termos e Condições de Venda</ol>
                    <ol>Política de Troca e Devoluções</ol>
                    <ol>Nossa Lojas</ol>
                    <ol>Localização</ol>
                </ul>
            </div>
            <div>
                <h5>DÚVIDAS</h5>
                <ul>
                    <ol>Como Comprar</ol>
                    <ol>Prazos e Entregas</ol>
                    <ol>Formas de Pagamento</ol>
                    <ol>Sobre Boletos</ol>
                    <ol>Garantia</ol>
                </ul>
            </div>
            <div>
                <h5>AJUDA</h5>
                <ul>
                    <ol>SAC</ol>
                    <ol>Fale Conosco</ol>
                    <ol>Política de Privacidade</ol>
                </ul>
            </div>
            <div>
                <h5>Quer ficar antenado nas promoções?</h5>
                <ul>
                    <ol>Cadastre seu email e acompanhe as melhores promoções em tempo real!</ol>
                    <ol><input id='input-cadastrar-email' type='email' placeholder='digite seu email'/></ol>
                    <button id='button-cadastrar-email'> CADASTRAR</button>
                </ul>
            </div>
        </div>
        <div className='footerEnterprise'>

        </div>
    </div>
  )
}

export default Footer