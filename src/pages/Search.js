import React,{ useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import requestsUrl from "../RequestsUrl"
import Movie from "../components/Movie"
import MovieDetails from "../components/MovieDetails"

export default function Search() {
    const [movies, setMovies] = useState([])
    const [searchParams] = useSearchParams()
    const [isShow, setIsShow] = useState(false)
    const [clickMovie, setClickMovie] = useState("")
    const q = searchParams.get("q")

    const showDetails = React.useCallback((event, item) => {
        if(event.target.id === "overlayBg") {
            setIsShow(false)
        } else {
            setClickMovie(item)
            setIsShow(true)
        }
    }, [])
    
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(requestsUrl.requestsSearch+q)
            try {
                if(!res.ok) {
                    throw new Error("Error", {
                        cause: {
                            res,
                        }
                    })
                }
                const res_json = await res.json()
                setMovies(res_json.results)
            } catch(err) {
                console.log("error", err)
                throw err
            }
        }
        fetchData()
    }
    ,[q])
    return (
        <div className="relative">
            <section className="min-w-0 py-[8%] max-md:py-[20%] px-[1%] grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 place-items-center">
                {movies.map((item, index) => 
                    <Movie key={index} item={item} showDetails={showDetails}/>
                )}
            </section>
            {isShow && <MovieDetails clickMovie={clickMovie} showDetails={showDetails}/>}
        </div>
    )
}