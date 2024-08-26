import { LOCAL_SERVER } from "../constants"
import axios from 'axios';

const api = axios.create({
    baseURL: LOCAL_SERVER,
});


api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const APIService = {
 
  getCars:  async () => {
    try {
      const response =  await api.get('/api/admin/cars/',  {headers: { 'User-Type' : 'admin'}})
      console.log('Got cars: ', response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching cars:', error.message);
      throw error;
    }
  },

  getCar: async(vehicleNo) => {
    try {

      console.log('Getting car ', vehicleNo)
      const response = await api.get(`/api/admin/cars/${vehicleNo}`, { params: {vehicleNo}, headers: { 'User-Type' : 'admin'}});
      console.log('Got car: ', response.data)
      return response.data
    } catch (error) {
    console.error('Error fetching car:', error.message);
    throw error; 
    }
  },
  addCar: async({vehicleNo, model, carType, locationID, photoUrl}) => {
      try {
        const response = await api.post('/api/admin/cars', {vehicleNo, model, carType, locationID, photoUrl, headers: { 'User-Type' : 'admin'}})
        console.log('Added car!')

        return response.data
        
      } catch (error) {
        console.error('Error adding car:', error.message);  
      }
    },
  updateCar: async({vehicleNo, model, carType, locationID, photoUrl}) => {
    try {
      await api.put(`/api/admin/cars/:${vehicleNo}`, {vehicleNo, model, carType, locationID, photoUrl, headers: { 'User-Type' : 'admin'}})
      console.log('Updated!')
    } catch (error) {
      console.error('Error updating car:', error.message);   
      
    }
  }
  ,
deleteCar: async(vehicleNo) => {
      try {
        await api.delete('/api/admin/cars', {params: {vehicleNo}, headers: { 'User-Type' : 'admin'}})
      } catch (error) {
        console.log('Error deleting car: ', error.message)
      }
    },

  getCoupon: async(couponCode)=>{
      try {
          const response = await api.get('/api/getCoupon', {params: {couponCode}, headers: { 'User-Type' : 'admin'}})
          console.log('Coupon: ', response.data)
          return response.data
      } catch (error) {
          console.error('Error fetching coupon:', error.message);
          throw error;   
      }
  },
    getCoupons: async() => {
      try {
        const res = await api.get('/api/getCoupons')
        console.log('Coupons: ',res.data)
        return res.data
      } catch (error) {
        console.log('Error fetching coupons: ', error.message)
      }
    },
      
    getLocations: async() => {
      try {
        const res = await api.get('/api/getLocations', {headers: { 'User-Type' : 'admin'}})
        return res.data
      } catch (error) {
        console.log('Error fetching locations: ', error.message)   
      }
    },
    getLocation: async (locationID) => {
      try {
          const res = await api.get(`/api/getLocation?locationID=${locationID}`,  {headers: { 'User-Type' : 'admin'}});
          return res.data;
      } catch (error) {
          console.log('Error fetching location: ', error.message);
      }
    },
    createLocation: async (locationData) => {
        try {
            const res = await api.post('/api/createLocation', {...locationData,  headers: { 'User-Type' : 'admin'}});
            return res.data;
        } catch (error) {
            console.log('Error creating location: ', error.message);
        }
    },
    updateLocation: async (locationData) => {
        try {
            const res = await api.put(`/api/updateLocation`, {...locationData, headers: { 'User-Type' : 'admin'}});
            return res.data;
        } catch (error) {
            console.log('Error updating location: ', error.message);
        }
    },
    deleteLocation: async (locationID) => {
        try {
            const res = await api.delete(`/api/deleteLocation?locationID=${locationID}`, {headers: { 'User-Type' : 'admin'}});
            return res.data;
        } catch (error) {
            console.log('Error deleting location: ', error.message);
        }
    }
    ,
    getTripAssistants: async () => {
    try {
        const res = await api.get('/api/getTripAssistants');
        return res.data;
    } catch (error) {
        console.log('Error fetching trip assistants: ', error.message);
    }
    },
    getTripAssistant: async (asstID) => {
        try {
            const res = await api.get(`/api/getTripAssistant?asstID=${asstID}`);
            return res.data;
        } catch (error) {
            console.log('Error fetching trip assistant: ', error.message);
            
        }
    },
    createTripAssistant: async (assistantData) => {
        try {
            const res = await api.post('/api/createTripAssistant', assistantData);
            return res.data;
        } catch (error) {
            console.log('Error creating trip assistant: ', error.message);
            
        }
    },
    updateTripAssistant: async (assistantData) => {
        try {
            const res = await api.put(`/api/updateTripAssistant`,assistantData);
            return res.data;
        } catch (error) {
            console.log('Error updating trip assistant: ', error.message);
            
        }
    },
    deleteTripAssistant: async (asstID) => {
        try {
            const res = await api.delete(`/api/deleteTripAssistant?asstID=${asstID}`);
            return res.data;
        } catch (error) {
            console.log('Error deleting trip assistant: ', error.message);
            
        }
    }

 
}

export default APIService