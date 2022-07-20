import { useState } from "react";
import { Link } from "react-router-dom"; // Mejora de performance en enlaces
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
// rafce - react arrow function component export
const Registrar = () => {
  // Definir state para cada input
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});


  const submitHandler = async e => {
    e.preventDefault();
    // Validar campos no vacios
    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
      return;
    }

    // Validar passwords iguales
    if (password !== repetirPassword) {
      setAlerta({ msg: 'Las contraseñas no coinciden', error: true });
      return;
    }

    //Validar length del password
    if (password.length < 6) {
      setAlerta({ msg: 'La contraseña debe tener al menos 6 caracteres', error: true });
      return;
    }

    // Enviar datos al servidor
    setAlerta({});
    try {
      await clienteAxios.post('/veterinarios', { nombre, email, password });
      setAlerta({
        msg: 'Creado correctamente, revisa tu email',
        error: false
      })
      // Resetear form
      setNombre('');
      setEmail('');
      setPassword('');
      setRepetirPassword('');
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }

  }
  const { msg } = alerta;

  return (
    <>
      <div className="mx-4 text-center md:text-left">
        <h1 className="text-indigo-600 text-6xl font-black mb-8 md:mb-0">Crea una cuenta y Administra tus <span className="text-black">Pacientes</span></h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded bg-white">
        {msg && <Alerta alerta={alerta} />}
        <form action="" onSubmit={submitHandler}>
          <div className="my-4">
            <label htmlFor="nombre" className="font-bold text-2xl block text-gray-600">Nombre</label>
            <input
              type="text"
              id="nombre"
              placeholder="Tu Nombre"
              className="w-full p-2 mt-4 border rounded bg-gray-100 "
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label htmlFor="email" className="font-bold text-2xl block text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Tu Email"
              className="w-full p-2 mt-4 border rounded bg-gray-100 "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label htmlFor="password2" className="font-bold text-2xl block text-gray-600">Repite Password</label>
            <input
              type="password"
              id="password2"
              placeholder="Repite tu password"
              className="w-full p-2 mt-4 border rounded bg-gray-100 "
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>
          <input
            type="submit" value="Registrarse"
            className="bg-indigo-600 py-4 px-10 mt-4 rounded text-white uppercase font-bold w-full md:w-auto hover:cursor-pointer hover:bg-indigo-800"
          />
        </form>
        <nav className="mt-12 lg:flex lg:justify-between">
          <Link
            className='text-gray-600 block my-4 text-center'
            to="/">¿Ya tienes cuenta? Inicia Sesión</Link>
          <Link
            className='text-gray-600 block my-4 text-center'
            to="/olvido-password">Olvidé mi password</Link>
        </nav>
      </div>
    </>
  )
};

export default Registrar;