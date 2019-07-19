fetch("http://localhost:8088/foods") // get the data
    .then(foods => foods.json())    // THEN parse it as JSON 
    .then(parsedFoods => {          // THEN display it
        // console.table(parsedFoods)
        const foodListContainer = document.querySelector(".foodList")
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
            foodListContainer.innerHTML += newFoodString(foodObject)
          })
      })


