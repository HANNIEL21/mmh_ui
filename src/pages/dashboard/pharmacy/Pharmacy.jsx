import React, { useState, useEffect } from 'react';
import ItemCard from '../../../components/ItemCard';
import { baseUrl } from '../../../utils/constant';
import axios from 'axios';

const Pharmacy = () => {
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState({});
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/inventory.php`);
                setItems(res.data.data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };
        fetchData();
    }, []);

    // Function to add/update item in cart
    const addToCart = (item) => {
        setCart((prevCart) => {
            const quantity = prevCart[item.id]?.quantity || 0;
            const updatedCart = { 
                ...prevCart, 
                [item.id]: { ...item, quantity: quantity + 1 } 
            };
            calculateTotal(updatedCart);
            return updatedCart;
        });
    };

    // Function to update quantity in cart
    const updateQuantity = (id, quantity) => {
        setCart((prevCart) => {
            if (quantity === 0) {
                const updatedCart = { ...prevCart };
                delete updatedCart[id];
                calculateTotal(updatedCart);
                return updatedCart;
            }
            const updatedCart = { 
                ...prevCart, 
                [id]: { ...prevCart[id], quantity } 
            };
            calculateTotal(updatedCart);
            return updatedCart;
        });
    };

    // Calculate total cost
    const calculateTotal = (cart) => {
        const newTotal = Object.values(cart).reduce((sum, item) => sum + (item.quantity * item.price), 0);
        setTotal(newTotal);
    };

    return (
        <div className='w-full h-full flex flex-col lg:flex-row'>
            <div className='w-full h-full'>
                <div className='w-full grid grid-cols-1 lg:grid-cols-4 gap-4'>
                    {items.map((item) => (
                        <ItemCard key={item.id} data={item} addToCart={addToCart} updateQuantity={updateQuantity} cart={cart} />
                    ))}
                </div>
            </div>
            <div className='absolute lg:relative bottom-2 bg-white lg:bg-transparent p-2 left-0 w-full shadow-md lg:w-1/3 lg:h-full lg:border-l-2 lg:border-slate-400 px-2'>
                <h2 className='font-bold text-xl text-appColor capitalize'>Summary</h2>
                <div className='h-max'>
                    {/* Display items in cart */}
                    {Object.values(cart).map((item) => (
                        <div key={item.id} className='flex justify-between'>
                            <p>{item.product}</p>
                            <p>{item.quantity} x ${item.price}</p>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between items-center'>
                    <p className='font-bold capitalize text-xl'>Total: <span>${total.toFixed(2)}</span></p>
                    <button className='bg-appColor p-2 px-10 rounded-lg text-white font-bold uppercase'>Save</button>
                </div>
            </div>
        </div>
    );
};

export default Pharmacy;
