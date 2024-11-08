import { Link } from "react-router-dom";
import logoLindoDoMeuSite from '../assets/logoLindoDoMeuSite.png'; // Importe a imagem

export default function GenreCard({ name }) {
    return (
        <Link className="w-auto" to={`/genre/${name}`}>
            <div className="w-80 h-40 shadow-md rounded-md p-4 relative perspective group">
                <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                    {/* frente do card */}
                    <div className="absolute w-full h-full bg-blue-300 flex items-center justify-center backface-hidden rounded-md">
                        <img src={logoLindoDoMeuSite} alt="Logo React e Filmes" className="w-16 h-16 object-cover rounded-md" />
                        <h3 className="text-lg text-gray-950 font-bold absolute bottom-4 right-4 p-1 rounded">{name}</h3>
                    </div>
                    {/*quando virar o card */}
                    <div className="absolute w-full h-full bg-blue-300 bg-opacity-50 flex items-center justify-center backface-hidden rounded-md rotate-y-180">
                        <p className="text-lg text-white font-bold">{name} 🎞️🍿</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}