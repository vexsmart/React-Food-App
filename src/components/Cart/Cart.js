import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const startOrder = () => {
    setIsOrdering(true);
  };

  const orderHandler = async (userData) => {
    setIsSending(true);
    await fetch(
      "https://food-order-app-d25c1-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          order: cartCtx.items,
        }),
      }
    ).catch((error) => {});
    setIsSending(false);
    setIsSent(true);
    cartCtx.clearCart()
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalButtons = (
    <div className={classes.actions}>
      {!isOrdering && (
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
      )}
      {hasItems && !isOrdering && (
        <button onClick={startOrder} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );

  const submissionFinish = (
    <section className={classes.actions}>
      <p className={classes.lastMessage}>Your order has been sent!</p>
      <button className={classes.button} onClick={props.onClose}>Close</button>
    </section>
  )

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
    </React.Fragment>
  );

  const sendingOrderData = <p>Sending Order...</p>

  return (
    <Modal onClose={props.onClose}>
      {!isSending && !isSent && cartModalContent}
      {isSending && sendingOrderData}
      {isOrdering && !isSending && !isSent && 
        <Checkout onConfirm={orderHandler} onCancel={props.onClose} />
      }
      {!isOrdering && !isSending && !isSent && modalButtons}
      {isSent && submissionFinish}
    </Modal>
  );
};

export default Cart;
