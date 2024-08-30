import mongoose from "mongoose";

const careerSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    requirement: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

export default mongoose.model("careers", careerSchema)