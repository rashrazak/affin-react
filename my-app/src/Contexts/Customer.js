import React, {useEffect, useState, createContext} from 'react'
import axios from 'axios'
export const CustomerContext = createContext();

function CustomerProvider(props) {
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState([]);

    useEffect(() => {
        getCustomers()
    },[!customers])

    const getCustomers = async () => {
        await axios.get('http://localhost:5000/api/customer/all').then((res)=>{
            console.log(res.data)
            setCustomers(res.data)
        }).catch((error)=>{
            console.log(error)
            alert('Error 404')
        })
    }

    const getCustomer = async (id) => {
        await axios.get(`http://localhost:5000/api/customer/${id}`).then((res)=>{
            setCustomer(res.data)
        }).catch((error)=>{
            console.log(error)
            alert('Error 404')
        })
    }

    const deleteCustomer = (id) =>{
        axios.delete(`http://localhost:5000/api/customer/delete/${id}`).then((res)=>{
            console.log(res)
            getCustomers()
        }).catch((error)=>{
            console.log(error)
            alert('Error 404')
        })
    }

    const updateCustomer = (id, email, name, ic) =>{
        axios.put(`http://localhost:5000/api/customer/update/${id}`, {
            name:name,
            email:email,
            ic:ic
        }).then((res)=>{
            console.log(res)
            getCustomers()
        }).catch((error)=>{
            console.log(error)
            alert('Error 404')
        })
    }

    const createCustomer = (email, name, ic) =>{
        axios.post(`http://localhost:5000/api/customer/create`, {
            name:name,
            email:email,
            ic:ic
        }).then((res)=>{
            console.log(res)
            getCustomers()
        }).catch((error)=>{
            console.log(error)
            alert('Error 404')
        })
    }

    return (
        <CustomerContext.Provider value={{customers,deleteCustomer, customer, getCustomer, updateCustomerx:updateCustomer, createCustomerx:createCustomer}}>
            {props.children}
        </CustomerContext.Provider>
    )
}

export default CustomerProvider
