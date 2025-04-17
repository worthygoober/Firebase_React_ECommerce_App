import { CartItem, Product } from "../../types/types";
import './ProductCard.css';
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { useAuth } from "../../context/AuthContext";
import { AppDispatch } from "../../redux/store";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const dispatch = useDispatch<AppDispatch>();
    const {user} = useAuth();

    // Handle adding product to cart
    const handleAddToCart = () => {
        const item: CartItem = {...product, quantity: 1 };
        if (user) {
            dispatch(addToCart({ userId: user.uid, item }));
        } else {
            alert("You must be logged in to add items to the cart.");
        }
    };

    return (
        <div className="product-card">
            <h3>{product.title}</h3>
            <h6>{product.category}</h6>
            <p>${product.price.toFixed(2)}</p>
            <img className="product-image" src={product.image} alt={product.title} />
            <p>{product.description}</p>
            <p>Quantity: {product.quantity}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default ProductCard;