export default function WeatherTile({weathersegment}) {
    const rawDate = weathersegment.dt;
    const rawTemp = weathersegment.main.temp;
    const icon = "/images/weathericons/" + weathersegment.weather[0].icon + ".png";

    const niceTime = getNiceTime(rawDate);
    const niceTemp = getNiceTemp(rawTemp);

    return (
        <div className="weathertile">
            <div className="weathertile__time">{niceTime}</div>
            <div className="weathertile__iconcontainer">
                <img className="weathertile__icon" src={icon} />
            </div>
            <div className="weathertile__temp">{niceTemp}</div>
        </div>
    )
}

function getNiceTime(rawDate) {
    const date = new Date(rawDate * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    const niceTime = hours + ":" + minutes;
    return niceTime; 
}

function getNiceTemp(rawTemp) {
    const roundedTemp = Math.round(rawTemp);
    const niceTemp = roundedTemp + '\u00B0C';
    return niceTemp;
}