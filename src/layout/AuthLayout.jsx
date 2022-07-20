// rafc
// import React from 'react' // Ya no se requiere en versiones modernas de react
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <>
            <main className="container mx-auto md:grid md:grid-cols-2 gap-12 pt-8 items-center">
                <Outlet />
            </main>
        </>
    )
}


export { AuthLayout };