import { v4 as uuidv4 } from 'uuid';
import styles from '../css/placesummary.scss';
import WeatherTile from "./WeatherTile.jsx";

export default function PlaceSummary({onClick, place, forecast}) {
    console.log("rerender placesummary");
    console.log("place received", place);

    const rawPlaceName = place.address.name;
    const rawCounty = place.address.county;
    const rawState = place.address.state;
    const nicePlace = getNicePlace(rawPlaceName, rawCounty, rawState);

    let tiles = <></>;

    if(forecast) {
      const fl = forecast.list;

      tiles = [];

      fl.forEach(segment => {
        tiles.push(<WeatherTile key={uuidv4()} weathersegment={segment} />)
      });
    }
    
    return (
        <div className="placesummary">
            <div className="placesummary__place">{nicePlace}</div>
            <div className="placesummary__tiles">
                {tiles}
            </div>
            <button onClick={onClick}>Remove place</button>
        </div>
    )
}

function getNicePlace(rawPlaceName, rawCounty, rawState) {
    let placename = rawPlaceName;

    if(rawCounty) {
        placename += ', ' + rawCounty;
    }

    if(rawState) {
        placename += ', ' + rawState
    }

    return placename;
}