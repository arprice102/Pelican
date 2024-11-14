import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';

interface PageNavButtonsProps {
    isFirstPage: boolean;
    isLastPage: boolean;
    goToPrevPage: () => void;
    goToNextPage: () => void;
}

export default function PageNavButtons({
    isFirstPage,
    isLastPage,
    goToPrevPage,
    goToNextPage
}: PageNavButtonsProps) {
    return (
        <div className="pagenavbuttons">
            <Button variant="contained" disabled={isFirstPage} onClick={goToPrevPage}>Previous</Button>
            <Button variant="contained" disabled={isLastPage} onClick={goToNextPage}>Next</Button>
        </div>
    )
}