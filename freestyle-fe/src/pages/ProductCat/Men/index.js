import React, { useEffect, useState } from 'react';
import styles from '../../../styles/productCard.module.css';
import Image from 'next/image';
import ProductDisplay from "../../ProductDisplay";
import Router, { useRouter } from 'next/router';
function Men() {

   
const [productList, setProductList] = useState([]);
const router = useRouter();
    
      useEffect(()=>{
        const getProducts = async ()=>{
            const res =  await fetch("http://localhost:3006/products" )
            const data  = await res.json();
            console.log(data, data.status);
            console.log(JSON.stringify(data))
            const product =  await data.productDetails;

            setProductList(product);
            
        };
        getProducts();
      }, [])
console.log(productList);
const productDetail = ()=>{
  return router.push("/ProductDisplay")
}


  return (
    <div>
        <h1>Men</h1>
        <li>hello</li>
       {productList.length>0 &&
        <div className={styles.productCardGridContainer}>
        {productList.map(item=>{
           return (
            <div className='productCard' key={item._id} onClick = { () => productDetail()}>
                <div className="productImg">
                    <Image 
                    src="/1566512347835043145.jpg"
                    alt="Image Description"
                    width = {150}
                    height = {150}
                     />
                </div>
                <div className="productName">{item.productName}</div>
                <div className="productPrice">{item.productPrice}</div>
                <div className="productDesc">{item.productDesc}</div>
            </div>
           )
        })}
       </div>}
        
           
        <div className="productCardContainer">
            <div className="productCard">
            <div className="productImage"></div>
            <div className="productName"></div>
            <div className="productPrice"></div>
            <div className="productDesc"></div>
            </div>
        </div>
    
    </div>
  )
}

export default Men