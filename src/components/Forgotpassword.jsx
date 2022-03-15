import React,{useState} from 'react';
import { useHistory } from "react-router-dom";
import validator from 'validator'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container,Row,Col,Form,Button,Card } from "react-bootstrap";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginLogo from "../img/loginLogo.png";
import loginSideBg from "../img/login-bg.jpg";
require('dotenv').config()

  
const Register = () => {    
    const history = useHistory();


    // Mannuly Signup process
    const [error, setError] = useState({});
    const [data, setData] = useState({
        email: "",
    });

    const inputElement = (event) => {
        event.persist();

        setData(data => ({ ...data,
            [event.target.name]: event.target.value
        }));
    }

    const validateForm = (values) => {
        let isValid = true;

        if (!values.email) {
            isValid = false;
            setError({email:'Email address is required'});
        } 

        return isValid;
    }

    const submitForm = (event) => {
        event.preventDefault()
        if(validateForm(data)){

            const newUser = {
                email: data.email,
            };

            const ApiURL= process.env.REACT_APP_API_URL+'forgot';
            axios.post(ApiURL, newUser).then(res => {
                const resp = res.data;
                if(resp.status === 'success'){
                    event.target.reset();
                    toast.success(resp.message);
                }else{
                    toast.warn(resp.message);
                }
            }).catch(err =>{
                toast.warn(err);
            });
        }

    }

    const registerRedirect = () => {
        history.push("/register");
    }

    return(
        
        <Container fluid className="mt-4">
             <ToastContainer
                 position="bottom-center"
                 autoClose={5000}
                 hideProgressBar={false}
                 newestOnTop={false}
                 closeOnClick
                 rtl={false}
                 pauseOnFocusLoss
                 draggable
                 pauseOnHover
             />
 
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
                                     <Col xs="12"><h1 className="text-dark mt-5">Reset your password</h1>
                                         <p className="fs-16 fR">
                                             <span className="text-muted"> Don’t you have an account?</span> 
                                             <Card.Link href="" className="fs-16 fR" style={{color:'#33bc35'}} onClick={registerRedirect}> Signup</Card.Link> 
                                         </p>
                                     </Col>
 
                                     <Col xs={12}>
                                         <Form onSubmit = {submitForm}>
                                                <Form.Group className=" m-auto">
                                                    <label className="fs-14 text-muted fR">Email Address</label>
                                                    <Form.Control className="fR h-auto text-left" type="email" required  name="email" onChange={inputElement}  placeholder="Enter your email address" />
                                                    <span className="text-danger">{error.email}</span>
                                                    <br />
                                                </Form.Group>     
                                                <Button type="submit" className="btn-sm mt-3 submit_btn" variant="success" block>
                                                    Reset Password
                                                </Button>
                                         </Form>
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
