import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

function ProfileLoader({width = '100%'}) {
    return (
      <Card style={{ width: width }}>
        <Card.Body>
          <Placeholder
            as={Card.Title}
            animation="glow"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Placeholder xs={4} />
            <Placeholder xs={3} />
          </Placeholder>
          <Card
            style={{
              width: 80,
              height: 80,
              borderRadius: 15,
            }}
          ></Card>
          <Placeholder style={{marginTop:10}} as={Card.Text} animation="glow">
            <Placeholder xs={6} />
            <Placeholder xs={7} />
          </Placeholder>              
        </Card.Body>
        </Card>
    );
  }
  
  export default ProfileLoader;