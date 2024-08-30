import Career from "../models/Career.js";

export const createCareerPost = async (req, res, next) => {
    const newCareer = new Career(req.body)
    try {
        const saveCareer = await newCareer.save()
        res.status(200).json(saveCareer)
    } catch (err) {
        next(err)
    }
}

export const readCareerPost = async (req, res, next) => {
    try {
        const allCareer = await Career.find();
        res.status(200).json(allCareer)
    } catch (err) {
        next(err)
    }
}

export const updateCareerPost = async (req, res, next) => {
    try {
        const { id, ...updateData } = req.body
        const updateCareer = await Career.findByIdAndUpdate(id, updateData, { new: true });
        if (!updateCareer) {
            return res.status(404).json({ message: 'Career post not found' })
        }
        res.status(200).json(updateCareer)
    } catch (err) {
        next(err)
    }
}

export const deleteCareerPost = async (req, res, next) => {

    try {
        const deleteCareer = await Career.findByIdAndDelete(req.body.id);
        res.status(200).json("Product deleted successfully")
    } catch (err) {
        next(err)
    }
}

