import React, { useState } from 'react'
import { Accordion, Card } from 'react-bootstrap'
import CustomToggle from './CustomToggle'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'

const CategoryAccordion = ({closeSideBar}) => {
  
  const navigate = useNavigate();
  const categorias = {
    'hardware': {
      'processador':['amd','intel'],
      'placa_mãe':['amd','intel'],
      'memória':['kingston','XPG','GSkull']
    },    
    'videogame':{
      'console': ['xbox','playstation']
    },
  }

  const goTo = (cat ='',sub ='',brand ='') => {
    const categoria = `/${cat}/`;
    const subCategoria = sub && `?sub=${sub}`;
    const bd = brand && `&m=${brand}`;
    const path = categoria + (subCategoria ?? '') + (bd ?? '');

    navigate(`/categoria${path}`);
    closeSideBar();

  } 
  
  return (
    <>
      
      <Accordion> 
          {Object.entries(categorias).map(([key,value]) => {
              return(
              <Card key={key} className={styles.card}>
                <div className={styles.card_header}>
                  <CustomToggle eventKey={key} bg='#2e363a'>{key}</CustomToggle>
                </div >
                <Accordion.Collapse eventKey={key}>
                  <Accordion>                      
                    {Object.entries(value).map(([k,v]) => {
                      return(
                        <Card className={styles.card} key={k}>
                          <div className={styles.card_header}>
                            <CustomToggle eventKey={k} bg='#23292c'>{k}</CustomToggle>
                          </div>
                          <Accordion.Collapse eventKey={k}>
                            <>
                              {v.map(x => <div onClick={() => goTo(key,k,x)} className={styles.brand_btn} key={x}>{x}</div>)}
                              <Card className={styles.card}>
                                <div className={styles.card_header}>
                                  <div onClick={() => goTo(key,k)} className={styles.todo_btn}>Tudo em {k}</div>
                                </div>
                              </Card>
                            </>
                          </Accordion.Collapse>
                        </Card>
                      )
                    })}
                    <Card className={styles.card}>
                        <div className={styles.card_header}>
                          <div onClick={() => goTo(key)} className={styles.todo_btn}>Tudo em {key}</div>
                        </div>
                      </Card>
                  </Accordion>
                </Accordion.Collapse>
              </Card>  
            )              

          })}
        </Accordion> 

    </>
  )
}

export default CategoryAccordion