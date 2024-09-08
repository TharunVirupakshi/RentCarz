import { onAuthStateChanged } from 'firebase/auth'
import { Button, Modal } from 'flowbite-react'
import React from 'react'
import { useEffect, useState, useMemo } from 'react'
import { Spinner } from '../../components'
import NO_IMAGE_PHOTO from '../../assets/car_no_image_small.jpg'
import { auth } from '../../firebase/firebase'
import APIService from '../../middleware/APIService'


const ViewTrip = ({tripData, closeModal}) => {

  

  const [orderData, setOrderData] = useState({})
  const [loading, setLoading] = useState(true); // Loading stat
  const [imgLoading, setImgLoading] = useState(true)


  // Fetch order  and car details
  useEffect(() => {
    const fetch = async() => {
      try {
        setLoading(true)
        const res = await APIService.getOrder(tripData?.orderID);
        console.log('Order details:', res.data)
        setOrderData(res.data)
      } catch (error) {
        console.log('Could not fetch order id', error)
      } finally{
        setLoading(false)
      }
    }

    fetch()
  }, [tripData])

  const endTrip = async() => {
    try {
      const res = await APIService.endTrip(tripData.tripID)
      if(res.success) alert('Trip ended!')
      closeModal()
    } catch (error) {
      alert('Something went wrong!')
    }
  }

  

  if(loading){
    return <div className='min-h-96 flex items-center justify-center'><Spinner/></div>
  }

  return (
    <div className="space-y-6">
      <div className="img-container min-h-60 w-full">
                {imgLoading && (
              <div className="animate-pulse w-full h-full">
                <div class="flex items-center justify-center w-full h-full bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                  <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
              </div>
              )} 
              <img onLoad={() => setImgLoading(false)} className={`h-auto w-full  ${imgLoading ? 'hidden' : 'block'}`}  src={tripData.photoUrl ?? NO_IMAGE_PHOTO} alt=""/>
      </div>

      {/* Trip Details */}
      <div className="space-y-2">
        <p className="text-gray-500 md:text-sm dark:text-gray-400">
          Trip ID: <span className="text-sm font-semibold text-black">{tripData.tripID ?? '-'}</span>
        </p>
        <p className="text-gray-500 md:text-sm dark:text-gray-400">
          Order ID: <span className="text-sm font-semibold text-black">{orderData.orderID ?? '-'}</span>
        </p>
        <p className="text-gray-500 md:text-sm dark:text-gray-400">
          Rental Cost: ₹<span className="text-sm font-semibold text-black">{orderData.totCost  ?? '-'}</span>
        </p>
        <p className="text-gray-500 md:text-sm dark:text-gray-400">
          Car Model: <span className="text-sm font-semibold text-black">{tripData.model ?? '-'}</span>
        </p>
        <p className="text-gray-500 md:text-sm dark:text-gray-400">
          Vehicle No: <span className="text-sm font-semibold text-black">{tripData.carID ?? '-'}</span>
        </p>
        <p className="text-gray-500 md:text-sm dark:text-gray-400">
          Rental Start: <span className="text-sm font-semibold text-black">{tripData.startDate ?? '-'}</span>
        </p>
        <p className="text-gray-500 md:text-sm dark:text-gray-400">
          Rental End: <span className="text-sm font-semibold text-black">{tripData.endDate ?? '-'}</span>
        </p>
      </div>
      
      <Button disabled={tripData.status === 'FINISHED'} onClick={endTrip}>End Rental</Button>

    </div>
  )
}


const MyTrips = () => {

  const [data, setData] = useState([])
  const [user, setUser] = useState(null)
  const [viewOrderModal, setViewOrderModal] = useState(false);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const fetchTrips = useMemo(() => async () => {
    try {
      console.log('MyTrips uid: ', user?.uid);
      const res = await APIService.getAllTrips(user?.uid);
      if (res.length !== 0) {
        setData(res);
      }
    } catch (err) {
      console.log('Error fetching trips', err);
    }
  }, [user]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);


  const [tripData, setTripData] = useState(null)

  const closeViewOrderModal = () => {
    setViewOrderModal(false)
  }

  const openViewOrderModal = (data) => {
    setTripData(data)
    setViewOrderModal(true)
  }

  console.log()
  

  return (
    
<div className='p-10'>
<div className="title ">
    <h2 className="text-4xl font-extrabold dark:text-white p-5">My Trips</h2>
  </div>


<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Car Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Vehicle No
                </th>
                <th scope="col" class="px-6 py-3">
                    Trip ID
                </th>
                <th scope="col" class="px-6 py-3">
                    Start Date
                </th>
                <th scope="col" class="px-6 py-3">
                    End Date
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
            </tr>
        </thead>
        <tbody>
        { data.map((item, index) => (
            <tr key={index} class="odd:bg-gray-200 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <p className='cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline' onClick={() => openViewOrderModal(item)}>{item.model ?? '-'}</p>
                </th>
                <td class="px-6 py-4">
                    {item.carID ?? '-'}
                </td>
                <td class="px-6 py-4">
                    {item.tripID ?? '-'}
                </td>
                <td class="px-6 py-4">
                    {item.startDate ?? '-'}
                </td>
                <td class="px-6 py-4">
                    {item.endDate ?? '-'}
                </td>
                <td class="px-6 py-4">
                {item.status === 'RUNNING' ? 
                        <span class={"w-min inline-flex items-center bg-green-100 text-green-800 text-m font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"}>
                          <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                          Running
                        </span> : 
                        item.status === 'FINISHED' ?
                        <span class="w-min inline-flex items-center bg-blue-100 text-blue-800 text-m font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                          <span class="w-2 h-2 me-1 bg-blue-500 rounded-full"></span>
                          Finished
                        </span>
                        : '-'
                        }
                </td>
            </tr>
        ))}
            
            
        </tbody>
    </table>

    <Modal  show={viewOrderModal} size="md" onClose={closeViewOrderModal} popup>
      <Modal.Header><h3 className=" p-2 text-xl font-medium text-gray-900 dark:text-white">Details</h3></Modal.Header>
      <Modal.Body>
         <ViewTrip tripData={tripData} closeModal={closeViewOrderModal} />
      </Modal.Body>  
    </Modal>
</div>


</div>
  )
}

export default MyTrips