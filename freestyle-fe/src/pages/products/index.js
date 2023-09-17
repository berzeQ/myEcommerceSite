"use client"
import React from 'react';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useToast } from '@chakra-ui/react';
import { Montserrat} from 'next/font/google';
// import { handleLogin } from '../index';
import styles from '../../styles/adminPage.module.css'
import Link from 'next/link';

const montserrat = Montserrat({ subsets: ['latin'] });

const ProductSchema = Yup.object().shape({
  productName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  productPrice: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    productDesc: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  
    });

const Register = () => {
  const [isClicked, setIsClicked] = useState(false);

  const toast = useToast()
  const statuses = ['success', 'error', 'warning', 'info']

  const handleRegister = async (values)=>{
    const res =  await fetch("http://localhost:3006/products",
    { method: 'POST',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify(values)
     }

    )
    console.log(res)
    const data  = await res.json();
    console.log(data, data.status);
    toast({
      title: data,
      // description: "We've created your account for you.",
      status: res.status === 409 ? 'error' : 'success',
      duration: 9000,
      isClosable: true,
    })
  }
  const addNewItem = ()=>{

     setIsClicked(!isClicked);
  }


  return(
    <div className = {`${styles.container}  ${montserrat.className}`}>
    <button type='button' onClick={()=>addNewItem()}>Add new item</button>
      {isClicked && 
        <div className={styles.form}>
          <h1 className={styles.formHeader}>Dashboard</h1>
          <Formik
            initialValues={{
              productName: '',
              productPrice: '',
              productDesc: '',
              

              }}
      validationSchema={ProductSchema}
      onSubmit={(values,{resetForm}) => {
        // same shape as initial values
        handleRegister(values);
        resetForm();
        console.log(values);
      }}
        >
      {({ errors, touched }) => (
        <Form>
          <Field className={styles.formInput} name="productName" placeholder='Enter Product Name' />
          {errors.productName && touched.productName ? (
            <div className = {styles.errorMsg}>{errors.productName}</div>
          ) : null}
          <br />
          <Field  className={styles.formInput} name="productPrice"  placeholder = 'Enter Product Price'/>
          {errors.productPrice && touched.productPrice ? (
            <div className = {styles.errorMsg}>{errors.productPrice}</div>
          ) : null}
          <br />
          <Field  className={styles.formInput} name="productDesc"  placeholder = 'Enter Product Description'/>
          {errors.productDesc && touched.productDesc ? (
            <div className = {styles.errorMsg}>{errors.productDesc}</div>
          ) : null}
          <br />
          
          <button className={styles.submitBtn} type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>}
  </div>
)};

export default Register;