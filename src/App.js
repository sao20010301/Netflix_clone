import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import Search from './pages/Search';
import WatchList from './pages/WatchList';
import { AuthContextProvider } from "./context/AuthContext"
import Signin from './pages/Signin';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <Router class="box-border">
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/search" 
            element={
              <ProtectedRoute>
                  <Search />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/watchlist" 
            element={
              <ProtectedRoute>
                <WatchList />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<Signin />}/>
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
