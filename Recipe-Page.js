

const App = {
    
    $: {
        recipeBox: document.querySelector("#recipe-box"),
        searchBar: document.querySelector("#search-bar"),
        searchBtn: document.querySelector("#search-btn"),
        searchGroup: document.querySelector("#search-group"),
        starFilter: document.querySelector("#star-filter"),
        addBtn: document.querySelector("#add-recipe")
        
        
    },

    init() {
        this.loadPage()
        this.recipeCheck()


        this.applyListeners()
    },

    recipeCheck() {
        if(localStorage.getItem("createRecipe") === "true" ) {
            console.log(localStorage.getItem("createRecipe"))
            const newRecipe = new Recipe();
            newRecipe.create();
            
            this.savePage();
            localStorage.setItem("createRecipe", null);
            
        }
            
    },

    nameGrab() {
    },
    
    applyListeners() {
        const deleteBtns = document.querySelectorAll(".delete-btn");
        


            this.$.addBtn.addEventListener("click", (e) => {
                if(this.$.recipeBox.childElementCount < 40){
                    window.location.href = "creation/recipe-creation.html";
                }
                else{
                    alert("Max Recipes")
                }
            })
      
            deleteBtns.forEach((btn) => 
                btn.addEventListener("click", (e) => {
                    if(confirm("are you sure you want to delete?")){
                        const parent = btn.parentElement;
                        parent.parentElement.remove();
                        App.savePage();
                    }
                }));
                
                
                
                this.applyStarListener()   
                this.applyStaredListener()   
            

                const cards = document.querySelectorAll(".card");
                
                cards.forEach((card) =>
                    card.addEventListener("click", (e) =>{
                        if (!((e.target.classList.contains("fa-star")) || (e.target.classList.contains("fa-x")))){
                            const idNum = this.extract(card.id)
                            localStorage.setItem("idData", idNum)
    
                            window.location.href = "view/view.html";

                        }
                    }));
                


                this.$.starFilter.addEventListener("click", (e) => {
                    this.$.starFilter.classList.toggle("fa-regular")
                    this.$.starFilter.classList.toggle("fa-solid")

                    const cards = document.querySelectorAll(".card");
                        cards.forEach(card => {
                    
                        if(!card.classList.contains("stared")){
                            card.classList.toggle("hide");
                        }
                        });
                 
            });
                
                

                this.$.searchBar.addEventListener("keydown", (e) => {
                    if (e.key === "Enter"){
                        App.searchInput();
                    }
                })

                this.$.searchBtn.addEventListener("click", (e) => {
                    App.searchInput();
                              
                })

                this.$.searchBar.addEventListener("input", (e) => {
                    const value = e.target.value
                    if((value === "") && (document.querySelector(".refresh-btn"))){
                        const refreshBtn = document.querySelector(".refresh-btn");
                        refreshBtn.remove()
                        this.searchInput();
                    }
                })
           
    },

    extract(string) {
        const parts = string.split('')
        const lastPart = parts.filter((parts) => Number(parts) || parts === "0");
        return lastPart.join('')
    },


    applyStarListener(){
        const starBtns = document.querySelectorAll(".star-btn")
        
        starBtns.forEach((btn) =>
            btn.removeEventListener("click", (e) => {
             }));

        starBtns.forEach((btn) =>
            btn.addEventListener("click", (e) => {
                btn.parentElement.parentElement.classList.toggle("stared")
                btn.outerHTML = '<i class="fa-solid fa-star stared-btn"></i>'
                App.applyStaredListener()
                App.savePage()
             }));
    },

    applyStaredListener(){
        const staredBtns = document.querySelectorAll(".stared-btn")
        
        staredBtns.forEach((btn) =>
            btn.removeEventListener("click", (e) => {
             }));



        staredBtns.forEach((btn) =>
            btn.addEventListener("click", (e) => {
                btn.parentElement.parentElement.classList.toggle("stared")
                btn.outerHTML = '<i class="fa-regular fa-star star-btn"></i>'
                App.applyStarListener()
                App.savePage()
             }));
    },

  

    searchInput(){
                const cardNames = document.querySelectorAll(".card-name")
                const value = App.whiteSpaceRemove(App.$.searchBar.value);
                const regex = /\S/;

                if((regex.test(value)) && (App.$.searchGroup.childElementCount < 3)) {
                  
                        const refreshBtn = document.createElement("i")
                        refreshBtn.classList.add("fa-solid", "fa-x", "refresh-btn")
                        App.$.searchBar.after(refreshBtn);
    
                        refreshBtn.addEventListener("click", (e) => {
                            App.$.searchBar.value = ""
                            refreshBtn.remove();
                            App.$.searchBar.focus();
                            App.searchInput()
                        })
                    
                }
              
              
               

                cardNames.forEach(name => {
                    const isVisible =  App.whiteSpaceRemove(name.innerHTML).includes(value)
                    name.parentElement.parentElement.classList.toggle("hide", !isVisible)
        })
    },

    cardClicked(){ 
        console.log("card clicked")
    },

    whiteSpaceRemove(value) {
        return value.replace(/\s/g, "");

    },
    
    savePage(){

        localStorage.setItem("pageData", App.$.recipeBox.innerHTML)

    },
    
    loadPage() {
        this.$.recipeBox.innerHTML = localStorage.getItem("pageData");
    },

}



function Recipe() {
    
        this.counter = localStorage.getItem("counterData")

        this.name = localStorage.getItem(`nameData${this.counter}`);
        this.prepDataHour = localStorage.getItem(`prepDataHour${this.counter}`);
        
        this.prepDataMins = localStorage.getItem(`prepDataMins${this.counter}`);
        this.cookDataHour = localStorage.getItem(`cookDataHour${this.counter}`);
        this.cookDataMins = localStorage.getItem(`cookDataMins${this.counter}`);
        this.servingData = localStorage.getItem(`servingData${this.counter}`);
        this.imgData = localStorage.getItem(`imgData${this.counter}`);
        

        
        this.card = document.createElement("div");
        this.card.id = `card${this.counter}`
        this.cardBottom = document.createElement('div')
        this.starBtn = document.createElement("i")
        this.xBtn = document.createElement("i")
        
    
       
        this.imgChanger = function(src) {
            if(src){
                
                return src
            }
            else {
                return "./images/food.png"
            }
        }
        
        this.prepTime = function(hour, min) {
            
            if((hour) && (min)){
                return  `<li>Prep time: ${hour} hours & ${min} mins </li>`
            }
        else if(hour) {
            return  `<li>Prep time: ${hour} hours </li>`
        }
        else if(min) {
            return  `<li>Prep time: ${min} mins </li>`
        }
        else{
            return ""
        }
    }

    this.cookTime = function(hour, min) {
        if((hour) && (min)){
            return  `<li>Cook time: ${hour} hours & ${min} mins </li>`
        }
        else if(hour) {
            return  `<li>Cook time: ${hour} hours </li>`
        }
        else if(min) {
            return  `<li>Cook time: ${min} mins </li>`
        }
        else{
            return ""
        }
    
    }

    this.servings = function(servings) {
        if(servings) {
            return `<li> Servings: ${servings} </li>`
        }
        else {
            return ""
        }
    }
    
    this.create = function(){
       
        this.card.classList.add("card")

        this.cardBottom.classList.add("card-bottom")
        this.starBtn.classList.add("fa-regular", "fa-star", "star-btn")
        this.xBtn.classList.add("fa-solid", "fa-x", "delete-btn") 

        this.cardBottom.appendChild(this.starBtn);
        this.cardBottom.appendChild(this.xBtn);
        
        this.card.innerHTML = ` <div class="card-name-block">
            <h4 class="card-name">${this.name}</h4>
            </div>
            <img class="img-preview" src="${this.imgChanger(this.imgData)}" alt="" />
            <ul class="card-list">
            
            ${this.prepTime(this.prepDataHour, this.prepDataMins)}
           
            
            ${this.cookTime(this.cookDataHour, this.cookDataMins)}
            
            ${this.servings(this.servingData)}
            </ul>
            `
            this.card.appendChild(this.cardBottom);
            App.$.recipeBox.appendChild(this.card)
    }


    }

  
    App.init()

