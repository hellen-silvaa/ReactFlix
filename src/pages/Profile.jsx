import React, { useState, useEffect, useContext } from 'react';
import MovieCard from "../components/MovieCard";
import Slider from "react-slick";
import { ProfileContext } from "../context/ProfileContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Profile() {
    const { profile, handleProfile, isProfile } = useContext(ProfileContext);
    const [watchLater, setWatchLater] = useState([]);
    const [watched, setWatched] = useState([]);

    useEffect(() => {
        const storedWatchLater = JSON.parse(localStorage.getItem("toWatchMovies")) || [];
        const storedWatched = JSON.parse(localStorage.getItem("watchedMovies")) || [];
        setWatchLater(storedWatchLater);
        setWatched(storedWatched);
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div className="p-4">
            <div className="mb-12">
                <h2 className='text-2xl font-bold text-center mb-5 mt-8 relative group'>
                    <span className='relative inline-block'>
                        ASSISTIR MAIS TARDE
                        <span className='absolute left-0 bottom-0 w-full h-1 bg-blue-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
                    </span>
                </h2>
                {/* //mapeia os filmes que estão na lista de assistir mais tarde */}
                {watchLater.length > 0 ? (
                    <Slider {...settings} className="mx-4">
                        {watchLater.map(movie => (
                            <MovieCard
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                poster_path={movie.poster_path}
                                handleProfile={handleProfile}
                                isProfile={isProfile(movie)}
                            />
                        ))}
                    </Slider>
                ) :
                    // se não tiver nenhum filme na lista de assistir mais tarde, exibe a mensagem abaixo
                    (
                        <h2 className='text-2xl font-bold text-center mb-5 mt-8 relative group'>
                            <span className='relative inline-block'>
                                Nenhum filme na lista de "Assistir mais tarde"
                                <span className='absolute left-0 bottom-0 w-full h-1 bg-blue-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
                            </span>
                        </h2>
                    )}
            </div>
            <div>
                <h2 className='text-2xl font-bold text-center mb-5 mt-8 relative group'>
                    <span className='relative inline-block'>
                        FILMES ASSISTIDOS
                        <span className='absolute left-0 bottom-0 w-full h-1 bg-blue-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
                    </span>
                </h2>
                {/* //mapeia os filmes que estão na lista de filmes assistidos */}
                {watched.length > 0 ? (
                    <Slider {...settings} className="mx-4">
                        {watched.map(movie => (
                            <MovieCard
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                poster_path={movie.poster_path}
                                handleProfile={handleProfile}
                                isProfile={isProfile(movie)}
                            />
                        ))}
                    </Slider>
                ) : (
                    <h2 className='text-2xl font-bold text-center mb-5 mt-8 relative group'>
                        <span className='relative inline-block'>
                            Nenhum filme na lista de "Filmes Assistidos".
                            <span className='absolute left-0 bottom-0 w-full h-1 bg-blue-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
                        </span>
                    </h2>
                )}
            </div>
        </div>
    );
}

function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
        <div
            className={`${className} bg-white rounded-full p-2 shadow-lg right-2`}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
        <div
            className={`${className} bg-white rounded-full p-2 shadow-lg left-2 z-10`}
            onClick={onClick}
        />
    );
}

export default Profile;