import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import $ from 'jquery';
import { useNavigate, useSearchParams } from "react-router-dom";

const Yolo = () => {
    let navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [image, setImage] = useState<any>()

    useEffect(() => {
        let photo = searchParams.get('image')
        setImage(photo)
        removeQueryParams()
    }, [])

    const removeQueryParams = () => {
        const param = searchParams.get('image');
        if (param) {
            searchParams.delete('image');
            setSearchParams(searchParams);
        }
    };

    const [showTypes, setShowTypes] = useState<boolean>(false)
    function showTypeHtml() {
        if (!showTypes) {
            setShowTypes(true)
        }
        else {
            setShowTypes(false)
        }
    }
    useEffect(() => {
        $('.uil-bars').removeClass('active')
        $('.navbar-redirect').removeClass('active')
        $('.link-item').removeClass('active')
        $('.options-dashboard').removeClass('active')
        $('.arrow-cont').removeClass('active')
        $('.uil-arrow-to-right').removeClass('active')
        $('.menu-tablet').removeClass('active')
    }, [])
    useEffect(() => {
        $('.arrow-cont').on('click', function () {
            if ($(this).hasClass('active')) {
                $('.menu-tablet').removeClass('active')
                $(this).removeClass('active')
                $('.uil-arrow-to-right').removeClass('active')
            }
            else {
                $('.menu-tablet').addClass('active')
                $(this).addClass('active')
                $('.uil-arrow-to-right').addClass('active')
            }
        })
        $('.uil-bars').on('click', function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active')
                $('.navbar-redirect').removeClass('active')
                $('.link-item').removeClass('active')
                $('.options-dashboard').removeClass('active')
            }
            else {
                $(this).addClass('active')
                $('.navbar-redirect').addClass('active')
                $('.link-item').addClass('active')
                $('.options-dashboard').addClass('active')
            }
        })
        $('.link-item').on('click', function () {
            if ($('.uil-bars').hasClass('active')) {
                $('.uil-bars').removeClass('active')
                $('.navbar-redirect').removeClass('active')
                $('.link-item').removeClass('active')
                $('.options-dashboard').removeClass('active')
            }
        })
        $('.whatsapp').on('click', function () {
            console.log("je")
            if ($('.whatsapp-active').hasClass('active')) {
                $('.whatsapp-active').removeClass('active')
            }
            else {
                $('.whatsapp-active').addClass('active')
            }
        })
    }, [])

    function goPhoto() {
        navigate("/camera");
    }

    return (
        <div className="stockrecognition-body2">
            <div className="container-full">
                <div className="navbar">
                    <h1 className="logo"><a href="/dashboard">Stock Recognition</a></h1>
                    <div className="navbar-redirect">
                        <ul className='redirect-links'>
                            <li><a className='link-item' href="/">Modificar perfil</a></li>
                            <li><a className='link-item' href="/">Cerrar sesión</a></li>
                        </ul>
                    </div>
                    <i className="uil uil-bars"></i>
                </div>
                <div className="body-dashboard">
                    <div className="menu-tablet">
                        <div className="list-menu">
                            <div onClick={() => goPhoto()} className="product-registered-tablet">
                                <i className="uil uil-database"></i>
                                <p>Tomar foto</p>
                            </div>
                            <div className="product-registered-tablet">
                                <i className="uil uil-database"></i>
                                <p>Cargar foto</p>
                            </div>
                            <div onClick={() => showTypeHtml()} className="product-registered-tablet">
                                <i className="uil uil-database"></i>
                                <p>Productos registrados</p>
                            </div>
                        </div>
                        <div className="arrow-cont">
                            <i className="uil uil-arrow-to-right"></i>
                        </div>
                    </div>
                    <div className="product-type-list">
                        {showTypes ? (
                            <div className="row centered">
                                <div className="left centered flex flexcolumn gap borderright">
                                    <span className="spantitle">Botellas</span>
                                    <div className="product-type-item">
                                        <img src="image/incak.jpg" alt="" />
                                        <img src="image/sanmateo.png" alt="" />
                                    </div>
                                </div>
                                <div className="right centered flex flexcolumn gap">
                                    <span className="spantitle">Latas</span>
                                    <div className="product-type-item">
                                        <img src="image/redbull.jpg" alt="" />
                                        <img src="image/monster.jpg" alt="" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>Seleciona una opción</p>
                        )}
                        <img src={image} alt="" />
                    </div>

                    <div className="options-dashboard">
                        <div className="takedesc">
                            <span className="button" onClick={() => goPhoto()}>Tomar foto</span>
                            <span className="desc desca">Solo valido para San mateo, Incakola, Monter y Redbull</span>
                        </div>
                        <div className="galerydesc">
                            <span className="button">Cargar foto</span>
                            <span className="desc descb">Elige foto de tu galería algún producto del tipo San mateo, Incakola, Monter y Redbull</span>
                        </div>
                        <div className="productdesc">
                            <span className="button">Productos registrados</span>
                            <span className="desc descc">Se muestran todas las detecciones hechas por el usuario</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Yolo;