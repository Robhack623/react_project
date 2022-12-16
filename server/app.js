const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./schemas/user')
const Class = require('./schemas/class')
const Lesson = require('./schemas/lesson')
var bcrypt = require('bcryptjs')
var session = require('express-session')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))


mongoose.connect('mongodb+srv://admin623:PfDtq6RwuYuIqjCJ@cluster0.tuaazol.mongodb.net/test', {
    useNewUrlParser: true
}, (error) => {
    if (!error) {
        console.log('Successfully connected to MongoDB Database')
    } else {
        console.log(error)
    }
})


// ---------------------------------------- ADDING TO DATABASE ----------------------------------------

// ADD USER
app.post('/api/register', async (req, res) => {
    
    const { first_name, last_name, username, email, password, grade_level } = req.body
    let salt = await bcrypt.genSalt(10)
    let hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        password: hashedPassword,
        grade_level: grade_level,
    })

    user.save((error) => {
        if (error) {
            res.json({ success: false, message: error })
        } else {
            res.json({ success: true, message: 'New user successfully registered.' })
        }
    })
})

// ADD CLASS
app.post('/api/classes', (req, res) => {

    const { class_name, class_subject, user_id } = req.body
    const userClass = new Class({
        class_name: class_name,
        class_subject: class_subject,
        user_id: user_id
    })

    userClass.save((error) => {
        if (error) {
            res.json({ success: false, message: error })
        } else {
            res.json({ success: true, message: 'Class was successfully saved.' })
        }
    })

    const classId = userClass._id

    User.findByIdAndUpdate(
        user_id,
        { $push: { classes: classId } },
        { new: true }
    ).catch(error => { console.log(error) })
})


// ADD LESSON
app.post('/api/lessons', (req, res) => {

    const { date, warm_up, repertoire, rehearsal_plan, assessment,
        homework, accom_mod, class_id, user_id } = req.body
    const lesson = new Lesson({
        date: date,
        warm_up: warm_up,
        repertoire: repertoire,
        rehearsal_plan: rehearsal_plan,
        assessment: assessment,
        homework: homework,
        accom_mod: accom_mod,
        class_id: class_id,
        user_id: user_id
    })

    lesson.save((error) => {
        if (error) {
            res.json({ success: false, message: error })
        } else {
            res.json({ success: true, message: 'Lesson was successfully saved.' })
        }
    })

    const lessonId = lesson._id

    User.findByIdAndUpdate(
        user_id,
        { $push: { lessons: lessonId } },
        { new: true }
    ).catch(error => { console.log(error) })
})

// ---------------------------------------- DELETING FROM DATABASE ----------------------------------------

// DELETE USER
app.delete('/api/users/:userId', (req, res) => {
    const userId = req.params.userId
    User.findByIdAndDelete(userId, (error, user) => {
        if (error) {
            res.json({ success: false, message: 'Unable to delete user' })
        } else {
            res.json({ success: true, user: user })
        }
    })
})

// DELETE CLASS
app.delete('/api/classes/:classId', (req, res) => {
    const classId = req.params.classId
    Class.findByIdAndDelete(classId, (error, user) => {
        if (error) {
            res.json({ success: false, message: 'Unable to delete user' })
        } else {
            res.json({ success: true, user: user })
        }
    })
})

// DELETE LESSON
app.delete('/api/lessons/:lessonId', (req, res) => {
    const lessonId = req.params.lessonId
    Lesson.findByIdAndDelete(lessonId, (error, user) => {
        if (error) {
            res.json({ success: false, message: 'Unable to delete lesson' })
        } else {
            res.json({ success: true, user: user })
        }
    })
})

// ---------------------------------------- UPDATING THINGS IN THE DATABASE ----------------------------------------

// UPDATE USER
app.put('/api/users/:userId', (req, res) => {

    const userId = req.params.userId
    const { first_name, last_name, username, email, password, grade_level } = req.body
    const updatedUser = {
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        password: password,
        grade_level: grade_level,
    }

    User.findByIdAndUpdate(
        userId,
        updatedUser,
        (error, user) => {
            if (error) {
                res.json({ success: false, message: 'Unable to update user.' })
            } else {
                res.json({ success: true, user: updatedUser })
            }
        })
})

// UPDATE CLASS
app.put('/api/classes/:classId', (req, res) => {

    const classId = req.params.classId
    const { class_name, class_subject } = req.body
    const updatedClass = {
        class_name: class_name,
        class_subject: class_subject
    }

    Class.findByIdAndUpdate(classId, updatedClass, (error, classes) => {
        if (error) {
            res.json({ success: false, message: 'Unable to update class.' })
        } else {
            res.json({ success: true, classes: updatedClass })
        }
    })
})

//UPDATE LESSON
app.put('/api/lessons/:lessonId', (req, res) => {

    const lessonId = req.params.lessonId
    const { date, standards, warm_up, wu_objective, wu_plan, repertoire,
        rep_objective, rehearsal_plan, assessment, homework, accom_mod, notes } = req.body
    const updatedLesson = {
        date: date,
        warm_up: warm_up,
        repertoire: repertoire,
        rehearsal_plan: rehearsal_plan,
        assessment: assessment,
        homework: homework,
        accom_mod: accom_mod
    }

    Lesson.findByIdAndUpdate(lessonId, updatedLesson, (error, lessons) => {
        if (error) {
            res.json({ success: false, message: 'Unable to update lesson.' })
        } else {
            res.json({ success: true, lessons: updatedLesson })
        }
    })
})

// ---------------------------------------- READING FROM DATABASE ----------------------------------------

app.post('/api/login', async (req, res) => {
    
    const { username, password } = req.body
    const user = await User.findOne({

            username: username
       
    })
    console.log('USER: ', user)
    if (user) {
        const result = await bcrypt.compare(password, user.password)
        // console.log('RESULT: ', result)
        if (result) {
            const token = jwt.sign({ username: user.username }, 'SECRETKEYJWT')

            res.json({ success: true, token: token, username: user.username, userId: user._id })
        } else {
            res.json({ success: false, message: 'Username or password is incorrect' })
        }
    }
})

app.get('/api/:userId/all-classes', (req, res) => {

    const userId = req.params.userId

    Class.find({ user_id: userId }, (error, classes) => {
        if (error) {
            res.json({ success: false, message: 'Unable to access classes.' })
        } else {
            res.json(classes)
        }
    })
})

app.get('/api/:classId/all-lessons',  (req, res) => {

    const classId = req.params.classId

    Lesson.find({ class_id: classId }, (error, lessons) => {
        if (error) {
            res.json({ success: false, message: 'Unable to access lessons.' })
        } else {
            res.json(lessons)
        }
    })
})








app.listen(8080, () => {
    console.log('Server is running up that hill...')
})