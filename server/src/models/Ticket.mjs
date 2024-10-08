class Ticket{
    constructor(ticketId, number, estimatedTime, serviceId, timeId){
        this.ticketId = ticketId; 
        this.number = number; 
        this.estimatedTime = estimatedTime; 
        this.serviceId = serviceId;
        this.timeId = timeId;
    }
}

export default Ticket;