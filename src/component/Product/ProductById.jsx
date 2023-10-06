import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { BASE_URL, thousands_separators } from "../../utilities/utils";
import verifiedLogo from '../../asset/img/verified.png'
import Cookies from "js-cookie";
import Product from "./Product";

const ProductById = ({ updated, update }) => {
  let navigate = useNavigate()
  let { id } = useParams()
  const [params, setParams] = useState(id)
  const [product, setProduct] = useState()
  const [qty, setQty] = useState(1)
  const [variant, setVariant] = useState("")
  const [price, setPrice] = useState("")
  const [validate, setValidate] = useState(false)
  const [show, setShow] = useState(false)


  const storeToCookie = (e) => {
    e.preventDefault()
    let dataCheckout = {
      qty: qty,
      variant: variant,
      customer_name: Cookies.get('name'),
      product_purchased: product,
      address: Cookies.get('address'),
      price: price
    }
    Cookies.set('purchased', JSON.stringify(dataCheckout))
    if (product.variant !== null && variant === "") {
      setValidate(true)
    } else if (qty <= 0) {
      setValidate(true)
    } else {
      setValidate(false)
      navigate('/checkout')
    }
  }

  const storeToCart = (e) => {
    e.preventDefault()
    const body = {
      qty: qty,
      variant: variant,
      product_id: product.id,
      user_id: Cookies.get('id'),
      price: price
    }

    if (product.variant !== null && variant === "") {
      setValidate(true)
    } else if (qty <= 0) {
      setValidate(true)
    } else {
      axios.post(BASE_URL + 'cart', body, {
        headers: {
          authorization: "Bearer " + Cookies.get('token')
        }
      })
        .then((res) => {
          updated(!update)
          console.log(res);
          setValidate(false)
          setShow(true)
          setTimeout(() => {
            setShow(false)
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  const triger = (newParam) => {
    setParams(newParam)
  }

  const getData = () => {
    axios.get(BASE_URL + 'product/' + id, {
      headers: {
        authorization: "Bearer " + Cookies.get('token')
      }
    })
      .then((res) => {
        if (res.data.data[0].variant) {
          let splitVariant = res.data.data[0].variant.split("|")
          res.data.data[0].variant = splitVariant
        }
        if (res.data.data[0].price) {
          let splitPrice = res.data.data[0].price.split("|")
          res.data.data[0].price = splitPrice
          setPrice(res.data.data[0].price[0])
        }
        setProduct(res.data.data[0])
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getData()
  }, [params])

  return (
    <div className='container'>
      {!product ? null :
        <>
          <div className="row align-items-center shadow-sm ">
            <div className="col image-product p-3 text-center">
              <img src={product.image_url} alt={product.image_url} className="w-75" height="500px" />
            </div>
            <div className="col product-detail ">
              <strong>{product.shop_name} <img src={verifiedLogo} alt="" width="20" className="mb-1" /></strong>
              <br />
              <br />
              <h1>{product.product_name}</h1>
              <h2 className="font-weight-bold product-detail-price">Rp {thousands_separators(price)}</h2>
              <div className="row">
                <div className="col-3">
                  <span className="label-product">Deskripsi </span>
                </div>
                <div className="col">
                  {product.description}
                </div>
              </div>
              {product.variant &&
                <div className="row my-2">
                  <div className="col-3">
                    <span className="label-product">{product.variant_name}</span>
                  </div>
                  <div className="col">
                    {product.variant.map((item, i) => {
                      if (product.price.length > 1) {
                        return <button className={variant === item ? "btn-variant selected-variant" : 'btn-variant'} key={i} onClick={() => { setVariant(item); setPrice(product.price[i]) }}>{item}</button>
                      } else {
                        return <button className={variant === item ? "btn-variant selected-variant" : 'btn-variant'} key={i} onClick={() => { setVariant(item) }}>{item}</button>
                      }
                    })}
                  </div>
                </div>
              }
              <div className="row align-items-center">
                <div className="col-3">
                  <span className="label-product">Kuantitas</span>
                </div>
                <div className="col">
                  <button className={qty <= 1 ? "disabled btn-qty" : "btn-qty"} onClick={() => (setQty(qty - 1))} disabled={qty <= 1 ? true : false}>-</button>
                  <input type="number" className="input-qty" value={qty}
                    onChange={
                      (e) =>
                        e.target.value === "" ? setQty(1) :
                          parseInt(e.target.value) > product.stock ?
                            setQty(product.stock) :
                            setQty(parseInt(e.target.value))
                    } />
                  <button className={qty >= product.stock ? "disabled btn-qty me-2" : "btn-qty me-2"} disabled={qty >= product.stock ? true : false} onClick={() => (setQty(qty + 1))}>+</button>
                  {product.stock >= 50 ?
                    <span>Sisa Barang :<strong className="text-success"> {product.stock}</strong></span> :
                    product.stock >= 20 ?
                      <span>Sisa Barang : <strong className="text-warning">{product.stock}</strong></span> :
                      product.stock <= 20 ?
                        <span>Sisa Barang : <strong className="text-warning">{product.stock}</strong></span> :
                        null
                  }
                </div>
              </div>
              <div className="my-3">
                <button className="button-primary"  onClick={(e) => storeToCart(e)}>
                  <i className="bi bi-cart me-2"></i>
                  Masukan Keranjang
                </button>
                <button className= "button-secondary mx-2" onClick={(e) => storeToCookie(e)} >Beli Sekarang</button>
              </div>
              <div>
                {validate &&
                  <span className="text-danger">{product.variant_name !== null ? "*" + product.variant_name + ' dan' : null} Kuantitas harus diisi </span>
                }
              </div>
            </div>
          </div>
          <div className="my-5">
            <h3>Produk Serupa</h3>
            <Product similar={product} triger={triger} />
          </div>
        </>
      }
      <div className={show === true ? 'modal-costume show shadow-sm' : 'modal-costume hide shadow-sm'} >
        <div className="modal-header">

        </div>
        <div className="modal-body text-center">
          <i className="bi bi-check text-white modal-icon"></i>
          <br />
          <strong className="text-white">Berhasil menambahkan ke keranjang</strong>
        </div>
      </div>
    </div>
  )
}

export default ProductById