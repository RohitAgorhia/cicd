import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Row,Col} from "react-bootstrap";
import Seesiu_Logo from "../../img/logo/logo2.png";

const Header = () =>{
    return(
        <>
        <Row className="justify-content-md-center">
            <Col >
                <p ><img className="headerlogo"  src={Seesiu_Logo} alt="Seesiu_Logo" /></p>
            </Col>  
        </Row>
        </>
    );
    
}

export default Header;