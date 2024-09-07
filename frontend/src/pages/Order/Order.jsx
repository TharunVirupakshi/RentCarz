import {useEffect, useState} from 'react'
import withAuth from '../../components/withAuth/withAuth'
import { useParams, Link, useNavigate } from 'react-router-dom';
import APIService from '../../middleware/APIService';
import { Button } from 'flowbite-react';
import { Label, TextInput } from 'flowbite-react';
import { Stepper } from '../../components';
import { RATE_PER_DAY } from '../../constants';
import { auth } from '../../firebase/firebase';
import { Datepicker } from 'flowbite-react';



const user = auth.currentUser;


const Order = () => {

  const COUPON = 'FIRST20' // TEST COUPON

  const [isLoading, setIsLoading] = useState(true);

  const { productID } = useParams();
  const [ carData, setCarData] = useState([])
  console.log('(Order) id:',productID)

  // const [price, setPrice] = useState(0)
  const [days, setDays] = useState(1)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [totalCost, setTotalCost] = useState(0)

  const [isPaymentModeOn, setIsPaymentModeOn] = useState(false)
  const [activeStep, setActiveStep] = useState(0);

  const [couponCode, setCouponCode] = useState('')
  const [isCouponValid, setIsCouponValid] = useState(false)
  const [couponDetails, setCouponDetails] = useState(null)
  const [triggered, setTriggered] = useState(false)
  const navigate = useNavigate()

  const[demand, setDemand] = useState(0)

  //Fetch the car details
  useEffect(() => {

    const fetchData = async () => {
      try {
        const data = await APIService.getCar(productID);
        console.log('(Order) car: ',  data);
        setCarData(data[0]);
      } catch (error) {
        console.error('(Order) Error fetching car    :', error.message);
      } finally {
        setIsLoading(false)
      }
    };

    fetchData();
  }, [productID])

 
  // Set time part to 0 for startDate
  startDate.setHours(0, 0, 0, 0);

  // Set time part to 0 for endDate
  endDate.setHours(0, 0, 0, 0);
  useEffect(()=>{
    console.log("Dates ",startDate, endDate)
    const days = calculateDaysBetween(startDate, endDate)
    console.log('Days calculated: ', days)
    setDays(days)
  },[startDate, endDate])

  const [isDemandLoading, setIsDemandLoading] = useState(true)
  useEffect(()=>{
    const fetchData = async () => {
      try {
        setIsDemandLoading(true)
        console.log('Start Date: ', startDate)
        const date = startDate.toISOString();
        console.log('Formatted Date: ', date)
        const data = await APIService.getDemand(date);
        console.log('Demand ',  data);
        setDemand(data);
      } catch (error) {
        console.error('Error fetching demand:', error.message);
      } finally {
        setIsDemandLoading(false)
      }
    };

    fetchData();
  },[startDate])

  useEffect(() => {
  const calculatePrice = () => {
    const rate = demand !== 0 ? RATE_PER_DAY + RATE_PER_DAY * (demand / 100) : RATE_PER_DAY;
    const price = (days * rate).toFixed(2); // `toFixed(2)` returns a string
    const finalPrice = isNaN(Number(price)) ? RATE_PER_DAY * days : Number(price);
    setEstimatedPrice(finalPrice);
  };

  calculatePrice();
}, [days, demand]);


  //Apply Discount
  useEffect(()=>{
    const cost = couponDetails ? (estimatedPrice - (estimatedPrice * (couponDetails.discountPercent || 0.0))).toFixed(2) : estimatedPrice;
    setTotalCost(cost);
  },[estimatedPrice, couponDetails])

  const calculateDaysBetween = (start, end) => {
  if (start && end) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const startDate = new Date(start);
    const endDate = new Date(end);

    const daysDifference = Math.round(Math.abs((startDate - endDate) / oneDay));

    // If start and end dates are the same, set days to 1
    return (daysDifference === 0 ? 1 : daysDifference);
  }
  };



  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate < date) {
    // If end date is less than start date, set end date same as start date
    setEndDate(date);
    }
  };

  const handleEndDateChange = (date) => {
  if (date < startDate) {
    // If end date is less than start date, set end date same as start date
    setEndDate(startDate);
  } else {
    setEndDate(date);
  }
};
  
  const handleCreateOrder = ()=>{
    const makeReq = async () => {
      try {
        const id = auth.currentUser.uid;
        const orderDetails = {
          vehicleNo: productID,
          custID: id,
          discountID: couponDetails?.discountID ?? null,
          totCost: totalCost
        }
        const data = await APIService.createOrder(orderDetails);
        console.log('(Order) car: ',  data);

        navigate('/payment', { state: { 
          orderId: data?.order?.insertId, 
          totalCost: totalCost, custID: orderDetails.custID ,
          carID: productID, 
          rentalStartDate: startDate.toISOString(), 
          rentalEndDate: endDate.toISOString()
        }})

      } catch (error) {
        console.error('(Order) Error fetching car    :', error.message);
        alert('Something went wrong, try again later.')
      }
    };

    makeReq(); 



  }

  const [isCouponLoading, setIsCouponLoading] = useState(false)
  const checkCoupon = async()=>{
    try{
      setTriggered(true)
      setIsCouponLoading(true)
      const res = await APIService.getCoupon(couponCode)
      setCouponDetails(res[0])
      setIsCouponValid(true)
      console.log('coupon res: ', res[0])

    }catch(err){
      setCouponDetails(null)
      setIsCouponValid(false)
      console.log('Error with coupon code', err)
    } finally {
      setIsCouponLoading(false)
    }
    
  }

  // if(isLoading){
  //   return <div role="status" class="max-w-sm animate-pulse">
  //     <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
  //     <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
  //     <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
  //     <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
  //     <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
  //     <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
  //     <span class="sr-only">Loading...</span>
  //   </div>
  // }

  return (
  <div className='p-10'>
  <div className="title ">
    <h2 className="text-4xl font-extrabold dark:text-white">Order Page</h2>
  </div>
  <div className="product-details p-10">
                <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 mt-5">
                    <div className="flex flex-col pb-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Model</dt>
                        {isLoading ? 
                          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 animate-pulse"></div> :
                          <dd className="text-lg font-semibold">{carData?.model ?? 'N/A'}</dd>
                        }
                        
                    </div>
                    <div className="flex flex-col pb-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Type</dt>
                        {isLoading ? 
                          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 animate-pulse"></div> :
                          <dd className="text-lg font-semibold">{carData?.carType ?? 'N/A'}</dd>
                        }
                        
                    </div>
                    <div className="flex flex-col py-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Location</dt>
                        {isLoading ? 
                          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 animate-pulse"></div> :
                          <dd className="text-lg font-semibold">{carData?.branchName ?? 'N/A'} - {carData?.address ?? 'N/A'}</dd>
                        }
                       
                    </div>
                  
                </dl>

            {/* <a href="#" className="inline-flex items-center text-lg text-blue-600 dark:text-blue-500 hover:underline">
                Read more
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </a> */}

            <div className="flex max-w-md flex-col gap-4">
    
      
      
    </div>
        <div className="more-details my-5">
          <Stepper itemsData={['Trip info', 'Payment']} activeItem={activeStep}/>

          
          <div className='max-w-md'>
           {!isPaymentModeOn && (<>
            
            {/* <TextInput 
              id="days" 
              type="text"  
              placeholder='Enter total number of days' 
              value={days}
              onChange={(e) => setDays(e.target.value)}
              required  
              /> */}
              <div className="my-5 block">
              <Label htmlFor="start" value="Pickup" />
              </div>
              <Datepicker name='start' minDate={new Date()} autoHide={true} onSelectedDateChanged={handleStartDateChange} />
              <div className="my-5 block">
              <Label htmlFor="end" value="Return" />
              </div>
              <Datepicker value={endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} name='end' minDate={startDate || new Date()} autoHide={true} onSelectedDateChanged={handleEndDateChange}/>



              <div className="flex flex-col pb-3 mt-5">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Estimated Price:</dt>
                {isDemandLoading ?
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 animate-pulse"></div> :
                  <dd className="text-lg font-semibold">₹{estimatedPrice ?? 'N/A'}</dd>
                }
              </div>
           </>)} {isPaymentModeOn && (
           <>
           <div className="my-5 block">
              <Label htmlFor="coupon" value="Coupon" />
            </div>
            <div className="flex gap-5 items-start">
            <div>
            <TextInput 
              id="coupon" 
              type="text"  
              placeholder='Enter coupon code' 
              value={couponCode}
              color={triggered && (isCouponValid ? "success" : "failure")}
              helperText={
                triggered && ( isCouponValid ? 
                <>
                  <span className="font-medium">Verified</span> Coupon code applied!
                </> :
                <>
                  <span className="font-medium">Oops!</span> Coupon code not found!
                </> 
                )
              }
              onChange={(e) => setCouponCode(e.target.value)}
              />
            </div>
            <Button onClick={checkCoupon}>
                    {isCouponLoading ? <div className=""><svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                    </svg>
                      Checking... </div> : <p> Apply</p>}

            </Button> 
            </div>
        
   
              

            <div className="flex flex-col pb-3 mt-5">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Price: </dt>
                        <p className='text-sm text-green-500'>{couponDetails && 'Discount Applied: -₹'+ estimatedPrice*(couponDetails.discountPercent || 0)}</p>
                        <dd className="text-lg font-semibold">₹{totalCost}</dd>
            </div>
           </>)
           }
            
          </div>


        </div>
            <div className="mt-5">
                
                    {!isPaymentModeOn ? 
                      <Button onClick={()=>{setIsPaymentModeOn(true); setActiveStep(1)}}>Next</Button> : <div className='flex gap-5'>
                      <Button onClick={()=>{setIsPaymentModeOn(false);  setActiveStep(0)}}>Go back</Button> 
                      <Button onClick={handleCreateOrder} className="w-40" color='success'>Complete Order</Button> 
   
                      </div>
                      
                    }
                
            </div>
           

      
  </div>
    
  </div>
  )
}

export default withAuth(Order)