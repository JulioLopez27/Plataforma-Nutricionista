
import {Recepies_Cards} from "../../components/Recepies_Cards"


export function Dashboard() {


    {/* {auth?.user?.id && (<div onClick={logout} className="p-2 cursor-pointer text-xl font-semibold"> */ }
    {/* Logout */ }
    {/* </div>) || (<div onClick={login} className="p-2 cursor-pointer text-xl font-bold "> */ }
    {/* Login */ }

    return (


        <div>

            <header className="bg-verde_claro text-white">

                <div className="container max-w-full p-2 flex justify-between items-center ">

                    <img loading="lazy" src="/logo/Logo.png" alt="logo" className="w-16 sm:w-24 md:w-28 xl:w-30 2xl:w-40 " />

                    <div className="flex gap-2 sm:gap-3 md:gap-4  items-center ">

                        <img loading="lazy" src="/notification/notification.svg" alt="notification" className="w-2 sm:3 md:w-4 2xl:w-5" />

                        <a href="/profile">
                            <img loading="lazy" src="/user/user.svg" alt="user" className="w-2 sm:3 md:w-4 2xl:w-5" />
                        </a>

                        <span className=" font-semibold text-gray-950 text-sm sm:text-lg md:text-xl   " >Hola, Nutricionista</span>
                    </div>

                </div>

            </header>

            <nav className="container max-w-full ">

                <div className="flex justify-around mt-5 mx-20 pb-4 border-b-2 border-verde_oscuro font-medium text-gris_texto text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ">

                    <div id="pagPrincipal" className="border-t-2 border-transparent hover:border-t-2 hover:border-verde_claro ">
                        <a href="/dashboard" className="hover:text-gray-900"> Página principal</a>
                    </div>

                    <div id="consultante" className="border-t-2 border-transparent hover:border-t-2 hover:border-verde_claro">
                        <a href="/dashboard" className="hover:text-gray-900" > Consultantes</a>
                    </div>

                    <div id="recetas" className="border-t-2 border-transparent hover:border-t-2 hover:border-verde_claro">
                        <a href="/dashboard" className="hover:text-gray-900" > Recetas</a>
                    </div>

                </div>

            </nav>


            <main className="">

                <section id="header" className="max-w-full flex items-center justify-center">
                    <div className="flex flex-col text-center m-4 gap-4">
                        <h1 className="p-2 text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-azul_titulo ">
                            Recetas destacadas de ChefDigitales
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