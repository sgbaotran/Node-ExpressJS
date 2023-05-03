const asyncHandler = require('express-async-handler')

const Contact = require("../models/contactModel")

//@desc Get all contacts
//@route GET /api/contact
//@access private
const getContacts = asyncHandler(async (req, res) => {
    // res.send("hell ")
    // res.json({message:"hell "})
    const contacts = await Contact.find({createdBy:req.user.id})
    res.status(200).json(contacts)
})

//@desc Create new contact
//@route POST /api/contact
//@access private
const createContact = asyncHandler(async (req, res) => {
    const { name, email, number } = req.body
    if (!name || !email || !number) {
        res.status(400)
        throw new Error("All fields are required")
    }
    const createdContact = await Contact.create({
        name,
        email,
        number,
        createdBy:req.user.id
    })
    res.status(201).json(createdContact)
})

//@desc Get a contact
//@route GET /api/contact/${req.params.id}
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact){
        res.status(404)
        throw new Error("Cannot Find Contact!")
    }
    res.status(200).json(contact)
})

//@desc Update contact
//@route PUT /api/contact/${req.params.id}
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact){
        res.status(404)
        throw new Error("Cannot Find Contact!")
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedContact)
})

//@desc Delete contact
//@route DELETE /api/contact/${req.params.id}
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact){
        res.status(404)
        throw new Error("Cannot Find Contact!")
    }
    const deletedContact = await Contact.findByIdAndDelete(req.params.id)
    res.status(200).json(deletedContact)
})

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact }