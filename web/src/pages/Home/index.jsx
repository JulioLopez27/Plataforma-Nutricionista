
import {Input} from './../../components'



export function Home() {
  return (

    <div className="container max-w-2xl bg-white rounded-2xl border-2 p-8 my-24 mx-auto space-x-4 ">
      <main className="p-4">

        <h1 className="text-3xl text-center font-semibold mb-3">Bienvenido nutricionista</h1>

        <p className="font-semibold">Este es un espacio dedicado a profesionales de la nutrición para gestionar y mejorar la salud de sus pacientes.</p>

          <form className="space-y-4 mt-3">

            <Input
              type="text"
              name="email"
              label="Correo electrónico "
              placeholder="ingrese su correo"
              
            />

            <Input 
            type="password"
            name="password"
            label="Constraseña"
            placeholder="Ingrese su contraseña"
            />

          </form>

        

        <div className="flex justify-center space-x-4 mt-4">

          <button className="text-center p-3 bg-smoke rounded-xl border-2 border-magenta ">Ingresar al Sistema</button>
          <a href="/signup" className="text-center p-3 bg-magenta rounded-xl border-2 border-solid text-gris">Registrarse</a>
        </div>

      </main>

    </div >
  )
}