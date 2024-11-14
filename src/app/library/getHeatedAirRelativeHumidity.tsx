/*
** Takes the temperature and relative humidity of air then calculates the
** new relative humidity when the air is heated to a target temp
**
** This model uses the Magnus formula to approximate the saturation vapor
** point of water but this is known to only be reasonably accurate for
** air temperatures ranging between -40C and 50C.
**
** There are other assumptions made by the model as well which are listed
** within the app on a model guidance page.
*/
export default function getHeatedAirRelativeHumidity(initTemp: number, initRelativeHumidity: number, targetTemp: number) {
    // Step 1 - Calculate Psat(initTemp)
    const pSatInitTemp = getSaturationVaporPressure(initTemp);

    // Step 2 - Find Pactual
    const pActual = getActualVaporPressure(initRelativeHumidity, pSatInitTemp);

    // Step 3 - Calculate Psat(targetTemp)
    const pSatTargetTemp = getSaturationVaporPressure(targetTemp);

    // Step 4 - Get new relative humidity
    const newRelativeHumidity = getNewRelativeHumidity(pActual, pSatTargetTemp);

    return newRelativeHumidity;
}

/*
** Uses the Magnus formula to approximate saturation vapor pressure of water
** Formula takes form:
**
** P(sat) = 6.1094 * exp((17.625 x temp) / (temp * 243.04))
**
*/
function getSaturationVaporPressure(temp: number) {
    const numerator = 17.625 * temp;
    const denominator = temp + 243.04;
    const exponent = numerator / denominator;
    const pSat = 6.1094 * Math.exp(exponent);
    return pSat;
}

/*
** Calculates the actual vapor pressure using initial relative humidity
** Formula takes form:
**
** Pactual = initRelativeHumidity x Psat / 100
*/
function getActualVaporPressure(initRelativeHumidity: number, pSatInitTemp: number) {
    const pActual = initRelativeHumidity * pSatInitTemp / 100;
    return pActual;
}

/*
** Returns relative humidity of target temperature using actual vapor pressure
** and the saturation temperature for the target temperature
** Formula takes form:
**
** RH(2) = Pactual/Psat(targetTemp) * 100
**
*/
function getNewRelativeHumidity(pActual: number, pSatTargetTemp: number) {
    let relativeHumidity = (pActual / pSatTargetTemp) * 100;
    return relativeHumidity;
}