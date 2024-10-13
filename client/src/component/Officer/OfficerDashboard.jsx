import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import './OfficerDashboard.css';

const OfficerDashboard = () => {
    const [nextCustomer, setNextCustomer] = useState(null); // Next customer to serve
    const [servedCustomers, setServedCustomers] = useState(0); // Number of served customers
    const [queue, setQueue] = useState([
        { ticketNumber: 'A001', service: 'Deposit Money' },
        { ticketNumber: 'A002', service: 'Withdraw Money' },
        { ticketNumber: 'A003', service: 'Send Package' }
    ]); // Mock queue data

    const handleCallNext = () => {
        if (queue.length > 0) {
            const nextInLine = queue[0]; // Get the first customer in the queue
            setNextCustomer(nextInLine); // Set as the next customer to serve
            setQueue(queue.slice(1)); // Remove the served customer from the queue
            setServedCustomers(servedCustomers + 1); // Increment served customers count
        } else {
            setNextCustomer(null); // No customers in the queue
        }
    };

    return (
        <div className="officer-dashboard">
            <h2>Officer Dashboard</h2>

            {/* Show carrier number and services */}
            <div className="info">
                <h4>Carrier Number: 1</h4>
                <p>Services: Deposit Money, Withdraw Money, Send Package</p>
            </div>

            {/* Show the next customer details */}
            <div className="next-customer">
                {nextCustomer ? (
                    <div>
                        <h5>Next Customer: {nextCustomer.ticketNumber}</h5>
                        <p>Service: {nextCustomer.service}</p>
                    </div>
                ) : (
                    <h5>No customers in the queue</h5>
                )}
            </div>

            {/* Show the number of served customers */}
            <div className="served-customers">
                <p>Customers served: {servedCustomers}</p>
            </div>

            {/* Button to call the next customer */}
            <Button variant="primary" onClick={handleCallNext} disabled={queue.length === 0}>
                Call Next Customer
            </Button>

            {/* Display remaining queue */}
            <div className="queue-table">
                <h5>Remaining Queue</h5>
                {queue.length > 0 ? (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Ticket Number</th>
                                <th>Service</th>
                            </tr>
                        </thead>
                        <tbody>
                            {queue.map((customer, index) => (
                                <tr key={index}>
                                    <td>{customer.ticketNumber}</td>
                                    <td>{customer.service}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p>The queue is empty.</p>
                )}
            </div>
        </div>
    );
};

export default OfficerDashboard;
