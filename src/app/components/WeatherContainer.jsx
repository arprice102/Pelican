import DaySummaryCard from "./DaySummaryCard.jsx";

export default function WeatherContainer() {
    return (
        <div className="weathercontainer">
            <h2>Weekly weather</h2>
            <DaySummaryCard day={'Monday'} />
            <DaySummaryCard day={'Tuesday'} />
            <DaySummaryCard day={'Wednesday'} />
            <DaySummaryCard day={'Thursday'} />
            <DaySummaryCard day={'Friday'} />
            <DaySummaryCard day={'Saturday'} />
            <DaySummaryCard day={'Sunday'} />
        </div>
    )
}