import React from 'react';
import { useAtom } from 'jotai';
import { pvForecastAtom } from '../state/pvForecastAtom';
import { ComposedChart, Line, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import buildPvForecastChartArray from '../library/buildPvForecastChartArray';

export interface PvForecast {
      pv_estimate: number;       // Central PV estimate
      pv_estimate10: number;     // Lower bound (10th percentile) PV estimate
      pv_estimate90: number;     // Upper bound (90th percentile) PV estimate
      period_end: string;        // End of the forecast period, as a string
      period?: string;           // Optional field: start of the forecast period (not always used)
}

export interface PvForecastResponse {
      forecasts: PvForecast[];     // Array of forecast data entries
}

export interface LogEntry {
      date: string | undefined;  // The formatted date/time of the forecast
      pv10: number | undefined;  // Lower bound (10th percentile) PV estimate for the chart
      pv: number | undefined;    // Central PV estimate for the chart
      pv90: number | undefined;  // Upper bound (90th percentile) PV estimate for the chart
}

export default function PvForecast() {
      const [pvForecast] = useAtom(pvForecastAtom);
      let pvData: LogEntry[] | undefined = undefined;

      function isForecastResponse(data: any): data is PvForecastResponse {
            return (
                  data &&
                  Array.isArray(data.forecasts) &&
                  data.forecasts.every((forecast: any) => (
                        typeof forecast.pv_estimate === 'number' &&
                        typeof forecast.pv_estimate10 === 'number' &&
                        typeof forecast.pv_estimate90 === 'number' &&
                        typeof forecast.period_end === 'string'
                  ))
            );
      }

      if (isForecastResponse(pvForecast)) {
            pvData = buildPvForecastChartArray(pvForecast);
            //console.log("PV data", pvData);
      }

      return (
            <div style={{ width: '100%', height: '400px' }}>
                  <ResponsiveContainer>
                        <ComposedChart data={pvData}
                              margin={{ top: 20, right: 0, left: 0, bottom: 10 }}>
                              <XAxis
                                    dataKey="date"
                                    interval={47}
                                    stroke="#e0e0e0"
                                    scale="auto"
                                    label={({
                                          value: 'Date/time',
                                          position: 'insideBottomRight'
                                    })}
                                    padding={{ left: 40, right: 0 }}
                              />
                              <YAxis
                                    domain={[0, 4.40]}
                                    stroke="#e0e0e0"
                                    label={({
                                          value: 'kWh',
                                          angle: -90
                                    })}
                              />
                              <Tooltip contentStyle={{ background: '#141414' }} />
                              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />

                              <Area
                                    type="monotone"
                                    dataKey="pv90"
                                    stroke="#419be9"
                                    strokeWidth={0}
                                    fillOpacity={0.5}
                                    fill="#1e88e5"
                              />

                              <Line
                                    dataKey="pv"
                                    stroke="#1e88e5"
                                    dot={false}
                              />

                              <Area
                                    type="monotone"
                                    dataKey="pv10"
                                    stroke="#1569b3"
                                    strokeWidth={0}
                                    fillOpacity={1}
                                    fill="#141414"
                              />
                        </ComposedChart>
                  </ResponsiveContainer>
            </div>
      )
}