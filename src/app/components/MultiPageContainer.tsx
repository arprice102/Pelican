import { atom, useAtom } from 'jotai';
import { ReactNode } from 'react';
import PushButton from './PushButton';

// Define props type for MultiPageComponent
interface MultiPageContainerProps {
    pages: ReactNode[]; // Type the pages prop as an array of ReactNode elements
}

// Atom scoped locally to component
const countAtom = atom(0);

export default function MultiPageContainer({ pages }: MultiPageContainerProps) {
    const [currentPage, setCurrentPage] = useAtom(countAtom);

    console.log("pages", pages);

    function goToNextPage() {
        if (!isLastPage) {
            setCurrentPage(currentPage + 1);
        }
    }

    function goToPrevPage() {
        if (!isFirstPage) {
            setCurrentPage(currentPage - 1);
        }
    }

    // Determine if buttons should be disabled based on the current page
    const isFirstPage = currentPage === 0;
    const isLastPage = currentPage === pages.length - 1;

    return (
        <div className="multipage-container">
            {pages[currentPage]}

            <PushButton text="Prev" onClick={goToPrevPage} disabled={isFirstPage} />
            <PushButton text="Next" onClick={goToNextPage} disabled={isLastPage} />
        </div>
    );
}