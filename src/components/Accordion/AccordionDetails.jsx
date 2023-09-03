import {Accordion , Container, Row, Col} from 'react-bootstrap';


function AccordionDetails({product = {}}) {

    const keyvalue = (obj, sub = false) => Object.entries(obj).map(([k,v]) => {
        let value = null;
        if(typeof(v) == 'string')
        {
            if(sub)
            {
                value = <div key={k}> <strong> {k}:</strong> {!sub && <br/>} {v} </div>
            }else{
                value = <div style={{marginBottom:10}} key={k}> <strong> {k}:</strong> {!sub && <br/>}<div style={{fontSize:13}}>{v}</div></div>
            }
            
        }else{
            value = <div style={{marginBottom:10}} key={k}><strong>{k}:</strong><br/><div style={{display:'flex', flexDirection:'column', gap:0, fontSize:13}}>{keyvalue(v, true)}</div> </div>;
        }
        return value;
    })

  return (
    <Accordion defaultActiveKey="0" data-bs-theme="dark" style={{marginTop:30, width: "100%"}}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Apresentação</Accordion.Header>
        <Accordion.Body>

        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Especificações Técnicas</Accordion.Header>
        <Accordion.Body>
          
          {product?.details &&
            <dl>
            {Object.entries(product?.details).map(([key,value]) => {
                return (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd>{<div dangerouslySetInnerHTML={{__html: value}} />}</dd>                 
                </div>
                )
            })}
            </dl>
          }
            {/* {product?.details &&
               <div>{product?.details.map(value => <div dangerouslySetInnerHTML={{__html: value}} />)}</div> 
            }            */}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Especificações Técnicas</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionDetails