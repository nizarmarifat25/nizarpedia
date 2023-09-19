import React, { useContext, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { thousands_separators } from '../../utilities/utils';
import "swiper/css";

import "swiper/css/navigation";

// import "./styles.css";
import { Navigation } from "swiper";
import { Contex } from '../MyContext'
import { Link } from 'react-router-dom';


const Promo = () => {
  const { product } = useContext(Contex)
  for (let i = 0; i < product.length; i++) {
    let splitPrice = product[i].price.split("|")
    if (splitPrice.length > 1) {
      product[i].price = splitPrice[0]
    }
  }
  return (
    <div className='my-3'>
      <div className="promo-wrapper my-5">
        <h5 className="promo-title">Sembakonya bu..</h5>
        <Swiper
          slidesPerView={5}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper py-2"
        >
          {product.map((data, i) => {
            if (data.category_id === 7) {
              return (
                <SwiperSlide key={i}>
                  <div className="card-product ">
                    <div className="card-item shadow-sm">
                      <Link
                        to={'product/' + data.id}
                      >
                        <div className="image-content d-flex justify-content-center">
                          <div className="card-image">
                            <img src={data.image_url} alt="laptop" className='card-img' width="100px" />
                          </div>
                        </div>
                        <p className='px-3 py-2'> {data.product_name}</p>
                        <div className=' d-flex justify-content-between mt-1 px-3'>
                          <strong className="harga">Rp.{thousands_separators(data.price)}</strong>
                          <small className="sold ">24 Terjual</small>
                        </div>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              )
            }
          })}
        </Swiper>
        <div className="promo-wrapper my-5">
          <h5 className="promo-title">Starboy staterpack</h5>
          <Swiper
            slidesPerView={5}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper py-2"
          >
            {product.map((data, i) => {
              if (data.category_id === 6 || data.category_id === 5 || data.category_id === 4) {
                return (
                  <SwiperSlide>
                    <div className="card-product " key={i}>
                      <div className="card-item shadow-sm">
                        <Link
                          to={'product/' + data.id}
                        >
                          <div className="image-content d-flex justify-content-center">
                            <div className="card-image">
                              <img src={data.image_url} alt="laptop" className='card-img' width="100px" />
                            </div>
                          </div>
                          <p className='px-3 py-2'> {data.product_name}</p>
                          <div className='d-flex justify-content-between mt-1 px-3'>
                            <strong className="harga">Rp.{thousands_separators(data.price)}</strong>
                            <small className="sold ">24 Terjual</small>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              }
            })}
          </Swiper>
        </div>
        <div className="promo-wrapper my-5">
          <h5 className="promo-title">Dijamin awet 100% bun</h5>
          <Swiper
            slidesPerView={5}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper py-2"
          >
            {product.map((data, i) => {
              if (data.category_id === 1) {
                return (
                  <SwiperSlide>
                    <div className="card-product ">
                      <div className="card-item shadow-sm">
                        <Link
                          to={'product/' + data.id}
                        >
                          <div className="image-content d-flex justify-content-center">
                            <div className="card-image">
                              <img src={data.image_url} alt="laptop" className='card-img' width="100px" />
                            </div>
                          </div>
                          <p className='px-3 py-2'> {data.product_name}</p>
                          <div className='d-flex justify-content-between mt-1 px-3'>
                            <strong className="harga">Rp.{thousands_separators(data.price)}</strong>
                            <small className="sold ">24 Terjual</small>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              }
            })}
          </Swiper>
        </div>
        <div className="promo-wrapper my-5">
          <h5 className="promo-title">Auto tampil kece ngab😎</h5>
          <Swiper
            slidesPerView={5}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper py-2"
          >
            {product.map((data, i) => {
              if (data.category_id === 6 || data.category_id === 2 || data.category_id === 3) {
                return (
                  <SwiperSlide>
                    <div className="card-product ">
                      <div className="card-item shadow-sm">
                        <Link
                          to={'product/' + data.id}
                        >
                          <div className="image-content d-flex justify-content-center">
                            <div className="card-image">
                              <img src={data.image_url} alt="laptop" className='card-img' width="100px" />
                            </div>
                          </div>
                          <p className='px-3 py-2'> {data.product_name}</p>
                          <div className='d-flex justify-content-between mt-1 px-3'>
                            <strong className="harga">Rp.{thousands_separators(data.price)}</strong>
                            <small className="sold">24 Terjual</small>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              }
            })}
          </Swiper>
        </div>
      </div>
    </div >
  )
}

export default Promo