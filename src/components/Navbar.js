import React,{ useState, useRef, useEffect } from "react"
import { FiSearch } from "react-icons/fi"
import { useNavigate, Link } from "react-router-dom"
import { UserAuth } from "../context/AuthContext"

export default function Navbar() {
    const [isExpanded, setIsExpanded] = useState(false)
    const [scrollDown, setScrollDown] = useState(false)
    const searchInput = useRef(undefined)
    const [searchText, setSearchText] = useState("")
    const  { user, logout } = UserAuth()
    function handleLogOut() {
        logout()
    }

    function searchExpand(event) {
        event.stopPropagation()
        if(event._reactName === "onBlur") {
            setIsExpanded(!isExpanded)
        } else {
            setIsExpanded(!isExpanded)
            searchInput.current.focus()
        }
    }
    
    
    useEffect(() => {
        function handleScroll() {
            if(window.scrollY === 0) {
                setScrollDown(false)
            } else {
                setScrollDown(true)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        };
    }, []);
    

    const navigate = useNavigate()
    function handleSearch(event) {
        setSearchText(event.target.value)
        if(searchInput.current.value !== "") {
            navigate({
                pathname: "/search",
                search: `q=${event.target.value}`
            })
        } else {
            navigate("/")
        }
        
    }
    
        
    return (
        <div  
        className={`flex justify-between max-md:justify-around items-center py-2 max-md:py-3 px-5 w-full h-15 fixed z-20 duration-500 ease-out ${scrollDown ? "bg-black" : "bg-gradient-to-b from-black to-transparent"}`}
        >
            <Link to="/" className="text-2xl text-red-700 font-bold cursor-pointer">NETFLIX</Link>
            { user?.displayName 
            ? <div className="flex flex-row align-center">
                <div className={`flex flex-row m-1 max-md:m-0 ${isExpanded ? "border" : null} max-md:border-0 text-white`}>
                    <FiSearch onClick={(event)=> searchExpand(event)} className={`ml-auto h-full text-xl cursor-pointer duration-350 ease-in-out ${isExpanded ? "bg-black/70" : "bg-transparent"} max-md:hidden`} />
                    <input ref={searchInput} type="search" value={searchText} onChange={handleSearch} onBlur={(event) => searchExpand(event)} className={`bg-black/70 max-md:bg-zinc-600/30 outline-none duration-500 ease-in-out ${isExpanded ? "w-full" : "w-0"} max-md:w-[80%] max-md:pl-1 max-md:ml-4`} placeholder="Search something..."/>
                </div>
                <div className="mx-3 max-md:mx-0 relative group">
                    <img className="w-[40px] h-[40px]" src="https://occ-0-2041-3662.1.nflxso.net/art/0d282/eb648e0fd0b2676dbb7317310a48f9bdc2b0d282.png" alt="user_img" />
                    <div className="absolute hidden left-[-76px] w-25 group-hover:block bg-black/70 text-white">
                        <div className="m-3">
                        <Link to="/watchlist" className="hover:border-b border-white">WatchList</Link>
                        </div>
                        <div className="border-t border-white">
                            <p className="cursor-pointer m-3 text-center hover:border-b border-white/80" onClick={handleLogOut}>Log out</p>
                        </div>
                    </div>
                </div>
              </div>
            : <></>
            }
        </div>
    )
}