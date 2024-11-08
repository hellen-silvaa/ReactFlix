import React, { createContext, useState, useEffect } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        // carrega profile do localStorage
        const storedProfile = JSON.parse(localStorage.getItem('profile')) || [];
        setProfile(storedProfile);
    }, []);

    //funçao que adiciona ou remove um filme do perfil
    const handleProfile = (movie) => {
        let updatedProfile = [...profile];
        const isProfile = updatedProfile.some(perfil => perfil.id === movie.id);

        if (isProfile) {
            updatedProfile = updatedProfile.filter(perfil => perfil.id !== movie.id);
        } else {
            updatedProfile.push(movie);
        }
        //atualiza o estado e o localStorage
        setProfile(updatedProfile);
        localStorage.setItem('profile', JSON.stringify(updatedProfile));
    };

    const isProfile = (movie) => {
        return profile.some(perfil => perfil.id === movie.id);
    };
    //retorna o provider com o profile e as funçoes
    return (
        <ProfileContext.Provider value={{ profile, handleProfile, isProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};