import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container,Row,Col, Card,Spinner } from "react-bootstrap";

  
const Home = () => {
   

    return(        
        <Container fluid className="mt-0 pl-0">
            
            <Row className="justify-content-center mt-5">
                <Col xs={12}>
                    <Container>
                        <Row>
                            <Col className="text-center">                        
                                <Card className="text-center loadingBg" style={{height:'90vh', boxShadow:'0 0 20px rgba(0,0,0,0.6)'}}>
                                <span className="loaderBox"></span>
                                </Card>
                            </Col>
                        </Row>
                    </Container>   
                </Col>
            </Row>
        </Container>        
    );
}
export default Home;