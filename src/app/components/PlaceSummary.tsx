import { v4 as uuidv4 } from 'uuid';
import getNicePlaceName from '../library/getNicePlaceName';
import WeatherTile from "./WeatherTile";
import Place from '../page';
import '../css/placesummary.scss';

export default function PlaceSummary({ 
    onRemovePlace, 
    onViewForecast, 
    place 
} : { 
    onRemovePlace : () => void, onViewForecast: any, place: Place 
}) {
    const forecast = place.forecast;
    const city = place.address.name;
    const county = place.address.county;
    const country = place.address.state;
    const nicePlace = getNicePlaceName(city, county, country);

    let tiles: any = <></>;

    if (forecast) {
        const fl = forecast.list;
        console.log("forecast list", forecast.list);

        tiles = [];

        fl.forEach(segment => {
            tiles.push(<WeatherTile key={uuidv4()} weathersegment={segment} />)
        });
    } else {
        tiles = <>No forecast available to display!</>
    }

    return (
        <div className="placesummary">
            <div className="placesummary__place">{nicePlace}</div>
            <div className="placesummary__tiles">
                {tiles}
            </div>
            <button onClick={onViewForecast}>View full forecast</button>
            <button onClick={onRemovePlace}>Remove place</button>
        </div>
    )
}