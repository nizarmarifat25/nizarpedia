import React, { useEffect, useState } from 'react'
import cookie from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL, thousands_separators } from '../../utilities/utils'

const Navigation = ({ getToken, updated }) => {
    const navigate = useNavigate()
    const [update, setUpdate] = useState(false)
    const [cart, setCart] = useState([])
    const [listCart, setListCart] = useState([])
    const idUser = cookie.get('id')

    const handleLogout = (e) => {
        e.preventDefault();
        const body = {
            id: parseInt(idUser)
        }
        axios.post(BASE_URL + 'auth/logout', body, {
            headers: {
                authorization: "Bearer " + cookie.get('token')
            }
        })
            .then((res) => {
                console.log(res); cookie.remove("token");
                cookie.remove("name");
                cookie.remove("role_name");
                cookie.remove("role_id");
                cookie.remove("id");
                cookie.remove("email");
                getToken(cookie.get('token'))
                setTimeout(() => {
                    navigate('/login')
                }, 1000);
                setUpdate(!update)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        axios.get(BASE_URL + 'cart/' + cookie.get('id'), {
            headers: {
                authorization: "Bearer " + cookie.get('token')
            }
        })
            .then((res) => {
                for (let i = 0; i < res.data.data.length; i++) {
                    if (res.data.data[i].product_name.length > 20)
                        res.data.data[i].product_name = res.data.data[i].product_name.slice(0, 20) + '...'
                }
                setCart(res.data.data)
            })
            .catch((err) => {
                console.log(err);

            })
    }, [update, updated])



    return (
        <div>
            <nav className="navbar navbar-expand-lg shadow-sm p-3 mb-3 bg-white  align-items-center ">
                <div className="container">
                    <Link to="/" className='brand'>nizar<span className='pedia'>pedia</span></Link>
                    <div className='mx-auto row'>
                        <input type="text" className='form-control col' placeholder='Mau jajan apa hari ini' style={{ width: '700px' }} />
                        <div className="col-1">
                            <i className="bi bi-search" type='button'></i>
                        </div>
                    </div>
                    <div className='dropdown ms-1 d-lg-block'>
                        <span className='nav-account align-middle' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bi bi-cart"></i>
                            {cart.length > 0 &&
                                <span className='badge badge-warning' id='lblCartCount'> {cart.length}</span>
                            }
                        </span>
                        <ul className="dropdown-menu dropdown-menu-end shadow p-2 animate slideIn" style={{ width: '450px', border: 'none', marginTop: '18px' }}>
                            {cart.length > 0 ?
                                <>
                                    {cart.map((item, i) => {
                                        if (i <= 5) {
                                            return (
                                                <>
                                                    <li key={i} className="dropdown-item p-2 " type='button'>
                                                        <div className='row align-items-center'>
                                                            <div className="col-1">
                                                                <img src={item.image_url} alt="" width={'40px'} />
                                                            </div>
                                                            <div className="col-7">
                                                                <strong className='ms-3 d-block'>{item.product_name}</strong>
                                                                <small className='ms-3 text-secondary'>{item.qty} Barang</small>
                                                            </div>
                                                            <div className="col text-end">
                                                                <strong className='product-detail-price'>Rp. {thousands_separators(item.price)}</strong>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </>
                                            )
                                        }
                                    })}
                                    <li className='p-2 text-end' key="12">
                                        <Link to={'/cart'}>
                                            <button className="button-primary-sm ">liat semua keranjang</button>
                                        </Link>
                                    </li>
                                </>
                                : <li className='p-2 text-center'>
                                    Keranjang kamu kosong
                                </li>}
                        </ul>
                    </div>
                    <div className='dropdown d-lg-block'>
                        <strong className='nav-account align-middle' type="button" data-bs-toggle="dropdown" aria-expanded="false">{cookie.get('name')}</strong>
                        <ul className="dropdown-menu dropdown-menu-end shadow p-2 animate slideIn" style={{ width: '250px', border: 'none', marginTop: '24px' }}>
                            <li className="px-2 py-1" type='button'>
                                <i className="bi bi-person align-middle fs-5"></i>
                                <small className='ms-3'>Akun Saya</small>
                            </li>
                            <Link to='transaction'>
                                <li className="px-2 py-1" type='button'>
                                    <i className="bi bi-cash-stack align-middle fs-5 text-success"></i>
                                    <small className='ms-3 text-success'>Transaksi</small>
                                </li>
                            </Link>
                            <li className="px-2 py-1" type='button' onClick={(e) => handleLogout(e)}>
                                <i className="bi fs-5 bi-box-arrow-left text-danger align-middle"></i>
                                <small className='logout ms-3 text-danger' >Logout</small>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navigation