import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styles from '../../styles/register.module.css' ;
import { useToast } from '@chakra-ui/react';
import { Montserrat} from 'next/font/google';
import { handleLogin } from '../index';
import Link from 'next/link';



const AddProductSchema = Yup.object().shape({
    productName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    productPrice: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    
     
      
});

function AdminPage() {

    const [file, setFile] = useState(null)
    const toast = useToast();


    const addItem = async (values)=>{
        console.log(values);
        const formData = new FormData();
            for(let item in values){
                formData.append(item, values[item]);
            }
            formData.append('productImage', file)

        debugger

            const res =  await fetch("http://localhost:3006/products",
        { method: 'POST',
        body: formData
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







  return (
    <div>
      <div className="addProductContainer">
      <div className = {`${styles.container} `}>
       <div className={styles.form}>
          <h1 className={styles.formHeader}>Add new Product</h1>
        <Formik
            initialValues={{
              productName: '',
              productPrice: '',
              productDesc: '',

            }}
      validationSchema={AddProductSchema}
      onSubmit={(values,{resetForm}) => {
        // same shape as initial values
        addItem(values);
        resetForm();
        console.log(values);
      }}
        >
      {({ errors, touched }) => (
        <Form>
          <Field className={styles.formInput} name="productName" placeholder='Enter product Name' />
          {errors.productName && touched.productName ? (
            <div className = {styles.errorMsg}>{errors.productName}</div>
          ) : null}
          <br />
          <Field  className={styles.formInput} name="productPrice"  placeholder = 'Enter Product Price'/>
          {errors.productPrice && touched.productPrice ? (
            <div className = {styles.errorMsg}>{errors.productPrice}</div>
          ) : null}
          <br />
          <Field 
          className={styles.formInput}
          placeholder='Enter Product Description'
          name="productDesc"
           type="text" 
            />
          {errors.productDesc && touched.productDesc ? <div className = {styles.errorMsg}>{errors.productDesc}</div> : null}
          <br />
          <input onChange={e=>setFile(e.target.files[0])} type="file"/>
         
<br />
                  
          <button className={styles.submitBtn} type="submit">ADD</button>
        </Form>
      )}
    </Formik>
  </div>
  </div>
      </div>
    </div>
  )
}

export default AdminPage
