const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const Product = require('../models/products');
const path = require('path')
const fs = require('fs');


const GetAllProducts = async (req,res)=>{
    const productDetails =  await Product.find();
    if(productDetails){
        res.json({productDetails})
    }
};

const CreateNewProduct= async (req, res) => {
    req.body.productImage = req.file?.filename
    console.log(req.body, req.file)
    await Product.create(req.body)
      }

module.exports = {GetAllProducts, CreateNewProduct};

