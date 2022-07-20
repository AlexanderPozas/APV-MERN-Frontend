import { useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

// rafce - react arrow function component export
const OlvidoPassword = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  // Handle submit
  const handleSubmit = async e => {
    e.preventDefault();

    // Validar email
    if(email === '' || email.length < 6) {
      setAlerta({ msg: 'Email Obligatorio', error: true });
      return;
    }

    // Enviar peticion al backend
    try {
      const url = '/veterinarios/olvido-password';
      const {data} = await clienteAxios.post(url, { email })

      setAlerta({msg: data.msg});
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true});
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div className="mx-4 text-center md:text-left">
        <h1 className="text-indigo-600 text-6xl font-black mb-8 md:mb-0">Recupera tu Acceso y no Pierdas tus <span className="text-black">Pacientes</span></h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded bg-white">
        {msg && <Alerta alerta={alerta}/>}
        <form action="" onSubmit={handleSubmit}>
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
          <input
            type="submit" value="Enviar Instrucciones"
            className="bg-indigo-600 py-4 px-10 mt-4 rounded text-white uppercase font-bold w-full md:w-auto hover:cursor-pointer hover:bg-indigo-800"
          />
        </form>
        <nav className="mt-12 lg:flex lg:justify-between">
          <Link
            className='text-gray-600 block my-4 text-center'
            to="/">¿Ya tienes cuenta? Inicia Sesión</Link>
          <Link
            className='text-gray-600 block my-4 text-center'
            to="/registrar">¿Aún no tienes cuenta? Crea una</Link>
        </nav>
      </div>
    </>
  )
};

export default OlvidoPassword;