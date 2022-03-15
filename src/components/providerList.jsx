import React from 'react';
import { Col } from "react-bootstrap";

const providerList = (props) =>{
    return( 
        <>
            <Col xs={12} md={3}>
                <a href={props.ref_link} target="_blank" className="border text-center p-4 bg-white d-block mb-2 product-item text-decoration-none mt-3 mb-3" style={{height:'200'}} > <img className="dash-image" src={process.env.REACT_APP_IMAGE_URL+props.image} alt={props.name} /> 
                    <span className="item-name d-block text-dark fs-18 mt-3">
                        <strong className="d-block fSb">{props.name}</strong>
                        {/* <strong className="d-block fSb">54, 652 lbs</strong>
                        <strong className="d-block fR">of CO2 offset</strong> */}
                    </span>
                </a> 
            </Col>
        </>
    );
}

export default providerList;