import { useRef, useEffect } from "react";

export default function ContainerMovies({ titulo, children }) {
  //usei o useRef  para criar uma referência ao elemento do carrossel
  const carouselRef = useRef(null);
  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };
  //usei o useEffect para criar um intervalo de 3 segundos para o carrossel
  useEffect(() => {
    const interval = setInterval(scrollRight, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-10 relative w-full">
      <h2 className="text-3xl font-bold mb-5">{titulo}</h2>
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 text-2xl transform -translate-y-1/2 bg-white p-3 rounded-full z-10 text-black"
      >
        &#8249;
      </button>
      <div
        ref={carouselRef}
        className="flex overflow-hidden scroll-smooth w-full space-x-4"
      >
        {children}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 text-2xl transform -translate-y-1/2 bg-white p-3 rounded-full z-10 text-black"
      >
        &#8250;
      </button>
    </div>
  );
}