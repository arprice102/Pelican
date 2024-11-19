import { Place } from "./PelicanApp";

export interface PlacePreviewProps {
    place: Place | undefined,
    status: string
}

/*
** Provides a preview display of a place passed to it for confirming
** the correct selection has been made i.e. place search tool
**
** @place <Place> - a Place object
*/
export default function PlacePreview({place, status}:PlacePreviewProps) {
    return (
        <div className="placepreview">
            <h2>Preview</h2>
            {status}
            {place?.address.name}
        </div>
    )
}