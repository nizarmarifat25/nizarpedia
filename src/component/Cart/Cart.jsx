import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL, thousands_separators } from '../../utilities/utils'
import verifiedLogo from '../../asset/img/verified.png'
import Cookies from 'js-cookie'

function Cart() {

  const [dataCart, setDataCart] = useState([])
  const [selectedData, setselectedData] = useState([])
  const [sum, setSum] = useState(0)
  const [ongkir, setOngkir] = useState(0)

  const getAllCart = () => {
    axios.get(BASE_URL + 'cart/' + Cookies.get('id'), {
      headers: {
        authorization: "Bearer " + Cookies.get('token')
      }
    })
      .then((res) => {
        const data = res.data.data
        function groupItems(array, property) {
          var reducer = function (groups, item) {
            var name = item[property]
            var group = groups[name] || (groups[name] = []);
            group.push(item);
            return groups;
          };
          return array.reduce(reducer, {});
        }
        var groups = groupItems(data, 'shop_name');
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
  }

  const handleCheckAll = (e, index) => {
    const list = [...dataCart]
    list[index].check = e.target.checked

    if (list[index].check == true) {
      list[index].product.forEach(item => {
        if (item.check === false || item.check === undefined) {
          selectedData.push(item)
          item.check = true
        }
      });
      var areas = selectedData.map(arr => arr.price * arr.qty);
      var total = areas.reduce((a, b) => (a + b));
      console.log(total, "total");
      setSum(total);
      setDataCart(list)
    } else {
      list[index].product.forEach(item => {
        item.check = false
      });
      let values = []
      for (let i = 0; i < selectedData.length; i++) {
        if (selectedData[i].shop_name === list[index].shop_name) {
          values.push(selectedData[i])
        }
      }
      let temp = selectedData.filter(item => values.indexOf(item) === -1);
      setselectedData(temp)
      if (temp.length !== 0) {
        var areas = temp.map(arr => arr.price * arr.qty);
        var total = areas.reduce((a, b) => (a + b));
        setSum(total)
      } else {
        setSum(0)
      }
    }

    let tempOngkir = []
    for (let i = 0; i < list.length; i++) {
      if (list[i].check == true) {
        tempOngkir.push('')
      }
    }
    let initialOngkir = 0
    for (let i = 0; i < tempOngkir.length; i++) {
      initialOngkir += 10000
    }
    setOngkir(initialOngkir);
    setDataCart(list)

  }

  const handleCheck = (e, index, idx) => {
    const list = [...dataCart]
    list[index].product[idx].check = e.target.checked
    let lengthProduct = list[index].product.length
    let check = []
    for (let i = 0; i < list[index].product.length; i++) {
      if (list[index].product[i].check == true) {
        check.push('1')
      }
    }
    if (check.length !== lengthProduct) {
      list[index].check = false
    } else {
      list[index].check = true
    }
    if (list[index].product[idx].check === true) {
      selectedData.push(list[index].product[idx])
      var areas = selectedData.map(arr => arr.price * arr.qty);
      var total = areas.reduce((a, b) => (a + b));
      setSum(total)
    } else {
      const item = selectedData.map(e => e.id).indexOf(list[index].product[idx].id)
      if (item > -1) {
        selectedData.splice(item, 1)
        if (selectedData.length !== 0) {
          var areas = selectedData.map(arr => arr.price * arr.qty);
          var total = areas.reduce((a, b) => (a + b));
          setSum(total)
        } else {
          setSum(0)
        }
      }
    }

    let tempOngkir = []
    for (let i = 0; i < list.length; i++) {
      if (list[i].check == true) {
        tempOngkir.push('')
      }
    }
    let initialOngkir = 0
    for (let i = 0; i < tempOngkir.length; i++) {
      initialOngkir += 10000
    }
    setOngkir(initialOngkir);

    setDataCart(list)
  }

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
    getAllCart()

  }, [])


  return (
    <div className='container mt-4'>
      <h2>Keranjang</h2>
      <div className="row">
        <div className="col-9">
          {dataCart.length > 0 ? dataCart.map((data, i) => {
            return (
              <div className='border rounded py-3 px-4 my-3 shadow-sm' key={i}>
                <div className="row justify-content-between align-items-center">
                  <div className="align-items-center fs-5"  >
                    <input className="form-check-input me-2" type="checkbox" checked={data.check} onChange={(e) => handleCheckAll(e, i)} />
                    <strong>{data.shop_name} </strong>
                    <img src={verifiedLogo} alt="" width='25' className='mb-1' />
                  </div>
                </div>
                <hr />

                {data.product.map((item, idx) => {
                  return (
                    <div className="row align-items-center my-3" key={idx}>
                      <div className="col-1 text-end">
                        <input className="form-check-input fs-5" type="checkbox" checked={item.check} onChange={(e) => handleCheck(e, i, idx)} id="flexCheckDefault" />
                      </div>
                      <div className="col-2 mb-2">
                        <img src={item.image_url} alt="" className='w-100' />
                      </div>
                      <div className="col-2">
                        <small >{item.product_name}</small> <br />
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
                      <div className="col">
                        <small>Total Harga : </small><br />
                        <small>Rp {thousands_separators(item.qty * item.price)}</small>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          }) : null}
        </div>
        <div className="col-3 ">
          <div className='border rounded py-3 px-4 my-3 shadow-sm w-25 position-fixed'>
            <strong>Rincian belanja</strong> <br />
            <div className='row mt-2'>
              <div className="col">Total {selectedData.length} Produk</div>
              <div className="col text-end">
                <small>Rp {thousands_separators(sum)}</small>
              </div>
            </div>
            <div className='row mt-2'>
              <div className="col">Ongkir</div>
              <div className="col text-end">
                <small>Rp {ongkir}</small>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <strong>Total harga</strong>
              </div>
              <div className="col text-end">
                <strong>Rp {selectedData.length !== 0 ? thousands_separators(sum + ongkir) : 0}</strong>
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