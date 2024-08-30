import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phnNumber: {
        type: Number,
        required: true,
        unique: true
    },
    cvLink: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        required: true
    }
});

export default mongoose.model("applications", ApplicationSchema)