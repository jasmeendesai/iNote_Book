const jwt = require('jsonwebtoken')
require("dotenv").config();
const { SECRET_KEY } = process.env;


const auth = async (req, res, next)=>{
    const token =req.headers.token
    if(!token){
        return res.status(401).send({status : false, message : "token is missing"})
    }
    try{
        const decodeToken = jwt.verify(token, SECRET_KEY)
        req.userId = decodeToken.userId
        next()
    }catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = {auth}