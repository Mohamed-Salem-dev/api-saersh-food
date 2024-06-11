let allRecipes = []; // 2	 // dataعلشان استلام ال Array عملت 
let recipeDetails = {};	//7	// Object جاي ع Api علشان هو في ال Object انا هستلم في 

let searchInput = document.getElementById('searchInput');	// 4
let searchBtn = document.getElementById('searchBtn');	// 4

async function getRecipes(term) {	// 1
	let apiResponse =  await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${term}`);
	allRecipes = await apiResponse.json();
	allRecipes = allRecipes.recipes;
	//console.log(allRecipes);
	displayRecipes();
}
getRecipes("Beef");	//ده انا ممكن اعملها او لا

function displayRecipes() {	// 3	// ده للعررض اللي ع الشمال 
	let cartoona = ``;
	
	for (let i=0; i < allRecipes.length; i++) {
		let myId = "'"+allRecipes[i].recipe_id+"'";	// String ده بيقي في ارقام ف انا هخالي كل idده علشان لم بضغط ع صوره مش بيظهر بسباب ال 
		cartoona += `<div class="col-md-4">
						<div class ="recipe" onclick="getRecipeDetails(${myId})">
								<img class="w-100" src = "${allRecipes[i].image_url}" alt = "">
								<h3 class="color-mine py-1">${allRecipes[i].title}</h3>
								<p>${allRecipes[i].publisher}</p>
							</div>
						</div>`;	//8	// ده علشان لم اضغط ع اي صوره يجيب المواصفات بتاعت ع اليمين onclick
									// idابعت معاه ال getRecipeDetailsال coll انا كده بقول لم اضغط ع الصوره 
	}
	document.getElementById('recipesRow').innerHTML = cartoona; // rowاللي في ال recipesRow اللي اسم idانا كده بقول هات ال 
}

//=======================
// buttonده علشان لم ابحث واضغط ع ال 
searchBtn.addEventListener("click" , function(){	// 5	// getRecipes بتاع searchاعمل ال searchBtn لم اضغط ع 
	// window.alert('Hello');	
	getRecipes(searchInput.value);	// inputال search انا كده بقول ابعت الكلمه اللي اتكتبت في searchInput.valueوال Apiبتاع ال getRecipesال collانا ب
})

//=======================
//6	// ده علشان لم اضغط علي اي اكله معاينه يظهر بتفصيل في الجانب اليمين
async function getRecipeDetails(id) {	
	let apiResponse =  await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
	recipeDetails = await apiResponse.json();
	recipeDetails = recipeDetails.recipe;
	//console.log(recipeDetails);
	displayRecipeDetails();
}
//getRecipeDetails(47746); //ده انا ممكن اعملها او لا

function displayRecipeDetails() { // 7	// ده للعررض اللي ع اليمين واصفات الاكل 
	let cartoona2 = ``;
	for(let x of recipeDetails.ingredients)
	{
		cartoona2 +=`<li class="d-flex py-2 align-items-center font-weight-bolder"><span class="fa-li"><i class="fas fa-utensil-spoon"></i></span>${x}</li>`;//ingredients ده علشان هتمشي واحده واحده علي xال
	}
	let cartoona =`<div class="recipeDetails py-3">
						<h2 class="color-mine py-1">${recipeDetails.title}</h2>
						<img src= "${recipeDetails.image_url}" class="w-100" alt="">
						
						<ul class="fa-ul py-3">
							${cartoona2}
						</ul>
					</div>`;
	document.getElementById('recipeDetails').innerHTML = cartoona;
}

