import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL, thousands_separators } from '../../utilities/utils'
import verifiedLogo from '../../asset/img/verified.png'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
function Cart() {
  const [dataCart, setDataCart] = useState([])

  const changeQty = (e, index, idx, action) => {
    if (action === 'change') {
      const list = [...dataCart]
      list[index].product[idx] = e.target.value === "" ? 1 : parseInt(e.target.value)
      setDataCart(list)
    } else if (action === 'plus') {
      const list = [...dataCart]
      list[index].product[idx].qty++
      setDataCart(list)
    } else {
      const list = [...dataCart]
      list[index].product[idx].qty--
      setDataCart(list)
    }

  }

  useEffect(() => {
    axios.get(BASE_URL + 'cart/' + Cookies.get('id'), {
      headers: {
        authorization: "Bearer " + Cookies.get('token')
      }
    })
      .then((res) => {
        function groupItems(array, property) {
          var reducer = function (groups, item) {
            var name = item[property]
            var group = groups[name] || (groups[name] = []);
            group.push(item);
            return groups;
          };
          return array.reduce(reducer, {});
        }
        var groups = groupItems(res.data.data, 'shop_name');
        var groupsArr = Object.values(groups)
        let result = []
        for (let i = 0; i < groupsArr.length; i++) {
          result.push({
            shop_name: groupsArr[i][0].shop_name,
            product: groupsArr[i]
          })
        }
        setDataCart(result)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])


  return (
    <div className='container mt-4'>
      <h2>Keranjang</h2>
      <div className="row">
        <div className="col-8">
          {dataCart.length > 0 ? dataCart.map((data, i) => {
            return (
              <div className='border rounded py-3 px-4 my-3 shadow-sm' key={i}>
                <div className="row justify-content-between align-items-center">
                  <div className="align-items-center fs-5"  >
                    <input className="form-check-input me-2" type="checkbox" value="" id="flexCheckDefault" />
                    <strong>{data.shop_name} </strong>
                    <img src={verifiedLogo} alt="" width='25' className='mb-1' />
                  </div>
                </div>
                <hr />

                {data.product.map((item, idx) => {
                  return (
                    <div className="row align-items-center">
                      <div className="col-1 text-end">
                        <input className="form-check-input fs-5" type="checkbox" value="" id="flexCheckDefault" />
                      </div>
                      <div className="col-3 mb-2">
                        <img src={item.image_url} alt="" className='w-50' />
                      </div>
                      <div className="col-3">
                        <span>{item.product_name}</span> <br />
                        <strong>Rp {thousands_separators(item.price)}</strong>
                      </div>
                      <div className="col-2">
                        {
                          item.variant !== "" ?
                            <><small>{item.variant_name} : {item.variant}</small> <br /> </> :
                            null
                        }
                        <small>Kuantitas : {item.qty}</small>
                      </div>
                      <div className='col'>
                        <div>
                          <button className={item.qty <= 1 ? "disabled btn-qty" : "btn-qty"} onClick={(e) => changeQty(e, i, idx, 'min')} disabled={item.qty <= 1 ? true : false}>-</button>
                          <input type="number" className="input-qty" value={item.qty} onChange={(e) => changeQty(e, i, idx, 'change')} />
                          <button className="btn-qty" onClick={(e) => changeQty(e, i, idx, 'plus')}>+</button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          }) : null}
        </div>
        <div className="col-4 ">
          <div className='border rounded py-3 px-4 my-3 shadow-sm w-25 position-fixed'>
            <strong>Rincian belanja</strong> <br />
            <div className='row mt-2'>
              <div className="col">Total 5 Produk</div>
              <div className="col text-end">
                <small>Rp 500000</small>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <strong>Total harga</strong>
              </div>
              <div className="col text-end">
                <strong>Rp 500000</strong>
              </div>
              <button className="button-primary mt-3">Beli</button>
            </div>
          </div>
        </div>
      </div>



    </div>
  )
}

export default Cart