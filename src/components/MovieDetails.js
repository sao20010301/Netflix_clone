import React,{ useState, useEffect } from "react"
import { BsHeartFill,BsHeart } from "react-icons/bs"
import { UserAuth } from "../context/AuthContext"
import notFoundImg from "../ext.jpeg"

function notFound(event) {
    event.target.src = notFoundImg
}

export default function MovieDetails({clickMovie, showDetails}) {
    const { watchLater, addWatchLater, delWatchLater, changeWatchLater } = UserAuth()
    const thisMovie = watchLater && watchLater.find(e => e.id === clickMovie.id)
    const [isInList, setIsInList] = useState(watchLater && watchLater.some(e => e.id === clickMovie.id))
    const [isWatched, setIsWatched] = useState(thisMovie?.watched)
    const [movieInfo, setMovieInfo] = useState(clickMovie)
    
    useEffect(() => {
        if(!clickMovie?.overview) {
            const fetchData = async () => {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${clickMovie.id}?api_key=d0dda9d58185584c8124a1e6954ab31b`)
                try {
                    if(!res.ok) {
                        throw new Error("Error", {
                            cause: {
                                res,
                            }
                        })
                    }
                    const res_json = await res.json()
                    setMovieInfo(res_json)
                } catch(err) {
                    console.log("error", err)
                    throw err
                }
            }
            fetchData()
        }
    }, [])

    function handleClick(event) {
        if(isInList) {
            delWatchLater(event, clickMovie)
            setIsInList(false)
        } else {
            addWatchLater(event, clickMovie)
            setIsInList(true)
        }
    }

    function handleChange(event) {
        changeWatchLater(event, clickMovie)
        setIsWatched(!isWatched)
    }

    return (
        <div id="overlayBg" onClick={(event) => showDetails(event, clickMovie)} className="fixed top-0 left-0 z-20 w-full h-screen flex justify-center bg-black/40 overflow-y-scroll">
            <div className="w-[850px] max-md:w-[95%] min-h-full h-fit max-md:min-h-[80%] mt-[4vh] max-md:mt-[10vh] text-white bg-neutral-900 rounded-[6px]">
                <div className="h-[60%] relative">
                    <img 
                    className="h-full w-full rounded-[6px]"
                    src={`https://image.tmdb.org/t/p/original${clickMovie?.backdrop_path}`}
                    alt={clickMovie?.title}
                    onError={notFound}
                    />
                    <div className="absolute left-[50px] bottom-[25%] w-[35%]">
                        <h1 className="text-xl max-md:text-sm mb-2">{clickMovie.title}</h1>
                        <div className="flex justify-start items-center">
                            <button className="w-[50%] h-[30%] bg-white/80 text-black hover:bg-white/70">Play</button>
                            <div onClick={(event) => handleClick(event)} className="text-white text-xl cursor-pointer transition mx-2">
                                { isInList ? <BsHeartFill></BsHeartFill> : <BsHeart></BsHeart>}
                            </div>
                            { isInList 
                                ? <div> 
                                    { thisMovie?.watched 
                                    ? <button className="bg-black/90 hover:bg-black/60 p-1 text-lg" onClick={(event) => handleChange(event)}>Watched</button> 
                                    : <button className="bg-black/90 hover:bg-black/60 p-1 text-sm" onClick={(event) => handleChange(event)}>Not Watched</button>
                                    } 
                                    </div>
                                : null}
                        </div>
                    </div>
                </div>
                <div className="px-[50px] py-[30px] flex max-md:flex-col justify-evenly max-md:items-start">
                    <div className="w-[50%] max-md:w-full text-left">
                        <p>{movieInfo?.overview}</p>
                    </div>
                    <div className="w-[50%] max-md:w-full text-right max-md:text-left">
                        <p>Vote Average : {movieInfo?.vote_average}</p>
                        <p>Vote Count : {movieInfo?.vote_count}</p>
                        <p>Status : {movieInfo?.status}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}