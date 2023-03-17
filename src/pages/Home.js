import React,{ useState, useEffect } from "react"
import MovieCarousel from "../components/MovieCarousel"
import Row from "../components/Row"
import requestsUrl from "../RequestsUrl"
import MovieDetails from "../components/MovieDetails"

export default function Home() {
    const [isShow, setIsShow] = useState(false)
    const [clickMovie, setClickMovie] = useState("")
    const showDetails = React.useCallback((event, item) => {
        if(event.target.id === "overlayBg") {
            setIsShow(false)
        } else {
            setClickMovie(item)
            setIsShow(true)
        }
    }, [])

    
    return (
        <>
            <MovieCarousel showDetails={showDetails} />
            <Row title={"Popular"} showDetails={showDetails} fetchUrl={requestsUrl.requestsPopular}/>
            <Row title={"Upcoming"} showDetails={showDetails} fetchUrl={requestsUrl.requestsUpcoming}/>
            <Row title={"Now Playing"} showDetails={showDetails} fetchUrl={requestsUrl.requestsNowPlaying}/>
            <Row title={"Top Rated"} showDetails={showDetails} fetchUrl={requestsUrl.requestsTopRated}/>
            <Row title={"Trending"} showDetails={showDetails} fetchUrl={requestsUrl.requestsTrending}/>
            <Row title={"Discover"} showDetails={showDetails} fetchUrl={requestsUrl.requestsDiscover}/>
            {isShow && <MovieDetails clickMovie={clickMovie} showDetails={showDetails}/>}
        </>
    )
}