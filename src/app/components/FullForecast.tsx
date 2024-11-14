import { v4 as uuidv4 } from 'uuid';
import styles from '../css/placesummary.scss';
import { atom, useAtom, useAtomValue } from 'jotai';
import { fullForecastViewAtom } from '../state/fullForecastViewAtom.tsx';
import { fullForecastPlaceAtom } from '../state/fullForecastPlaceAtom.tsx';
import WeatherTile from "./WeatherTile.tsx";

export default function FullForecast() {
    const [fullForecastView, setFullForecastView] = useAtom(fullForecastViewAtom);
    const place = useAtomValue(fullForecastPlaceAtom);

    let summary = "No place has been defined";

    console.log("rerender fullforecast");
    console.log("place in fullforecast", place);

    if(place !== undefined) {
        summary = <div className="fullForecast__title">{place.address.name}</div>
    }

    return (
        <div className="fullForecast">
          {summary}
        </div>
    )
}