const { getUserModel } = require('./../schema/UserSchema');

const getUsers = (req, res) => {
    const userModel = getUserModel();

    userModel
        .find()
        .then( result => {
            res.send(result)
        } )
        .catch( err => {
            console.log('getUserDetailsList');
        } )
}

const getUser = (req, res) => {
    const userModel = getUserModel();

    userModel
        .find({
            userId: req.params.userId
        })
        .then( result => {
            res.send(result)
        } )
        .catch( err => {
            console.log('getUserDetailsList', err);
        } )
}

module.exports = {
    getUsers,
    getUser
}
