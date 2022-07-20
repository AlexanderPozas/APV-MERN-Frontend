import { Link } from "react-router-dom"

import useAuth from "../hooks/useAuth";

const Header = () => {
  const { cerrarSesion } = useAuth();

  return (
    <header className="bg-indigo-600 py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-indigo-200 font-bold text-2xl text-center">Administrador de Pacientes de <span className="text-white font-black">Veterinaria</span></h1>
        <nav className="text-white flex flex-col items-center md:flex-row gap-4 mt-4 md:mt-0 text-center">
          <Link className="font-bold text-sm uppercase hover:text-indigo-200" to="/admin">Pacientes</Link>
          <Link className="font-bold text-sm uppercase hover:text-indigo-200" to="/admin/perfil">Perfil</Link>
          <button type="button" onClick={cerrarSesion} className="font-bold text-sm uppercase hover:text-indigo-200">Cerrar Sesión</button>
        </nav>
      </div>
    </header>
  )
}

export default Header