import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoLindoDoMeuSite from '../assets/logoLindoDoMeuSite.png';

export default function PageNotFound() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        //  contagem regressiva em segundos para voltar para a página inicial
        const interval = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);

        // redireciona para a página inicial quando a contagem regressiva chega a 0
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl text-center mb-4">
                Página não encontrada, você será redirecionado para o Home em {countdown} segundos
            </h1>
            {/* //  imagem do logo girando muito fofo */}
            <img src={logoLindoDoMeuSite} alt="Logo" className="w-32 h-32 animate-spin" />
        </div>
    );
}