export function App() {
  return (

    <div className="container max-w-2xl bg-white rounded-2xl border-2 p-10 my-28 mx-auto space-x-4 space-y-4">

      <h1 className="text-3xl text-center font-semibold">Bienvenido nutricionista</h1>

      <p className="font-semibold">Este es un espacio dedicado a profesionales de la nutrición para gestionar y mejorar la salud de sus pacientes.</p>

      <div className="space-x-4 space-y-4">

        <div className="flex justify-center">
          <label form="email" className="font-semibold">Email:</label>
          <input type="email" id="email" name="email" required className="rounded-md border-2 border-solid border-gray-300" />
        </div>

        <div className="flex justify-center">
          <label form="password" className="font-semibold">Contraseña:</label>
          <input type="password" id="password" name="password" required className="rounded-md border-2 border-solid border-gray-300" />
        </div>

      </div>

      <div className="flex justify-center space-x-4">

        <button type="submit" className="p-3 bg-smoke rounded-2xl border-2 border-magenta ">Ingresar al Sistema</button>
        <button type="button" className="p-3 bg-magenta rounded-2xl border-2 border-solid text-gris">Registrarse</button>
      </div>


    </div>
  )
}