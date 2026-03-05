import { createContext, use, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = `$`;
    const delivery_fee = 10;
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItem, setCartItem] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : {};
    });
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [token, setToken] = useState('');

    // -----------------------------
    // ADD TO CART
    // -----------------------------
    const addToCart = async (itemId, size) => {
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
        if (token) {
            try {
                await axios.post(backend_url + '/api/cart/add', { itemId, size }, { headers: { token } });

            } catch (error) {
                console.error(error);
                toast.error(error.message);
            }
        }
    };
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItem);
        cartData[itemId][size] = quantity;
        setCartItem(cartData);

        if (token) {
            try {
                await axios.post(backend_url + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            }
        }
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
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    const getUserCart = async () => {
        if (!token) return; // avoid unauthorized requests
        try {
            const response = await axios.post(backend_url + '/api/cart/get', {}, { headers: { token } });
            if (response.data.success) {
                setCartItem(response.data.cartData);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getProductdata();
    }, []);

    // initialize token and fetch cart when available
    useEffect(() => {
        const stored = localStorage.getItem('token');
        if (stored) {
            setToken(stored);
        }
    }, []);

    // once token state updates, load cart
    useEffect(() => {
        if (token) {
            getUserCart();
        }
    }, [token]);

    // persist cart locally so it survives refresh
    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cartItem));
        } catch (e) {
            console.error('Failed to save cart to localStorage', e);
        }
    }, [cartItem]);

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItem,
        setCartItem,
        addToCart,
        updateQuantity,
        getCartCount,
        getCartAmount, navigate,
        backend_url, setToken, token
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
