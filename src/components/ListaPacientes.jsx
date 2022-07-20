import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente";

const ListaPacientes = () => {

  // Importar pacientes del context
  const { pacientes } = usePacientes();

  return (
    <>
      {pacientes.length ?
        (
          <>
            <h2 className="text-center font-bold text-lg">Listado Pacientes</h2>
            <p className="text-sm text-center mt-2 mb-4">Administra tus {''}
              <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
            </p>
            {pacientes.map(paciente =>
              <Paciente
                key={paciente._id}
                paciente={paciente}
              />
            )}
          </>
        ) :
        (
          <>
            <h2 className="text-center font-bold text-lg">No hay Pacientes</h2>
            <p className="text-sm text-center mt-2 mb-4">Añade tus Pacientes y {''}
              <span className="text-indigo-600 font-bold">Administralos</span>
            </p>
          </>
        )
      }

    </>
  )
}

export default ListaPacientes