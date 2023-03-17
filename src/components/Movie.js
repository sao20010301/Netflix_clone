import { BsHeartFill,BsHeart } from "react-icons/bs"
import { UserAuth } from "../context/AuthContext"
import notFoundImg from "../ext.jpeg"

function notFound(event) {
    event.target.src = notFoundImg
}

export default function Movie({item, showDetails}) {
    const { watchLater, addWatchLater, delWatchLater } = UserAuth()
    const inList = watchLater && watchLater.some(e => e.id === item.id)
    return (
        <div onClick={(event) => showDetails(event, item)} className="relative w-[280px] max-md:w-[240px] inline-block">
            <img
            className="w-full h-full block" 
            src={`https://image.tmdb.org/t/p/w500${item?.backdrop_path}`}
            alt={item?.title}
            onError={notFound}
            />
            <div className="absolute left-0 bottom-0 w-full h-full flex justify-center items-center opacity-0 hover:bg-black/50 hover:opacity-100 transition duration-500 ease-in-out">
                <h3 className="text-white text-center whitespace-normal">{item?.title}</h3>
                <span onClick={(event) => inList ? delWatchLater(event, item) : addWatchLater(event, item)} className="absolute right-3 top-3 text-white cursor-pointer transition">
                    { inList ? <BsHeartFill></BsHeartFill> : <BsHeart></BsHeart>}
                </span>
            </div>
        </div>
    )
}