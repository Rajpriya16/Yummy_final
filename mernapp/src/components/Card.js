import React, { useState, useEffect, useRef } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
    const dispatch = useDispatchCart();
    const data = useCart();
    const priceRef = useRef();
    const options = props.options || {};
    const priceOptions = Object.keys(options);

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(priceOptions[0] || ""); 
    const [finalPrice, setFinalPrice] = useState(0);

    useEffect(() => {
        if (size) {
            setFinalPrice(qty * (parseInt(options[size]) || 0));
        }
    }, [qty, size, options]);

    const handleAddToCart = async () => {
        let food = data.find(item => item.id === props.foodItem._id && item.size === size);
    
        if (food) {
          await dispatch({
            type: "UPDATE",
            id: props.foodItem._id,
            size: size,
            price: finalPrice,
            qty: qty
          });
        } else {
          await dispatch({
            
            type: "ADD",
            id: props.foodItem._id,
            name: props.foodItem.name,
            price: finalPrice,
            qty: qty,
            size: size,
            img: props.foodItem.img
          });
        }
    };
    

    const handleQtyChange = (e) => {
        setQty(e.target.value);
    };

    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };

    return (
        <div>
            <div>
                <div className="card mt-3 bg-info" style={{ width: '18rem', maxHeight: '480px', backgroundColor: '#ADD8E6', color: 'white', border: '5px solid #ADD8E6' }}>
                    <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "180px", objectFit: "cover" }} />
                    <div className="card-body d-flex flex-column justify-content-between">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <div className='container width-100'>
                            <select className='m-2 h-100 bg-black' value={qty} onChange={handleQtyChange} style={{ backgroundColor: '#3498db', color: 'white' }}>
                                {Array.from(Array(6), (e, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>

                            <select className="m-2 h-100 bg-black rounded" ref={priceRef} value={size} onChange={handleSizeChange} style={{ backgroundColor: '#3498db', color: 'white' }}>
                                {priceOptions.map((data) => (
                                    <option key={data} value={data}>{data}</option>
                                ))}
                            </select>
                            <div className="d-inline h-100 fs-5 bg-black" style={{ backgroundColor: 'black', color: 'white', textAlign: 'center' }}>
                                {finalPrice}/-
                            </div>
                        </div>
                        <hr />
                        <div className="text-center">
                            <button className="btn btn-info bg-black text-white" onClick={handleAddToCart}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
