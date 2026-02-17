console.log("Ami akhane");
const loadCategoryProducts = (category) => {
    showLoader();
    const encodedCategory = encodeURIComponent(category);
    const url = `https://fakestoreapi.com/products/category/${encodedCategory}`;
    console.log("ami dhukchi");
    fetch(url)
        .then((res) => res.json())
        .then(data =>
            displayProducts(data))
        .catch(error => {
            console.error("Error in loadCategoryProducts()", error);
            hideLoader(); // hide loader on error
        });
}


const displayProducts = products => {
    const productContainer = document.getElementById("product-container");
    console.log("love");
    

    productContainer.innerHTML = "";

    // if there is no product in a category button
    if (products.length == 0) {
        productContainer.innerHTML = `
            <div class="group flex flex-col justify-center items-center text-center col-span-full space-y-5 min-h-[400px]">
                <div class=" p-6">
                    <img  src="./assets/alert-error.png" alt="Empty Product Category" class="drop-shadow-md group-hover:drop-shadow-[0_0_10px_rgba(128,0,128,0.8)] transition duration-300" />
                </div>
                <h4 class="bangla text-xl text-[#79716B] font-bold">এই Categoryতে এখনো কোন <span class="english">Product</span> যুক্ত করা হয়নি।</h4>
                <h2 class="bangla text-4xl font-bold">নেক্সট <span class="english"></span>Lesson</span> এ যান</h2>
            </div>
        `;
        hideLoader(); // hide spinner here as well
        return;
    }


    for (let product of products) {
        const productCard = document.createElement("div");
        productCard.innerHTML = ` 
            <!-- trending product cards container  -->
                <div class="grid">
                    <!-- 1st tranding card  -->
                    <div class="trending-card shadow rounded-2xl  overflow-hidden">
                        <div class="w-full product-image bg-[#422AD5]/5 h-54 overflow-hidden flex items-center justify-center">
                            <img src="${product.image}" alt=""  class="h-full object-contain">
                        </div>
                        <div class="p-5 space-y-2">
                            <div class="branding_rating flex text-xs ">
                                <div class="flex-1 text-left  ">
                                    <p class="bg-[#422AD5]/30 text-[#422AD5] inline-block p-1 rounded-lg">${product.category}
                                    </p>
                                </div>
                                <div class=" flex">
                                    <i class="fa-solid fa-star text-[#ffd000]"></i><span>${product.rating.rate} (${product.rating.count})</span>
                                </div>
                            </div>
                            <div class="product-name-price ">
                                <p class="font-semibold line-clamp-2 my-4">${product.title}</p>
                                <p class="font-bold">$${product.price}</p>
                            </div>
                            <div class="details-add-btn flex gap-2">
                                <button class="btn btn-outline flex-1"><i class="fa-regular fa-eye"></i>Details</button>
                                <button class="btn btn-primary flex-1"><i class="fa-solid fa-cart-arrow-down"></i>Add</button>
                            </div>
                        </div>

                    </div>
                </div>
        `;
        productContainer.append(productCard);
    }
    console.log("complete");
    hideLoader(); 
}
