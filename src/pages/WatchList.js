import React,{ useState, useEffect } from "react"
import Movie from "../components/Movie"
import MovieDetails from "../components/MovieDetails"
import { UserAuth } from "../context/AuthContext" 

export default function WatchList() {
    const { watchLater } = UserAuth()
    const [watchState, setWatchState] = useState("All")
    const [filtered, setFiltered] = useState(watchLater)
    const [isShow, setIsShow] = useState(false)
    const [clickMovie, setClickMovie] = useState("")
    
    useEffect(() => {
        if(watchState === "Watched") {
            const result  = watchLater.filter((movie) => movie.watched === true)
            setFiltered(result)
        } else if (watchState === "Not Watched") {
            const result = watchLater.filter((movie) => movie.watched === false)
            setFiltered(result)
        } else {
            setFiltered(watchLater)
        }
    }, [...Object.values(watchLater)])

    function handleSelect(event) {
        setWatchState(event.target.value)
        if(event.target.value === "Watched") {
            const result  = watchLater.filter((movie) => movie.watched === true)
            setFiltered(result)
        } else if (event.target.value === "Not Watched") {
            const result = watchLater.filter((movie) => movie.watched === false)
            setFiltered(result)
        } else {
            setFiltered(watchLater)
        }
    }
    const showDetails = React.useCallback((event, item) => {
        console.log(event.target.id, event.currentTarget.id)
        if(event.target.id === "overlayBg") {
            setIsShow(false)
            console.log(isShow, event.target.id)
        } else {
            setClickMovie(item)
            setIsShow(true)
        }
    }, [])
    return (
    <div className="h-screen relative">
        <select className="w-[10%] max-md:w-[20%] mt-[8%] max-md:mt-[20%] mx-[4%]" value={watchState} onChange={handleSelect}>
                <option value="All">All</option>
                <option value="Watched">Watched</option>
                <option value="Not Watched">Not Watched</option>
        </select>
        <section className="min-w-0 py-[4%] px-[1%] grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 place-items-center">
            {filtered.map((item, index) => 
                <Movie key={index} item={item} showDetails={showDetails} />
            )}
        </section>
        {isShow && <MovieDetails clickMovie={clickMovie} showDetails={showDetails}/>}
    </div>
    )
}