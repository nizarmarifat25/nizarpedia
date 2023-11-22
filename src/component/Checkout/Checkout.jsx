import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { BASE_URL, thousands_separators } from '../../utilities/utils'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Checkout = () => {
    const cookiesParse = Cookies.get('purchased') ? JSON.parse(Cookies.get('purchased')) : null
    const [purchased, setPurchased] = useState(cookiesParse)
    const [isShow, setIsShow] = useState(false)
    const transaction = (e) => {
        e.preventDefault()
        const body = {
            sub_total: purchased.price * purchased.qty ,
            price: purchased.price,
            user_id: Cookies.get('id'),
            product_id: purchased.product_purchased.id,
            quantity: purchased.qty,
            variant: purchased.variant,
            stock: purchased.product_purchased.stock
        }
        axios.post(BASE_URL + 'transaction', body, {
            headers: {
                authorization: "Bearer " + Cookies.get('token')
            }
        })
            .then((res) => {
                setIsShow(true)
                Cookies.remove("purchased")
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (

        <div className='container mt-4' >
            {purchased ?
                <div className='shadow p-4'>
                    <h2 style={{ color: '#25B5B9' }}>Checkout</h2>
                    <hr />
                    <table width="100%">
                        <tr>
                            <th colSpan={3}>Alamat Pengiriman</th>
                        </tr>
                        <tr>
                            <td>{purchased.customer_name}</td>
                            <td style={{ padding: "0 30px" }}>{purchased.address}</td>
                        </tr>
                    </table>
                    <hr />
                    <table width="100%" className='my-3'>
                        <thead>
                            <tr>
                                <th>Nama Produk</th>
                                <th>Variasi</th>
                                <th>Harga Satuan</th>
                                <th>Jumlah</th>
                                <th style={{ textAlign: 'right' }}>Subtotal Harga Produk</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{purchased.product_purchased.product_name}</td>
                                <td>{purchased.variant ? purchased.variant : "-"}</td>
                                <td>Rp {thousands_separators(purchased.price)}</td>
                                <td>{purchased.qty}</td>
                                <td style={{ textAlign: 'right' }}>Rp {thousands_separators(purchased.price * purchased.qty)}</td>
                            </tr>
                            <tr>
                                <td colSpan={5}><hr style={{ borderTop: '3px dotted grey' }} /></td>
                            </tr>
                            <tr>
                                <td colSpan={3}></td>
                                <td style={{ textAlign: 'right' }}>Subtotal Harga Produk :</td>
                                <td style={{ textAlign: 'right' }}>Rp {thousands_separators(purchased.price * purchased.qty)}</td>
                            </tr>
                            <tr>
                                <td colSpan={3}></td>
                                <td style={{ textAlign: 'right' }}>Total yang harus dibayar :</td>
                                <td style={{ textAlign: 'right' }}><h3>Rp {thousands_separators(purchased.price * purchased.qty + 10000)}</h3></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'right', paddingTop: '20px' }}>  <button className={isShow ? 'button-disabled' : 'button-primary'} onClick={(e) => transaction(e)}>Bayar</button></td>
                            </tr>
                        </tfoot>
                    </table>
                    <hr style={{ borderTop: '3px dotted black' }} />
                    <div className={isShow ? 'text-center show-alert' : 'text-center hide-alert '}>
                        <div className='alert alert-success shadow-sm d-inline-block w-50'>
                            <span className='text-center text-success'>
                                Pembayaran Sukses !
                            </span> <br /><br />
                            <Link to='/transaction'>  <button className='button-primary me-2 shadow-sm'>Lihat Pesanan</button> </Link>
                            <Link to='/'><button className='button-secondary shadow-sm'>Lanjut belanja</button></Link>
                        </div>
                    </div>
                </div>
                : <div>
                    <h1>Tidak ada produk yang akan dibeli</h1>
                </div>}
        </div >

    )
}

export default Checkout