import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import TicketAPI from "../../API/ticketAPI.mjs";
import ServiceAPI from "../../API/serviceAPI.mjs";
import TimeAPI from "../../API/TimeAPI.mjs";
import CounterServicesAPI from "../../API/CounterSarvicesAPI.mjs";
import callCustomer from "../../API/callCustomer.mjs";
import { useNavigate } from "react-router-dom";
import './getTicket.css';

const GetTicket = () => {
    const [services, setServices] = useState([]);
    const [number, setNumber] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [lastNumber, setLastNumber] = useState(null);
    const [timeId, setTimeId] = useState(null);
    const [waitingTime, setWaitingTime] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null); 
    const [clickedButton, setClickedButton] = useState(false); 
    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchServices = async () => {
            const listServices = await ServiceAPI.getServices();
            setServices(listServices);
        };

        const fetchLastNumber = async () => {
            const lastNumber = await TicketAPI.getLastNumber();
            setLastNumber(lastNumber);
        };
        
        const fetchTimeId = async () => {
            const timeId = await TimeAPI.getTodayTimeId();
            setTimeId(timeId);
        };
        
        fetchServices();
        fetchLastNumber();
        fetchTimeId();
        
    }, []);

    const handleClickNumber = async () => {
        if (!selectedService) {
            alert("Please select a service!");
            return;
        } else {
            try {
                await callCustomer.updateServiceNumberInQueue(selectedService.serviceId)
                const numberInQueue = selectedService.numberInQueue
                const counterNumbers = await CounterServicesAPI.getNumberOfCountersForService(selectedService.serviceId);
                let sum = 0;
                for (let counter of counterNumbers) {
                    const numberServed = await CounterServicesAPI.getNumberOfServicesForCounter(counter);
                    sum += (1 / numberServed);
                }
                const estimatedTime = selectedService.serviceTime * ((numberInQueue / sum) + 0.5);
                setWaitingTime(estimatedTime);

                const newNumber = await TicketAPI.createTicket(lastNumber, estimatedTime, selectedService.serviceId, timeId);
                setNumber(newNumber);

            } catch (error) {
                console.error("Errore durante la generazione del ticket:", error);
            }
        }
    };

    
    
    // functioin to convert minutes in hours and minutes
    const formatWaitingTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = Math.floor(minutes % 60);
        if (hours > 0) {
            return `${hours}h ${remainingMinutes}min`;
        } else {
            return `${remainingMinutes}min`;
        }
    };

    return (
        <>
            {!number && (
                <>
                    <h2 style={{ textAlign: 'center', margin: '20px 0', color: '#4e85b6' }}>Available Services</h2>
                    <div className="service-buttons">
                        {services.map((service, index) => (
                            <Button 
                                key={index} 
                                style={{
                                    backgroundColor: hoveredButton === index ? '#6e92b2' : '#85ABCE',
                                    color: 'white',
                                    border: selectedService === service ? '3px solid #4a6781' : (clickedButton === index ? '2px solid #4a6781' : 'none'),
                                    marginBottom: '10px',
                                    transition: 'background-color 0.3s ease, border 0.3s ease',
                                }}
                                onMouseEnter={() => setHoveredButton(index)}
                                onMouseLeave={() => setHoveredButton(null)}
                                onMouseDown={() => setClickedButton(index)}
                                onMouseUp={() => setClickedButton(false)}
                                onClick={() => {
                                    setSelectedService(service);
                                }}
                            >
                                {service.name}
                            </Button>
                        ))}
                    </div>

                    <p className="info-paragraph">
                        Select a service, then click on "Get Ticket" to receive your ticket number and the estimated wait time.
                    </p>
                </>
            )}

            {number ? (
                <div className="ticket-box" style={{
                    backgroundColor: '#f8f9fa',
                    border: '2px solid #ABCE85',
                    borderRadius: '10px',
                    padding: '20px',
                    textAlign: 'center',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    maxWidth: '400px',
                    margin: '20px auto'
                }}>
                    <p className="ticket-info" style={{ fontSize: '18px', color: '#333' }}>Il tuo numero di ticket</p>
                    <p className="ticket-number" style={{ fontSize: '36px', color: '#ABCE85', fontWeight: 'bold' }}>{number}</p>
                    <p className="waiting-time" style={{ fontSize: '18px', color: '#333' }}>Tempo di attesa stimato: {formatWaitingTime(waitingTime)}</p>
                    
                    <Button
                        key = {-1}
                        style={{
                            backgroundColor: '#6e92b2' ,
                            color: 'white',
                            border: 'none',
                            marginBottom: '10px',
                            transition: 'background-color 0.3s ease, border 0.3s ease',
                        }}
                        onMouseEnter={() => setHoveredButton(-1)}
                        onMouseLeave={() => setHoveredButton(null)}
                        onMouseDown={() => setClickedButton(-1)}
                        onMouseUp={() => setClickedButton(false)}
                        onClick={() => {
                            navigate('/customer/queue')
                        }}
                    >
                        GO TO DISPLAY
                    </Button>
                </div>

            ) : (
                <div className="button-container">
                    <Button 
                        style={{
                            backgroundColor: hoveredButton === 'get-number' ? '#85b84e' : '#92bf61',
                            color: 'white',
                            border: clickedButton === 'get-number' ? '2px solid #7dba71' : 'none',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            transition: 'background-color 0.3s ease, border 0.3s ease',
                        }}
                        onMouseEnter={() => setHoveredButton('get-number')}
                        onMouseLeave={() => setHoveredButton(null)}
                        onMouseDown={() => setClickedButton('get-number')}
                        onMouseUp={() => setClickedButton(false)}
                        onClick={handleClickNumber}
                    >
                        Get Ticket
                    </Button>
                </div>
            )}
        </>
    );
};

export default GetTicket;
