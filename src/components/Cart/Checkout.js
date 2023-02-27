import React, { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const hasFiveChar = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const postalIsValid = hasFiveChar(enteredPostalCode);
    const cityIsValid = !isEmpty(enteredCity);

    setFormInputValidity({
      name: nameIsValid,
      street: streetIsValid,
      postalCode: postalIsValid,
      city: cityIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && postalIsValid && cityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        postalCode: enteredPostalCode,
        city: enteredCity,
    })

  };

  const nameInputClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;
  const streetInputClasses = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;
  const postalInputClasses = `${classes.control} ${
    formInputValidity.postalCode ? "" : classes.invalid
  }`;
  const cityInputClasses = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;

  return (
    <form onSubmit={submitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Name</label>
        <input type="text" ref={nameInputRef} id="name"></input>
      </div>
      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" ref={streetInputRef} id="street"></input>
      </div>
      <div className={postalInputClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" ref={postalInputRef} id="postal"></input>
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input type="text" ref={cityInputRef} id="city"></input>
      </div>
      <div className={classes.actions}>
        <button
          onClick={props.onCancel}
          className={classes.button}
          type="button"
        >
          Cancel
        </button>
        <button className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
