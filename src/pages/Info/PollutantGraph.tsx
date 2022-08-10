
function PollutantGraph({pollutant, name}: any) {
  
  return (
    <div>
      <h1>{name}</h1>
      {pollutant.map((item: any, index: number) => (
        <p>avg {index + 1}: {item.avg}</p>
      ))}
    </div>
  )
}

export default PollutantGraph