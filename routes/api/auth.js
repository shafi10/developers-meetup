const express = require('express')
const router = express.Router()
const {check , validationResult} = require('express-validator/check')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')

const User = require('../../models/User')
const auth = require('../../middleware/auth')

router.get('/',auth, async (req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        console.log(error)
    }
})

router.post('/',[
    check('email', ' please enter a email').isEmail(),
    check('password', 'password is required').exists()
], async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
    }
     
    const {email, password} = req.body
    try {
       let user= await User.findOne({email})
       if(!user){
          return res.status(400).json({errors: [{ msg: 'Invalid'}]})
       }

    let isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({errors: [{ msg: 'Invalid'}]})
     }
     
         const payload = {
             user:{
                 id:user.id
             }
         }
     
         jwt.sign(payload, config.get('jwtSecret'),{
             expiresIn:360000
         }, (err, token)=>{
             if(err) throw err;
             res.json({ token })
         })
    } catch (error) {
        console.log(error)
    }
     
})


module.exports = router