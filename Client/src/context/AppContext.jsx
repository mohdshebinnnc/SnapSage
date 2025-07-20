import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [credit, setCredit] = useState(0); // Changed from false to 0

    const navigate=useNavigate()

    const API_BASE_URL = import.meta.env.VITE_API_URL;

    const loadCreditData = async () => {
        if (!token) return;
        try {
            const { data } = await axios.get(`${API_BASE_URL}/api/user/credits`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (data.success) {
                setCredit(data.credits);
                setUser(data.user);
            }
        } catch (error) {
            console.error("Error loading credits:", error);
            toast.error("Failed to load credits");
        }
    };

    const generateImage=async(prompt)=>{
        try {
            const {data}= await axios.post(`${API_BASE_URL}/api/image/generate-image`,{prompt},{headers:{Authorization:`Bearer ${token}`}})
            
            if(data.success){
                loadCreditData()
                return data.resultImage
            }else{
                toast.error(data.message)
                loadCreditData()

                if (data.creditBalance===0){
                    navigate('/BuyCreadit')
                }
            }

        } catch (error) {
            console.error("GenerateImage Error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || error.message);

            if (error.response?.data?.creditBalance === 0 || error.response?.data?.credits === 0) {
                navigate('/BuyCreadit'); 
            }
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
        setCredit(0);
    };

    useEffect(() => {
        if (token) {
            loadCreditData();
        }
    }, [token]);

    const value = {
        user,setUser,showLogin,setShowLogin,API_BASE_URL,token,setToken,credit,setCredit,loadCreditData,logout,generateImage
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;