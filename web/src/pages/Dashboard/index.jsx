
import { Recepies_Cards, Header, NavBar } from "~/components"


export function Dashboard() {


    {/* {auth?.user?.id && (<div onClick={logout} className="p-2 cursor-pointer text-xl font-semibold"> */ }
    {/* Logout */ }
    {/* </div>) || (<div onClick={login} className="p-2 cursor-pointer text-xl font-bold "> */ }
    {/* Login */ }

    return (


        <div>

            <Header />

            <NavBar />


            <main>

                <section id="header" className="max-w-full flex items-center justify-center">
                    <div className="flex flex-col text-center m-4 gap-4">
                        <h1 className="p-2 text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-azul_titulo ">
                            Recetas sugeridas de ChefDigitales
                        </h1>
                        <p className="w-full sm:w-5/6 md:w-3/4 lg:w-1/2 m-auto text-gray-900">
                            Bienvenido a nuestra plataforma de nutrición.
                            Aquí, podrás gestionar tus clientes, crear planes de alimentación personalizados,
                            rastrear el progreso de tus clientes y mucho más. Nuestra plataforma está diseñada para ayudarte a proporcionar el mejor cuidado posible a tus clientes.
                            <b className="font-bold">¡Empecemos!</b>
                        </p>
                    </div>
                </section>


                <section id="cards" className="">

                    <Recepies_Cards />


                </section>


            </main>

        </div>

    )
}