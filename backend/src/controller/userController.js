// "scripts": {
//     "start": "concurrently \"npm run server\" \"npm run client\"",
//     "server": "node index.js",
//     "client": "cd backend && npx nodemon src/index.js"
//   }
//     "start": "react-scripts start",
  // "both" : "concurrently both \"npm run start\" \"npx nodemon backend/src/index.js\""


const UserModel = require("../model/UserModel");
const {
  isValid,
  isValidEmail,
  hashPassWord,
  comparePassword,
} = require("../utils/validator");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const { SECRET_KEY } = process.env;

//Route 1 : Register User - No Login required
const register = async (req, res) => {
  try {
    // const data = req.body
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .send({ status: false, message: "Enter the required fields" });
    }

    if (!isValid(name) || name.length < 3) {
      return res
        .status(400)
        .send({ status: false, message: "Enter the valid name" });
    }

    if (!isValidEmail(email) || !isValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter the valid email" });
    }
    //duplicate email validation
    const emailExist = await UserModel.findOne({ email: email });
    if (emailExist) {
      return res
        .status(400)
        .send({ status: false, message: "Email is already is registered" });
    }
    //password validation
    if (!isValid(password) || password.length < 5 || password.length > 15) {
      return res
        .status(400)
        .send({ status: false, message: "Enter the valid password" });
    }
    //encrypt password
    req.body.password = await hashPassWord(req.body.password);

    const createUser = await UserModel.create(req.body);

    const token = jwt.sign(
      { userId: createUser._id, exp: 7560606060 },
      SECRET_KEY
    );
    return res.status(201).send({
      status: true,
      message: "Registration completed Successfully",
      token: token,
      data: createUser,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//Route 2 : User login function - No login required

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ status: false, message: "Enter the user Credential" });
    }

    if (!isValidEmail(email) || !isValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter the valid email" });
    }
    //password validation
    if (!isValid(password) || password.length < 5 || password.length > 15) {
      return res
        .status(400)
        .send({ status: false, message: "Enter the valid password" });
    }
    //find user using emailId
    const user = await UserModel.findOne({ email: email });

    const passwordStatus = await comparePassword(password, user.password)

    if(!user || !passwordStatus) {
        return res
        .status(400)
        .send({ status: false, message: "Enter the valid user credentials" }); 
    }
    const token = jwt.sign(
        { userId: user._id, exp: 7560606060 },
        SECRET_KEY
      );
      return res
      .status(200)
      .send({ status: true, message: "User loggedin successfully" , userId : user._id, token: token}); 
    
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//Route 3 - Get User detail - login required

const getUser = async (req, res)=>{
    try{
        const userId = req.userId
        const user = await UserModel.findById(userId).select({password : 0, _id :0, __v : 0})
        // if(!user){
        //     return res
        // .status(404)
        // .send({ status: false, message: "User not found" }); 
        // }
        return res
      .status(200)
      .send({ status: true, message: "User Data" , data : user}); 

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}
module.exports = { register, login, getUser };
