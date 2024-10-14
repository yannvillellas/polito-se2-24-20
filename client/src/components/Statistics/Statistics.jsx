import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { Row, Button } from "react-bootstrap";
import CustomerTable from "./CustomerTable"
import CounterTable from "./CountersTable";
import statsAPI from "../../API/statisticsAPI.mjs";

function Statistics(props){

    let [stats2D, setStats2D]= useState([]);
    let [stats3D, setStats3D]= useState([]);
    let [statType, setStatType]= useState('');
    let [searched, setSearched]=useState(false);
    
    const search = async (parameters)=>{
        let statistics2D;
        let statistics3D;
        
        //console.log(parameters.type);
        if (parameters.type=='daily') {
            await setStatType('daily');
            console.log("settato stato del tipo in daily")
            statistics2D = await statsAPI.stats2Dday(parameters.startDate, parameters.endDate);
            statistics3D = await statsAPI.stats3Dday(parameters.startDate, parameters.endDate);
            console.log(stats2D);
            console.log(stats3D);
        }else if(parameters.type=='weekly'){
            await setStatType('weekly');
            statistics2D = await statsAPI.stats2Dweek(parameters.startDate, parameters.endDate);
            statistics3D = await statsAPI.stats3Dweek(parameters.startDate, parameters.endDate);
        }else{
            await setStatType('monthly');
            statistics2D = await statsAPI.stats2Dmonth(parameters.startDate, parameters.endDate);
            statistics3D = await statsAPI.stats2Dmonth(parameters.startDate, parameters.endDate);
        }
        
        await setStats2D(statistics2D);
        await setStats3D(statistics3D);
    }

    /*useEffect(()=>{
        const getWeeklyStats= async ()=>{
            const weekStats=await API.getWeeklyStats();
            setWStats(weekStats)
        }
        const getMonthlyStats= async ()=>{
            const monthStats = await API.getMonthlyStats();
            setMStats(monthStats)
        }

        getWeeklyStats();
        getMonthlyStats();
    },[]);*/

    return(
        <>
            <Row as='h2'>Choose statistics you want to see</Row>
            <FormStats setSearched={setSearched} search={search}></FormStats>
            {searched && <CustomerTable stats={stats2D} statType={statType}></CustomerTable>}
            {searched && <CounterTable stats={stats3D} statType={statType}></CounterTable>}
        </>
    )
}
export default Statistics;

function FormStats(props){
    
    const [startDate,setSDate]=useState('');
    const [endDate,setEDate]=useState('');
    const [type, setType]=useState();

    const handleSubmit=async (event)=>{
        event.preventDefault();
        props.setSearched(true);
        const parameters = { startDate, endDate, type };
        //console.log(parameters);
        props.search(parameters);
       
    }

    return(
        <>
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
                <Form.Label>From:</Form.Label>
                <Form.Control type="date" required={true} minLength={6} value={startDate} onChange={(event)=>{setSDate(event.target.value)}}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>To:</Form.Label>
                <Form.Control type="date" required={true} minLength={6} value={endDate} onChange={(event)=>{setEDate(event.target.value)}}></Form.Control>
            </Form.Group>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {type?type:'Choose type'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>{setType('daily')}}>Daily</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{setType('weekly')}}>Weekly</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{setType('monthly')}}>Monthly</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Button variant='success' type='submit'>Search</Button>
            {/*<Link variant="success" to="/" className="btn btn-danger">Cancel</Link>*/}
        </Form>
        </>
    );
}