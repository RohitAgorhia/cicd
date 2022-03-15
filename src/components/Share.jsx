import React,{useEffect,useState} from 'react';
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container,Row,Col,Card } from "react-bootstrap";
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
import loginLogo from "../img/loginLogo.png";
import loginSideBg from "../img/login-bg.jpg";
require('dotenv').config()


const Register = () => {    
    const cookies = new Cookies();
    let {code } = useParams();
    const [url, setUrl] = useState("https://chrome.google.com/webstore/detail/seesiu/ijlcfmfaomniolicjemloddmoieadfko");
    const [name, setName] = useState("User")

    // Store referCode in Cookie
    useEffect(() => { 
        cookies.set('Seesiu_ShareCode', code, { path: '/' });
        getCodeDetail();
    }, []);


    const getCodeDetail = () =>{
        const param={
            "refercode":code, 
        };
    
        let ApiURL = process.env.REACT_APP_API_URL+"getCodeDetail";
        axios.post(ApiURL,param).then(res => {
            const resp = res.data;
            if(resp.status === 'success'){ 
                setName(resp.data.name);
            }               
        }).catch(err =>{
            console.warn("Error:",err);
        }); 
    }

    return(
        
        <Container fluid className="mt-4">             
 
             <Container className="p-0" style={{boxShadow:'0 0 20px rgba(0,0,0,0.6)'}}>
                 <Row>
                     <Col md={6} className="rounded-left rounded-top loginSideBg">
                         <p><img src={loginLogo} alt="logo" height="50" className="mt-3 ml-3" /></p>
                         <p><img src={loginSideBg} alt="Seesiulogo" className="img-fluid" /></p>
                     </Col>
 
                     <Col md={6} className="bg-white">
                         <Card className="border-0 rounded-0" style={{height:'93vh'}}>
                         <Card.Body>
                             <Container fluid>
                                 <Row>
                                     <Col xs="12">
                                        <h1 className="text-dark mt-5">{name} invites you to shop with Seesiu</h1>
                                        <p className="fs-16 fR">
                                            <span className="text-muted"> With one click, Seesiu makes your online shopping kinder to the environment while you earn Perks at all of your online stores — and the best bit is, it’s free!</span> 
                                        </p>
                                     </Col> 
 
                                     <Col xs={12}>
                                        <a href={url} className="btn-sm mt-3 submit_btn" target="_blank">Add to Chrome  — It's Free!</a>
                                     </Col>
                                 </Row>
                             </Container>
                         </Card.Body>
                         </Card>
                     </Col>
                 </Row>
             </Container>                   
         </Container> 
     );
}

export default Register;
