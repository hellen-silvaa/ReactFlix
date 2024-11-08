import { useEffect, useState } from "react";
import Slider from "react-slick"; //usei a  biblioteca react-slick para criar o carrossel 
import ContainerMovies from "../components/ContainerMovies";
import MovieCard from "../components/MovieCard";
import { NewtonsCradle } from '@uiball/loaders'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
    //usando useState que é um hook para criar um estado local 
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedSeries, setTopRatedSeries] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    //chave da API e URL base da API para fazer as requisições 
    const API_KEY = '?api_key=7c572a9f5b3ba776080330d23bb76e1e';
    const BASE_URL = 'https://api.themoviedb.org/3';

    //função assincrona para buscar os filmes 
    const fetchMovies = async () => {
        try {
            const popularURL = `${BASE_URL}/movie/popular${API_KEY}&language=pt-br&page=1`;
            const topRatedSeriesURL = `${BASE_URL}/tv/top_rated${API_KEY}&language=pt-br&page=1`;
            const nowPlayingURL = `${BASE_URL}/movie/now_playing${API_KEY}&language=pt-br&page=1`;

            const [popularResponse, topRatedSeriesResponse, nowPlayingResponse] = await Promise.all([
                fetch(popularURL),
                fetch(topRatedSeriesURL),
                fetch(nowPlayingURL)
            ]);

            if (!popularResponse.ok || !topRatedSeriesResponse.ok || !nowPlayingResponse.ok) {
                throw new Error('Erro ao buscar os filmes');
            }

            const popularData = await popularResponse.json();
            const topRatedSeriesData = await topRatedSeriesResponse.json();
            const nowPlayingData = await nowPlayingResponse.json();

            setPopularMovies(popularData.results);
            setTopRatedSeries(topRatedSeriesData.results);
            setNowPlayingMovies(nowPlayingData.results);
        } catch (error) {
            console.error('Erro ao buscar os filmes:', error);
        } finally {
            setLoading(false);
        }
    }
    //executa os filmes ao carregar a pagina 
    useEffect(() => {
        fetchMovies();
    }, []);
    //configurações do carrocel que é passado como parametro para o componente slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <>
            {loading ? <div className='col-span-4 mt-5'>
            <NewtonsCradle
              size={45}
              speed={1.75}
              color="white"
            />
          </div> :
                <>
                    <div className="w-full h-2/4 overflow-hidden px-4">
                        <Slider {...settings}>
                            {popularMovies.map(movie => (
                                <div key={movie.id} className="w-full h-auto px-2">
                                    <img className="w-full h-80 object-contain" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="px-4">
                        <ContainerMovies titulo="Filmes em Alta">
                            {popularMovies.map(movie => (
                                <MovieCard
                                    key={movie.id} {...movie}
                                />
                            ))}
                        </ContainerMovies>
                        <ContainerMovies titulo="Séries Melhor avaliadas">
                            {topRatedSeries.map(serie => (
                                <MovieCard
                                    key={serie.id} {...serie}
                                />
                            ))}
                        </ContainerMovies>
                        <ContainerMovies titulo="Em cartaz no cinema">
                            {nowPlayingMovies.map(movie => (
                                <MovieCard
                                    key={movie.id} {...movie}
                                />
                            ))}
                        </ContainerMovies>
                    </div>
                </>
            }
        </>
    )
}