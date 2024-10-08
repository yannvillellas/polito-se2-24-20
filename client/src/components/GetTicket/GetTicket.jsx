import { useState, useEffect } from "react";
import {Button} from 'react-bootstrap'
import TicketAPI from "../../API/ticketAPI.mjs";
import ServiceAPI from "../../API/serviceAPI.mjs";
import TimeAPI from "../../API/TimeAPI.mjs";
import CounterServicesAPI from "../../API/CounterSarvicesAPI.mjs";
import './getTicket.css'

const GetTicket = () =>{
    const [services, setServices] = useState([]);
    const [number, setNumber] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [lastNumber, setLastNumber] = useState(null);
    const [timeId, setTimeId] = useState(null);
    const [waitingTime, setWaitingTime]=useState(null);
    
    useEffect(()=>{
        const fetchServices = async ()=>{
            const listServices = await ServiceAPI.getServices()
            setServices(listServices);
        }

        const fetchLastNumber = async()=>{
            const lastNumber = await TicketAPI.getLastNumber()
            setLastNumber(lastNumber);
        }

        const fetchTimeId = async()=>{
            const timeId = await TimeAPI.getTodayTimeId()
            setTimeId(timeId);
        }

        fetchServices()
        fetchLastNumber()
        fetchTimeId()
    },[])

    const handleClickNumber = async ()=>{
        if(!selectedService){
            alert("Please select a service!");
            return;
        }else{
            try{
                const counterNumbers = await CounterServicesAPI.getNumberOfCountersForService(selectedService.serviceId);
                console.log("counterNumbers: ", counterNumbers);
                let sum = 0
                for(let counter of counterNumbers){
                    const numberServed = await CounterServicesAPI.getNumberOfServicesForCounter(counter);
                    console.log("numberServed: ", numberServed);
                    sum += (1/numberServed);
                    console.log("sum: ", sum);
                }
                console.log("sum2: ", sum);
                const estimatedTime = selectedService.serviceTime * ((selectedService.numberInQueue/sum)+0.5);
                setWaitingTime(estimatedTime);
                console.log("estimatedTime: ", estimatedTime);

                const newNumber = await TicketAPI.createTicket(lastNumber, estimatedTime, selectedService.serviceId , timeId) 
                console.log("newNumber: ", newNumber);
                setNumber(newNumber);
            } catch (error) {
                console.error("Errore durante la generazione del ticket:", error);
            }
        }

    }

    
    return (
        <>
            <div className="service-buttons">
                {services.map((service, index) => (
                    <Button 
                        key={index} 
                        variant="info" 
                        className="mb-2" 
                        onClick={() => {
                            setSelectedService(service);
                            console.log(`${service.name} clicked`);
                        }}
                    >
                        {service.name}  
                    </Button>
                ))}
            </div>


            {number ? (
                <>
                    <p>YOUR NUMBER</p>
                    <p>{number}</p>
                    <p>WAITING TIME</p>
                    <p>{waitingTime} min</p>
                </>
            ) : (
                <div>
                    <Button 
                        variant="danger" 
                        className="mb-2" 
                        onClick={() => { handleClickNumber() }}
                    >
                        Get Your Number
                    </Button>
                </div>
            )}
        </>
    );
}

export default GetTicket;