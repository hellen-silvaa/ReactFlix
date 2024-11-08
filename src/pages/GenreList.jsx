import { useEffect, useState } from 'react';
import GenreCard from '../components/GenreCard';

export default function GenreList() {

    const [genre, setGenre] = useState([]);
    // useEffect para buscar os generos na api
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`)
            .then(response => response.json())
            .then(data => { setGenre(data.genres) })
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <h2 className='col-span-4 text-2xl font-bold text-center mb-5 mt-8 relative group'>
                <span className='relative inline-block'>
                    BUSQUE O SEU GÊNERO PREFERIDO
                    <span className='absolute left-0 bottom-0 w-full h-1 bg-blue-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
                </span>
            </h2>
            <main className='flex flex-wrap gap-10 justify-center'>
                {
                    //maapeia os generos e renderiza o componente 
                    genre.map((genre) => (
                        <GenreCard key={genre.id} {...genre} />
                    )
                    )
                }
            </main>
        </>
    )
}