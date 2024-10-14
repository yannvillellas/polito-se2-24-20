import { useState } from 'react';
import { Container, Card, Row, Col, Table, Spinner, Button} from 'react-bootstrap';
import nextCustomerAPI from '../../api/nextCustomerAPI';
import './Officer.css';


function Officer(){

    const [actualCounter, setActualCounter] = useState(1);
    const [actualTicketNumber, setActualTicketNumber] = useState(null); // dove actual customer = actualTicket

    const handleClick = async () => {
        console.log("sono in NextCustomer.jsx");

        if(actualTicketNumber){
            // salvo nel database Done_ticket:
            console.log("sono in NextCustomer.jsx, saveDoneTicket");
            await nextCustomerAPI.saveDoneTicket(actualTicketNumber, actualCounter);
        
        }

        console.log("sono in NextCustomer.jsx, getNextCustomer");
        const nextCustomer = await nextCustomerAPI.getNextCustomer(actualCounter);
        console.log(nextCustomer);
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
