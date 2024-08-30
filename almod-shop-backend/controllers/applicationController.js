import Applications from "../models/Applications.js";

export const createApplication = async (req, res, next) => {
    const newApplication = new Applications(req.body)
    try {
        const saveApplication = await newApplication.save()
        res.status(200).json(saveApplication)
    } catch (err) {
        next(err)
    }
}

export const readApplication = async (req, res, next) => {
    try {
        const allApp = await Applications.find();
        res.status(200).json(allApp);
    } catch (err) {
        next(err)
    }
}

export const deleteApplication = async (req, res, next) => {
    try {
        const deleteApp = await Applications.findByIdAndDelete(req.body.id);
        res.status(200).json("Product deleted successfully")
    } catch (err) {
        next(err)
    }
}