import { useState } from "react";
import AdminNav from "../components/AdminNav";

import useAuth from "../hooks/useAuth";

import Alerta from "../components/Alerta";

const CambiarPassword = () => {

  const { nuevoPassword } = useAuth();

  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({ pwd_actual: '', pwd_nuevo: '' });


  const handleSubmit = async e => {
    e.preventDefault();

    // Validar inputs
    if (Object.values(password).some(input => input === '')) {
      setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
      return;
    }
    // Validar que el password nuevo tiene al menos 6 caracteres
    if (password.pwd_nuevo.length < 6) {
      setAlerta({ msg: 'El password debe tener al menos 6 caracteres', error: true });
      return;
    }

    // Paso la validación
    // Enviar datos al provider para setear el nuevo password
    const respuesta = await nuevoPassword(password);
    setAlerta(respuesta);

    setPassword({ pwd_actual: '', pwd_nuevo: '' });
  };

  const { msg } = alerta;

  return (
    <>
      <AdminNav />
      <h2 className="text-2xl font-bold text-center mb-4">Cambiar Contraseña</h2>
      <p className="text-center text-lg mb-10">Modifica tu {''}
        <span className="text-indigo-600 font-bold">Password aquí</span>
      </p>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2">
          {msg && <Alerta alerta={alerta} />}
          <form
            className="bg-white shadow rounded py-6 px-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                htmlFor="pwd-actual"
                className="w-full block text-gray-600 font-bold uppercase mb-2"
              >Password Actual</label>
              <input
                type="password"
                name="pwd_actual"
                id="pwd-actual"
                placeholder="Introduce tu Password Actual"
                className="w-full bg-gray-100 rounded p-2 "
                onChange={e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="pwd-nuevo"
                className="w-full block text-gray-600 font-bold uppercase mb-2"
              >Nuevo Password</label>
              <input
                type="password"
                name="pwd_nuevo"
                id="pwd-nuevo"
                placeholder="Introduce tu Nuevo Password"
                className="w-full bg-gray-100 rounded p-2"
                onChange={e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}
              />
            </div>

            <input
              type="submit"
              value="Cambiar Password"
              className="bg-indigo-600 text-white font-bold uppercase py-2 px-10 w-full mt-5"
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default CambiarPassword