const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const asyncHandler = require('express-async-handler')


//@desc Register
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("Fields Are Missing!")
    }

    const alreadyExists = await User.findOne({ username })
    if (alreadyExists) {
        res.status(400)
        throw new Error("User Already Registered!")
    }
    const cryptedPassword = await bcrypt.hash(password, 10)
    const registeredUser = await User.create({ username, email, password: cryptedPassword })
    
    if(registerUser){
        res.status(201).json({ id: registeredUser.id, email })
    }else{
        throw new Error("User data is not valid")
    }

    res.send({message:"Registered successfully"})

})

//@desc Login
//@route POST /api/users/register
//@access private
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        res.status(400)
        throw new Error("Fields Are Missing!")
    }
    const user = await User.findOne({ username })
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1d" }
        );
        res.status(200).json({ accessToken })
    } else {
        res.status(401)
        throw new Error("Username or password is not valid!")
    }
})

//@desc Current
//@route POST /api/users/register
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})

module.exports = { registerUser, loginUser, currentUser }