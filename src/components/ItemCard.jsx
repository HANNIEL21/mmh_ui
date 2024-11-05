import React from 'react';
import { FaPlus, FaMinus } from "react-icons/fa6";

const ItemCard = ({ data, addToCart, updateQuantity, cart }) => {
    const quantityInCart = cart[data.id]?.quantity || 0;

    return (
        <div className='bg-white p-3 rounded-lg flex flex-col items-center gap-4'>
            <div className='text-center uppercase'>
                <h2 className='font-extrabold text-appColor text-xl'>{data.product}</h2>
                <p className='font-light text-sm'>{data.category}</p>
            </div>
            <div className='flex gap-2 items-center'>
                <button
                    onClick={() => updateQuantity(data.id, quantityInCart - 1)}
                    className='border-2 border-appColor p-2 rounded-lg text-appColor text-lg'
                    disabled={quantityInCart === 0}
                >
                    <FaMinus />
                </button>
                <p className='text-appColor text-lg font-extrabold'>{data.quantity}</p>
                <button
                    onClick={() => addToCart(data)}
                    className='border-2 border-appColor p-2 rounded-lg text-appColor text-lg'
                >
                    <FaPlus />
                </button>
            </div>
        </div>
    );
};

export default ItemCard;
