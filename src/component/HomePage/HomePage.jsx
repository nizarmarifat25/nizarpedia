import React from 'react'
import { Provider } from '../MyContext'
import Banner from '../Banner/Banner'
import Promo from '../Promo/Promo'
import Product from '../Product/Product'

const HomePage = () => {
    return (
        <>
            <Provider>
                <div className="container">
                    <Banner />
                    <Promo />
                </div>
            </Provider>
        </>
    )
}

export default HomePage