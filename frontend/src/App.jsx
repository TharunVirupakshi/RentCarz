import { useState, useEffect } from 'react'
import './App.css'

import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import { CarListing, Homepage, Order, Payment, AuthPage, ProductPage, MyTrips, ProfilePage, AdminAuthPage, AdminDashboard, ManageCars, ManageDiscounts, ManageLocations, ManageStaff } from './pages';
import {auth, getIDToken} from './firebase/firebase'
import {onAuthStateChanged } from "firebase/auth";
import {Navbar} from './components'
import {signOut} from './middleware/AuthService'
import PrivateRoute from './components/privateRoute/PrivateRoute';






function App() {


  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigte = useNavigate();

  

  useEffect(()=>{

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
     
  },[])

  useEffect(()=>{
    console.log('User: ', auth.currentUser)
  },[user])
   



  return (
    <>
  
     {isLoggedIn ? <Navbar signOutHandler={signOut} user={user}/> : 
     <div className='flex w-screen'>
      <span className='text-2xl font-semibold dark:text-white p-5'>RentCarz</span>
     </div>}
     <Routes>
          <Route path="/" element={
            // <PrivateRoute>
              <Homepage />
            // </PrivateRoute>
            } 
          />
          <Route path="/home" element={
            // <PrivateRoute>
              <Homepage />
            // </PrivateRoute>
            } 
          />
          <Route path="/product/:productID" element={<ProductPage/>}/>
          {/* <Route path="/car-listing" element={<CarListing />} /> */}
          <Route path="/order/:productID" element={<Order/>} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/mytrips" element={
            
              <MyTrips />
            
            } 
          />
        <Route path="/myprofile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/authpage" element={<AuthPage />} />
        <Route path="/adminauthpage" element={<AdminAuthPage/>}/>

        <Route path="/adminDashboard" element={<AdminDashboard/>}>
          <Route index element={<Navigate to="/adminDashboard/managecars" replace/>} />
          <Route path="managecars" element={<ManageCars />} />
          <Route path="managediscounts" element={<ManageDiscounts />} />
          <Route path="managelocations" element={<ManageLocations />} />
          <Route path="managestaff" element={<ManageStaff />} />
        </Route>
     </Routes>


      
    </>
   
  )
}

export default App
