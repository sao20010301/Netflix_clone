import React, { useState, useEffect } from "react"
import requestsUrl from "../RequestsUrl"

function MovieCarousel({showDetails}) {
    console.log("Carousel re render")
    const [movies, setMovies] = useState([])
    const randomMovie = movies[Math.floor(Math.random() * movies.length)]
    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetch again")
            const res = await fetch(requestsUrl.requestsPopular)
            try {
                if(!res.ok) {
                    throw new Error("Error", {
                        cause: {
                            res,
                        }
                    })
                }
                const res_json = await res.json()
                console.log(res_json)
                setMovies(res_json.results)
            } catch(err) {
                console.log("error", err)
                throw err
            }
        }
        fetchData()
    }
    ,[])
    function truncateStr(str) {
        return str?.length > 100 ? str.substr(0, 80) + "..." : str 
    }

    return (
        <div>
            <div className="w-full h-full relative">
                <img 
                 className="w-full h-full object-cover"
                 src={`https://image.tmdb.org/t/p/original/${randomMovie?.backdrop_path}`} 
                 alt={randomMovie?.title} 
                />
                <div className="absolute top-[40%] max-md:top-[50%] left-[5%] w-[50%] h-[40%]}">
                    <h1 className="w-1/2 text-white text-2xl max-md:text-md max-md:hidden">{randomMovie?.title}</h1>
                    <p className="w-[50%] text-white mb-2 text-lg max-md:hidden">{truncateStr(randomMovie?.overview)}</p>
                    <button className="bg-white hover:bg-white/50 mr-2 px-4 py-2 rounded max-md:px-2 max-md:py-1">播放</button>
                    <button onClick={(event) => showDetails(event, randomMovie)} className="bg-zinc-500/70 hover:bg-white/50 text-white px-4 py-2 max-md:px-2 max-md:py-1 rounded">更多資訊</button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(MovieCarousel)