import React, { useState } from 'react'
import imgContent from '../../asset/img/ecommers-pic.png'
import { BASE_URL } from '../../utilities/utils'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import cookie from 'js-cookie'

const Login = ({ getToken }) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [alertCondition, setAlertCondition] = useState(true)
    const [responseLogin, setResponseLogin] = useState({
        data: [],
        message: ''
    })

    const login = (e) => {
        e.preventDefault()
        const body = {
            email: email,
            password: password
        }
        setAlertCondition(false)
        axios.post(BASE_URL + 'auth/login', body)
            .then((res) => {
                setResponseLogin(res.data)
                setTimeout(() => {
                    cookie.set('token', res.data.token)
                    cookie.set('id', res.data.data.id)
                    cookie.set('email', res.data.data.email)
                    cookie.set('role_id', res.data.data.role_id)
                    cookie.set('name', res.data.data.name)
                    cookie.set('address', res.data.data.address)
                    getToken(cookie.get('token'))
                    navigate('/')
                }, 3000);

            })
            .catch((err) => {
                setResponseLogin(err.response.data)
            })
    }

    return (
        <div className='login'>
            <div className="container">
                <div className="row wrapper-login d-flex align-items-center ">
                    <div className="col image-login">
                        <img src={imgContent} alt="content-login" className='img-login' />
                    </div>
                    <div className="col d-flex justify-content-center">
                        <div className='form-login text-center shadow'>
                            <h3 className='title-login text-center'>LOGIN</h3>
                            <span className='brand '>nizar<span className='pedia'>pedia</span></span>
                            <br />
                            <span>masuk dan nikmati murahnya berbelanja dengan diskon yang diluar nalar</span>
                            <form action="" className='text-start my-3 ms-3' onSubmit={(e) => login(e)}>
                                <label htmlFor="email" className='d-block label-login'>Email :    </label>
                                <input type="text" name="email" id="email" className='form-input d-block' onChange={(e) => setEmail(e.target.value)} />
                                <label htmlFor="Password" className='d-block label-login'>Password :    </label>
                                <input type="password" name="Password" id="Password" className='form-input d-block' onChange={(e) => setPassword(e.target.value)} />
                                <button className='btn-login'>Login</button>
                                <div className={`alert mt-3 text-center ${responseLogin.status === 400 ? 'alert-danger' : 'alert-success'}`} role="alert" hidden={alertCondition}>
                                    {responseLogin === null ? null : responseLogin.message}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login