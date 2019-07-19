/// ------ Practice: Displaying Foods ------

// const foodListContainer = document.querySelector(".foodList")
fetch("http://localhost:8088/foods") // get the data
  .then(foods => foods.json())    // THEN parse it as JSON 
  .then(parsedFoods => {          // THEN display it
    // console.table(parsedFoods)
    const newFoodString = (foodObject) => {
      return `
            <section class="eachFood">
              <h2>Name: ${foodObject.name}</h2>
              <h3>Category: ${foodObject.category}</h3>
              <h3>Ethnicity: ${foodObject.ethnicity}</h3>
            </section>  
          `
    }
    parsedFoods.forEach(foodObject => {
      // foodListContainer.innerHTML += newFoodString(foodObject)
    })
  })


// ------ Practice: Fetching Other People's Data ------

const foodListContainer = document.querySelector(".foodList")

fetch("http://localhost:8088/foods")
  .then(response => response.json())
  .then(myParsedFoods => {
    myParsedFoods.forEach(food => {
      console.log(food) // Should have a `barcode` property

      // Now fetch the food from the Food API
      fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
        .then(response => response.json())
        .then(productInfo => {
          if ("ingredients_text" in productInfo.product && productInfo.product.ingredients_text !== "") {
            food.ingredients = productInfo.product.ingredients_text
          } else {
            food.ingredients = "no ingredients listed"
          }
          if ("countries" in productInfo.product) {
            food.countries = productInfo.product.countries
          } else {
            food.countries = "not sold anywhere"
          }
          if ("nutriments" in productInfo.product && "energy" in productInfo.product.nutriments) {
            food.calories = `${productInfo.product.nutriments.energy}kCal`
          } else {
            food.calories = "no nutrition info"
          }
          if ("nutriments" in productInfo.product && "fat_serving" in productInfo.product.nutriments) {
            food.fat = `${productInfo.product.nutriments.fat_serving}g`
          } else {
            food.fat = "no fat info"
          }
          if ("nutriments" in productInfo.product && "sugars" in productInfo.product.nutriments) {
            food.sugar = `${productInfo.product.nutriments.sugars}g`
          } else {
            food.fat = "no sugar info"
          }

          const foodFactory = (foodObject) => {
            return `
                                 <section class="eachFood">
                                   <h2>Name: ${foodObject.name}</h2>
                                   <h3>Category: ${foodObject.category}</h3>
                                   <h3>Ethnicity: ${foodObject.ethnicity}</h3>
                                   <p>Ingredients: ${food.ingredients}</p>
                                   <p>Countries: ${food.countries}</p>
                                   <p>Calories: ${food.calories}</p>
                                   <p>Fat: ${food.fat}</p>
                                   <p>Sugar: ${food.sugar}</p>
                                 </section>  
                               `
          }
          const addFoodToDom = (foodString) => {
            foodListContainer.innerHTML += foodString

          }
          // Produce HTML representation
          const foodAsHTML = foodFactory(food)

          // Add representaiton to DOM
          addFoodToDom(foodAsHTML)
        })
    })
  })


