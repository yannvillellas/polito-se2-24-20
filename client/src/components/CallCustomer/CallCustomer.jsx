import ServiceAPI from "../../API/serviceAPI.mjs";

import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Table, Spinner} from 'react-bootstrap';
import callCustomer from "../../API/callCustomer.mjs";


function CallCustomer(props) {

// La lista dei ticket da chiamare e i rispettivi #Currier arrivano dalla "story 2".
    console.log("Sono in CallCustomer, ecco i servingTickets",props.servingTickets);


    const [services, setServices] = useState([]);
    useEffect(()=>{
        const fetchServices = async ()=>{
            const listServices = await ServiceAPI.getServices();
            setServices(listServices);
        }

        fetchServices()
    }, [])

    const [customers, setCustomers] = useState([]);
      
    useEffect(() => {
        // Polling 
        const interval = setInterval(async () => {
            const customers = await callCustomer.getAllCustomers();
            console.log("sono in CallCustomer, ecco i customers", customers);
            setCustomers(customers);
            }, 5000); // Poll ogni 5 secondi
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

