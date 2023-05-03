const mongoose = require('mongoose')

const contactSchema = mongoose.Schema(
    {
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        name: {
            type: String,
            required: [true, "Please add the contact name"],
        },
        email: {
            type: String,
            required: [true, "Please add the contact email"],
        },
        number: {
            type: String,
            required: [true, "Please add the contact phone number"]
        },
    },
    {
        timestamp: true,
    }
);

module.exports = mongoose.model("Contact", contactSchema)