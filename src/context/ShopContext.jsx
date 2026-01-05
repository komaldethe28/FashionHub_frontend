import { createContext, use, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = `$`;
    const delivery_fee = 10;
    const backend_url=import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItem, setCartItem] = useState({});
    const [products, setProducts] = useState([]);
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

    const getProductdata = async () => {
        try {
            const response = await axios.get(backend_url + "/api/product/list");
            if(response.data.success){
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }
    useEffect(() => {
        getProductdata()
    }, [])

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
        getCartAmount, navigate,
        backend_url
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
