const USER = require("../model/user");
const { handleErrorUser } = require("../utils/errorhandler");
const jwt = require("jsonwebtoken")

// registration ftn

const registration = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    if (!name || !password || !email) {
      return res.status(400).json({msg:"all field are required to register"}) 
      
    }
    const user = await USER.create({...req.body});
    return res.status(201).json({ msg: "registration successful", user });
  } catch (error) {
    const errors = handleErrorUser(error);
    res.status(404).json({ errors });
  }
};

// login ftn
const login = async (req, res) => {
  const { email, password } = req.body;
  // validation
  if (!email || !password) {
    return res.status(400).json({ msg: "all fields are required" });
    
  }
  try {
    // finding a reg email and validatin email
    const user = await USER.findOne({ email });
    if (!user) {
      throw Error("wrong credentials");
    }

    // comparing password and validating password
    const auth = await user.comparePassword(password);

    if (!auth) {
      throw Error("wrong credentials");
    }

    // token
    const token = await user.generateToken();
    if (token) {
      res.status(200).json({
        user: {
          name: user.name,
          email: user.email,
        },
        msg: "logged in",
        token,
      });
      return;
    }
  } catch (error) {
    const errors = handleErrorUser(error);
    res.status(404).json({ errors });
  }
};

// get user's name

const getUser = async (req, res) => {
  const {userId} = req.user;
  const user = await USER.findOne({_id:userId})
  res.status(200).json({name:user.name})
 
};

// logout
const logout = async (req, res) => {
  res.json({ token: "", msg: "logged out succesfuly" });
};
// loggedIn
const loggedIn_controler = (req, res) => {
  try {
    // console.log(req.cookies);
    // const token = req.cookies.token
    const authHeader = req.headers.authorization;
    // if(!authHeader || !authHeader.startsWith("Bearer")){
    //   return res.status(401).json(false)
    // }
    const token = authHeader.split(" ")[1];
    console.log(token);
    // console.log(token);

    if (!token) {
      return res.json(false);
    }

    jwt.verify(token, process.env.JWT_SECRETE);
    res.json(true);
  } catch (error) {
    console.log(error.message);
    res.json(false);
  } 
}; 

module.exports = {
  registration,
  login,
  getUser,
  logout,
  loggedIn_controler,
};