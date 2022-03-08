import { useEffect, useState } from 'react'
import {useParams, useLocation} from 'react-router-dom'
import Spinner from '../components/Spinner'

const CustomerView = () => {

  const navigate = useLocation();

  const [customer, setCustomer] = useState({})
  const [loading, setLoading] = useState(true)

  const { id } = useParams()

  useEffect( () => {
    const getCustomer = async () => {
      try {
        const url = `http://localhost:4000/customers/${id}`
        const response = await fetch(url)
        const result = await response.json()
              
        setCustomer(result)
      } catch (error) {
        console.log(error)
      }
      setLoading(!loading)
    }
    getCustomer()
  },[])

  return (
    loading ? <Spinner /> : Object.keys(customer).length === 0 ? <p className='font-bold text-red-400'>NO RESULTS FOUND</p> : (
        <>
          <h1 className="font-black text-4xl text-gray-500">Customer information</h1>
          <p className="mt-3 text-gray-400">Details</p>          
          <div className='bg-white mt-10 px-5 py-10 rounded-md'>
            <p className='text-3xl text-gray-700'> 
              <span className='uppercase font-bold'>Customer: </span>
              {customer.name}
            </p>
            <p className='text-xl text-gray-700 mt-4'> 
              <span className='uppercase font-bold'>Email: </span>
              {customer.email}
            </p>
            {customer.telephone && (
              <p className='text-xl text-gray-700 mt-4'> 
                <span className='uppercase font-bold'>Telephone: </span>
                {customer.telephone}
              </p>
            )}
            <p className='text-xl text-gray-700 mt-4'> 
              <span className='uppercase font-bold'>Company: </span>
              {customer.company}
            </p>
            {customer.notes && (
              <p className='text-xl text-gray-700 mt-4'> 
                <span className='uppercase font-bold'>Observations - Notes: </span>
                {customer.notes}
              </p>
            )}
          </div>
        </>
      )
  )
}

export default CustomerView