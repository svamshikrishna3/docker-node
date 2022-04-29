const createOne = (model) => async (req, res) => {
    try {
        const body = req.body;
        const userId = req.user && req.user._id || "";
        const resp = await model.create({ ...body, createdBy: userId })
        return resp;
    } catch(e) {
        console.error(e);
        res.status(400).send(e.message)
    }
}

const getOne = (model) => async (req, res) => {
    try {
        const q = req.q || {};
        const userId = req.user && req.user._id || "";
        const resp = await model.findOne({...q, createdBy: userId })
        return resp;
    } catch(e) {
        console.error(e);
        res.status(400).send(e.message)
    }
}

const getById = (model) => async (req, res) => {
    try {
        const id = req.params.id;
        const resp = await model.findById(id)
        return resp;
    } catch(e) {
        console.error(e);
        res.status(400).send(e.message)
    }
}

const getMany = (model) => async (req, res) => {
    try {
        const q = req.q || {};
        const userId = req.user && req.user._id || "";
        const resp = await model.find({...q, createdBy: userId })
        return resp;
    } catch(e) {
        console.error(e);
        res.status(400).send(e.message)
    }
}

const updateOne = (model) => async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const userId = req.user && req.user._id || "";
        const resp = await model.findOneAndUpdate({_id: id, createdBy: userId}, { ...body, createdBy: userId }, { new: true})
        return resp;
    } catch(e) {
        console.error(e);
        res.status(400).send(e.messagee)
    }
}

const deleteOne = (model) => async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user && req.user._id || "";
        const resp = await model.findOneAndRemove({_id: id, createdBy: userId})
        return resp;
    } catch(e) {
        console.error(e);
        res.status(400).send(e.message)
    }
}

const search = (model) => async (req, res) => {
    try {
        const id = req.params.id;
        const { page =  1, size = 6} = req.query;
        const userId = req.user && req.user._id || "";
        const resp = await model.find({}, null, { skip: (size * (page-1)), limit: size })
        return resp;
    } catch(e) {
        console.error(e);
        res.status(400).send(e.message)
    }
}

module.exports = {
    createOne,
    getOne,
    getMany,
    getById,
    updateOne,
    deleteOne,
    search
}