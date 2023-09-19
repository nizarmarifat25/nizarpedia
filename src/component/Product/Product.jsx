import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL, thousands_separators } from '../../utilities/utils'
import axios from 'axios'
import Cookies from 'js-cookie'

const Product = ({ similar, triger }) => {
    const [product, setProduct] = useState([])
    const [currentProduct, setCurrentProduct] = useState(similar)

    const getProducts = () => {
        axios.get(BASE_URL + 'product', {
            headers: {
                authorization: "Bearer " + Cookies.get('token')
            }
        })
            .then((res) => {
                let temp = []
                for (let i = 0; i < res.data.data.length; i++) {
                    if (res.data.data[i].category_id === currentProduct.category_id && res.data.data[i].id !== currentProduct.id) {
                        temp.push(res.data.data[i])
                    }
                }
                setProduct(temp)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getProducts()
    }, [currentProduct])

    return (
        <div className=" row">
            {product.map((data, i) => {
                return (
                    <div className="card-item shadow-sm col-md-3 my-3" key={i}>
                        <Link
                            to={'/product/' + data.id}
                            onClick={() => { triger(data.id); getProducts(); setCurrentProduct(data) }}
                        >
                            <div className="d-flex justify-content-center">
                                <div className="card-image">
                                    <img src={data.image_url} alt="laptop" className='card-img' width="100px" />
                                </div>
                            </div>
                            <div className="card-content p-3">
                                {data.product_name}
                                <div className='d-flex justify-content-between mt-1'>
                                    <strong className="harga">Rp {thousands_separators(data.price)}</strong>
                                    <small className="sold">24 Terjual</small>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>

    )
}

export default Product