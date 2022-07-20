// Importar Componentes
import Formulario from "../components/Formulario";
import ListaPacientes from "../components/ListaPacientes";

const Admin = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 lg:w-2/5">
        <Formulario />
      </div>
      <div className="md:w-1/2 lg:w-3/5 mt-4 md:mt-0">
        <ListaPacientes />
      </div>
    </div>
  )
}

export default Admin