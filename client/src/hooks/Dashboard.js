import '../styles/styles_1.css'
import { NavLink } from 'react-router-dom'
import React, { useState, useEffect } from 'react';


function Dashboard() {

    const userId = localStorage.getItem('userid')
    const token = localStorage.getItem('jwt')
    const username = localStorage.getItem('username')

    const [classes, setClasses] = useState([])

    useEffect(() => {
        fetchClasses()
    }, [])

    const fetchClasses = () => {
        fetch(`http://localhost:8080/api/${userId}/all-classes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(classes => {
                setClasses(classes)
            })
    }

    const classList = classes.map((oneClass, index) => {
        return <div key={index}>
            <a href='#' className='entire-title'>
                <div className='title-text'>
                    <div className='class-subject'>{oneClass.class_subject}</div>
                    <div className='class-title'>{oneClass.class_name}</div>
                </div>
                <div className='title-background'>
                    <div className='title-bg-fade'></div>
                    <div className='title-bg-gradient'></div>
                </div>
            </a>
        </div>
    })


    return (
        <div className='full_dashboard'>

            
            {/* <NavLink to={`/create-lesson/${userId}`}>Create a Lesson</NavLink> */}
            <div className='dashboard-body'>
                <div className='dashboard-class-body'>
                    <div className='classes-header'>
                        <div className='dashboard-title'>Classes</div>
                        <div className='create-button'>
                            <div className='button-div'><NavLink to={`/create-class/${userId}`}> + Create a Class</NavLink></div>
                        </div>
                    </div>
                    <div className='classes-body'>
                        {classList}
                    </div>
                </div>
                <div className='dashboard-body-2'></div>
                <div className='dashboard-body-3'></div>
            </div>
        </div>
    )
}

export default Dashboard