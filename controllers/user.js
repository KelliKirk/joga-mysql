const bcrypt = require('bcrypt')
const userModel = require('../models/users')

class userController {

      constructor() {
        this.register = this.register.bind(this);  
    }

    async register(req, res){

        // Kontrolli, et kõik väljad on olemas
        if (!req.body.username || !req.body.email || !req.body.password) {
            return res.status(400).json({ 
                error: 'Kõik väljad on kohustuslikud' 
            });
        }

        const cryptPassword = await bcrypt.hash(req.body.password, 10)
        const registeredId = await userModel.create ({
            username: req.body.username,
            email: req.body.email,
            password: cryptPassword
        } )

        if (registeredId){
            const userData = await userModel.findById(registeredId)
            req.session.user = {
                username: userData.username,
                user_id: userData.id
            } 
            res.json ({
                message: 'Uus kasutaja on loodud.',
                user_session: req.session.user
            } )
        } 
    } 
} 

module.exports = new userController()