import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa"; // icones do react 
import logoLindoDoMeuSite from '../assets/logoLindoDoMeuSite.png';

export default function Header() {
    //estado que verifica se o usuario está logado
    const [isLogged, setIsLogged] = useState(false);
    //altera o estado de login 
    const handleLogin = () => {
        setIsLogged(!isLogged);
    }

    return (
        <header className="w-full h-10 flex justify-between items-center p-10 mb-1 bg-blue-300 bg-opacity-50">
            <div>
                <img src={logoLindoDoMeuSite} alt="Logo React e Filmes" className="h-16 w-16" />
            </div>
            <nav>
                <ul className="flex gap-5">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/movies">Filmes</NavLink></li>
                    <li><NavLink to="/genre">Gêneros</NavLink></li>
                    {isLogged && <li><NavLink to="/profile">Perfil</NavLink></li>}
                    
                    {/* //apenas teste do PageNotFound  */}
                    {isLogged && <li><NavLink to="/AindaNaoExiste">Lanchinhos</NavLink></li>}
                </ul>
            </nav>
            <div onClick={handleLogin} className="cursor-pointer">
                {/* //se o usuario estiver logado, exibe o icone de logout, senão exibe o icone de usuario */}
                {isLogged ? <FaSignOutAlt className="text-white text-2xl" /> : <FaUser className="text-white text-2xl" />}
            </div>
        </header>
    );
}