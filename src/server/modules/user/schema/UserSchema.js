let UserModel;

const setupUserSchemaAndModel = () => {
    const userSchema = new global.db.Schema({
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        userId: {
            type: Number,
            required: true
        },
    })

    UserModel = new global.db.model('user', userSchema);
}

const getUserModel = () => UserModel;

module.exports = {
    setupUserSchemaAndModel,
    getUserModel
};