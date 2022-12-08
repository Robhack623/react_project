const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./schemas/user')
const Class = require('./schemas/class')
const Planbook = require('./schemas/planbook')
const FBLesson = require('./schemas/fb-lesson')
var bcrypt = require('bcryptjs')
var session = require('express-session')
//const bodyParser = require('body-parser')

app.use(cors())
app.use(express.json())
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
    secret: 'keyboard cat', 
    resave: false,
    saveUninitialized: true
}))


mongoose.connect('mongodb+srv://admin623:PfDtq6RwuYuIqjCJ@cluster0.tuaazol.mongodb.net/test', {
    useNewUrlParser: true
}, (error) => {
    if(!error) {
        console.log('Successfully connected to MongoDB Database')
    } else {
        console.log(error)
    }
})


// ---------------------------------------- ADDING TO DATABASE ----------------------------------------

// ADD USER
app.post('/api/users', async (req, res) => {

    const {first_name, last_name, username, email, password, grade_level, user_subject} = req.body
    let salt = await bcrypt.genSalt(10)
    let hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        password: hashedPassword,
        grade_level: grade_level,
        user_subject: user_subject
    })

    user.save((error) => {
        if(error) {
            res.json({success: false, message: error})
        } else {
            res.json({success: true, message: 'New user successfully registered.'})
        }
    })
})

// ADD CLASS
app.post('/api/classes', (req, res) => {

    const {class_name, class_subject} = req.body
    const userClass = new Class({
        class_name: class_name,
        class_subject: class_subject
    })

    userClass.save((error) => {
        if(error) {
            res.json({success: false, message: error})
        } else {
            res.json({success: true, message: 'Class was successfully saved.'})
        }
    })
} )

// ADD PLANBOOK
app.post('/api/planbooks', (req, res) => {

    const {planbook_name, year, schedule_type} = req.body
    const planbook = new Planbook({
        planbook_name: planbook_name,
        year: year,
        schedule_type: schedule_type
    })

    planbook.save((error) => {
        if(error) {
            res.json({success: false, message: error})
        } else {
            res.json({success: true, message: 'Class was successfully saved.'})
        }
    })
})

// ADD FULL BAND LESSON
app.post('/api/fb-lessons', (req, res) => {

    const {date, standards, warm_up, wu_objective, wu_plan, repertoire, 
        rep_objective, rehearsal_plan, assessment, homework, accom_mod, notes} = req.body
    const fb_lesson = new FBLesson({
        date: date,
        standards: standards,
        warm_up: warm_up,
        wu_objective: wu_objective,
        wu_plan: wu_plan,
        repertoire: repertoire,
        rep_objective: rep_objective,
        rehearsal_plan: rehearsal_plan,
        assessment: assessment,
        homework: homework,
        accom_mod: accom_mod,
        notes: notes
    })

    fb_lesson.save((error) => {
        if(error) {
            res.json({success: false, message: error})
        } else {
            res.json({success: true, message: 'Full-Band Lesson was successfully saved.'})
        }
    })
})

// ---------------------------------------- DELETING FROM DATABASE ----------------------------------------

// DELETE USER
app.delete('/api/users/:userId', (req, res) => {
    const userId = req.params.userId
    User.findByIdAndDelete(userId, (error, user) => {
        if(error) {
            res.json({success: false, message: 'Unable to delete user'})
        } else {
            res.json({success: true, user: user})
        }
    })
})

// DELETE CLASS
app.delete('/api/classes/:classId', (req, res) => {
    const classId = req.params.classId
    Class.findByIdAndDelete(classId, (error, user) => {
        if(error) {
            res.json({success: false, message: 'Unable to delete user'})
        } else {
            res.json({success: true, user: user})
        }
    })
})

// DELETE PLANBOOK
app.delete('/api/planbooks/:planbookId', (req, res) => {
    const planbookId = req.params.planbookId
    Planbook.findByIdAndDelete(planbookId, (error, user) => {
        if(error) {
            res.json({success: false, message: 'Unable to delete user'})
        } else {
            res.json({success: true, user: user})
        }
    })
})

// DELETE FULL BAND LESSON
app.delete('/api/fb-lessons/:fblessonId', (req, res) => {
    const fblessonId = req.params.fblessonId
    FBLesson.findByIdAndDelete(fblessonId, (error, user) => {
        if(error) {
            res.json({success: false, message: 'Unable to delete user'})
        } else {
            res.json({success: true, user: user})
        }
    })
})

// ---------------------------------------- UPDATING THINGS IN THE DATABASE ----------------------------------------

// UPDATE USER
app.put('/api/users/:userId', (req, res) => {
    
    const userId = req.params.userId
    const {first_name, last_name, username, email, password, grade_level, user_subject} = req.body
    const updatedUser = {
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        password: password,
        grade_level: grade_level,
        user_subject: user_subject
    }

    User.findByIdAndUpdate(userId, updatedUser, (error, user) => {
        if(error) {
            res.json({success: false, message: 'Unable to update user.'})
        } else {
            res.json({success: true, user: updatedUser})
        }
    })
})

// UPDATE CLASS
app.put('/api/classes/:classId', (req, res) => {
    
    const classId = req.params.classId
    const {class_name, class_subject} = req.body
    const updatedClass = {
        class_name: class_name,
        class_subject: class_subject
    }

    Class.findByIdAndUpdate(classId, updatedClass, (error, classes) => {
        if(error) {
            res.json({success: false, message: 'Unable to update class.'})
        } else {
            res.json({success: true, classes: updatedClass})
        }
    })
})

// UPDATE PLANBOOK
app.put('/api/planbooks/:planbookId', (req, res) => {
    
    const planbookId = req.params.planbookId
    const {planbook_name, year, schedule_type} = req.body
    const updatedPlanbook = {
        planbook_name: planbook_name,
        year: year,
        schedule_type: schedule_type
    }

    Planbook.findByIdAndUpdate(planbookId, updatedPlanbook, (error, planbook) => {
        if(error) {
            res.json({success: false, message: 'Unable to update planbook.'})
        } else {
            res.json({success: true, planbook: updatedPlanbook})
        }
    })
})

//UPDATE FULL BAND LESSON
app.put('/api/fb-lessons/:fblessonId', (req, res) => {
    
    const fblessonId = req.params.fblessonId
    const {date, standards, warm_up, wu_objective, wu_plan, repertoire, 
        rep_objective, rehearsal_plan, assessment, homework, accom_mod, notes} = req.body
    const updatedFblesson = {
        date: date,
        standards: standards,
        warm_up: warm_up,
        wu_objective: wu_objective,
        wu_plan: wu_plan,
        repertoire: repertoire,
        rep_objective: rep_objective,
        rehearsal_plan: rehearsal_plan,
        assessment: assessment,
        homework: homework,
        accom_mod: accom_mod,
        notes: notes
    }

    FBLesson.findByIdAndUpdate(fblessonId, updatedFblesson, (error, fblesson) => {
        if(error) {
            res.json({success: false, message: 'Unable to update lesson.'})
        } else {
            res.json({success: true, fblesson: updatedFblesson})
        }
    })
})

// ---------------------------------------- READING FROM DATABASE ----------------------------------------

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({
        where: {
            username: username
        }
    })
    if(user) {
        const result = await bcrypt.compare(password, user.password)
        if(result) {
            console.log(password)
        } else {
            console.log("uh oh 1")
        }
    }else {
        console.log("uh oh 2")
    }
})








app.listen(8080, () => {
    console.log('Server is running up that hill...')
})