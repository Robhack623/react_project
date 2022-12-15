import '../styles/styles_1.css'
import { NavLink } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import CreateClass from './CreateClass';
import Popper from '@mui/material/Popper';
import { Box } from '@mui/material'



function Dashboard() {

    const userId = localStorage.getItem('userid')
    const token = localStorage.getItem('jwt')
    const username = localStorage.getItem('username')

    const [isOpen, setIsOpen] = useState(false);
    const [classes, setClasses] = useState([])

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

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

    const handleDeleteClass = (e) => {
        
        const classId = e.target.id;
        console.log('Class ID =', classId)

        // fetch(`http://localhost:8080/api/classes/${classId}`, {
        //     method: "DELETE"
        // })
        // .then(response => response.json())
        // .then(response => {
        //     console.log(response.message)
        //     fetchClasses()
        // })

    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const classList = classes.map((oneClass, index) => {
        return <div key={index} className='also-delete-button'>
            <NavLink to={`/class/${oneClass._id}`} className='entire-title'>
                <div className='title-text'>
                    <div className='class-subject'>{oneClass.class_subject}</div>
                    <div className='class-title'>{oneClass.class_name} </div>
                    
                </div>
                <div className='title-background'>
                    <div className='title-bg-fade'></div>
                    <div className='title-bg-gradient'></div>
                </div>
            </NavLink>
            <button className='delete-button' aria-describedby={id} type="button" onClick={handleClick}>
                Delete Class 
            </button>
            <Popper id={id} open={open} anchorEl={anchorEl}>
                <Box className='pop-delete' sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                    Are you sure? {oneClass._id}<button className='delete-button' id={`${oneClass._id}`} onClick={handleDeleteClass}>Yes</button>
                </Box>
            </Popper>
        </div>
    })


    return (
        <div className='full_dashboard'>
            <div className='dashboard-body'>
                <div className='dashboard-class-body'>
                    <div className='classes-header'>
                        <div className='dashboard-title'>Classes</div>
                        <div className='create-button'>
                            <div className='button-div' onClick={togglePopup}>Add A Class</div>
                        </div>
                    </div>
                    <div className='classes-body'>
                        {classList}
                    </div>
                </div>
                <div className='dashboard-body-2'>{isOpen && <CreateClass handleClose={togglePopup} handleAddClass={fetchClasses} />}</div>
            </div>

        </div>
    )
}

export default Dashboard