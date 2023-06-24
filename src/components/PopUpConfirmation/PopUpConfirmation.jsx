import React,{useState, useEffect} from 'react'
import './PopUpConfirmation.css'

const PopUpConfirmation = ({showPopUp,popUpTitle, confirmButtonText ,confirmButtonColor, confirmButtonTextColor, cancelButtonText,cancelButtonColor,cancelButtonTextColor, popUpBgColor,OnConfirmed,OnCanceled}) => {

    
    return ( 
        <>
            {        
                showPopUp?
                <div className='popup-confirmation'>
                <div className='popup' style={popUpBgColor && {backgroundColor: popUpBgColor}}>
                <p style={{color:'#fff'}}>{popUpTitle? popUpTitle: ``}</p>
                <div className='div-buttons'>
                <button onClick={() => OnCanceled && OnCanceled()} style={{
                    backgroundColor: cancelButtonColor? cancelButtonColor: 'darkgreen',
                    color: cancelButtonTextColor? cancelButtonTextColor: '',
                }}>
                
                {cancelButtonText? cancelButtonText : 'CANCELAR'}
                </button>
                
                <button onClick={() => OnConfirmed && OnConfirmed()} style={{
                    backgroundColor: confirmButtonColor? confirmButtonColor: 'darkred',
                    color: confirmButtonTextColor? confirmButtonTextColor: '',
                }}>
                
                {confirmButtonText? confirmButtonText : 'SAIR'}
                </button>
                </div>
                </div>
                </div>
                :
                <></>
            }             
        </>
    )
}
            
            export default PopUpConfirmation