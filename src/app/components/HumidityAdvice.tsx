import { useAtomValue } from 'jotai';
import { placesAtom } from "../state/placesAtom";
import getHeatedAirRelativeHumidity from "../library/getHeatedAirRelativeHumidity";

export default function HumidityAdvice() {
    const places = useAtomValue(placesAtom);

    const heatedAirRelativeHumidity = getHeatedAirRelativeHumidity(15, 60, 20);

    return (
        <div>
            <h2>Humidity advice</h2>

            <p>Heated air relative humidty equals {heatedAirRelativeHumidity}</p>
        </div>
    );
}