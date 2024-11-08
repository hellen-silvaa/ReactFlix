import { Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline"; //usei icones do heroicons para criar as setas 

export function CircularPagination({ totalPages, currentPage, onPageChange }) {
  //função para ir para a próxima página
  const next = () => {
    if (currentPage === totalPages) return;
    onPageChange(currentPage + 1);
  };
  //função para ir para a página anterior
  const prev = () => {
    if (currentPage === 1) return;
    onPageChange(currentPage - 1);
  };

  //aqui é a função que renderiza os números das páginas 
  const renderPageNumbers = () => {
    const pages = [];
    //loop para criar os números das páginas onde o i é o número da página
    for (let i = -2; i <= 2; i++) {
      const page = currentPage + i;
      if (page > 0 && page <= totalPages) {
        pages.push(
          //renderiza o numero da pagina e se for a pagina atual ele fica em destaque 
          <span
            key={page}
            className={`px-2 ${i === 0 ? 'font-bold bg-white text-black rounded-full p-2' : 'opacity-' + (100 - Math.abs(i) * 20)}`}
          >
            {page}
          </span>
        );
      }
    }
    return pages;
  };

  // retorna o componente de paginação 
  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full text-white"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    {/* //renderiza os números das páginas que foram criados na função renderPageNumbers */}
      <div className="flex items-center gap-2">
        {renderPageNumbers()}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full text-white"
        onClick={next}
        disabled={currentPage === totalPages}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}