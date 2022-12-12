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
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

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
    console.log(req.body)
    const { first_name, last_name, username, email, password, grade_level} = req.body
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
app.post('/api/classes/:userId/:planbookId', (req, res) => {

    const userId = req.params.userId
    const planbookId = req.params.planbookId
    const { class_name, class_subject } = req.body
    const userClass = new Class({
        class_name: class_name,
        class_subject: class_subject,
        user_id: userId
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
        userId,
        { $push: { classes: classId } },
        {new: true }
    ).catch(error => {console.log(error)})

    Planbook.findByIdAndUpdate(
        planbookId,
        { $push: { classes: classId } },
        {new: true }
    ).catch(error => {console.log(error)})
})

// ADD PLANBOOK
app.post('/api/planbooks/:userId', (req, res) => {

    const userId = req.params.userId
    const { planbook_name, year, schedule_type } = req.body
    const planbook = new Planbook({
        user_id: userId,
        planbook_name: planbook_name,
        year: year,
        schedule_type: schedule_type
    })

    planbook.save((error) => {
        if (error) {

            res.json({ success: false, message: error })
        } else {

            res.json({ success: true, message: 'Class was successfully saved.' })
        }
    })
    const planbookId = planbook._id

    User.findByIdAndUpdate(
        userId,
        { $push: { planbooks: planbookId } },
        {new: true }
    ).catch(error => {console.log(error)})

})

// ADD FULL BAND LESSON
app.post('/api/fb-lessons/:userId/:classId', (req, res) => {

    const userId = req.params.userId
    const classId = req.params.classId
    const { date, standards, warm_up, wu_objective, wu_plan, repertoire,
        rep_objective, rehearsal_plan, assessment, homework, accom_mod, notes } = req.body
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
        notes: notes,
        user_id: userId
    })

    fb_lesson.save((error) => {
        if (error) {
            res.json({ success: false, message: error })
        } else {
            res.json({ success: true, message: 'Full-Band Lesson was successfully saved.' })
        }
    })

    const fblessonId = fb_lesson._id

    User.findByIdAndUpdate(
        userId,
        { $push: { full_band_lessons: fblessonId } },
        {new: true }
    ).catch(error => {console.log(error)})

    Class.findByIdAndUpdate(
        classId,
        { $push: { full_band_lessons: fblessonId }},
        {new: true}
    ).catch(error => {console.log(error)})
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

// DELETE PLANBOOK
app.delete('/api/planbooks/:planbookId', (req, res) => {
    const planbookId = req.params.planbookId
    Planbook.findByIdAndDelete(planbookId, (error, user) => {
        if (error) {
            res.json({ success: false, message: 'Unable to delete user' })
        } else {
            res.json({ success: true, user: user })
        }
    })
})

// DELETE FULL BAND LESSON
app.delete('/api/fb-lessons/:fblessonId', (req, res) => {
    const fblessonId = req.params.fblessonId
    FBLesson.findByIdAndDelete(fblessonId, (error, user) => {
        if (error) {
            res.json({ success: false, message: 'Unable to delete user' })
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

// UPDATE PLANBOOK
app.put('/api/planbooks/:planbookId', (req, res) => {

    const planbookId = req.params.planbookId
    const { planbook_name, year, schedule_type } = req.body
    const updatedPlanbook = {
        planbook_name: planbook_name,
        year: year,
        schedule_type: schedule_type
    }

    Planbook.findByIdAndUpdate(planbookId, updatedPlanbook, (error, planbook) => {
        if (error) {
            res.json({ success: false, message: 'Unable to update planbook.' })
        } else {
            res.json({ success: true, planbook: updatedPlanbook })
        }
    })
})

//UPDATE FULL BAND LESSON
app.put('/api/fb-lessons/:fblessonId', (req, res) => {

    const fblessonId = req.params.fblessonId
    const { date, standards, warm_up, wu_objective, wu_plan, repertoire,
        rep_objective, rehearsal_plan, assessment, homework, accom_mod, notes } = req.body
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
        if (error) {
            res.json({ success: false, message: 'Unable to update lesson.' })
        } else {
            res.json({ success: true, fblesson: updatedFblesson })
        }
    })
})

// ---------------------------------------- READING FROM DATABASE ----------------------------------------

app.post('/api/login', async (req, res) => {
    // console.log('BODY: ', req.body)
    const { username, password } = req.body
    const user = await User.findOne({
        where: {
            username: username,
            password: password
        }
    })
    console.log('USER: ', user)
    if (user) {
        const result = await bcrypt.compare(password, user.password)
        // console.log('RESULT: ', result)
        if (result) {
            const token = jwt.sign({ username: user.username }, 'SECRETKEYJWT')
            res.json({ success: true, token: token, username: user.username})
        } else {
            res.json({ success: false, message: 'Username or password is incorrect'})
        }
    } 
})








app.listen(8080, () => {
    console.log('Server is running up that hill...')
})