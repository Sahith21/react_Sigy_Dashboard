import React, { useState, useEffect } from 'react';
import { API_URL } from '../Data/ApiPath';

const Allproducts = () => {
    const [products, setproducts] = useState([]);

    const producthandler = async () => {
        const firmId = localStorage.getItem('firmId');
        try {
            const response = await fetch(`${API_URL}/product/${firmId}/products`);
            const newproductsdata = await response.json();
            setproducts(newproductsdata.products);
            console.log(newproductsdata);
        } catch (error) {
            console.error('Failed to fetch products', error);
            alert('Failed to fetch products');
        }
    };

    useEffect(() => {
        producthandler();
        console.log('this is useEffect');
    }, []);

    const deleteproductbyId = async (productId) => {
        
            try {
                const response = await fetch(`${API_URL}/product/${productId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setproducts(products.filter(product => product._id !== productId));
                    confirm("Are you sure you want to delete?")
                    alert('Product deleted successfully');
                }
            } catch (error) {
                console.error("Failed to delete product",error);
                alert('Failed to delete product');
            }
        
    };

    return (
        <div className='productsection'>
            {!products ? (
                <p>No products added</p>
            ) : (
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item) => {
                            return(
                                <>
                            <tr key={item._id}>
                                <td>{item.productname}</td>
                                <td>{item.price}</td>
                                <td>
                                    {item.image && (
                                        <img
                                            src={`${API_URL}/uploads/${item.image}`}
                                            alt={item.productname}
                                            style={{ width: '50px', height: '50px' }}
                                        />
                                    )}
                                </td>
                                <td>
                                    <button onClick={() => deleteproductbyId(item._id)} className='deletebtn'>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            </>
                        )})}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Allproducts;
