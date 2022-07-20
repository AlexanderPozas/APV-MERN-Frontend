const Alerta = ({ alerta }) => {
    return (
            <div className={`${alerta.error ? 'from-red-300 to-red-600' : 'from-blue-300 to bg-blue-600'} bg-gradient-to-r text-center text-white py-3 uppercase font-bold text-xs`}>
                {alerta.msg}
            </div>
  )
}

export default Alerta