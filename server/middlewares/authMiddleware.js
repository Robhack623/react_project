
const jwt = require('jsonwebtoken')
const User = require('../schemas/user')


function authenticate(req, res, next) {


     const header = req.headers['authorization']
     if(header) {
         const token = header.split(' ')[1] 
         console.log(token)
         try {
         const decoded = jwt.verify(token, 'SECRETKEYJWT')
         if(decoded) {
             const username = decoded.username 
             const authUser = User.findOne(user => user.username == username)
             if(authUser) {
                next() 
             } else {
                 res.json({error: 'Unable to authenticate'})
             }
         } else {
             res.json({error: 'Unable to authenticate'})
         }
        } catch {
            res.json({error: 'Unable to authenticate'})
        }

 
     } else {
         res.json({error: 'Required authorization headers are missing.'})
     }
}


module.exports = authenticate 