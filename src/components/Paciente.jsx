import usePacientes from "../hooks/usePacientes";

const Paciente = ({ paciente }) => {

    const { nombre, propietario, email, fecha, sintomas } = paciente;

    const { setEdicion, eliminarPaciente } = usePacientes();

    // Funcion para formatear fecha
    const formatearFecha = () => {
        const nFecha = new Date(fecha);
        return new Intl.DateTimeFormat('es-MX').format(nFecha);
    }

    return (
        <div className="bg-white my-4 md:m-4 py-8 px-4 shadow-lg rounded">
            <p className="text-sm font-bold uppercase mb-2 ">Nombre: {''}
                <span className="font-normal normal-case">{nombre}</span>
            </p>
            <p className="text-sm font-bold uppercase mb-2 ">Propietario: {''}
                <span className="font-normal normal-case">{propietario}</span>
            </p>
            <p className="text-sm font-bold uppercase mb-2 ">Email Contacto: {''}
                <span className="font-normal normal-case">{email}</span>
            </p>
            <p className="text-sm font-bold uppercase mb-2 ">Fecha Alta: {''}
                <span className="font-normal normal-case">{formatearFecha()}</span>
            </p>
            <p className="text-sm font-bold uppercase mb-2 ">Síntomas: {''}
                <span className="font-normal normal-case">{sintomas}</span>
            </p>
            <div className="">
                <button
                    type="button"
                    className="inline-block bg-indigo-600 text-white py-2 px-8 font-bold uppercase mr-4 hover:bg-indigo-700"
                    onClick={() => setEdicion(paciente)}
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="inline-block bg-red-600 text-white py-2 px-8 font-bold uppercase hover:bg-red-700"
                    onClick={() => eliminarPaciente(paciente)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default Paciente