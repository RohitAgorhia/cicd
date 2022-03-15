import React,{useEffect,useState} from 'react';
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container,Row,Col,Form,Button,Card } from "react-bootstrap";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';

import loginLogo from "../img/loginLogo.png";
import loginSideBg from "../img/login-bg.jpg";
require('dotenv').config()

  
const Register = () => {    
    const history = useHistory();
    const cookies = new Cookies();


    const [id, setId] = useState();


    // Mannuly Signup process
    const [error, setError] = useState({});
    const [data, setData] = useState({
        current: "",
        new: "",
        repeat: "",
    });

    useEffect(() => {       
        const userID=cookies.get('Seesiu_id')
        setId(userID);

    },[]);

    const inputElement = (event) => {
        event.persist();

        setData(data => ({ ...data,
            [event.target.name]: event.target.value
        }));
    }

    const validateForm = (values) => {
        let isValid = true;

        if (values.new !== values.repeat) {
            isValid = false;
            setError({repeat:'Password confirmation does not match the new password'});
        }

        return isValid;
    }

    const submitForm = (event) => {
        event.preventDefault()
        if(validateForm(data)){

            const newUser = {
                user_id: id,
                new_password: data.new,
                old_password: data.current,
            };

            const ApiURL= process.env.REACT_APP_API_URL+'change_password';
            axios.post(ApiURL, newUser).then(res => {
                const resp = res.data;
                if(resp.status === 'success'){
                    event.target.reset();                    
                    toast.success(resp.message);

                    setInterval(
                        logout()
                    , 3000);
                    
                }else{
                    toast.warn(resp.message);
                }
            }).catch(err =>{
                toast.warn(err);
            });
        }

    }


    const logout = () => {
        cookies.remove('Seesiu_id');
        cookies.remove('Seesiu_name');
        cookies.remove('Seesiu_lastname')
        cookies.remove('Seesiu_email')
        cookies.remove('Seesiu_auth_token')

        history.push("/login");
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
                                     <Col xs="12"><h1 className="text-dark mt-5">Change password</h1>                                         
                                     </Col>
 
                                     <Col xs={12}>
                                         <Form onSubmit = {submitForm}>
                                                <Form.Group className=" m-auto">
                                                    <label className="fs-14 text-muted fR">Current password</label>
                                                    <Form.Control className="fR h-auto text-left" type="password" required  name="current" onChange={inputElement}  placeholder="Enter your current password " />
                                                    <span className="text-danger">{error.current}</span>
                                                    <br />

                                                    <label className="fs-14 text-muted fR">New password</label>
                                                    <Form.Control className="fR h-auto text-left" type="password" required  name="new" onChange={inputElement}  placeholder="Enter your new password" />
                                                    <span className="text-danger">{error.new}</span>
                                                    <br />

                                                    <label className="fs-14 text-muted fR">Repeat new password</label>
                                                    <Form.Control className="fR h-auto text-left" type="password" required  name="repeat" onChange={inputElement}  placeholder="Enter your repeat password" />
                                                    <span className="text-danger">{error.repeat}</span>
                                                    <br />
                                                </Form.Group>     
                                                <Button type="submit" className="btn-sm mt-3 submit_btn" variant="success" block>
                                                    Change Password
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
