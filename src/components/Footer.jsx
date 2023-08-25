import React from 'react'

import './FooterStyle.css'

const Footer = () => {
  return (
    <footer className='footer'>
        <div className='footerSubMenu'>
            <div>
                <h5>INSTITUCIONAL</h5>
                <ul>
                    <li>Quem Somos</li>
                    <li>Termos e Condições de Venda</li>
                    <li>Política de Troca e Devoluções</li>
                    <li>Nossa Lojas</li>
                    <li>Localização</li>
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
    </footer>
  )
}

export default Footer