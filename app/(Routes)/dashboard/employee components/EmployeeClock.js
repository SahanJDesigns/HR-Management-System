import React, { useState, useEffect } from 'react';

const EmployeeClock = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [weather, setWeather] = useState({ description: 'Loading...', icon: '' });
    const [location, setLocation] = useState({ lat: null, lon: null });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
            },
            (error) => {
                console.error("Geolocation error: ", error);
                // Optionally set a default location or show an error message
            }
        );
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(timer); // Clean up on unmount
    }, []);

    useEffect(() => {
        const fetchWeather = async () => {
            if (location.lat && location.lon) {
                const apiKey = '11289ea409c1321f37191f21d7dc187e'; // Replace with your OpenWeatherMap API key
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=metric`);
                console.log(response)
                // Log the response data to check if it's working
                console.log("Weather API response:", response);

                if (!response.ok) {
                    console.error("Failed to fetch weather data:", response.statusText);
                    return;
                }

                const data = await response.json();
                console.log("Weather data:", data); // Log the actual weather data
                
                if (data.weather && data.weather.length > 0) {
                    setWeather({
                        description: data.weather[0].description,
                        icon: data.weather[0].icon,
                    });
                } else {
                    console.warn("No weather information available.");
                }
            }
        };

        fetchWeather();
    }, [location]);

    const formattedDate = currentDateTime.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    return ( 
        <div className="bg-gradient-to-r from-yellow-600 to-red-600 flex flex-row h-24 rounded-lg m-1 p-4">
            <div className="flex flex-col w-1/6 justify-center items-center m-2">
                <div className="text-xs text-gray-700 pt-2">{weather.description}</div>
                {weather.icon && (
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
                        alt={weather.description}
                        className="w-10 h-10"
                    />
                )}
            </div>
            <div className="border-solid border-r-2 border-neutral-900"></div>
            <div className="w-1/3 flex flex-col m-2 ml-4 justify-center">
                <div className="text-sm text-gray-900">{formattedDate}</div>
                <div className="text-2xl font-bold">{formattedTime}</div>
            </div>
            <div className="w-1/4 max-w-44">
                <img src="present-on-time.png" className="-mt-10 ml-5 -mb-2 w-24 h-24" alt="Present on time" />
                <div className="bg-green-700 p-1 rounded-xl text-sm text-center">Present on time</div>
            </div>
            <div className="w-1/4 flex flex-col m-2 ml-4 justify-center">
                <div className="text-sm text-gray-300">Entry time</div>
                <div className="text-xl font-bold text-gray-300">09:30 AM</div>
            </div>
        </div>
    );
}

export default EmployeeClock;
