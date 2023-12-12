import { Input } from '~/components'

export const Signup = () => {

    return (

        <div className="container max-w-2xl bg-white rounded-2xl border-2 p-8 my-24 mx-auto space-x-4 ">
            <main className="p-4">

                <h2 className="text-3xl text-center font-semibold mb-3">Bienvenido a la página de registro</h2>

                <form className="space-y-4 mt-3">

                    <Input
                        autoComplete="off"
                        type="text"
                        name="nombre"
                        label="Nombre "
                        placeholder="ingrese su nombre"
                    />

                    <Input
                        autoComplete="off"
                        type="text"
                        name="apellido"
                        label="Apellido "
                        placeholder="ingrese su apellido"
                    />


                    <Input

                        autoComplete="off"
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




                    <Input
                        type="text"
                        name="pais"
                        label="País"
                        placeholder="Ingrese su país"
                    />

                    <Input
                        type="text"
                        name="zona"
                        label="Zona"
                        placeholder="Ingrese su zona de residencia"
                    />


                    <Input
                        disabled="on"
                        type="text"
                        name="foto"
                        label="Foto"
                        placeholder="**Corregir futuramente **"
                    />

                    <Input
                        disabled="on"
                        type="text"
                        name="foto"
                        label="TEST"
                        placeholder="**Corregir futuramente **"
                    />
                </form>

                <div className="flex justify-center space-x-4 mt-4">
                    <a href="/" className="text-center p-3 bg-magenta rounded-xl border-2 border-solid text-gris">Página principal</a>
                    <a href="/dashboard" className="text-center p-3 bg-magenta rounded-xl border-2 border-solid text-gris">Crear mi cuenta</a>
                </div>

            </main>

        </div >
    )
}