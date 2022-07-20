import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

// rafce - react arrow function component export
const Confirmar = () => {

  const params = useParams();
  const { token } = params; // Leer datos de la url con react
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [cargando, setCargando] = useState(true);

  // Enviar petición al servidor
  useEffect(() => {
    async function confirmar() {
      try {
        const url = `/veterinarios/confirmar/${token}`;
        const { data } = await clienteAxios(url);
        setCuentaConfirmada(true);
        setAlerta({ msg: data.msg });
      } catch (error) {
        setAlerta({ msg: error.response.data.msg, error: true });
      }
      setCargando(false);
    }
    confirmar();
  }, []);

  return (
    <>
      <div className="mx-4 text-center md:text-left">
        <h1 className="text-indigo-600 text-6xl font-black mb-8 md:mb-0">Confirma tu cuenta y Administra tus <span className="text-black">Pacientes</span></h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded bg-white">
        {!cargando && <Alerta alerta={alerta} />}
        {cuentaConfirmada &&
          <Link
            className='text-gray-600 block my-4 text-center'
            to="/">Inicia Sesión</Link>
        }
      </div>
    </>
  )
};

export default Confirmar;