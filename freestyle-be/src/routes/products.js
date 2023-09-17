const express=require('express')
const Product = require('../models/products')
const router=express.Router()
const ProductController = require('../controllers/products');


router.get("/products", ProductController.GetAllProducts);
    
    
router.post('/products', ProductController.CreateNewProduct)
// router.post('/login', UserController.LoginUser)


// router.put('/account/:id', UserController.UpdateUser);

// router.delete('/users/:id', UserController.DeleteUserById)

// router.get('/users/:id', UserController.GetUserById)

module.exports = router;