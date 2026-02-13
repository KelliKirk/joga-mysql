const express = require('express');
const userController = require('../controllers/user');

class UserRouter {
    constructor() {
        this.router = express.Router();
        this.controller = userController;
        this.initRoutes();
    }
    
    initRoutes() {
        this.router.post('/register', this.controller.register);
    }
    
    getRouter() {
        return this.router;
    }
}

module.exports = new UserRouter().getRouter();