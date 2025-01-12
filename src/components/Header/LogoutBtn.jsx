import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import Button from '../Button';

function LogoutBtn({className=""}) {
    const dispatch = useDispatch();
    const handleLogout = () =>{
        authService.logout()
        .then(()=>{
            dispatch(logout());
        })
        .catch((err)=>{
            console.log("Error while logging out : ", err);
        })
    }
  return (
    <Button className={className} onClick={handleLogout} hoverColor='bg-red-500' borderColor='border-red-400'>LogoutBtn</Button>
  )
}

export default LogoutBtn