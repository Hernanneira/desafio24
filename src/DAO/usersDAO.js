const dotenv = require('dotenv')
dotenv.config();
const mongoose = require('mongoose');
console.log("db mongoose usuarios INICIADO")

const mongoseConnect = mongoose.createConnection(`mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASS}@${process.env.MONGO_ATLAS_HOST}/?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        });
        console.log("db mongoose usuarios conectada")
        
class Users {
        UsersDAO = mongoseConnect.model('users', require('../schemasModel/usersSchema'))

    async getAll() {
        try {
            const content = await this.UsersDAO.find({})
            return content
        } catch (error) {
            return(error)
        }
    }
    
    async save(newUser) {
        try {
            await this.UsersDAO.create(newUser)
            const newContent = await this.UsersDAO.find({})
            return newContent
            }
        catch (error) {
            return(error)
        }
    }

    async getUser(name) {
        try {
            const content = await this.UsersDAO.find({"username": name})
            return content
        } catch (error) {
            return(error)
        }
    }
}

const UsersDAO = new Users()

module.exports = UsersDAO