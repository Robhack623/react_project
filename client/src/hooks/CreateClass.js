import { TextField } from '@mui/material';
import { Box } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function CreateClass() {


    const userId = localStorage.getItem('userid')
    const [class_name, setClass] = useState('')
    const [class_subject, setSubject] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:8080/api/classes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            class_name: class_name,
            class_subject: class_subject,
            user_id: userId
          })
    
        }).then(response => response.json())
          .then(result => {
            console.log(result)
            navigate(`/dashboard/${userId}`)
          })
      }

    return (
        <Box className='create_class_box' component="form" noValidate onSubmit={handleSubmit} sx={{ width: 300, height: 400, opacity: [0.9, 0.9, 0.9] , backgroundColor: 'white', '&:hover': { opacity: [1, 1, 1]} }}>
            <h2>Create a Class</h2>
            <h4>What is the name of your class?</h4>
            <TextField
                id="className"
                label="Class Name"
                helperText="example: Honors Band or Beginner Horn"
                onChange={(e) => setClass(e.target.value)}
            />
            <h4>What level will you be teaching?</h4>
            <TextField
                id="subjectName"
                label="Student Level"
                helperText="example: Beginner/Intermediate/Advanced"
                onChange={(e) => setSubject(e.target.value)}
            />
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

export default CreateClass