import React, { useContext } from 'react'
import { Contex } from '../MyContext'

const Banner = () => {
    const { banner } = useContext(Contex)
    return (
        <div className="py-2">
            <div id="carouselExampleIndicators" className="carousel slide">
                <div className="carousel-inner">
                    {banner.map((data, i) => {
                        return (
                            <div className={`${i == 0 ? 'carousel-item active' : 'carousel-item'} `}>
                                <img src={data.url} className="d-block w-100" alt="banner" />
                            </div>
                        )
                    })}

                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <i className="bi bi-arrow-left-circle-fill" aria-hidden="true"></i>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <i className="bi bi-arrow-right-circle-fill" aria-hidden="true"></i>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

export default Banner