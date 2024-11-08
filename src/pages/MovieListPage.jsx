import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { NewtonsCradle } from '@uiball/loaders'; // biblioteca que o professor usou para criar o efeito de carregamento
import { CircularPagination } from '../components/CircularPagination';

export default function MovieListPage() {

  const [search, setSearch] = useState('');
  const [filmes, setFilmes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Adiciona estado de carregamento

  // useEffect para buscar os filmes populares na api quando a página atual mudar
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br&page=${currentPage}`)
        .then(response => response.json())
        .then(data => {
          setFilmes(data.results);
          setTotalPages(data.total_pages);
        })
        .catch(error => console.error(error))
        .finally(() => {
          setIsLoading(false);
          console.log('fetch finalizado');
        });
    }, 1000); // delay de 1s para simular o carregamento apenas para ver o icone de carregamento
  }, [currentPage]);
  //filtra os filmes de acordo com o texto digitado no input
  const filmesFiltrados = filmes.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <main className='grid grid-cols-4 justify-items-center gap-5'>
        <h2 className='col-span-4 text-2xl font-bold text-center mb-5 mt-8 relative group'>
          ENCONTRE OS MELHORES FILMES
          <span className='absolute left-0 bottom-0 w-full h-1 bg-blue-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
        </h2>
        <form className='col-span-4 w-2/4 flex flex-col justify-center gap-2 mb-5'>
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Pesquise um filme...'
            className='text-black p-2 mb-5 border border-gray-300 rounded-md'
          />
        </form>
        {isLoading ? (
          <div className='col-span-4 mt-5'>
            <NewtonsCradle
              size={45}
              speed={1.75}
              color="white"
            />
          </div>
        ) : (
          filmesFiltrados.length > 0 ? (
            filmesFiltrados.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))
          ) : (
            <div className='col-span-4 mt-5'>
              <p>Nenhum filme encontrado.</p>
            </div>
          )
        )}
        <div className='col-span-4 flex justify-center'>
          <CircularPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
    </>
  );
}