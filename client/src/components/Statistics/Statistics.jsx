import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { Row, Button } from "react-bootstrap";
import CustomerTable from "./CustomerTable"
import CounterTable from "./CountersTable";
import statsAPI from "../../API/statisticsAPI.mjs";
import './Statistics.css'

function Statistics(props) {

    let [stats2D, setStats2D] = useState([]);
    let [stats3D, setStats3D] = useState([]);
    let [statType, setStatType] = useState('');
    let [searched, setSearched] = useState(false);

    const search = async (parameters) => {
        let statistics2D;
        let statistics3D;
        let final2D;
        let final3D;

        if (parameters.type == 'daily') {
            await setStatType('daily');
            statistics2D = await statsAPI.stats2Dday(parameters.startDate, parameters.endDate);
            statistics3D = await statsAPI.stats3Dday(parameters.startDate, parameters.endDate);
            final2D = statistics2D
                .map(item => {
                    const time = `${item.day}/${item.month}/${item.year}`;
                    return {
                        time: time,
                        service: item.serviceName,
                        count: item.totalTickets
                    };
                })
            final3D = statistics3D
                .map(item => {
                    const time = `${item.day}/${item.month}/${item.year}`;
                    return {
                        time: time,
                        counter: item.counterN,
                        service: item.serviceName,
                        count: item.totalTickets
                    };
                });
        } else if (parameters.type == 'weekly') {
            await setStatType('weekly');
            statistics2D = await statsAPI.stats2Dweek(parameters.startDate, parameters.endDate);
            statistics3D = await statsAPI.stats3Dweek(parameters.startDate, parameters.endDate);

            final2D = statistics2D
                .map(item => {
                    const time = `${item.week}° ${item.month}/${item.year}`;
                    return {
                        time: time,
                        service: item.serviceName,
                        count: item.totalTickets
                    };
                })
            final3D = statistics3D
                .map(item => {
                    const time = `${item.week}° ${item.month}/${item.year}`;
                    return {
                        time: time,
                        counter: item.counterN,
                        service: item.serviceName,
                        count: item.totalTickets
                    };
                });
        } else {
            await setStatType('monthly');
            statistics2D = await statsAPI.stats2Dmonth(parameters.startDate, parameters.endDate);
            statistics3D = await statsAPI.stats3Dmonth(parameters.startDate, parameters.endDate);

            final2D = statistics2D
                .map(item => {
                    const time = `${item.month}/${item.year}`;
                    return {
                        time: time,
                        service: item.serviceName,
                        count: item.totalTickets
                    };
                })
            final3D = statistics3D
                .map(item => {
                    const time = `${item.month}/${item.year}`;
                    return {
                        time: time,
                        counter: item.counterN,
                        service: item.serviceName,
                        count: item.totalTickets
                    };
                });
        }
        await setStats2D(final2D);
        await setStats3D(final3D);
    }

    return (
        <>
            <Row as='h2'>Choose statistics you want to see</Row>
            <FormStats setSearched={setSearched} search={search}></FormStats>
            {searched && <CustomerTable stats={stats2D} statType={statType}></CustomerTable>}
            {searched && <CounterTable stats={stats3D} statType={statType}></CounterTable>}
        </>
    )
}
export default Statistics;

function FormStats(props) {

    const [startDate, setSDate] = useState('');
    const [endDate, setEDate] = useState('');
    const [type, setType] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();
        props.setSearched(true);
        const parameters = { startDate, endDate, type };
        props.search(parameters);

    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3'>
                    <Form.Label>From:</Form.Label>
                    <Form.Control type="date" required={true} minLength={6} value={startDate} onChange={(event) => { setSDate(event.target.value) }}></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>To:</Form.Label>
                    <Form.Control type="date" required={true} minLength={6} value={endDate} onChange={(event) => { setEDate(event.target.value) }}></Form.Control>
                </Form.Group>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {type ? type : 'Choose type'}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => { setType('daily') }}>Daily</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setType('weekly') }}>Weekly</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setType('monthly') }}>Monthly</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Button variant='success' type='submit'>Search</Button>
                {/*<Link variant="success" to="/" className="btn btn-danger">Cancel</Link>*/}
            </Form>
        </>
    );
}