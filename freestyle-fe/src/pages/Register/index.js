import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "../../styles/register.module.css";
import { useToast } from "@chakra-ui/react";
import { Montserrat } from "next/font/google";
import { handleLogin } from "../index";
import Link from "next/link";

const montserrat = Montserrat({ subsets: ["latin"] });

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phoneNumber: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Please enter a password")
    .min(3, "Password must have at least 8 characters")
    .matches(/[0-9]/, "Passwor  d must include at least one digit")
    .matches(/[a-z]/, "Password must include at least one lowercase letter")
    .matches(/[A-Z]/, "Password must include at least one uppercase letter"),
  confirmPassword: Yup.string()
    .required("Please re-type your password")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

const Register = () => {
  const toast = useToast();
  const statuses = ["success", "error", "warning", "info"];

  const handleRegister = async (values) => {
    const res = await fetch("http://localhost:3006/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    console.log(res);
    const data = await res.json();
    console.log(data, data.status);
    toast({
      title: data,
      // description: "We've created your account for you.",
      status: res.status === 409 ? "error" : "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <div className={`${styles.container}  ${montserrat.className}`}>
      <div className={styles.form}>
        <h1 className={styles.formHeader}>Signup</h1>
        <Formik
          initialValues={{
            fullName: "",
            phoneNumber: "",
            email: " ",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { resetForm }) => {
            // same shape as initial values
            handleRegister(values);
            resetForm();
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                className={styles.formInput}
                name="fullName"
                placeholder="Full Name"
              />
              {errors.fullName && touched.fullName ? (
                <div className={styles.errorMsg}>{errors.fullName}</div>
              ) : null}
              <br />
              <Field
                className={styles.formInput}
                name="phoneNumber"
                placeholder="Phone Number"
              />
              {errors.phoneNumber && touched.phoneNumber ? (
                <div className={styles.errorMsg}>{errors.phoneNumber}</div>
              ) : null}
              <br />
              <Field
                className={styles.formInput}
                placeholder="Email"
                name="email"
                type="email"
              />
              {errors.email && touched.email ? (
                <div className={styles.errorMsg}>{errors.email}</div>
              ) : null}
              <br />
              <Field
                className={styles.formInput}
                name="password"
                type="password" // Use the "password" type to hide the entered characters
                placeholder="Password"
              />
              {errors.password && touched.password ? (
                <div className={styles.errorMsg}>{errors.password}</div>
              ) : null}
              <br />
              <Field
                className={styles.formInput}
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className={styles.errorMsg}>{errors.confirmPassword}</div>
              ) : null}
              <br />
              <div className={styles.noAccount}>
                <Link href="/Login">Already have an Account? Click here</Link>
              </div>
              <button className={styles.submitBtn} type="submit">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
