const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const Product = require('../models/products');


const GetAllProducts = async (req,res)=>{
    const productDetails =  await Product.find();
    if(productDetails){
        res.json({productDetails})
    }
};

const CreateNewProduct= async (req, res) => {
    

   
    const data =  Product.create(req.body)
    if(data){
      res.json('Product has been added')
    }
    
    // else {
    //     res.status(409).json('User already exist ')
    // }

}
// const LoginUser = async (req,res) =>{
//     console.log(req.body.phoneNumber)
//     const userExist = await User.findOne({phoneNumber: req.body.phoneNumber});
 


//     if(userExist == null){
//         res.status(404).json("User doesn't exist");
//         console.log(userExist)
//     }
//     else{
//         const isMatched = await bcrypt.compare(req.body.password, userExist.password) ;
//         console.log(isMatched);
//         if(isMatched){
//             const token = await jwt.sign({ phoneNumber: req.body.phoneNumber}, process.env.SECRET_KEY);
//             console.log(token);
//             console.log(userExist)
//             const mutateUser = {
//                 fullName : userExist.fullName,
//                 phoneNumber: userExist.phoneNumber,
//                 email: userExist.email,
//                 role: userExist.role,
//                 userCart: userExist.userCart,
//                 userWishList: userExist.userWishList,
//                 _id:userExist.id,
//             }
// console.log(mutateUser)

//             res.status(200).json( {isLoggedIn : true , msg : "User Logged In Successfully", token, userDetails: mutateUser });

//         }
//         else{
//             res.status(404).json("User Password doesn't match");

//         }
//     }
    
// }

// const UpdateUser =  async (req, res) => {
//     await User.findByIdAndUpdate(req.params.id, req.body)
//   }

//   const DeleteUserById =  async (req, res) => {
//     await User.findByIdAndDelete(req.params.id, req.body)
//       }
// const GetUserById =  async (req, res) => {
//     const data = await User.findById(req.params.id, req.body);
//     res.json({data})
//     }

module.exports = {GetAllProducts, CreateNewProduct};

