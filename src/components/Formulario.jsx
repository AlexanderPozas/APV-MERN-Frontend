import { useState, useEffect } from "react";

import usePacientes from "../hooks/usePacientes";

import Alerta from "./Alerta";

const Formulario = () => {
    const [mostrarForm, setMostrarForm] = useState(false);

    // State para campos del form
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [alerta, setAlerta] = useState({});

    const { guardarPaciente, paciente } = usePacientes();
    const [id, setId] = useState(null);

    // Editar paciente
    useEffect(() => {
        if(paciente?.nombre) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
            setId(paciente._id);
        }
    }, [paciente]);

    // Onsubmit del form
    const handleSubmit = e => {
        e.preventDefault();
        // Validar inputs
        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
            return;
        }

        setAlerta({});
        guardarPaciente({ nombre, propietario, email, fecha, sintomas, id });

        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
        setId(null);
    };

    const { msg } = alerta;

    return (
        <>
            <h2 className="text-center font-bold text-lg">Administrador de Pacientes</h2>
            <p className="text-sm text-center mt-2 mb-4">Añade tus pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <button
                className="bg-indigo-600 w-full py-2 text-white font-bold uppercase mb-8 hover:bg-indigo-700 md:hidden"
                onClick={() => setMostrarForm(!mostrarForm)}
            >{`${mostrarForm ? 'Ocultar Formulario' : 'Mostrar Formulario'}`}</button>
            <form className={`${mostrarForm ? 'block' : 'hidden'} bg-white py-6 px-4 rounded shadow-lg mb-6 md:mb:0 md:block`}
                onSubmit={handleSubmit}
            >
                <div className="mb-4">
                    <label
                        htmlFor="nombre"
                        className="block w-full text-sm font-bold uppercase mb-2"
                    >Nombre Mascota</label>
                    <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        placeholder="Nombre de la mascota"
                        className="block w-full p-2 rounded border placeholder:text-gray-300"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="propietario"
                        className="block w-full text-sm font-bold uppercase mb-2"
                    >Nombre Propietario</label>
                    <input
                        type="text"
                        name="propietario"
                        id="propietario"
                        placeholder="Nombre del Propietario"
                        className="block w-full p-2 rounded border placeholder:text-gray-300"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block w-full text-sm font-bold uppercase mb-2"
                    >Email del propietario</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email del propietario"
                        className="block w-full p-2 rounded border placeholder:text-gray-300"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="fecha"
                        className="block w-full text-sm font-bold uppercase mb-2"
                    >Fecha Alta</label>
                    <input
                        type="date"
                        name="fecha"
                        id="fecha"
                        className="block w-full p-2 rounded border placeholder:text-gray-300"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="sintomas"
                        className="block w-full text-sm font-bold uppercase mb-2"
                    >Síntomas</label>
                    <textarea
                        name="sintomas"
                        id="sintomas"
                        className="block w-full p-2 rounded border placeholder:text-gray-300 h-32"
                        placeholder="Describe los síntomas"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    ></textarea>
                </div>

                <input
                    type="submit"
                    value={id ? 'Guardar Cambios' : 'Registrar Paciente'}
                    className="bg-indigo-600 text-white p-4 mb-4 w-full font-bold uppercase cursor-pointer hover:bg-indigo-700 transition-colors"

                />

                {msg && <Alerta alerta={alerta} />}

            </form>
        </>
    )
}

export default Formulario