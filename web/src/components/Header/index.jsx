
export const Header = () => {
    return (
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
    )
} 