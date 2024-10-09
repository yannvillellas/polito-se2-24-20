import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { Row, Button } from "react-bootstrap";
import CustomerTable from "./CustomerTable"

function Statistics(props){

    let [wStats, setWStats]= useState([]);
    let [mStats, setMStats] = useState([]);


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
            <FormStats></FormStats>
            <CustomerTable></CustomerTable>
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
        const credentials = { username, password };
        //props.login(credentials);
       
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
                    <Dropdown.Item onClick={()=>{setType('monthly')}}>Monthly</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{setType('weekly')}}>Weekly</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Button variant='success' type='submit'>Search</Button>
            {/*<Link variant="success" to="/" className="btn btn-danger">Cancel</Link>*/}
        </Form>
        </>
    );
}