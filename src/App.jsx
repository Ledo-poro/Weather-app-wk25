import { useState } from 'react'
import './App.css'
import LoadingSkeleton from './Components/LoadingSkeleton' 

function App() {

  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
  
  const fetchWeather = async () => {
    if (!city) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const Response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3`)
      if (!Response.ok) {
        setError("City not found or API error")
        setLoading(false)
        return
      }
      const data = await Response.json()
      console.log(data)
      setWeather(data)
      setLoading(false)
    } catch (error) {
      setWeather(null)
      setError(error.message)
      setLoading(false)
    }

  }


  const getCurrentLocation = async () => {

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
    }

    setLoading(true)
    setError(null)
    setWeather(null)

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      console.log(position);

      try {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=3`;
        const Response = await fetch(url);

        if (!Response.ok) {
          setError("Unable to get weather for your location");
          setLoading(false);
          return;
        }

        const data = await Response.json();
        setWeather(data);
        setLoading(false);

      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    });

  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-900 px-4 font-sans'>
      <main className='max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg text-gray-100'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Weather App</h1>

        <div className='flex mb-4'>
          {/* تصحيح الخطأ الإملائي bg-gary-700 -> bg-gray-700 */}
          <input type='text' placeholder='Enter city name' className='flex-grow p-2 rounded-l-md border border-gray-700 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500' onChange={(e) => setCity(e.target.value)} />
          <button className='px-4 bg-blue-600 rounded-r-md border-r-md hover:bg-blue-700 disabled:opacity-50 text-white cursor-pointer ' onClick={fetchWeather}> {loading ? "loading" : "Get Weather"} </button>
        </div>

        <button className='w-full py-2 mb-6 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg cursor-pointer' disabled={loading} onClick={getCurrentLocation}> {loading ? "loading" : "Get Weather"} by location </button>

        {error && <p className='errorMessage'>{error}</p>}

        {/* تصحيح استدعاء الكومبوننت ليكون بحرف كابيتال LoadingSkeleton */}
        {loading ? (<LoadingSkeleton/>) :  ( weather && !error && (
          <div>
            <div className='text-center mb-4'>
              <h2 className='text-2xl font-semibold mb-2'>{weather.location.name} , {weather.location.country}</h2>
              {/* تصحيح: إضافة https: لكي تظهر الصورة الحالية */}
              <p className='mb-2'><img className='inline-block' src={`https:${weather.current.condition.icon}`} alt={weather.current.condition.text} /> {weather.current.condition.text} </p>
              <p>Temp: <span className='font-medium mr-2'>{weather.current.temp_c}</span >C  / <span className='font-medium mr-2'>{weather.current.temp_f}</span>F </p>
              <p>Humidity: <span className='font-medium mr-2'>{weather.current.humidity}%</span> </p>
              <p>Wind: <span className='font-medium mr-2'>{weather.current.wind_kph} kph</span> </p>
            </div>

            {/* Forecast */}
            <div>
              <h3 className='text-xl font-semibold mb-4 text-center'> 3-days Forecast </h3>
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>

                {weather?.forecast?.forecastday?.map((day) => (
                  <div key={day.date} className='bg-gray-700 rounded-lg p-4 text-center'>
                    <p className='font-semibold mb-2'>{day.date}</p>
                    <img src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} className="mx-auto w-16 h-16" />
                    <p>{day.day.condition.text}</p>
                    <p>High: {''} <span className='font-medium'>{day.day.maxtemp_c}C</span> </p>
                    <p>Low: {''} <span className='font-medium'>{day.day.mintemp_c}C</span> </p>
                    <p>Humidity: {day.day.avghumidity}%</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) 
        )}

      </main>
    </div>
  )
}

export default App
