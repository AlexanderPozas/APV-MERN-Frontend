import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";


const ReestablecerPassword = () => {

    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);
    const params = useParams();
    // console.log(params);
    const { token } = params;

    useEffect(() => {
        const validarToken = async () => {
            try {
                const url = `/veterinarios/olvido-password/${token}`
                await clienteAxios(url);
                setAlerta({ msg: 'Ingresa tu nuevo Password' });
                setTokenValido(true);
            } catch (error) {
                setAlerta({ msg: 'Hubo un error en el enlace', error: true });
            }
        };
        validarToken();
    }, []);

    // Submit del form
    const handleSubmit = async e => {
        e.preventDefault();
        // Validar input
        if (password === "") {
            setAlerta({ msg: 'El password es obligatorio', error: true });
            return;
        }
        if (password.length < 6) {
            setAlerta({ msg: 'El password debe contener al menos 6 caracteres', error: true });
            return;
        }

        // Enviar peticion
        try {
            const url = `/veterinarios/olvido-password/${token}`;
            const { data } = await clienteAxios.post(url, { password })

            setAlerta({ msg: data.msg });
            setPasswordModificado(true);
            setPassword('');
        } catch (error) {
            setAlerta({ msg: error.response.data.msg, error: true });
        }
    }

    const { msg } = alerta;

    return (
        <>
            <div className="mx-4 text-center md:text-left">
                <h1 className="text-indigo-600 text-6xl font-black mb-8 md:mb-0">Reestablece tu password y Continua Administrando tus <span className="text-black">Pacientes</span></h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded bg-white">
                {msg && <Alerta alerta={alerta} />}
                {tokenValido &&
                    (<form action="" onSubmit={handleSubmit}>
                        <div className="my-4">
                            <label htmlFor="password" className="font-bold text-2xl block text-gray-600">Nuevo Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Tu Nuevo Password"
                                className="w-full p-2 mt-4 border rounded bg-gray-100 "
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <input
                            type="submit" value="Reestablecer Password"
                            className="bg-indigo-600 py-4 px-10 mt-4 rounded text-white uppercase font-bold w-full md:w-auto hover:cursor-pointer hover:bg-indigo-800"
                        />
                    </form>)
                }
                {passwordModificado &&
                    <Link className='text-gray-600 block my-4 text-center'
                        to="/"
                    >Inicia Sesión</Link>}
            </div>
        </>
    )
}

export default ReestablecerPassword;