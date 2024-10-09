import {useState} from 'react';
import {Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ()=> {
    const navigate = useNavigate();

    const handleClick = (number) => {
        switch (number) {
            case 1: {
                navigate('/customer');
                break;
            }
            case 2: {
                navigate('/officer'); // Redirect to officer dashboard
                break;
            }
            case 3: {
                navigate('/manager');
                break;
            }
            default:
                break;
        }
    };

    return (
        <>
            <div className="button-container">
                <div><Button variant="primary" className="mb-2 w-100" onClick={() => handleClick(1)}>Customer</Button></div>
                <div><Button variant="success" className="mb-2 w-100" onClick={() => handleClick(2)}>Officer</Button></div>
                <div><Button variant="danger" className="mb-2 w-100" onClick={() => handleClick(3)}>Manager</Button></div>
            </div>
        </>
    );
}

export default Home;
