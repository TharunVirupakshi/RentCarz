import {useEffect, useState} from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import APIService from '../../middleware/APIService';
import { Button } from 'flowbite-react';
import NO_IMG from '../../assets/car_no_image_small.jpg'
import { Spinner } from '../../components';
import './ProductPage.css'

const ProductPage = () => {
  const { productID } = useParams();
  const [ carData, setCarData] = useState([])
  const [isAvailable, setIsAvailable] = useState(false);
  const [ETRDate, setETRDate] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true); // Loading state
  const [imgLoading, setImgLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  console.log('(Prodpage) id:',productID)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await APIService.getCar(productID);
      const carStatus = await APIService.checkAvailability(productID)
      console.log('(ProdPage) car: ',  data);
      console.log('(Stat) : ', carStatus?.isAvailable)
      setIsAvailable(carStatus.isAvailable !== 'RUNNING')
      setETRDate(carStatus.etrDate ?? null)
      setCarData(data[0]);
    } catch (error) {
      setError(error)
      console.log('(ProdPage) Error fetching car:', error.message);
    } finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, [location])


  const goToOrder = () => {
    navigate(`/order/${carData?.vehicleNo}`)
  }

  if(loading){
    return <div className='loadingSpinner'><Spinner/></div>
  }

  if(error?.response?.status == 404){
    return(<div className='flex justify-center items-center h-screen'><h2 className="text-4xl font-extrabold dark:text-white">404 NOT FOUND</h2></div> )
  }
 

  return (
    <div>

        <div className="product-container flex p-16 gap-10">

        <div className="img-container">

        {imgLoading && (
          <div className="animate-pulse w-full h-full">
            <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
              <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          </div>
          )} 
          
          <img onLoad={() => setImgLoading(false)} className={`h-auto max-w-lg rounded-lg ${imgLoading ? 'hidden' : 'block'}`} src={carData?.photoUrl ?? NO_IMG} alt="image description"/>
          
            

        </div>

        <div className="prod-desc my-5">
            <h2 className="text-4xl font-extrabold dark:text-white">{carData.model ?? 'Car Name'}</h2>
            
                <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 mt-5">
                    <div className="flex flex-col pb-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Type</dt>
                        <dd className="text-lg font-semibold">{carData.carType ?? 'car type'}</dd>
                    </div>
                    <div className="flex flex-col py-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Location</dt>
                        <dd className="text-lg font-semibold">{carData.branchName ?? 'branch name'} - {carData.address ?? ' '}</dd>
                    </div>
                    <div className="flex flex-col pt-3">
                        <dt className="mb-2 text-gray-500 md:text-lg dark:text-gray-400">Status</dt>
                        {isAvailable ?  
                        <span className={"w-min inline-flex items-center bg-green-100 text-green-800 text-m font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"}>
                          <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                          Available
                        </span> : <>

                        <span className="w-min inline-flex items-center bg-red-100 text-red-800 text-m font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                          <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                          Unavailable
                        </span>
                        <div className="flex flex-col py-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Available after</dt>
                        <dd className="text-lg font-semibold">{new Date(ETRDate).toISOString().split('T')[0] ?? ' '}</dd>
                       </div>
                        </>

                        }
                       
              {/* <dd className="text-lg font-semibold ">{isAvailable ? 'Available' : 'Rented out'}</dd> */}
                    </div>
                </dl>

            {/* <a href="#" className="inline-flex items-center text-lg text-blue-600 dark:text-blue-500 hover:underline">
                Read more
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </a> */}
            <div className="mt-5">
              <Button disabled={!isAvailable} onClick={goToOrder}>
                Rent
              </Button>
            </div>
           

        </div>

       

        </div>


{/*         
          <div >
            <p>Vehicle No: {carData.vehicleNo}</p>
            <p>Car Type: {carData.carType}</p>
            <p>Model: {carData.model}</p>
            <p>Location ID: {carData.locationID}</p>
            <p>Branch Name: {carData.branchName}</p>
            <p>Address: {carData.address}</p>
            <hr />
          </div>
     */}




    </div>
  )
}

export default ProductPage