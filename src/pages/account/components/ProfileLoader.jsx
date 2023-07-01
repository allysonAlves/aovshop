import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

function ProfileLoader() {
    return (
      <div className="d-flex">
        <Card style={{ width: '22rem', border:'none', backgroundColor:'transparent'}}>
          <Card style={{width:80, height:80, borderRadius:15, marginLeft:15}}></Card>
          <Card.Body>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} /> <Placeholder xs={4}/>
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={8} />
            <Placeholder xs={6} /> <Placeholder xs={4} />
            </Placeholder>        
                        
          </Card.Body>
        </Card>
      </div>
    );
  }
  
  export default ProfileLoader;