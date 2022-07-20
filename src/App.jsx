import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importar mater pages
import { AuthLayout } from "./layout/AuthLayout";
import { RutasProtegidas } from "./layout/RutasProtegidas";

// Importar Vistas
import Login from "./views/Login";
import Registrar from "./views/Registrar";
import Confirmar from "./views/Confirmar";
import OlvidoPassword from "./views/OlvidoPassword";
import ReestablecerPassword from "./views/ReestablecerPassword";

import Admin from "./views/Admin";
import Perfil from "./views/Perfil";
import CambiarPassword from "./views/CambiarPassword";

// Importar Provider
import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from './context/PacientesProvider';

function App() {

	// Aceder a variables de entorno en Vite
	// console.log(import.meta.env.VITE_BACKEND_URL);

	return (
		<BrowserRouter>
			<AuthProvider>
				<PacientesProvider>
					<Routes>
						<Route path="/" element={<AuthLayout />}>
							<Route index element={<Login />} />
							<Route path="registrar" element={<Registrar />} />
							<Route path="confirmar/:token" element={<Confirmar />} />
							<Route path="olvido-password" element={<OlvidoPassword />} />
							<Route path="olvido-password/:token" element={<ReestablecerPassword />} />
						</Route>
						<Route path="/admin/" element={<RutasProtegidas />}>
							<Route index element={<Admin />} />
							<Route path="perfil" element={<Perfil />} />
							<Route path="cambiar-password" element={<CambiarPassword />} />
						</Route>
					</Routes>
				</PacientesProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App
