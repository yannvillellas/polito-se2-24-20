import { useState } from 'react';
import { Container, Card, Row, Col, Table, Spinner, Button} from 'react-bootstrap';
import nextCustomerAPI from '../../api/nextCustomerAPI';
import callCustomer from '../../API/callCustomer.mjs';


function Officer(){

    const [actualCounter, setActualCounter] = useState(1);
    const [actualCustomerInfo, setActualCustomerInfo] = useState(null); // dove actual customer = actualTicket

    const handleClick = async () => {

        if(actualCustomerInfo){
            // Se prima c'era un ticket chiamato, lo salvo come servito
            nextCustomerAPI.saveDoneTicket(actualCustomerInfo, actualCounter); //  DA testare 2
        }

        const nextCustomer = await nextCustomerAPI.getNextCustomer(actualCounter); // Funziona: il nextCustomer è: {serviceId: 1, number: 1}

        console.log("Sono in Officer, handleClick, ecco il nextCustomer", nextCustomer);

        
        // Lo salvo nel database ticket calling
        callCustomer.saveCallingTicket(nextCustomer, actualCounter); // Funziona!
        setActualCustomerInfo(nextCustomer);
        
        
    }

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