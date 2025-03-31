import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { removeFromCart, updateQuantity, clearCart } from "../../redux/cartSlice";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../lib/firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import { CartItem } from "../../types/types";
import './Cart.css';

const Cart = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch: AppDispatch = useDispatch();
    const { user } = useAuth();
    
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState('');

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = async () => {
      if (!user) {
        setError('You must be logged in to checkout');
        return;
      }

      try{
        const orderData = {
          userId: user.uid,
          items: cartItems.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.image
          })),
          totalPrice: totalPrice,
          createdAt: Timestamp.now(),
          status: 'completed'
        };

        await addDoc(collection(db, 'orders'), orderData);
        dispatch(clearCart({ userId: user.uid }));

        setSuccess('Order Placed successfully. Thank you and please shop with us again.');
        setError(null);
      } catch (error: any) {
        setError(error.message);
        console.error('Checkout error:', error);
      }
    };

    const handleRemoveItem = (id: string) => {
      if (!user) {
          setError('You must be logged in to modify your cart');
          return;
      }
      dispatch(removeFromCart({ userId: user.uid, id }));
  };

  const handleQuantityChange = (id: string, value: string) => {
    if (!user) {
        setError('You must be logged in to modify your cart');
        return;
    }

    const quantity = Math.max(1, parseInt(value) || 1);
    dispatch(updateQuantity({ userId: user.uid, id, quantity }));
};

  return (
    <div className="cart-card">
        <h2>Shopping Cart</h2>
        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}

        {cartItems.length === 0 ? (
            <p>The cart is empty.</p>
        ) : (
            <>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        <img className="cart-image" src={item.image} alt={item.title} />
                        <div>
                            <h3>{item.title}</h3>
                            <p>${item.price} x {item.quantity}</p>
                            
                            <input type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                            min='1'
                            />

                            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>

                        </div>
                    </li>
                ))}
            </ul>
            <div className="cart-summary">
                <p>Total Items: {totalItems}</p>
                <p>Total Price: ${totalPrice.toFixed(2)}</p>
                <button onClick={handleCheckout}>Checkout</button>
            </div>
            </>
        ) }
    </div>
  )
};

export default Cart;