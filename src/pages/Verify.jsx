import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Verify = () => {
    const { navigate, token, setCartItem, backend_url } = useContext(ShopContext);

    const [searchParam, setSearchParam] = useSearchParams();

    const success = searchParam.get('success');
    const orderId = searchParam.get('orderId');

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null
            }
            const response = await axios.post(backend_url + '/api/order/verifyStripe', { success, orderId }, { headers: { token } })
            if (response.data.success) {
                setCartItem({})
                navigate('/order-success')
            } else {
                navigate('/cart')
            }
        }catch (error) {
            console.log(error)
            toast.error(error.message)
            navigate('/cart')
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [token])

    return (
        <div>
            <h1>Verifying Payment...</h1>
        </div>
    )
}

export default Verify