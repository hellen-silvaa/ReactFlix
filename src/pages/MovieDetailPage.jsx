import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Modal from "react-modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

Modal.setAppElement('#root');

export default function MovieDetailPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [revenueInBRL, setRevenueInBRL] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [cast, setCast] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [allReviewsModalIsOpen, setAllReviewsModalIsOpen] = useState(false);
    const [isAddedToWatchLater, setIsAddedToWatchLater] = useState(false);
    const [isAddedToWatched, setIsAddedToWatched] = useState(false);

    const exchangeRate = 5;

    //busca detalhes do filme
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`)
            .then(response => response.json())
            .then(data => setMovie(data))
            .catch(err => console.error(err));
    }, [id]);

    //busca o trailer do filme na api
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`)
            .then(response => response.json())
            .then(data => {
                if (data.results.length > 0) {
                    const trailerURL = data.results[0].key;
                    setTrailer(`https://www.youtube.com/watch?v=${trailerURL}`);
                }
            })
            .catch(err => console.error(err));
    }, [id]);

    //busca o elenco do filme 
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`)
            .then(response => response.json())
            .then(data => setCast(data.cast))
            .catch(err => console.error(err));
    }, [id]);

    //busca as avaliaçoes do filme
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`)
            .then(response => response.json())
            .then(data => setReviews(data.results))
            .catch(err => console.error(err));
    }, [id]);


    //  verifica se o filme esta salvo para assistir depois
    useEffect(() => {
        const toWatchMovies = JSON.parse(localStorage.getItem('toWatchMovies')) || [];
        if (toWatchMovies.some(m => m.id === parseInt(id))) {
            setIsAddedToWatchLater(true);
        }
    }, [id]);

    //  verifica se o filme esta salvo como assistido
    useEffect(() => {
        const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
        if (watchedMovies.some(m => m.id === parseInt(id))) {
            setIsAddedToWatched(true);
        }
    }, [id]);

    //abre o modal chique para ler a avaliaçao
    const openModal = (review) => {
        setSelectedReview(review);
        setModalIsOpen(true);
    };
    //fecha o modal
    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedReview(null);
    };

    const openAllReviewsModal = () => {
        setAllReviewsModalIsOpen(true);
    };

    const closeAllReviewsModal = () => {
        setAllReviewsModalIsOpen(false);
    };
    //funçao que adiciona ou remove um filme do perfil para assistir depois
    const toggleWatchLater = () => {
        const toWatchMovies = JSON.parse(localStorage.getItem('toWatchMovies')) || [];
        if (isAddedToWatchLater) {
            const updatedMovies = toWatchMovies.filter(m => m.id !== movie.id);
            localStorage.setItem('toWatchMovies', JSON.stringify(updatedMovies));
            setIsAddedToWatchLater(false);
        } else {
            if (!toWatchMovies.some(m => m.id === movie.id)) {
                toWatchMovies.push(movie);
                localStorage.setItem('toWatchMovies', JSON.stringify(toWatchMovies));
            }
            setIsAddedToWatchLater(true);
        }
    };
    //funçao que adiciona ou remove um filme do perfil como assistido
    const toggleWatched = () => {
        const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
        if (isAddedToWatched) {
            const updatedMovies = watchedMovies.filter(m => m.id !== movie.id);
            localStorage.setItem('watchedMovies', JSON.stringify(updatedMovies));
            setIsAddedToWatched(false);
        } else {
            if (!watchedMovies.some(m => m.id === movie.id)) {
                watchedMovies.push(movie);
                localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
            }
            setIsAddedToWatched(true);
        }
    };

    return (
        <>
            {movie ? (
                <div
                    key={movie.id}
                    className=' h-[800px] bg-cover bg-center text-white relative'
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                    }}
                >
                    <div className="bg-black bg-opacity-70 p-10 w-full h-full absolute top-0 left-0 flex gap-x-10">
                        <div className="flex flex-col gap-y-3 justify-start items-center">
                            <h1 className="text-5xl font-bold text-center flex items-center gap-4">
                                {movie.title}
                                <div className="flex items-center gap-1 font-semibold text-md">
                                    <FaStar className="text-yellow-600" /> <span>{movie.vote_average}</span>
                                </div>
                            </h1>
                            <p className="font-semibold text-lg text-center">{movie.overview ? movie.overview : 'Descrição não disponível'}</p>
                            <p className="font-semibold text-lg text-center">Data de lançamento: {movie.release_date}</p>

                            <div>
                                {trailer ? (
                                    <iframe
                                        width="560"
                                        height="315"
                                        src={trailer.replace("watch?v=", "embed/")}
                                        title={`${movie.title} Trailer`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />

                                )
                                    //se não tiver trailer exibe mensagem
                                    : (
                                        <p>Trailer não disponível</p>
                                    )}
                            </div>
                            <div>
                                <button
                                    onClick={toggleWatchLater}
                                    className={`border border-blue-500 text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded ${isAddedToWatchLater ? 'opacity-50' : ''}`}
                                >
                                    {isAddedToWatchLater ? 'Filme salvo' : 'Filme para ver depois'}
                                </button>
                                <button
                                    onClick={toggleWatched}
                                    className={`border border-blue-500 text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded ml-2 ${isAddedToWatched ? 'opacity-50' : ''}`}
                                >
                                    {isAddedToWatched ? 'Já assisti' : 'Filme já assistido'}
                                </button>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-center mt-5">Elenco</h2>
                                <ul className="flex flex-wrap gap-4 justify-center">
                                    {cast.length > 0 ? (
                                        cast.slice(0, 10).map(actor => (
                                            <li key={actor.cast_id} className="text-center">
                                                <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} className="rounded-full w-24 h-24 object-cover" />
                                                <p>{actor.name}</p>
                                                <p className="text-sm text-gray-400">{actor.character}</p>
                                            </li>
                                        ))
                                    ) : (
                                        <p>Elenco não disponível</p>
                                    )}
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-center mt-5">Avaliações</h2>
                                {reviews.length > 0 ? (
                                    <>
                                        <div className="flex flex-wrap gap-4 justify-center">
                                            {reviews.slice(0, 2).map(review => (
                                                <div key={review.id} className="bg-white text-black p-5 rounded shadow-md h-48 w-80 overflow-hidden">
                                                    <p className="font-semibold">{review.author}</p>
                                                    <p>{review.content.substring(0, 100)}...</p>
                                                    <button onClick={() => openModal(review)} className="text-blue-500">Ler mais</button>
                                                </div>
                                            ))}
                                        </div>
                                        {reviews.length > 2 && (
                                            <button onClick={openAllReviewsModal} className="text-blue-500 mt-4">Ver todas as avaliações</button>
                                        )}
                                    </>
                                ) : (
                                    <p className="text-center text-lg">Este filme ainda não possui avaliações.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Filme não encontrado</p>
            )}
            {/* //modal para ler a avaliaçao completa */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Review Modal"
                className="bg-white p-5 rounded shadow-md max-w-lg mx-auto my-20 relative"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                {selectedReview && (
                    <>
                        <button onClick={closeModal} className="absolute top-2 right-2 text-black text-2xl">&times;</button>
                        <h2 className="text-2xl font-bold mb-4 text-black">{selectedReview.author}</h2>
                        <div className="overflow-y-auto max-h-96 text-black">
                            <p>{selectedReview.content}</p>
                        </div>
                    </>
                )}
            </Modal>
            {/* //modal para ver todas as avaliaçoes */}
            <Modal
                isOpen={allReviewsModalIsOpen}
                onRequestClose={closeAllReviewsModal}
                contentLabel="All Reviews Modal"
                className="bg-white p-5 rounded shadow-md max-w-4xl mx-auto my-20 relative"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <button onClick={closeAllReviewsModal} className="absolute top-2 right-2 text-black text-2xl">&times;</button>
                <h2 className="text-2xl font-bold mb-4 text-black text-center">Todas as Avaliações</h2>
                <div className="overflow-y-auto max-h-96 text-black flex flex-wrap gap-4 justify-center">
                    {reviews.map(review => (
                        <div key={review.id} className="bg-white text-black p-5 rounded shadow-lg w-1/2">
                            <p className="font-semibold">{review.author}</p>
                            <p>{review.content}</p>
                        </div>
                    ))}
                </div>
            </Modal>
        </>
    );
}