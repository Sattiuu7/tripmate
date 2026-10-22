import axios from 'axios';

// Weather code mapping from WMO codes to human readable conditions
const WMO_CODE_MAP = {
  0: { label: 'Clear Sky', icon: 'Sun', tempOffset: 0 },
  1: { label: 'Mainly Clear', icon: 'Sun', tempOffset: 0 },
  2: { label: 'Partly Cloudy', icon: 'CloudSun', tempOffset: -1 },
  3: { label: 'Overcast', icon: 'Cloud', tempOffset: -2 },
  45: { label: 'Foggy / Misty', icon: 'CloudFog', tempOffset: -3 },
  48: { label: 'Depositing Rime Fog', icon: 'CloudFog', tempOffset: -3 },
  51: { label: 'Light Drizzle', icon: 'CloudDrizzle', tempOffset: -2 },
  53: { label: 'Moderate Drizzle', icon: 'CloudDrizzle', tempOffset: -2 },
  61: { label: 'Slight Rain', icon: 'CloudRain', tempOffset: -2 },
  63: { label: 'Moderate Rain', icon: 'CloudRain', tempOffset: -3 },
  65: { label: 'Heavy Rain', icon: 'CloudRain', tempOffset: -4 },
  71: { label: 'Slight Snow Fall', icon: 'Snowflake', tempOffset: -5 },
  73: { label: 'Moderate Snow Fall', icon: 'Snowflake', tempOffset: -7 },
  80: { label: 'Rain Showers', icon: 'CloudRain', tempOffset: -2 },
  95: { label: 'Thunderstorm', icon: 'CloudLightning', tempOffset: -3 }
};

/**
 * Fetches real-time weather from Open-Meteo free API
 */
export async function getLiveWeather(lat, lng) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    const response = await axios.get(url, { timeout: 4000 });

    if (response.data && response.data.current) {
      const current = response.data.current;
      const code = current.weather_code || 0;
      const info = WMO_CODE_MAP[code] || { label: 'Pleasant Weather', icon: 'Sun' };

      return {
        isLive: true,
        temperature: Math.round(current.temperature_2m),
        condition: info.label,
        icon: info.icon,
        humidity: current.relative_humidity_2m,
        windSpeed: current.wind_speed_10m,
        dailyForecast: response.data.daily ? {
          maxTemp: Math.round(response.data.daily.temperature_2m_max[0]),
          minTemp: Math.round(response.data.daily.temperature_2m_min[0])
        } : null
      };
    }
  } catch (error) {
    // Graceful fallback if network is offline or service unavailable
    console.log('Live weather fallback used:', error.message);
  }

  // Realistic fallback based on standard temperate weather
  return {
    isLive: false,
    temperature: 24,
    condition: 'Pleasant & Clear',
    icon: 'Sun',
    humidity: 55,
    windSpeed: 10,
    dailyForecast: { maxTemp: 28, minTemp: 19 }
  };
}
