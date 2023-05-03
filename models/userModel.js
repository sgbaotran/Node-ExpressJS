const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  
    username: {
        type: String,
        required: [true, "Please add the username"],
    },
    email: {
        type: String,
        required: [true, "Please add the user email"],
        unique: [true,"This email has been taken"]
    },
    password: {
        type: String,
        required: [true, "Please add the user password"]
    },
},
    {
        timestamp: true,
    }
);

module.exports = mongoose.model("User", userSchema)