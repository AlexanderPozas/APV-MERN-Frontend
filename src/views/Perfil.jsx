import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";

const Perfil = () => {

    const { auth, editarUsuario } = useAuth(); // importo usuario del state de autenticación
    const [perfil, setPerfil] = useState({}); // state para no modificar el global

    const [alerta, setAlerta] =  useState({});

    useEffect(() => {
        setPerfil(auth);
    }, []);

    // Validar formulario
    const handleSubmit = async e => {
        e.preventDefault();
        const { nombre, email } = perfil;
        if([nombre, email].includes('')) {
            setAlerta({
                msg: 'Nombre e Email son Obligatiorios',
                error: true
            });
        }

        // Paso validación
        const resultado = await editarUsuario(perfil);
        setAlerta(resultado);
    }

    const { msg } = alerta;

    return (
        <>
            <AdminNav />
            <h2 className="text-2xl font-bold text-center mb-4">Editar Perfil</h2>
            <p className="text-center text-lg mb-10">Modifica tu {''}
                <span className="text-indigo-600 font-bold">Información aquí</span>
            </p>
            <div className="flex justify-center">
                <div className="w-full md:w-1/2">
                    {msg && <Alerta alerta={alerta}/>}
                    <form
                        className="bg-white shadow rounded py-6 px-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-4">
                            <label
                                htmlFor="nombre"
                                className="w-full block text-gray-600 font-bold uppercase mb-2"
                            >Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                id="nombre"
                                className="w-full bg-gray-100 rounded p-2 "
                                value={perfil.nombre || ''}
                                onChange={e => {
                                    setPerfil({
                                        ...perfil,
                                        [e.target.name]: e.target.value
                                    })
                                }}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="sitio"
                                className="w-full block text-gray-600 font-bold uppercase mb-2"
                            >Sitio Web</label>
                            <input
                                type="text"
                                name="web"
                                id="web"
                                className="w-full bg-gray-100 rounded p-2 "
                                value={perfil.web || ''}
                                onChange={e => {
                                    setPerfil({
                                        ...perfil,
                                        [e.target.name]: e.target.value
                                    })
                                }}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="telefono"
                                className="w-full block text-gray-600 font-bold uppercase mb-2"
                            >Telefono</label>
                            <input
                                type="tel"
                                name="telefono"
                                id="telefono"
                                className="w-full bg-gray-100 rounded p-2 "
                                value={perfil.telefono || ''}
                                onChange={e => {
                                    setPerfil({
                                        ...perfil,
                                        [e.target.name]: e.target.value
                                    })
                                }}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="w-full block text-gray-600 font-bold uppercase mb-2"
                            >Email</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                className="w-full bg-gray-100 rounded p-2 "
                                value={perfil.email || ''}
                                onChange={e => {
                                    setPerfil({
                                        ...perfil,
                                        [e.target.name]: e.target.value
                                    })
                                }}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Guardar Cambios"
                            className="bg-indigo-600 text-white font-bold uppercase py-2 px-10 w-full mt-5"
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Perfil