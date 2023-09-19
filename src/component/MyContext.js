import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utilities/utils";
import Cookies from "js-cookie";

const Contex = createContext(null)

const Provider = ({ children }) => {
    const [product, setProduct] = useState([])
    const [category, setCategory] = useState([])
    const [banner, setBanner] = useState([])

    const getProducts = () => {
        axios.get(BASE_URL + 'product', {
            headers: {
                authorization: "Bearer " + Cookies.get('token')
            }
        })
            .then((res) => {
                for (let i = 0; i < res.data.data.length; i++) {
                    if (res.data.data[i].product_name.length > 23)
                        res.data.data[i].product_name = res.data.data[i].product_name.slice(0, 23) + '...'
                }
                
                setProduct(res.data.data)
            })
            .catch(err => console.log(err))
    }

    const getCategory = () => {
        axios.get(BASE_URL + '/category')
            .then((res) => {
                setCategory(res.data)
            })
            .catch(err => console.log(err))
    }

    const getBanner = () => {
        axios.get(BASE_URL + 'banner', {
            headers: {
                authorization: "Bearer " + Cookies.get('token')
            }
        })
            .then((res) => {
                setBanner(res.data.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getProducts()
        getCategory()
        getBanner()
    }, [])


    return (
        <Contex.Provider value={{ product, category, banner }}>
            {children}
        </Contex.Provider >
    )
}

export { Provider, Contex }