import { useState } from 'react';
import { Container, Card, Row, Col, Table, Spinner, Button} from 'react-bootstrap';
import nextCustomerAPI from '../../api/nextCustomerAPI';
import callCustomer from '../../API/callCustomer.mjs';


function Officer(){

    const [actualCounter, setActualCounter] = useState(1);
    const [actualCustomerInfo, setActualCustomerInfo] = useState(null); // dove actual customer = actualTicket

    const [hasTickets, setHasTickets] = useState(true); // Stato per la disponibilità dei ticket

    const handleClick = async () => {
        if (actualCustomerInfo) {
            await nextCustomerAPI.saveDoneTicket(actualCustomerInfo, actualCounter);
        }

        const nextCustomer = await nextCustomerAPI.getNextCustomer(actualCounter);

        if (nextCustomer) {
            console.log("Sono in Officer, handleClick, ecco il nextCustomer", nextCustomer);
            callCustomer.saveCallingTicket(nextCustomer, actualCounter);
            setActualCustomerInfo(nextCustomer);
        } else {
            // Se non ci sono più ticket, disabilitiamo il pulsante
            setHasTickets(false);
        }
    };

    return(<>
        <Container>
            
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Counter {actualCounter} </Card.Title>
                            <Card.Text>
                                {actualCustomerInfo ? actualCustomerInfo.number : "No customer called yet"}
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