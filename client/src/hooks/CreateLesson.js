import { Grid, TextField } from '@mui/material';
import { Box } from '@mui/material';
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs'
import '../styles/styles_1.css'

function CreateLesson(props) {

    const url = window.location.pathname
    const classId = url.substring(url.lastIndexOf('/') + 1)

    const userId = localStorage.getItem('userid')

    

    const [date, setDate] = useState('')
    const [warm_up, setWU] = useState('')
    const [repertoire, setRep] = useState('')
    const [rehearsal_plan, setRP] = useState('')
    const [assessment, setAssessment] = useState('')
    const [homework, setHomework] = useState('')
    const [accom_mod, setAM] = useState('')

    const handleChange = (newValue) => {
        const stringValue = dayjs(newValue).toString()
        const splitValue = stringValue.split('05:00:00')
        const date = (splitValue[0])
        setDate(date);
    };


    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:8080/api/lessons', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: date,
                warm_up: warm_up,
                repertoire: repertoire,
                rehearsal_plan: rehearsal_plan,
                assessment: assessment,
                homework: homework,
                accom_mod: accom_mod,
                class_id: classId,
                user_id: userId
            })

        }).then(response => response.json())
            .then(result => {
                console.log(result)
                props.handleAddLesson()
                props.handleClose()
            })
    }

    return (
        <Box className='create_lesson_box' component="form" noValidate onSubmit={handleSubmit}
            sx={{
                maxWidth: 500,
                maxHeight: 400
            }}>
            <span className="close-icon" onClick={props.handleClose}>X</span>
            <h2>New Lesson</h2>
            <Grid container space={1}>
                <Grid item xs={6} md={8}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Lesson Date"
                            inputFormat="MM/DD/YYYY"
                            value={date}
                            fullWidth
                            margin='normal'
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6} md={4}>
                </Grid>
                <Grid item xs={6} md={6}>
                    <TextField
                        id="warm-up"
                        label="Warm-Up"
                        variant="filled"
                        margin='dense'
                        multiline
                        rows={3}
                        inputProps={{
                            style: {fontSize: 12}
                        }}
                        onChange={(e) => setWU(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <TextField
                        id="repertoire"
                        label="Repertoire"
                        multiline
                        rows={3}
                        variant="filled"
                        margin="dense"
                        inputProps={{
                            style: {fontSize: 12}
                        }}
                        onChange={(e) => setRep(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <TextField
                        id="rehearsal_plan"
                        label="Rehearsal Plan"
                        multiline
                        rows={3}
                        margin="dense"
                        variant="filled"
                        inputProps={{
                            style: {fontSize: 12}
                        }}
                        onChange={(e) => setRP(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <TextField
                        id="assessment"
                        label="Assessment"
                        variant="filled"
                        multiline
                        rows={3}
                        margin="dense"
                        inputProps={{
                            style: {fontSize: 12}
                        }}
                        onChange={(e) => setAssessment(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <TextField
                        id="homework"
                        label="Homework"
                        variant="filled"
                        margin="dense"
                        multiline
                        rows={3}
                        inputProps={{
                            style: {fontSize: 12}
                        }}
                        onChange={(e) => setHomework(e.target.value)}
                    />
                </Grid>
               
                <Grid item xs={6} md={6}>
                    <TextField
                        id="accom_mod"
                        label="Accommodations/Modifications"
                        variant="filled"
                        multiline
                        rows={3}
                        margin="dense"
                        inputProps={{
                            style: {fontSize: 12}
                        }}
                        onChange={(e) => setAM(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Save Lesson
            </Button>
        </Box>


    )
}

export default CreateLesson