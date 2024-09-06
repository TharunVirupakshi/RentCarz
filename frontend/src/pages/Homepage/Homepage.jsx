import {useState, useEffect}from 'react'
import { ProductCard, SearchBar, Spinner} from '../../components'
import APIService from '../../middleware/APIService'
import withAuth from '../../components/withAuth/withAuth'

const Homepage = () => {

  const [cars, setCars] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const fetchData = async () => {
    try {
      const data = await APIService.getCars();
      setAllCars(data);
      setCars(data);
      console.log('(Homepage) cars: ', data);
    } catch (error) {
      console.error('(Homepage) Error fetching cars:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const executeSearch = async (text) => {
    console.log('Search Query: ', text);

    if (!text) {
      setCars(allCars); // Reset to show all cars
      return;
    }

    try {
      const res = await APIService.searchCar(text);
      console.log('Search Results: ', res);
      setCars(res?.cars || []);
    } catch (error) {
      console.log('Cannot search');
    }
  };
  

  return (
    <div>
      <div className="serach-bar-wrapper ">

      <SearchBar handleSubmit={executeSearch}/>
      </div>
      {isLoading ?
        <div className='loadingSpinner'><Spinner /></div> 
        
        :

        <div className="cars-listing-box flex flex-wrap gap-5 p-5 w-screen justify-center">
          {cars.length == 0 && <p>No results</p>}
          {cars.map((car) => (
            <ProductCard key={car.vehicleNo} product={car} />
          ))}
        </div>
      }

    </div>
  )
}

export default withAuth(Homepage)