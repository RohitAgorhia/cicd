import React,{useState} from 'react';
import { useHistory,useParams } from "react-router-dom";
import validator from 'validator'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container,Row,Col,Form,Button,Card,Modal } from "react-bootstrap";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
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
    const [code, setCode] = useState(cookies.get('Seesiu_ShareCode'));   
    const [userid, setUserId] = useState();    
 

    // signup Process
    const SocailSignup = (param) =>{
        
        let ApiURL = process.env.REACT_APP_API_URL+"social_signup";
        axios.post(ApiURL,param).then(res => {
            const resp = res.data;
            if(resp.status === 'success'){

                setUserId(resp.data._id);

                // Cookies Store
                cookies.set('Seesiu_id', resp.data._id, { path: '/' });
                cookies.set('Seesiu_name', resp.data.name, { path: '/' });
                cookies.set('Seesiu_lastname', resp.data.lastname, { path: '/' });
                cookies.set('Seesiu_email', resp.data.email, { path: '/' });
                cookies.set('Seesiu_auth_token', resp.token, { path: '/' });
                cookies.set('Seesiu_co2', resp.co2_user_offset, { path: '/' });
                cookies.set('Seesiu_perks', resp.seesiu_perks, { path: '/' });

                if(resp.signup_status === 'new'){
                    // Open influencer Code modal
                    setShow(true);
                }else{
                    toast.success("Successfully sign-up!");
                    setTimeout(() => {                        
                        history.push("/dashboard");
                    }, 2000);
                }

            }else{
                toast.warn(resp.message);
            }
        }).catch(err =>{
            toast.warn(err);
        });
    }

    // Google response
    const responseGoogle = (response) => {
        const Google_obj={
            "name":response.profileObj.givenName,
            "lastname":response.profileObj.familyName,
            "email":response.profileObj.email,
            "signup_type":"gmail",
            "token":response.profileObj.googleId,
            "refer_by":code,
        };

        // call api
        SocailSignup(Google_obj);
    }

    // Google error
    const errorGoogle = (response) => {
        console.log(response);
        // toast.warn(response.error);
    }

    // Facebook response
    const responseFacebook = (response) => {
        const Facebook_obj={
            "name":response.name,
            "email":response.email,
            "signup_type":"facebook",
            "token":response.userID, 
            "refer_by":code,
        };

        // call api
        SocailSignup(Facebook_obj);
    }

    

    // Mannuly Signup process
    const [error, setError] = useState({});
    const [data, setData] = useState({
        email: "",
        username: "",
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
        } else if (!validator.isEmail(values.email)) {
            isValid = false;
            setError({email:'Email address is invalid'});
        }

        if (!values.password) {
            isValid = false;
            setError({password:'Password is required'});
        } 

        if (!values.name) {
            isValid = false;
            setError({name:'Name is required'});
        } 

        if (!values.lastname) {
            isValid = false;
            setError({lastname:'Last name is required'});
        }

        return isValid;
    }

    const submitForm = (event) => {
        event.preventDefault()
        if(validateForm(data)){

            const newUser = {
                name:data.name,
                lastname:data.lastname,
                email: data.email,
                password: data.password,
                refer_by:code,
                influencer_code:data.influencer_code
            };

            const signup= process.env.REACT_APP_API_URL+'signup';
            axios.post(signup, newUser).then(res => {
                const resp = res.data;
                if(resp.status === 'success'){
                    
                    setUserId(resp.data._id);

                    // Cookies Store
                    cookies.set('Seesiu_id', resp.data._id, { path: '/' });
                    cookies.set('Seesiu_name', resp.data.name, { path: '/' });
                    cookies.set('Seesiu_lastname', '', { path: '/' });
                    cookies.set('Seesiu_email', resp.data.email, { path: '/' });
                    cookies.set('Seesiu_auth_token', resp.token, { path: '/' });
                    cookies.set('Seesiu_referCode', resp.referCode, { path: '/' });
                    
                    // Open influencer Code modal
                    setShow(true);
                }else{
                    toast.warn(resp.message);
                }
            }).catch(err =>{
                toast.warn(err);
            });
        }
    }

    const updateCode = (event) => {
        event.preventDefault()
        setShow(false);

        const newUser = {
            user_id:userid,
            influencer_code:data.influencer_code,                
        };

        const signup= process.env.REACT_APP_API_URL+'influencer_code_update';
        axios.post(signup, newUser).then(res => {
            const resp = res.data;
            if(resp.status === 'success'){  
                
                
                toast.success("Successfully sign-up!");                    
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

    const loginRedirect = () => {
        history.push("/login");
    }

    const Dashboardedirect = () => {
        history.push("/dashboard");
    }


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


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
 
                     <Col md={6} className="bg-white scollDiv">
                         <Card className="border-0 rounded-0" style={{height:'93vh'}}>
                         <Card.Body>
                             <Container fluid>
                                 <Row>
                                     <Col xs="12"><h1 className="text-dark mt-5">Get Started</h1>
                                         <p className="fs-16 fR">
                                             <span className="text-muted"> Do you have an account?</span> 
                                             <Card.Link href="#" className="fs-16 fR" style={{color:'#33bc35'}} onClick={loginRedirect}> Login</Card.Link> 
                                         </p>
                                     </Col> 

                                     <Col xs={12} md={6}>
                                         {/* <Button variant="outline-secondary" className="w-100"><img src={googleIcon} width="22" height="22" block/>&nbsp;&nbsp;Login with Google</Button> */}
                                         <GoogleLogin
                                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                            onSuccess={responseGoogle}
                                            onFailure={errorGoogle}
                                            cookiePolicy={'single_host_origin'}
                                            className="Gbutton"
                                            buttonText="Continue with Google"
                                        />
                                     </Col> 
 
                                     <Col xs={12} md={6}>
                                         {/* <Button variant="outline-secondary" className="w-100"><img src={facebookIcon} width="22" height="22" block/>&nbsp;&nbsp;Login with Facebook</Button> */}
                                         <FacebookLogin
                                            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                                            autoLoad={false}
                                            fields="name,email,picture"
                                            callback={responseFacebook}
                                            cssClass="fbButton"
                                            textButton="Continue with Facebook"
                                        />
                                     </Col>
 
                                     <Col xs={12}>
                                         <span className="orDivider w-100 d-block text-center fs-16">Or</span>
                                         <Form onSubmit = {submitForm}>
                                            <Form.Group className=" m-auto">

                                                <label className="fs-14 text-muted fR">Name</label>
                                                    <Form.Control className="fR h-auto text-left" type="text" required  name="name" onChange={inputElement}  placeholder="Name" />
                                                    <span className="text-danger">{error.name}</span>
                                                <br />

                                                <label className="fs-14 text-muted fR">Last name</label>
                                                    <Form.Control className="fR h-auto text-left" type="text" required  name="lastname" onChange={inputElement}  placeholder="Last name" />
                                                    <span className="text-danger">{error.lastname}</span>
                                                <br />

                                                <label className="fs-14 text-muted fR">Email Address</label>
                                                    <Form.Control className="fR h-auto text-left" type="email" required  name="email" onChange={inputElement}  placeholder="Email" />
                                                    <span className="text-danger">{error.email}</span>
                                                <br />

                                                <label className="fs-14 text-muted fR">Password</label>
                                                    <Form.Control className="fR h-auto text-left" type="password" required  name="password" onChange={inputElement} placeholder="Password"/>
                                                    <span className="text-danger">{error.password}</span>  
                                                <br/> 
                                            </Form.Group>
      
                                            <Button type="submit" className="btn-sm mt-3 submit_btn" variant="success" block>
                                                Login
                                            </Button>
 
                                            <Form.Group className="mb-3 mt-3 fR fs-14" controlId="formBasicCheckbox">
                                                <Form.Check type="checkbox" className="d-inline-block align-top" required /> <span className="text-muted fR">I agree to the platform's</span> <Card.Link>Terms of Service</Card.Link> of <Card.Link>Privacy Policy</Card.Link>
                                            </Form.Group>
                                         </Form>
                                     </Col>
                                 </Row>
                             </Container>
                         </Card.Body>
                         </Card>
                     </Col>
                 </Row>

                 <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Do you have a code?</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit = {updateCode}>
                            <Form.Group className=" m-auto">
                                <Form.Control className="fR h-auto text-left" type="text"  name="influencer_code" onChange={inputElement}  placeholder="Code" required />
                                <span className="text-danger">{error.influencer_code}</span>
                                <br />
                            </Form.Group>
        
                            {/* <Button type="submit" className="btn-sm mt-3 submit_btn" variant="success" block>
                                Submit
                            </Button>  */}
                            <Button type="submit"  variant="success" >
                                Submit
                            </Button>
                        </Form>                    
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={Dashboardedirect}>
                            Don't have code.
                        </Button>
                    </Modal.Footer>

                </Modal>
             </Container>                   
         </Container> 



     );
}

export default Register;
