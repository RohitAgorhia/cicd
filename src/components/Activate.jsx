import React,{useEffect} from 'react';
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container,Row,Col, Card,Spinner } from "react-bootstrap";
import Cookies from 'universal-cookie';
import axios from 'axios';

  
const Home = () => {  
    const cookies = new Cookies();
    let { id } = useParams();

    useEffect(() => {        
        const Userid= cookies.get('Seesiu_id');
        getProviderdetail(id,Userid);
    }, []);


    const getProviderdetail = (id,Userid) =>{
        const param={
            "retailer_id":id, 
        };
    
        let ApiURL = process.env.REACT_APP_API_URL+"retailer_details";
        axios.post(ApiURL,param).then(res => {
            const resp = res.data;
            if(resp.status === 'success'){ 
                let link='';   
                
                if(Userid !== ''){
                    if(resp.data.type === 'Rakuten'){
                        link=resp.data.longlink+"&u1="+Userid;
                    }
                    else if(resp.data.type === 'AF'){
                        link=afLink(resp.data.longlink,Userid);
                    }else{
                        link=resp.data.longlink+"&pref1="+Userid;
                    }
                }else{
                    link=resp.data.longlink;
                }
                setInterval(
                    window.location.href=link
                , 3000);
            }               
        }).catch(err =>{
            console.warn("Error:",err);
        }); 
    }
   

    //AF long link convert 
    function afLink(url,user_id) {
        let newUrl= url.replace("tracking=","tracking="+user_id);
        console.log("URL"+newUrl);
        return newUrl;
     }

    
    
    return(        
        <Container fluid className="mt-0 pl-0">            
            <Row className="justify-content-center mt-5">
                <Col xs={12}>
                    <Container>
                        <Row>
                            <Col className="text-center">                        
                                <Card className="text-center loadingBg" style={{height:'90vh', boxShadow:'0 0 20px rgba(0,0,0,0.6)'}}>
                                <span className="loaderBox"><Spinner animation="border" variant="success" size="sm" style={{width:'80px', height:'80px'}} /></span>
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