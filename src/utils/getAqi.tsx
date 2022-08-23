
export function getAqiColor(aqi: string): string {
  let color: string = '';
  isNaN(parseInt(aqi)) ? color = 'white' :
  parseInt(aqi) <= 50 ? color = 'green' : 
  parseInt(aqi) <= 100 ? color = 'yellow' :
  parseInt(aqi) <= 150 ? color = 'orange' : 
  parseInt(aqi) <= 200 ? color = '#c40d43' : 
  parseInt(aqi) <= 300 ? color = 'purple' :
  color = '#580f0f';

  return color;
}

export function getAqiName(aqi: string): string {
  let name: string = '';
  isNaN(parseInt(aqi)) ? name = 'Unknown' :
  parseInt(aqi) <= 50 ? name = 'Good' : 
  parseInt(aqi) <= 100 ? name = 'Moderate' :
  parseInt(aqi) <= 150 ? name = 'Unhealthy for Sensitive Groups' : 
  parseInt(aqi) <= 200 ? name = 'Unhealthy' : 
  parseInt(aqi) <= 300 ? name = 'Very Unhealthy' :
  name = 'Hazardous';

  return name;
}