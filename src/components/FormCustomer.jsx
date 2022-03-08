import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import FormError from './FormError'

const FormCustomer = () => {

  const navigate = useNavigate()

  const newClientSchema = Yup.object().shape({
    name:Yup.string()
            .min(5, 'At least 5 characters')
            .max(20, 'At most 20 characters')
            .required('Customer name is required'),
    company:Yup.string()
                .required('Company is required'),
    email:Yup.string()
              .email('Invalid email address')
              .required('Email is required'),
    telephone:Yup.number()
                .positive('Invalid telephone number')
                .integer('Invalid telephone number')
                .typeError('Just enter numbers')
  })

  const handleSubmit = async (values) => {
    try {
      const url = "http://localhost:4000/customers"

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(values),
        headers:{ 'Content-Type' : 'application/json'}
      })
      const result = await response.json()

      navigate("/customers")

    } catch (error) {
      console.log(error)
    }
  }


  return (    
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
        <h1 className="text-gray-600 font-bold text-xl uppercase text-center">Add Customer</h1>

        <Formik
          initialValues={{
            name:"",
            company:"",
            email:"",
            telephone:"",
            notes:""
          }}
          onSubmit={ async (values,{resetForm}) => {
            await handleSubmit(values)
            resetForm()
          }}
          validationSchema={newClientSchema}
        >
          { ( {errors, touched} ) => {            
            return (
              <Form className="mt-10">
                <div className="mb-4">
                  <label htmlFor="name" className='text-gray-800'>Name</label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    className="mt-2 block w-full p-3 bg-blue-50 text-red-900"
                    placeholder="Enter full name"
                  />
                  { (errors.name && touched.name) && <FormError message={errors.name}/>}
                </div>

                <div className="mb-4">
                  <label htmlFor="company" className='text-gray-800'>Company</label>
                  <Field
                    id="company"
                    name="company"
                    type="text"
                    className="mt-2 block w-full p-3 bg-blue-50 text-red-900"
                    placeholder="Customer company name"                    
                  />
                  { (errors.company && touched.company) && <FormError message={errors.company}/>}
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className='text-gray-800'>Email</label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="mt-2 block w-full p-3 bg-blue-50 text-red-900"
                    placeholder="Email address"
                  />
                  { (errors.email && touched.email) && <FormError message={errors.email}/>}
                </div>              

                <div className="mb-4">
                  <label htmlFor="telephone" className='text-gray-800'>Telephone</label>
                  <Field
                    id="telephone"
                    name="telephone"
                    type="tel"
                    className="mt-2 block w-full p-3 bg-blue-50 text-red-900"
                    placeholder="Telephone number"
                  />
                  { (errors.telephone && touched.telephone) && <FormError message={errors.telephone}/>}
                </div>  

                <div className="mb-4">
                  <label htmlFor="notes" className='text-gray-800'>Observations - Notes</label>
                  <Field
                    as="textarea"
                    id="notes"
                    name="notes"
                    type="tel"
                    className="mt-2 block w-full p-3 bg-blue-50 text-red-900 h-30"
                    placeholder=""
                  />
                </div>

                <input 
                  type="submit" 
                  value="Add" 
                  className="bg-gray-500 mt-5 w-full p-3 text-white uppercase font-bold text-lg hover:bg-gray-800"
                
                />
              </Form>
            )
          }
          }

        </Formik>
    </div>
  )
}

export default FormCustomer