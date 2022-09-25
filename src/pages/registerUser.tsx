import $ from 'jquery';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const RegisterUser = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    let navigate = useNavigate();

    const [option, setOption] = useState<string>('Empresa X')
    useEffect(() => {
        let vh = window.innerHeight * 0.01;
        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        window.addEventListener('resize', () => {
            // We execute the same script as before
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
    }, [])

    useEffect(() => {
        setEmail('')
        setPassword('')
        $('.uil-check-circle').removeClass('active')
        $('.uil-spinner-alt').removeClass('active')
        $('.uil-times-circle').removeClass('active')

        $('.dropdown').on('click', function () {
            if ($('.options_input').hasClass('active')) {
                $('.option_dropdown_subscription').removeClass('active')
                $('.options_input').removeClass('active')
            }
            else {
                $('.option_dropdown_subscription').addClass('active')
                $('.options_input').addClass('active')
            }
        })
        $('.oic').on('click', function () {
            let div = $(this)
            let value = div.find('.option_dropdown_subscription')

            setOption(value.text())
            $('.dropdown').val(value.text())
            $('.options_input').removeClass('active')

        })
    }, [])

    async function load() {

    }

    async function validateInput(button: any) {
        let isValid = true;
        if (password.length == 0) {
            isValid = false;
            $('.alert_password').text('Ingrese contraseña')
        }
        if (password.length > 0) {
            const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[A-Za-z0-9])(?=.*[#?!@_&-]).{6,}$/;
            if (password.length < 6) {
                isValid = false;
                $('.alert_password').text('Contraseña menor a 6 caracteres')
            }
            if (!re.test(password)) {
                isValid = false;
                $('.alert_password').text('Contraseña debe contener al menos una mayúscula, número y un caracter especial #?!@_&-')
            }
        }
        if (email.length == 0) {
            isValid = false;
            $('.alert_email').text('Ingrese email')
        }
        if (email.length > 0) {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email)) {
                isValid = false;
                $('.alert_email').text('Email inválido')
            }
        }

        if (isValid && isChecked) {
            //$('.'button_register).addClass(cssRegister.active)
            button.target.classList.add('active')
            $('.uil-spinner-alt').addClass('active')
            setEmail('')
            setPassword('')
            $('.alert_password').text('')
            $('.alert_email').text('')
            $('.register_form').children('input').val('')
            //const newuser: User = { email: email, password: password, role: 'usuario', isActive: true }
            //await registerUser(newuser).then((res) => {
            //    $('.' + css_popup.popup_layout).addClass(css_popup.active)
            //    console.log("aqui")
            //    if (!res.ok) {
            //        $('.' + css_popup.text_popup).text("Correo ya en uso")
            //        $('.' + css_popup.box_popup).addClass(css_popup.error)
            //        $('.' + css_popup.text_popup).addClass(css_popup.show_text_error)
            //        $('.uil-times-circle').addClass('active')
            //    } else {
            //        $('.' + css_popup.text_popup).text("¡Te has registrado!")
            //        $('.' + css_popup.box_popup).addClass(css_popup.active)
            //        $('.' + css_popup.text_popup).addClass(css_popup.show_text)
            //        $('.uil-check-circle').addClass('active')
            //    }
            //    button.target.classList.remove(cssRegister.active)
            //    $('.uil-spinner-alt').removeClass('active')
            //
            //    setTimeout(() => {
            //        $('.' + css_popup.popup_layout).removeClass(css_popup.active)
            //        $('.' + css_popup.box_popup).removeClass(css_popup.active)
            //        $('.' + css_popup.text_popup).removeClass(css_popup.active)
            //        $('.uil-check-circle').removeClass('active')
            //        $('.' + css_popup.box_popup).removeClass(css_popup.error)
            //        $('.' + css_popup.text_popup).removeClass(css_popup.error)
            //        $('.uil-times-circle').removeClass('active')
            //        if(res.ok){
            //            navigate("/"); 
            //        }
            //    }, 2000);
            //})
        }
    }
    return (
        <div className="stockrecognition-body">
            <div className="container posstart">
                <div className="rowlog">
                    <div className="rightlog padding">
                        <h1 className="title">Stock Recognition</h1>
                        <div className='register_form'>
                            <div className="up-form">
                                <span className='register-h2'>Crear cuenta </span>
                                <div className='email_form'>
                                    <p className='text-small'>Correo electrónico</p>
                                    <input placeholder='formato ...' className='input_form_log' type="text" onChange={(event: any) => setEmail(event.target.value)} />
                                    <span className='alert alert_email'></span>
                                </div>
                                <div className='password_form'>
                                    <p className='text-small'>Contraseña</p>
                                    <input placeholder='formato ...' className='input_form_log' type="password" onChange={(event: any) => setPassword(event.target.value)} />
                                    <span className={`alert alert_password`}></span>
                                </div>
                                <div className='empresa_form'>
                                    <div className='list_input'>
                                        <p className='text-small'>Empresa</p>
                                        <input className='dropdown' type="text" placeholder={option} readOnly={true} />
                                        <i className="uil uil-triangle"></i>
                                        <div className='options_input'>
                                            <div className="oic">
                                                <span className='option_dropdown_subscription'>Empresa X</span>
                                            </div>
                                            <div className="oic">
                                                <span className='option_dropdown_subscription'>Empresa Y</span>
                                            </div>
                                            <div className="oic">
                                                <span className='option_dropdown_subscription'>Empresa Z</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span onClick={() => load()} className='button-small mbs'>Registrar cuenta</span>
                            </div>

                            <div className='already_registered'>
                                <p>¿Ya estás registrado?</p>
                                <p><a className='loadlogin' href="/login">Inicia sesión</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="leftlog">
                        <img className='image-log' src="image/asd.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterUser;