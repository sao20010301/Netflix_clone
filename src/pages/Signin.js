import React from "react"
import { UserAuth } from "../context/AuthContext"
import { GoogleButton } from "react-google-button"
import { useNavigate } from "react-router-dom"
import { db } from "../firebase.config"
import { doc, setDoc, getDoc } from "@firebase/firestore"

export default function Signin() {
    const  { googleSignIn } = UserAuth()
    const navigate = useNavigate()
    const handleGoogleSignIn = async () => {
        try {
            const result = await googleSignIn()
            console.log("Logined", result.user?.email)
            const userExist = await getDoc(doc(db, "users", result.user?.email))
            console.log("userExist:", userExist.exists())
            if(!userExist.exists()) {
                setDoc(doc(db, "users", result.user?.email), {
                    watchList: []
                })
            }
            navigate("/")
            
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className="flex justify-center align-center h-screen text-white bg-netflixBg">
            <div className="m-auto w-[50%] max-md:w-[80%] h-[50%] bg-black/90 flex justify-center align-center">
            <GoogleButton
            onClick={handleGoogleSignIn} 
            className="m-auto w-[50%]" 
            />
            </div>
        </div>
    )
}