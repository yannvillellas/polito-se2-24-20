import { useState } from 'react';
import { Container, Card, Row, Col, Table, Spinner} from 'react-bootstrap';



function CallCustomer() {

// La lista dei ticket da chiamare e i rispettivi #Currier arrivano dalla "story 2".
  const [callings, setCallings] = useState([ 
    {id: 0, ticket: 1001, currier: 3},
    {id: 1, ticket: 1002, currier: 1},
    {id: 2, ticket: 1003, currier: 5},
    {id: 3, ticket: 1004, currier: 7}
  
  ]);
  /* Versione che prende dal db:
  const [callings, setCallings] = useState([]);
  useEffect(() => {
    const services = await API.getCallings();
    setCallings(callings);
  }, []);
  */

  // Lista dei servizi (va presa dal db), non è esplicitamente specificata nella "Story 3 8callCustomer)". La aggiungo per soddisfare il requisito di visualizzazione delle code (nelle specifiche generali)
  const [services, setServices] = useState([
    {id: 1, name: 'Postal savings', userInQueue: 5, serviceTime: 10},
    {id: 2, name: 'National shipping of parcel', userInQueue: 3, serviceTime: 15 },
    {id: 3, name: 'Credit and debit cards', userInQueue: 10, serviceTime: 8 },
    {id: 4, name: 'SPID', userInQueue: 5, serviceTime: 12 },
    {id: 5, name: 'Bill payments', userInQueue: 3},
    {id: 6, name: 'Insurance', userInQueue: 10, serviceTime: 8 },
    {id: 7, name: 'International shipping of parcel', userInQueue: 10, serviceTime: 10},
  ]);

  /* Versione che prende dal db:
  const [services, setServices] = useState([]);
  useEffect(() => {
    const services = await API.getServices();
    setServices(services);
  }, []);
  */

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
                                {callings.map((c) => <CallingRow calling={c} key={c.id}/>)}
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
                        {services.map((s) => <ServiceRow service={s} key={s.id}/>)}
                    </tbody>

                </Table>
                
            </Row>

        </Container>
        </>

    );

}


function CallingRow(props){
    return(
        <tr>
            <td> 
                {props.calling.ticket} 
            </td>

            <td>
                {props.calling.currier}
            </td>

            <td>
                <Spinner animation="grow" variant="success" /> 
            </td>
        </tr>
    )
}


function ServiceRow(props){
    return(
        <tr>
            <td>
                {props.service.name}
            </td>
            <td>
                {props.service.userInQueue}
            </td>
        </tr>
    )
}












export default CallCustomer;

