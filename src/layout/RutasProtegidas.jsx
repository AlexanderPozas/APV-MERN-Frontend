import { Outlet, Navigate } from "react-router-dom";

// Importar Componentes
import Header from "../components/Header";
import Footer from "../components/Footer";

import useAuth from "../hooks/useAuth";

/** Operadore de encadenamiento opcional
 * ?. es similar al operador de encadenamiento .
 * Permite leer el valor de una propiedad sin tener que validar expresamente que cada referencia en la cadena sea válida.
 * Da como resultado expresiones más cortas y simples cuando se accede a propiedades encadenadas donde existe la posibilidad de que falte una referencia
 */

const RutasProtegidas = () => {
    const { auth, cargando } = useAuth();
    // console.log(auth);
    // console.log(cargando);

    if (cargando) return 'Cargando';

    return (
        <>
            <Header />
            {auth?.email ? (
                <main className="container mx-auto px-4 mt-8">
                    <Outlet />
                </main>
            ) : <Navigate to="/" />}
            <Footer />
        </>
    )
}

export { RutasProtegidas };