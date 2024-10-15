import ServiceAPI from "../../API/serviceAPI.mjs";

import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Table, Spinner} from 'react-bootstrap';



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


    useEffect(()=>{
        const callConsoleLog = async ()=>{
            console.log("Sono in CallCustomer, ecco i services",services);
        }
        callConsoleLog();
    }, [services])



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
                                
                                {props.servingTickets.map((c) => <CallingRow calling={c} key={c.id}/>)}
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
        /*
        <tr>
            <td> 
                {props.calling.ticketNumber} 
            </td>

            <td>
                {props.calling.counterNumber}
            </td>

            <td>
                <Spinner animation="grow" variant="success" /> 
            </td>
        </tr>
        */
       <p> {props.calling}</p>
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

