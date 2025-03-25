import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Content({ para }) {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${para}/`)
            .then(response => response.json())
            .then(info => setInfo(info))
            .catch(error => {
                console.log('error ===>>> ', error);
                toast.warn('Oops! Pokémon not found. Showing Ditto instead!', {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
                fetch(`https://pokeapi.co/api/v2/pokemon/ditto/`)
                    .then(response => response.json())
                    .then(info => setInfo(info))
                    .catch(error => console.log('error ===>>> ', error));
            });
    }, [para]);

    const chartData = {
        labels: info && info.stats ? info.stats.map(stat => stat.stat.name) : [],
        datasets: [
            {
                label: 'Stats',
                data: info && info.stats ? info.stats.map(stat => stat.base_stat) : [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Pokémon Stats',
            },
        },
    };

    const imgsrc = info && info.sprites ? info.sprites.other['dream_world']['front_default'] : '';

    return (
        <>
            {info ? (
                <div className='flex flex-wrap flex-grow items-center w-11/12 mx-auto mt-2'>
                    <div className='md:w-2/5 h-full w-full'>
                        <div className='text-black text-center text-4xl font-semibold mb-7'>
                            {info.name.toUpperCase()}
                        </div>
                        <figure className='flex w-full align-middle justify-center'>
                            {imgsrc ? (
                                <img className='w-10/12 h-10/12' src={imgsrc} alt="pokemon" />
                            ) : (
                                <p>Image not available</p>
                            )}
                        </figure>
                    </div>

                    <div className="w-full md:w-1/2 lg:w-3/5 px-2 h-full">
                        <div className="bg-blue-900 p-4 md:p-7 rounded-lg">
                            <div className="flex justify-between items-center mb-4 md:mb-8">
                                <p className="text-xl">Height: {info.height / 10}m</p>
                                <p className="text-xl">Weight: {info.weight / 10}kg</p>
                            </div>
                            <Bar data={chartData} options={chartOptions} />
                            <div className="mt-4">
                                <p className="text-xl">Type :-</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {info.types.map((type, index) => (
                                        <p key={index} className="rounded bg-gray-700 px-2 py-1 text-white">
                                            {type.type.name}
                                        </p>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-xl">Abilities :-</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {info.abilities.map((ability, index) => (
                                        <p key={index} className="rounded bg-gray-700 px-2 py-1 text-white">
                                            {ability.ability.name}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='text-2xl flex h-lvh justify-center text-red-800 items-center'>
                    LOADING...
                </div>
            )}
            <ToastContainer />
        </>
    );
}

export default Content;
