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

};

export default OfficerDashboard;
