import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import { CircularPagination } from "../components/CircularPagination";


export default function MoviesByGenrePage() {
  const { genero } = useParams();
  const [filmes, setFilmes] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const filmesPerPage = 14; // Número de filmes por página

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`)
      .then(response => response.json())
      .then(data => { setGeneros(data.genres) })
      .catch(err => console.error(err));
  }, []);

  // busca os filmes de acordo com o gênero selecionado
  useEffect(() => {
    if (generos.length > 0) {
      const generoBuscado = generos.find((generoItem) => generoItem.name === genero);

      if (generoBuscado) {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR&with_genres=${generoBuscado.id}&page=${currentPage}`)
          .then(response => response.json())
          .then(data => {
            setFilmes(data.results);
            setTotalPages(Math.ceil(data.total_results / filmesPerPage));
          })
          .catch(err => console.error(err));
      }
    }
  }, [generos, currentPage]);

  return (
    <>
      <h2 className='col-span-4 text-2xl font-bold text-center mb-5'> Os filmes encontrados de {genero} são: </h2>
      <main className="flex flex-wrap gap-10 justify-center mx-auto max-w-screen-xl">
        {
          filmes.map((filme) => (
            <MovieCard key={filme.id} {...filme} className="m-4" />
          ))
        }
      </main>
      <div className="flex justify-center mt-8">
        <CircularPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}