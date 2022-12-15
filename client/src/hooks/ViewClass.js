import React, { useState, useEffect } from 'react';
import '../styles/styles_1.css'
import CreateLesson from './CreateLesson';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

function ViewClass() {

    const userId = localStorage.getItem('userid')
    const token = localStorage.getItem('jwt')
    const username = localStorage.getItem('username')

    const url = window.location.pathname
    const classId = url.substring(url.lastIndexOf('/') + 1)
    const [isOpen, setIsOpen] = useState(false);
    const [lessons, setLessons] = useState([])

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        fetchLessons()
    }, [])

    const fetchLessons = () => {
        fetch(`http://localhost:8080/api/${classId}/all-lessons`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(lessons => {
                setLessons(lessons)
            })
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const lessonList = lessons.map((lesson, index) => {
        return <div key={index} className='main-lesson-box'>
            <div className='lesson-box'>
                <div className='date-name'>Date</div>
                <div className='lesson-import'>{lesson.date}</div>
            </div>
            <div className='lesson-box'>
                <div className='warmup-name'>Warm-Up</div>
                <div className='lesson-import'>{lesson.warm_up}</div>
            </div>
            <div className='lesson-box'>
                <div className='rep-name'>Repertoire</div>
                <div className='lesson-import'>{lesson.repertoire}</div>
            </div>
            <div className='lesson-box'>
                <div className='rp-name'>Rehearsal Plan/Steps</div>
                <div className='lesson-import'>{lesson.rehearsal_plan}</div>
            </div>
            <div className='lesson-box'>
                <div className='assess-name'>Assessments</div>
                <div className='lesson-import'>{lesson.assessment}</div>
            </div>
            <div className='lesson-box'>
                <div className='homework-name'>Homework</div>
                <div className='lesson-import'>{lesson.homework}</div>
            </div>
            <div className='lesson-box'>
                <div className='accom-name'>Accommodations & Modifications</div>
                <div className='lesson-import'>{lesson.accom_mod}</div>
            </div>
        </div >
    })

    return (
        <div className='full_dashboard'>
            <div className='dashboard-body-lessons'>
                <div className='dashboard-class-body lessons-body'>
                    <div className='classes-header'>
                        <div className='dashboard-title'>Lessons</div>
                        <div className='create-button'>
                            <div className='button-div' onClick={togglePopup} >Add A Lesson</div>
                        </div>
                    </div>
                    <div className='lessons-list-body'>
                        {lessonList.length === 0 ? <div>NO LESSONS DUH</div> : lessonList}
                    </div>
                </div>
                <div className='dashboard-body-2'>{isOpen && <CreateLesson handleClose={togglePopup} handleAddLesson={fetchLessons} />}</div>
            </div>

        </div>
    )
}

export default ViewClass