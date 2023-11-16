import React, { useEffect, useState } from "react";
import { Field, Form, Formik, useField, useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  setStockbitEmail,
  setStockbitPassword,
  setStockbitPin,
  setOther1Email,
  setOther1Password,
  setOther1Pin,
  setOther2Email,
  setOther2Password,
  setOther2Pin,
} from "../../redux/reducers/securities/securitiesReducer";
import { useNavigate } from "react-router-dom";

//? The Form Field //////////////////////////////////
const InputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, dirty, isValid }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  console.log("kotor1:", dirty);
  // setTimeout(() => {
  //   dirty = true;
  // }, 3000);
  // console.log("kotor2:", dirty);
  props.pull_dirty(dirty);
  return (
    <div>
      <input
        // type="text"
        {...field}
        {...props}
        className={
          !isValid && touched[field.name] && errors[field.name]
            ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 p-2 dark:bg-red-100 dark:border-red-400"
            : props.className
        }
      />
      {/* {console.log("dirty:",dirty)} */}
      {/* {!isValid && touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>} */}
      {!isValid && touched[field.name] && errors[field.name] && <div className="error mb-5">{errors[field.name]}</div>}
      {/* dirty: {JSON.stringify(dirty)}
    <br />
    touched: {JSON.stringify(touched)}
    <br />
    errors: {JSON.stringify(errors)} */}
    </div>
  );
};
//* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const SecuritiesEmail = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  console.log("dirty in emailForm:", meta);
  props.func("My name is Dean Winchester & this is my brother Sammie");
  // if (props.isReset === true) {
  //   field.value = props.email;
  //   props.setIsReset(false);
  // }
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        {...field}
        {...props}
        className={`${
          meta.touched && meta.error
            ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 p-2 dark:bg-red-100 dark:border-red-400"
            : props.className
        }`}
      />
      {meta.touched && meta.error ? <div className="error mb-5">{meta.error}</div> : <div></div>}
    </>
  );
};
const SecuritiesPassword = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        {...field}
        {...props}
        className={`${
          meta.touched && meta.error
            ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 p-2 dark:bg-red-100 dark:border-red-400"
            : props.className
        }`}
      />
      {meta.touched && meta.error ? <div className="error mb-5">{meta.error}</div> : null}
    </>
  );
};
const SecuritiesPin = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        {...field}
        {...props}
        className={`${
          meta.touched && meta.error
            ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 p-2 dark:bg-red-100 dark:border-red-400"
            : props.className
        }`}
      />
      {meta.touched && meta.error ? <div className="error mb-5">{meta.error}</div> : null}
    </>
  );
};

//? The Form Field //////////////////////////////////

const GlobalSecuritiesProductDetailForm = ({ index, to, icon, title, idAccSecurity, email, password, pin }) => {
  const [emailEvent, setEmailEvent] = useState("");
  const [passEvent, setPassEvent] = useState("");
  const [pinEvent, setPinEvent] = useState(0);
  const [isReset, setIsReset] = useState(false);
  const [first, setFirst] = useState(false);
  const [typed, setTyped] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [saved, setSaved] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pull_dirty = (dirty) => {
    console.log("hasil dirty:", dirty);
    setShowButton(dirty);
    setSaved(false);
  };

  // useEffect(() => {
  //   // setFirst(true);
  //   // setSaved(false);
  // }, [showButton]);

  // const handleEmail = (e) => {
  //   setEmailEvent(e.target.value);
  //   setFirst(false);
  //   setTyped(e.target.value);
  // };
  // const handlePass = (e) => {
  //   setPassEvent(e.target.value);
  //   setFirst(false);
  //   setTyped(e.target.value);
  // };
  // const handlePin = (e) => {
  //   console.log("pin:", typeof pinEvent);
  //   setPinEvent(e.target.value);
  //   setFirst(false);
  //   setTyped(Number(e.target.value));
  // };
  //? /////////////////////////////////////////////////////////////////////////////////////////////////////
  // const focusEmail = (e) => {
  //   console.log("focus e:", e.target.value);
  //   console.log("focus is same:", e.target.value !== email && e.target.value !== password && e.target.value !== pin);
  // };
  // const blurEmail = (e) => {
  //   console.log("blur e:", e.target.value);
  //   console.log("blur is same:",  e.target.value !== email && e.target.value !== password && e.target.value !== pin);
  // };
  console.log("showButton:", showButton);
  return (
    <>
      <Formik
        initialValues={{
          email,
          password,
          pin,
          idAccSecurity,
        }}
        validationSchema={Yup.object({
          email: Yup.string().email("Invalid email address").required("Required"),
          password: Yup.string().min(8, "Password must be at least 8 characters").required("Required"),
          pin: Yup.string()
            .matches(/^[0-9]{6}$/, "The PIN must consist of 6 numbers")
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          // setTimeout(() => {
          //! Saving form values /////
          alert(JSON.stringify(values, null, 2));

          Swal.fire({
            title: "Your changes has been saved!",
            // text: "You won't be able to revert this!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then((result) => {
            resetForm();
            console.log("json:", JSON.stringify(values, null, 2));
            console.log("result:", values);
            switch (idAccSecurity) {
              case 1:
                dispatch(setStockbitEmail(values.email));
                dispatch(setStockbitPassword(values.password));
                dispatch(setStockbitPin(values.pin));
                break;
              case 2:
                dispatch(setOther1Email(values.email));
                dispatch(setOther1Password(values.password));
                dispatch(setOther1Pin(values.pin));
                break;
              case 3:
                dispatch(setOther2Email(values.email));
                dispatch(setOther2Password(values.password));
                dispatch(setOther2Pin(values.pin));
                break;
              default:
                alert("Sorry, something is wrong on our side 😓");
            }
            setTyped("");
            navigate(-1);
          });

          setSubmitting(false);
          setSaved(true);
          // }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-1 mt-5 text-sm text-cuanbot-light-gray">
            <Field
              label="Email"
              id="email"
              name="email"
              type="email"
              // onInput={handleEmail}
              component={InputComponent}
              pull_dirty={pull_dirty}
              // formik={formik}
              // isReset={isReset}
              // setIsReset={setIsReset}
              // email={email}
              // onFocus={focusEmail}
              // onBlur={blurEmail}
              // value={email}

              //! Use conditional for placeholder base on actual data from props
              placeholder={`Your existed ${title} account's email`}
              className="text-cuanbot-white bg-cuanbot-light p-2 text-sm rounded-lg mb-8"
            />
            <Field
              label="Password"
              id="password"
              name="password"
              type="password"
              // onInput={handlePass}
              component={InputComponent}
              pull_dirty={pull_dirty}
              // onFocus={focusEmail}
              // onBlur={blurEmail}
              //! Use conditional for placeholder base on actual data from props
              placeholder={`Your existed ${title} account's password`}
              className="text-cuanbot-white bg-cuanbot-light p-2 text-sm rounded-lg mb-8"
            />
            <Field
              label="PIN"
              id="pin"
              name="pin"
              type="password"
              // onInput={handlePin}
              component={InputComponent}
              pull_dirty={pull_dirty}
              // isReset={isReset}
              // onFocus={focusEmail}
              // onBlur={blurEmail}
              //! Use conditional for placeholder base on actual data from props
              placeholder={`Your existed ${title} account's PIN`}
              className="text-cuanbot-white bg-cuanbot-light p-2 text-sm rounded-lg mb-8"
            />
            {/* //! Testing for showing submit and cancel button only when data has change based on similarity values in global state via props and user keyboard push/change */}
            {/* {console.log("email:" + typeof email)}
          {console.log("pass:" + typeof password)}
          {console.log("pin:" + typeof pin, typeof idAccSecurity)} */}

            {/* {console.log("emailEvent === email:", emailEvent === email)}
          {console.log("emailEvent.length > 0:", emailEvent.length > 0 )}
          {console.log("emailEvent useState:", emailEvent)}
          {console.log("email props:", email)} */}
            {/* {console.log("emailevent:", emailEvent)}
            {console.log("emailprops:", email)} */}
            {/* {typed === "" ? (
            <></>
          ) : (
            <>
              <div className="flex justify-between gap-6">
                <button
                  className="flex justify-center items-center py-4 mb-20 bg-cuanbot-gray rounded-xl text-lg text-cuanbot-white grow"
                  onClick={() => setIsReset(true)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex justify-center items-center py-4 mb-20 bg-cuanbot-green rounded-xl text-lg text-cuanbot-dark grow"
                >
                  Save Changes
                </button>
              </div>
            </>
          )} */}

            {/* //! ///////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* {console.log("isSubmitting:", isSubmitting)} */}
            {console.log("SAVED negate:", !saved)}
            {console.log("SAVED real:", saved)}

            {showButton && !saved && (
              <>
                <div className="flex justify-between gap-6">
                  <button
                    type="reset"
                    className={`flex justify-center items-center py-4 mb-20 rounded-xl text-lg grow ${
                      isSubmitting
                        ? "bg-cuanbot-dark text-cuanbot-white"
                        : "bg-cuanbot-gray text-cuanbot-dark hover:cursor-pointer"
                    } text-cuanbot-white  hover:cursor-pointer`}
                    disabled={isSubmitting}
                    onClick={() => setIsReset(true)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`flex justify-center items-center py-4 mb-20 rounded-xl text-lg grow ${
                      isSubmitting
                        ? "bg-green-900 text-cuanbot-dark"
                        : "bg-cuanbot-green text-cuanbot-dark hover:cursor-pointer"
                    }`}
                    disabled={isSubmitting}
                  >
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default GlobalSecuritiesProductDetailForm;
