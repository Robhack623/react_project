import { Grid, TextField } from '@mui/material';
import { Box } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs'
import '../styles/styles_1.css'

function CreateLesson() {

    const userId = localStorage.getItem('userid')
    const [date, setDate] = React.useState(dayjs('2022-12-16'))
    const [warm_up, setWU] = useState('')
    const [repertoire, setRep] = useState('')
    const [rehearsal_plan, setRP] = useState('')
    const [assessment, setAssessment] = useState('')
    const [homework, setHomework] = useState('')
    const [accom_mod, setAM] = useState('')

    const navigate = useNavigate()

    const handleChange = (newValue) => {
        setDate(newValue);
        console.log(setDate)
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
                user_id: userId
            })

        }).then(response => response.json())
            .then(result => {
                console.log(result)
                navigate(`/dashboard/${userId}`)
            })
    }

    return (
        <Box className='create_lesson_box' component="form" noValidate onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, width: 300, height: 400, opacity: [0.9, 0.9, 0.9], backgroundColor: 'white', '&:hover': { opacity: [1, 1, 1] } }}>
            <h2>New Lesson</h2>
            <Grid container space={2}>
                <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Date desktop"
                            inputFormat="MM/DD/YYYY"
                            value={date}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="warm-up"
                        label="Warm-Up"
                        helperText="e.g. Bluebook"
                        onChange={(e) => setWU(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="repertoire"
                        label="Repertoire"
                        helperText=" "
                        variant="filled"
                        onChange={(e) => setRep(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="rehearsal_plan"
                        label="Rehearsal Plan"
                        multiline
                        rows={4}
                        variant="filled"
                        onChange={(e) => setRP(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="assessment"
                        label="Assessment"
                        helperText=" "
                        variant="filled"
                        onChange={(e) => setAssessment(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="homework"
                        label="Homework"
                        helperText=" "
                        variant="filled"
                        onChange={(e) => setHomework(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="accom_mod"
                        label="Accommodations/Modifications"
                        helperText=" "
                        variant="filled"
                        onChange={(e) => setAM(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Save Class
            </Button>
        </Box>


    )
}

export default CreateLesson