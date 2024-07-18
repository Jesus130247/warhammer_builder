require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const saltRounds = 10;

router.post('/api/signUp', async (req, res, next) => {
    const { email, password } = req.body
    let salt = await bcrypt.genSalt(saltRounds)
    let hash = await bcrypt.hash(password, salt)
    if (email.trim() !== '' || password !== '') {
        return await User.createUser(email.trim(), hash).catch((err) => {
            next(err)
        })
    } else {
        throw new Error
    }
})

router.post('/api/login',  async (req, res, next) => {
    try {
        // email & password required

        //1. get email and password from requst
        const { email, password } = req.body

        //2. find the existing user from the database using the email
        let user = await User.findByEmail(email)
        if (!user) {
            let err = new Error('incorrect username or passowrd')
            err.status = 400
            throw err
        }

        //3.check the password for this user
        let match = await bcrypt.compare(password, user.password_disgest)
        if (!match) {
            let err = new Error('incorrect username or passowrd')
            err.status = 400
            throw err
        }

        //4.generate a token
        // jwt (json web token) npm i jsonwebtoken
        const token = jwt.sign (
            { id: user.id, email: user.email},
            'cakepudding', //should be a private string in .env
            { expiresIn: '24h'} //expiry information here
        )

        //5. send the response back to the client
        res.json({ token: token })
            
        // return a token (ticket required to be logged in)
    } catch (err) {
        next(err)
    }

})

module.exports = router