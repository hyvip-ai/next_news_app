import React from 'react'
import Toolbar from '../components/Tool-bar';
//isomorphic javascript
import classes from '../styles/eom.module.css'
function EOM(props) {
    console.log(props.employee)
    return (
        <div className='page-container'>
            <Toolbar/>
            <div className={classes.main}>
                <h1>Employee Of The Month</h1>
                <div className={classes.employeeOfTheMonth}>
                    <h3>{props.employee.name}</h3>
                    <h6>{props.employee.position}</h6>
                    <img src={props.employee.image} alt="employee Image" />
                    <p>{props.employee.description}</p>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context){
    const apiResponse = await fetch('https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth');
    const employee = await apiResponse.json()
    return {
        props:{
            employee
        }
    }
}

export default EOM
