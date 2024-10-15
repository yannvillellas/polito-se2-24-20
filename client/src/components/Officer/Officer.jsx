import { useState } from 'react';
import { Container, Card, Row, Col, Table, Spinner, Button} from 'react-bootstrap';
import nextCustomerAPI from '../../api/nextCustomerAPI';
import callCustomer from '../../API/callCustomer.mjs';


function Officer(){

    const [actualCounter, setActualCounter] = useState(1);
    const [actualTicketNumber, setActualTicketNumber] = useState(null); // dove actual customer = actualTicket

    const handleClick = async () => {
        console.log("sono in NextCustomer.jsx");

        if(actualTicketNumber){
            // salvo nel database Done_ticket:
            console.log("sono in NextCustomer.jsx, saveDoneTicket");
            nextCustomerAPI.saveDoneTicket(actualTicketNumber, actualCounter); //  DA testare 2

        }

        const nextCustomer = await nextCustomerAPI.getNextCustomer(actualCounter); // Da testare 1
        console.log("sono in NextCustomer.jsx, ecco il nextCustomer", nextCustomer);
        // Lo salvo nel database ticket calling
        console.log("sono in NextCustomer.jsx, saveCallingTicket");
        callCustomer.saveCallingTicket(nextCustomer, actualCounter); // Da testare 3
        console.log("sono in NextCustomer.jsx, sono tornato da saveCallingTicket ");
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