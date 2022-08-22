import { useState, useEffect } from 'react'
import { ComposedChart, Bar, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type GraphData = {
  name: string,
  Max: number,
  Min: number,
  Avg: number
}

function PollutantGraph({pollutant, name, station}: any) {

  const [graphData, setGraphData] = useState<GraphData[]>([])
  
  useEffect(() => {
    const data = pollutant.map((entry: {day: string, max: number, min: number, avg: number}) => {
      return {name: entry.day.slice(5), Max: entry.max, Min: entry.min, Avg: entry.avg};
    });

    setGraphData(data);

  }, [station])
  
  return (
    <ResponsiveContainer width='100%' height={200}>
      <ComposedChart data={graphData} margin={{ left: 5 }}>
        <CartesianGrid strokeDasharray="6 6" />
        <XAxis dataKey="name" />
        <YAxis label={{value: 'µg/m3', angle: -90, position: 'insideLeft'}}/>
        <Tooltip formatter={(value: string) => value + ' µg/m3'}/>
        <Legend />
        <Bar dataKey="Max" fill="#8884d8"/>
        <Bar dataKey="Min" fill="#82ca9d"/>
        <Line dataKey='Avg' dot/>
      </ComposedChart>
    </ResponsiveContainer>
  )
}

PollutantGraph.defaultProps = {
  pollutant: null,
  name: ''
}

export default PollutantGraph