import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth'; // Hook propio
import Alerta from '../components/Alerta';

// rafce
function Login() {

    // const { auth } = useAuth();
    // console.log(auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    // Utilizando contexto global
    const { auth, setAuth } = useAuth();

    // Hook para redireccionar al usuario
    const navigate = useNavigate();

    // submit form
    const handleSubmit = async e => {
        e.preventDefault();

        // Valida inputs
        if ([email, password].includes('')) {
            setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
            return;
        }

        // Enviar peticion al servidor
        try {
            const url = '/veterinarios/login';
            const { data } = await clienteAxios.post(url, {
                email,
                password
            });

            // Almacenar token en localStorage
            localStorage.setItem('token', data.token);

            //Establecer sesion con los datos
            setAuth(data);

            // Redireccionar al usuario
            navigate('/admin');

        } catch (error) {
            setAlerta({ msg: error.response.data.msg, error: true });
        }
    };

    const { msg } = alerta;

    return (
        <>
            <div className="mx-4 text-center md:text-left">
                <h1 className="text-indigo-600 text-6xl font-black mb-8 md:mb-0">Inicia Sesion y Administra tus <span className="text-black">Pacientes</span></h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded bg-white">
                {msg && <Alerta alerta={alerta} />}
                <form onSubmit={handleSubmit}>
                    <div className="my-4">
                        <label htmlFor="email" className="font-bold text-2xl block text-gray-600">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Tu Email"
                            className="w-full p-2 mt-4 border rounded bg-gray-100 "
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="my-4">
                        <label htmlFor="password" className="font-bold text-2xl block text-gray-600">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Tu Password"
                            className="w-full p-2 mt-4 border rounded bg-gray-100 "
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <input
                        type="submit" value="Inicia Sesión"
                        className="bg-indigo-600 py-4 px-10 mt-4 rounded text-white uppercase font-bold w-full md:w-auto hover:cursor-pointer hover:bg-indigo-800"
                    />
                </form>
                <nav className="mt-12 lg:flex lg:justify-between">
                    <Link
                        className='text-gray-600 block my-4 text-center'
                        to="/registrar">¿Aún no tienes cuenta? Crea una</Link>
                    <Link
                        className='text-gray-600 block my-4 text-center'
                        to="/olvido-password">Olvidé mi password</Link>
                </nav>
            </div>
        </>
    )
}

export default Login;