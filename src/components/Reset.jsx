import React,{useState,useEffect} from 'react';
import { useParams,useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container,Row,Col,Form,Button,Card } from "react-bootstrap";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginLogo from "../img/loginLogo.png";
import loginSideBg from "../img/login-bg.jpg";
import Cookies from 'universal-cookie';
require('dotenv').config()

  
const Register = () => {    

    const history = useHistory();
    const cookies = new Cookies();
    let { id } = useParams();
    const [Username, setUsername] = useState('');
    const [seesioOut, setSession] = useState('');


    const getUserDetail = (id) =>{
        const param={
            "user_id":id, 
        };
    
        const ApiURL= process.env.REACT_APP_API_URL+'user_details';
        axios.post(ApiURL,param).then(res => {
            const resp = res.data;
            if(resp.status === 'success'){

                var difference = Math.floor(Date.now()) - resp.data.forgotTime;
                var resolutionTime = (((difference / 1000) / 60)/ 60)

                if(Math.round(resolutionTime) > 3){
                    setSession("Error timeout");
                }  
                setUsername(resp.data.name);
            }               
        }).catch(err =>{
            toast.warn(err);
        }); 
    }
     
    useEffect(() => {        
        getUserDetail(id);
    }, [getUserDetail()]);
    

    const submitForm = (event) => {
        event.preventDefault()
        if(validateForm(data)){

            const param={
                "user_id":id, 
                "password":data.password,
            };

            const ApiURL= process.env.REACT_APP_API_URL+'reset_password';
            axios.post(ApiURL,param).then(res => {
                const resp = res.data;
                if(resp.status === 'success'){

                    // Cookies Store
                    cookies.set('Seesiu_id', resp.data._id, { path: '/' });
                    cookies.set('Seesiu_name', resp.data.name, { path: '/' });
                    cookies.set('Seesiu_lastname', resp.data.lastname, { path: '/' });
                    cookies.set('Seesiu_email', resp.data.email, { path: '/' });
                    cookies.set('Seesiu_auth_token', resp.token, { path: '/' });
                    cookies.set('Seesiu_co2', resp.co2_user_offset, { path: '/' });
                    cookies.set('Seesiu_perks', resp.seesiu_perks, { path: '/' });
                    cookies.set('Seesiu_referCode', resp.referCode, { path: '/' });
                    
                    toast.success(resp.message);
                    setTimeout(() => {                        
                        history.push("/dashboard");
                    }, 2000);
                }else{
                    toast.warn(resp.message);
                }
            }).catch(err =>{
                toast.warn(err);
            });
        }

    }

    const validateForm = (values) => {
        let isValid = true;

        if (values.password !== values.C_password) {
            isValid = false;
            setError({c_password:'Password confirmation does not match the password'});
        }

        return isValid;
    }

    // Mannuly Signup process
    const [error, setError] = useState({});
    const [data, setData] = useState({       
        password: "",
        C_password: "",
    });

    const inputElement = (event) => {
        event.persist();
        setData(data => ({ ...data,
            [event.target.name]: event.target.value
        }));
    }

    const loginRedirect = () => {
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
                                     <Col xs="12"><h1 className="text-dark mt-5">Change Password</h1>
                                         <p className="fs-16 fR">
                                             <span className="text-muted"> Change password for @<strong>{Username}</strong> </span> 
                                         </p>
                                     </Col>
                                     {seesioOut === 'Error timeout'?    
                                        <Col xs={12}>
                                            <span className="text-danger">It looks like you clicked on an invalid password reset link. Please try again.</span>
                                            <Card.Link href="" className="fs-16 fR" style={{color:'#33bc35'}} onClick={loginRedirect}> Login</Card.Link> 
                                        </Col>
                                     :
        
                                     <Col xs={12}>
                                         <Form onSubmit = {submitForm}>
                                            <Form.Group className=" m-auto">

                                                <label className="fs-14 text-muted fR">Password</label>
                                                    <Form.Control className="fR h-auto text-left" type="password" required  name="password" onChange={inputElement} placeholder="Password"/>
                                                <span className="text-danger">{error.password}</span>  

                                                <label className="fs-14 text-muted fR">Confirm Password</label>
                                                    <Form.Control className="fR h-auto text-left" type="password" required  name="C_password" onChange={inputElement}  placeholder="Confirm Password" />
                                                <span className="text-danger">{error.c_password}</span>
                                                <br />
                                            </Form.Group>

                                             <Button type="submit" className="btn-sm mt-3 submit_btn" variant="success" block>
                                                Change Password
                                             </Button>
                                         </Form>
                                     </Col>
                                    }

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
