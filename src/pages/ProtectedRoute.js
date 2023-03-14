import React from "react"
import { Navigate } from "react-router-dom"
import { UserAuth } from "../context/AuthContext"

export default function ProtectedRoute({children}) {
    let { user } = UserAuth()
    if(!user) {
       return <Navigate to="/signin" replace/>
    }
    return children
}