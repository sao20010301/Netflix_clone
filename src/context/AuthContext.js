import { 
    useContext,
    createContext, 
    useState, 
    useEffect 
} from "react"
import { 
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged    
} from "@firebase/auth";
import { auth, db } from "../firebase.config"
import { doc, onSnapshot, query, setDoc, collection, deleteDoc, updateDoc } from "@firebase/firestore"

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [watchLater, setWatchLater] = useState([])
    
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }
    const logout = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
            console.log("error", error)
        })
    }
    async function addWatchLater(event, item) {
        event.stopPropagation()
        const addDocRef = user !== null ? doc(db, "users", user?.email, "watchList", `${item.id}`) : ""
        await setDoc(addDocRef, {
            id: item.id,
            title: item.title,
            backdrop_path: item.backdrop_path,
            watched: false
        })
    }
    async function delWatchLater(event, item) {
        event.stopPropagation()
        try {
            await deleteDoc(doc(db, "users", user?.email, "watchList", `${item.id}`))
        } catch (error) {
            console.log(error)
        }
    }
    async function changeWatchLater(event, item) {
        event.stopPropagation()
        try {
            const updateDocRef = doc(db, "users", user?.email, "watchList", `${item.id}`)
            await updateDoc(updateDocRef, { watched: !item.watched })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })        
        return () => {
            unsubscribe()
        }
    }, [])
    useEffect(() => {
        if(user !== null) { 
            async function getData() {
                const q = query(collection(db, "users", user?.email, "watchList"))
                const unsub = onSnapshot(q, (querySnapshot) => {
                    const result = []
                    querySnapshot.forEach((doc) => {
                        result.push(doc.data())
                    })
                    setWatchLater(result)
                })
            }
            getData()
        }
    }, [user])
    return (
        <AuthContext.Provider value={{ googleSignIn, logout, user, watchLater, addWatchLater, delWatchLater, changeWatchLater }}>
            { children }
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}