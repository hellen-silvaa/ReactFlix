import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ id, title, poster_path }) {
    return (
        <div key={id} className="group flex flex-col text-center justify-center items-center flex-shrink-0 relative">
            <img
                src={`https://image.tmdb.org/t/p/w342${poster_path}`}
                alt={title}
                className="w-[130px] h-[200px] mt-3 transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
            {/* // link para a pagina de detalhes do filme */}
            <Link
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out py-2 px-3 hover:bg-white hover:text-gray-500 m-4 text-white rounded-2xl"
                to={`/movies/${id}`}
            >
                Saiba mais
            </Link>
        </div>
    );
}