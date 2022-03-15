import React,{useEffect,useState}  from 'react';
// import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container,Row,Col } from "react-bootstrap";
import Cookies from 'universal-cookie';
import Seesiu_Logo from "../img/login_logo.jpg";
import '../customcss/customBody.css';
import ProviderList from "./providerList";
import axios from 'axios';


  
const Dashboard = () => {     
    const cookies = new Cookies();

    // const history = useHistory();
    // const logout = () => {
    //     cookies.remove('Seesiu_id');
    //     cookies.remove('Seesiu_name');
    //     cookies.remove('Seesiu_lastname')
    //     cookies.remove('Seesiu_email')
    //     cookies.remove('Seesiu_auth_token')

    //     history.push("/register");
    // }

    // Data
    const [data, setData] = useState([]);
    const [id, setId] = useState();

    const getdata = () => {
        let ApiURL = process.env.REACT_APP_API_URL+"getretailer";
        axios.get(ApiURL).then(res => {
            const resp = res.data;
            if(resp.status === 'success'){ 
                if(resp.data.length > 0){
                    setData(resp.data);
                }                 
            }               
        }).catch(err =>{
            console.warn("Error:",err);
        });
    }

    useEffect(() => {
        getdata();
        const userID=cookies.get('Seesiu_id')
        setId(userID);

    },[]);

    function fetchData(val){      
        return(
            <ProviderList 
                image={val.logo}
                name={val.name}
                ref_link=
                {id ? 
                        val.type ==='Rakuten' ? val.longlink+"&u1="+id :
                        val.type ==='FlexOffers' ? val.longlink+"&fobs="+id :
                        val.longlink+"&pref1="+id :
                        val.longlink
                }
            /> 
        )
    }

    return(  
        <Container fluid className="p-0">
            <header className="text-center pt-2 pb-2 webHeader"><img height="60"  src={Seesiu_Logo} alt="Seesiu_Logo" /></header>   
            <Container >
                <Row>
                    <Col xs={12} className="text-center mt-3">
                        <h1>Now your order will be made carbon neutral at all your favourite stores! When you see the Seesiu logo just click the button and we’ll do the rest when you make a purchase.</h1>
                        <h5>Click the stores below to give it a try!</h5>
                    </Col>

                    {data.map(fetchData)} 
                    
                </Row>
            </Container>
        </Container>          
    );
}

export default Dashboard;
