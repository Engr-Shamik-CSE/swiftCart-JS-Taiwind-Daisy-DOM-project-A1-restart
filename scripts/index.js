// loading Spinner 
const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("product-container").classList.add("hidden");
}
const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("product-container").classList.remove("hidden");
}

// active nav js 
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
});



function loadCategories() {
  //1.fetch the data and get promise
  fetch("https://fakestoreapi.com/products/categories")
    // 1. convert data to json
    .then(res => res.json())
    //3. send data to display
    .then(data => displayCategories(data))// Once JSON is parsed, call the displayCategories function with the 'categories' array
    .catch(error => console.error("Error in LoadCategories()"));
}

function displayCategories(categories) {
  const categoryContainer = document.getElementById("category-container");

  // clear existing content
  categoryContainer.innerHTML = "";

  //Now we will add all category buttons from API
  // Loop through categories
  categories.forEach(cat => {
    const button = document.createElement("button");
    button.className = "btn btn-outline btn-primary category-btn active-category";
    button.textContent = cat;

    button.addEventListener("click", () => {
      loadCategoryProducts(cat);
    });

    categoryContainer.appendChild(button);
  });

  //Active Button: now add for--of loop for showing Active button
  const buttons = categoryContainer.getElementsByClassName('active-category');
  for (const btn of buttons) {
    btn.addEventListener("click", function () {
      // Remove active classes from all category buttons
      for (const b of buttons) {
        b.classList.remove("bg-[#422AD5]", "text-white");
      }

      // Add active class to the clicked button
      this.classList.add("bg-[#422AD5]", "text-white");
    });
  }
}

loadCategories();
