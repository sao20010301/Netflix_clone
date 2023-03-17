import React, { useState, useEffect, useRef } from "react"
import Movie from "./Movie"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"

function Row({title, fetchUrl, showDetails}) {
    const [movies, setMovies] = useState([])
    const slider = useRef()
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(fetchUrl)
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
    }, []);

    function slideLeft(event) {
        slider.current.scrollLeft = slider.current.scrollLeft - 500
    }

    function slideRight(event) {
        slider.current.scrollLeft = slider.current.scrollLeft + 500
    }

    return (
        <>
            <h2 className="text-white font-bold md-text-xl p-4">{title}</h2>
            <div className="relative flex item-center group">
                <MdChevronLeft onClick={(event) => slideLeft(event)} className="absolute z-10 bg-black text-white left-0 opacity-0 group-hover:opacity-80 h-full hidden group-hover:block cursor-pointer" size={70} />
                <div ref={slider} className="relative w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                    {movies.map((item, index) => 
                        <Movie key={index} item={item} showDetails={showDetails} />
                    )}
                </div>
                <MdChevronRight onClick={(event) => slideRight(event)} className="absolute z-10 bg-black text-white right-0 opacity-0 group-hover:opacity-80 h-full hidden group-hover:block cursor-pointer" size={70} />
            </div>
        </>
    )
}
export default React.memo(Row)