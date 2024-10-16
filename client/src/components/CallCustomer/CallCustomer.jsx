import ServiceAPI from "../../API/serviceAPI.mjs";

import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Table, Spinner} from 'react-bootstrap';
import callCustomer from "../../API/callCustomer.mjs";


function CallCustomer(props) {

// La lista dei ticket da chiamare e i rispettivi #Currier arrivano dalla "story 2".


    const [services, setServices] = useState([]);


    // Per velocizzare il caricamento di services, lo carico una volta sola all'inizio
    useEffect(()=>{
        const fetchServices = async () => {
            const listServices = await ServiceAPI.getServices();
            setServices(listServices);
        };
        fetchServices();
    }, []);
    // E poin ne facico il polling per agigornare la la coda
    useEffect(()=>{

        const interval = setInterval(async () => {
        
            const listServices = await ServiceAPI.getServices();
            setServices(listServices);
    
            return () => clearInterval(interval); // Cleanup quando il componente viene smontato
        }, 1000); // Poll ogni 5 secondi
    }, [])

    const [customers, setCustomers] = useState([]);
      
    useEffect(() => {
        // Polling 
        const interval = setInterval(async () => {
            
            const customers = await callCustomer.getAllCustomers();
            setCustomers(customers);

            }, 1000); // Poll ogni 5 secondi
        return () => clearInterval(interval); // Cleanup quando il componente viene smontato
    }, []);
    


    return (

        <>
        <Container className='mt-4'>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#Ticket</th>
                                <th>#Currier</th>
                                <th>Calling</th>
                            </tr>
                        </thead>
                        <tbody>
                                
                                {customers.map((c) => <CallingRow calling={c} key={c.ticketNumber}/>)}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Row>
                <Col>
                    <p className="text-center display-6">Waiting list: </p>
                </Col>
            </Row>

            <Row>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Services</th>
                            <th>Queue lenght</th>
                        </tr>
                    </thead>

                    <tbody>
                        {services.map((s) => <ServiceRow service={s} key={s.serviceId}/>)}
                    </tbody>

                </Table>
                
            </Row>

        </Container>
        </>

    );

}


function CallingRow(props){
    return(
        <>
        <tr>
            <td> 
                {props.calling.ticketNumber} 
            </td>

            <td>
                {props.calling.courrierNumber}
            </td>

            <td>
                <Spinner animation="grow" variant="success" /> 
            </td>
        </tr>
       </>
    )
}


function ServiceRow(props){
    return(
        <tr>
            <td>
                {props.service.name}
            </td>
            <td>
                {props.service.numberInQueue}
            </td>
        </tr>
    )
}












export default CallCustomer;

