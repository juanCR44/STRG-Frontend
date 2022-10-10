import $ from 'jquery';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loginUser } from '../controller/getmodel';

const LoginUser = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [nombre, setNombre] = useState<string>('')
    let navigate = useNavigate();

    const [isValid, setIsValid] = useState<boolean>(false)

    useEffect(() => {
        setEmail('')
        setPassword('')
        $('input').val("");
        $('.message-pop').removeClass('active')
        $('.message-pop2').removeClass('active')
    }, [])
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

    async function validateInput(button: any) {
        let isValid = true;
        $('.alert_password').text('')
        $('.alert_email').text('')
        if (password.length == 0) {
            isValid = false;
            $('.alert_password').text('Ingrese contraseña')
        }
        if (password.length > 0) {
            const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[A-Za-z0-9])(?=.*[#?!@_&-]).{6,}$/;
            if (password.length < 6) {
                isValid = false;
            }
            if (!re.test(password)) {
                isValid = false;
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
            }
        }

        let res = await loginUser(email, password);
        console.log(res)
        let n = email.split('@')[0]
        setNombre(n)

        if (isValid && res) {
            setEmail('')
            setPassword('')
            $('input').val("");
            $('.message-pop').addClass('active')
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        }
        if(!res){
            $('.message-pop2').addClass('active')
            setTimeout(() => {
                $('.message-pop2').removeClass('active')  
            }, 2000);
        }
    }

    return (
        <div className="stockrecognition-body">
            <span className='message-pop'> Bienvenido {nombre}</span>
            <span className='message-pop2'>El usuario no existe</span>
            <div className="container posstart">
                <div className="rowlog">
                    <div className="rightlog padding">
                        <h1 className="title">Stock Recognition</h1>
                        <div className='register_form'>
                            <div className="up-form">
                                <span className='register-h2'>Iniciar sesión</span>
                                <div className='email_form'>
                                    <p className='text-small'>Correo electrónico</p>
                                    <input  className='input_form_log' type="text" onChange={(event: any) => setEmail(event.target.value)} />
                                    <span className='alert alert_email'></span>
                                </div>
                                <div className='password_form'>
                                    <p className='text-small'>Contraseña</p>
                                    <input  className='input_form_log' type="password" onChange={(event: any) => setPassword(event.target.value)} />
                                    <span className={`alert alert_password`}></span>
                                </div>
                                <span onClick={(e) => validateInput(e)} className='button-small mbl'>Iniciar sesión</span>
                            </div>

                            <div className='already_registered'>
                                <p>¿No estás registrado?</p>
                                <p><a href="/register">Registrate</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="leftlog">
                        <img className='image-log' src="image/sdd.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginUser;