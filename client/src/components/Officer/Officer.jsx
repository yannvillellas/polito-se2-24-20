import { useState } from 'react';
import { Container, Card, Row, Col, Table, Spinner, Button} from 'react-bootstrap';
import nextCustomerAPI from '../../api/nextCustomerAPI';


function Officer(props){

    const [actualCounter, setActualCounter] = useState(1);
    const [actualTicketNumber, setActualTicketNumber] = useState(null); // dove actual customer = actualTicket

    const handleClick = async () => {
        console.log("sono in NextCustomer.jsx");

        if(actualTicketNumber){
            // salvo nel database Done_ticket:
            console.log("sono in NextCustomer.jsx, saveDoneTicket");
            nextCustomerAPI.saveDoneTicket(actualTicketNumber, actualCounter);
            // cancello il ticket dalla coda
            console.log("sono in Officer, dopo primo, ecco pre-modifica servingTickets",props.servingTickets);
            props.setServingTickets((prep) => prep.filter((c) => c.number !== actualTicketNumber));
            console.log("sono in Officer, ecco dopo primo, post-modifica servingTickets",props.servingTickets);

        
        }

        console.log("sono in NextCustomer.jsx, getNextCustomer");
        const nextCustomer = await nextCustomerAPI.getNextCustomer(actualCounter);
        console.log("sono in Officer, ecco il next customer che mi ha ritornato il server: ", nextCustomer);

        // manda questo bigllietto a callCustomer (per la tabella di chiamata)
        console.log("sono in Officer, ecco pre-aggiunta servingTickets",props.servingTickets);
        props.setServingTickets((prep) => [...prep, {ticketNumber: nextCustomer, counterNumber: actualCounter}]);
        console.log("sono in Officer, ecco post-aggiunta servingTickets",props.servingTickets);

        
        setActualTicketNumber(nextCustomer);
        
    }

    return(<>
        <Container>
            
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Counter {actualCounter} </Card.Title>
                            <Card.Text>
                                {actualTicketNumber ? actualTicketNumber.number : "No customer called yet"}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Button onClick={handleClick}> Call Next customer! </Button>
                </Col>
            </Row>


        </Container>
    
    </>)
}


export default Officer;