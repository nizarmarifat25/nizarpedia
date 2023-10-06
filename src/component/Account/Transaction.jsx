import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL, thousands_separators } from '../../utilities/utils'
import verifiedLogo from '../../asset/img/verified.png'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'

const Transaction = () => {
    const [dataTransaction, setDataTransaction] = useState([])

    useEffect(() => {
        axios.get(BASE_URL + 'transaction/' + Cookies.get('id'), {
            headers: {
                authorization: "Bearer " + Cookies.get('token')
            }
        })
            .then((res) => {
                setDataTransaction(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    return (
        <div className='container mt-4'>
            {dataTransaction &&
                <h2>Transaksi</h2>
            }
            {dataTransaction !== null ? dataTransaction.map((data, i) => {
                return (
                    <>
                        <div className='border rounded py-3 px-4 my-3 shadow-sm' key={i}>
                            <div className="row justify-content-between align-items-center">
                                <div className="col-3">
                                    <strong>{data.shop_name}</strong>
                                    <img src={verifiedLogo} alt="" width='25' className='mb-1' />
                                </div>
                                <div className="col-3 text-end">
                                    <div className="dropdown">
                                        {data.status_transaction == "DIKEMAS" ? <span className='badge bg-warning'>{data.status_transaction}</span> :
                                            data.status_transaction == "DIKIRIM" ? <span className='badge bg-primary'>{data.status_transaction}</span> :
                                                <span className='badge bg-success'>{data.status_transaction}</span>
                                        }
                                        <i className="bi bi-three-dots-vertical fw-bold ms-2" type="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                                        <ul className="dropdown-menu animate slideIn shadow">
                                            <li className="dropdown-item" type='button'> <i className="bi text-primary bi-card-list me-2"></i>Detail </li>
                                            <li className="dropdown-item " type='button'> <i className="bi text-danger bi-file-pdf me-2"></i>Cetak Invoice</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-2  text-center">
                                    <img src={data.image_url} alt="" className='w-50' />
                                </div>
                                <div className="col-10">
                                    <h4>{data.product_name}</h4>
                                   <small>Harga Satuan : Rp{thousands_separators(data.price)}</small> <br />
                                    {
                                        data.variant !== "" ?
                                            <><small>{data.variant_name} : {data.variant}</small> <br /> </> :
                                            null
                                    }
                                    <small>Kuantitas : {data.quantity}</small>
                                </div>
                            </div>
                            <hr style={{ borderTop: '3px dotted grey' }} />
                            <div className='row align-items-center'>
                                <div className="col">
                                    <small> Total Belanja</small> <br />
                                    <h4 style={{ color: '#25B5B9' }}>Rp {thousands_separators(data.sub_total)}</h4>
                                </div>
                                <div className='col text-end'>
                                    <Link to={'/product/' + data.product_id}>
                                        <button className="button-secondary">Beli lagi</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })
                :
                <div className='text-center'>
                    <div className='alert alert-warning'>
                        <h2>Kamu belum melakukan transaksi apapun</h2>
                        Klik <Link to='/'><u><i>Disini</i></u> </Link> dan cari barang yang kamu mau
                    </div>
                </div>

            }


            {/* <div className='shadow-sm p-4'>
                <hr />
                <table className='table'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Produk</th>
                            <th>Nama Toko</th>
                            <th className='text-end'>Total Pesanan</th>
                            <th className='text-center'>Status Pesanan</th>
                            <th className='text-center'>Detail Pesanan</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {dataTransaction.map((data, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>
                                        {data.product_name} <br />
                                        {
                                            data.variant !== "" ?
                                                <small>{data.variant_name} : {data.variant}</small> :
                                                null
                                        }
                                    </td>
                                    <td>{data.shop_name}</td>
                                    <td className='text-end'>Rp {thousands_separators(data.sub_total)}</td>
                                    <td className='text-center'>
                                        {data.status_transaction == "DIKEMAS" ? <span className='badge bg-warning'>{data.status_transaction}</span> :
                                            data.status_transaction == "DIKIRIM" ? <span className='badge bg-primary'>{data.status_transaction}</span> :
                                                <span className='badge bg-success'>{data.status_transaction}</span>
                                        }
                                    </td>
                                    <td className='text-center'>
                                        <button className='button-primary-sm me-2'>
                                            <i className="bi bi-card-list me-2"></i>
                                            Lihat Detail
                                        </button>
                                        <button className='button-danger-sm'>
                                            <i className="bi bi-file-pdf me-2"></i>
                                            Cetak Invoice
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div> */}
        </div>
    )
}

export default Transaction