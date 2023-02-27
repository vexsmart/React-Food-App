import React, {useState, useEffect} from 'react'

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';


const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const response = await fetch('https://food-order-app-d25c1-default-rtdb.firebaseio.com/meals.json')
      const resData = await response.json()

      if(!response.ok){
        throw new Error('something went wrong')
      }

      let loadedMeals = []

      for(const key in resData){
        loadedMeals.push({
          id: key,
          name: resData[key].name,
          description: resData[key].description,
          price: resData[key].price
        })
      }

      setMeals(loadedMeals)
      setIsLoading(false)

    }
    fetchData().catch((error)=>{
      return <p className={classes.error}>{error.message}</p>
    })
  }, [])



  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if(isLoading){
    return (
      <section className={classes.loading}>
        <p>Loading...</p>
      </section>
    )
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
