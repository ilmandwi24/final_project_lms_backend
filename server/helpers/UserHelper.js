const Boom = require('boom');

// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require("jsonwebtoken");
const CommonHelper = require('./CommonHelper');

const user = require('../services/User');

const addUser = async (req) => {
    try {
        // check email if already exist
        const getEmailAction = await user.getEmailUser(req.body.email);
        
        if (getEmailAction.length !==0) {
            return Boom.conflict(`Email ${req.body.email} is already register`);
        }
        // Check password
        const passwordHash = await CommonHelper.hashPassword(req.body.password);
        await user.addUser(req.body.email, req.body.name,passwordHash);
        return "registration successful";
    } catch (error) {
        CommonHelper.log(['User Helper', 'addUser', 'ERROR'], { message: `${error}` });
        throw CommonHelper.errorResponse(error);
    }
};

const loginUser = async (req,res) => {
    try {
        const getEmailAction = await user.getEmailUser(req.body.email);
        if (getEmailAction.length === 0 ) {
            return res.status(404).send(Boom.notFound(`Email / password incorrect`));
            // return Boom.notFound(`Email / password incorrect`);
        }
        const checkPassword = await CommonHelper.comparePassword(req.body.password, getEmailAction[0].password);
        if(!checkPassword){
            // return Boom.notFound(`Email / password incorrect`);
            return res.status(404).send(Boom.notFound(`Email / password incorrect`));

    
        }
        const token = jwt.sign(
            {
                email: getEmailAction[0].email,
            },
            "july24",
            { expiresIn: "1h" });
        delete getEmailAction[0].password;
        // Object.assign(getEmailAction[0], {token});
        getEmailAction[0].token = token;
        return getEmailAction;
    } catch (error) {
        CommonHelper.log(['User Helper', 'loginUser', 'ERROR'], { message: `${error}` });
        throw CommonHelper.errorResponse(error);
    }
   
}

const addUserBySignInGoogle = async (req) => {
    try {
        // check email if already exist
        let loginResponse ;
        const getEmailAction = await user.getEmailUser(req.body.email);
        const token = jwt.sign(
            {
                email: req.body.email,
            },
            "july24",
            { expiresIn: "10h" });
        loginResponse = getEmailAction;
        delete getEmailAction[0].password;
        // Object.assign(getEmailAction[0], {token});
        getEmailAction[0].token = token;
        if (getEmailAction.length === 0 ) {
            // create baru
           
            const result = Math.random().toString(36).substring(2,12);
            const passwordHash = await CommonHelper.hashPassword(result);
            const registerType = "google";
            await user.addUser(req.body.email, req.body.name,passwordHash,registerType);
            loginResponse =  {
                "email": req.body.email,
                "name": req.body.name,
                "token":token
            }
            // return res.status(404).send(Boom.notFound(`Email / password incorrect`));
            // return Boom.notFound(`Email / password incorrect`);
        } 
        console.log(loginResponse)
       

        // delete getEmailAction[0].password;
        // Object.assign(getEmailAction[0], {token});
        // getEmailAction[0].token = token;
        return loginResponse;

    } catch (error) {
            CommonHelper.log(['User Helper', 'addUserBySignInGoogle', 'ERROR'], { message: `${error}` });
            throw CommonHelper.errorResponse(error);
    }
}

module.exports = {
    addUser,
    loginUser,
    addUserBySignInGoogle
};
