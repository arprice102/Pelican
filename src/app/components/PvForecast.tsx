import { ComposedChart, Line, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import React from 'react';
import { useAtom } from 'jotai';
import { pvForecastAtom } from '../state/pvForecastAtom.jsx';

export default function PvForecast() {
      const [pvForecast, setPvForecast] = useAtom(pvForecastAtom);

      const data = buildPvDataArray(pvForecast);
      //console.log("PV data", data);

      const tooltipstyle = {
            background: '#141414'
      }

      return (
            <div style={{ width: '100%', height: '400px' }}>
                  <ResponsiveContainer>
                        <ComposedChart data={data}
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
                              <Tooltip contentStyle={tooltipstyle} />
                              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />

                              <Area
                                    type="monotone"
                                    dataKey="pv90"
                                    stroke="#419be9"
                                    strokeWidth={0}
                                    fillOpacity={0.5}
                                    fill="#1e88e5"
                                    zIndex={1}
                              />

                              <Line
                                    dataKey="pv"
                                    stroke="#1e88e5"
                                    dot={false}
                                    zIndex={3}
                              />

                              <Area
                                    type="monotone"
                                    dataKey="pv10"
                                    stroke="#1569b3"
                                    strokeWidth={0}
                                    fillOpacity={1}
                                    fill="#141414"
                                    zIndex={2}
                              />
                        </ComposedChart>
                  </ResponsiveContainer>
            </div>
      )
}

function buildPvDataArray(json) {
      if(json.forecasts !== undefined) {
            //console.log("json", json);
            let pvArray = [];

            json.forecasts.forEach(forecastLog => {
                  let logEntry = {};
      
                  for (let key in forecastLog) {
                        if (key === "period_end") {
                              const niceDate = format(new Date(forecastLog[key]), 'HH:mm MMM d');
                              logEntry.date = niceDate;
                        }
                        if (key === "pv_estimate10") logEntry.pv10 = forecastLog[key];
                        if (key === "pv_estimate") logEntry.pv = forecastLog[key];
                        if (key === "pv_estimate90") logEntry.pv90 = forecastLog[key];
                  }
      
                  pvArray.push(logEntry);
            });
      
            return pvArray;
      }
}