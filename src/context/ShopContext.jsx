import { createContext, use, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = `$`;
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItem, setCartItem] = useState({});
    const navigate = useNavigate();


    // -----------------------------
    // ADD TO CART
    // -----------------------------
    const addToCart = (itemId, size) => {
        if (!size) {
            toast.error('Select Size');
            return;
        }

        let cartData = structuredClone(cartItem);

        if (cartData[itemId]) {
            cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        } else {
            cartData[itemId] = { [size]: 1 };
        }

        setCartItem(cartData);
    };

    // -----------------------------
    // UPDATE QUANTITY
    // -----------------------------
    const updateQuantity = (itemId, size, quantity) => {
        let cartData = structuredClone(cartItem);
        cartData[itemId][size] = quantity;
        setCartItem(cartData);
    };

    // -----------------------------
    // TOTAL QUANTITY IN CART
    // -----------------------------
    const getCartCount = () => {
        let total = 0;

        for (const itemId in cartItem) {
            for (const size in cartItem[itemId]) {
                total += cartItem[itemId][size];
            }
        }

        return total;
    };

    // -----------------------------
    // TOTAL CART AMOUNT (PRICE)
    // -----------------------------
    const getCartAmount = () => {
        let totalAmount = 0;

        for (const itemId in cartItem) {
            const product = products.find(p => p._id === itemId);
            if (!product) continue;

            for (const size in cartItem[itemId]) {
                totalAmount += product.price * cartItem[itemId][size];
            }
        }

        return totalAmount;
    };

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItem,
        addToCart,
        updateQuantity,
        getCartCount,
        getCartAmount, navigate
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
