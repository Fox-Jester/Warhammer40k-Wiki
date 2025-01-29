



const App = {

    $: {
        radBtn1: document.getElementById("radio1"),
        radBtn2: document.getElementById("radio2"),
        radBtn3: document.getElementById("radio3"),
        radBtn4: document.getElementById("radio4"),

        menuWrap: document.querySelector('#menu-wrap'),
        pageContainer: document.querySelector(".page-container"),

        mobileBtn: document.querySelector(".mobile-btn-box"),
        linkContainer: document.querySelector(".link-container"),

        dropdowns: document.querySelectorAll(".dropdown"),


        time: 0,

    },
    
    
    
    init(){
        this.timer()
        this.applyListeners()
        this.sizeCheck()
    },
    
    timer(){
        App.$.time = setInterval(this.slidechange, 8000);
    },
    
    resetTimer(){
        clearInterval(this.$.time)
        App.$.time = setInterval(this.slidechange, 8000);
    },

    sizeCheck(){
        if(window.innerWidth < 481){
            App.$.menuWrap.classList.add("sticky")
        }
    },
    
    applyListeners(){

        window.addEventListener("resize", (e) => {
            if(window.innerWidth < 481) {
                App.$.menuWrap.classList.add("sticky")
            }
            else{
                App.$.menuWrap.classList.remove("sticky")
            }
        })
      
        App.$.mobileBtn.addEventListener("click", (e) => {
            App.$.mobileBtn.lastElementChild.classList.toggle("rotate");
            App.$.linkContainer.classList.toggle("reveal-flex")
            
        })

       

        App.$.dropdowns.forEach((dropdown) => {
            dropdown.addEventListener("click", (e) => {
                dropdown.children[1].classList.toggle("rotate")


                dropdown.lastElementChild.classList.toggle("reveal-flex");
            
            })
        })
        
        

        this.$.pageContainer.addEventListener("scroll", (e) => {
            if(this.$.pageContainer.scrollTop > 199){
                this.$.menuWrap.classList.add("sticky")
            }
            else if (window.innerWidth >= 481) {
                this.$.menuWrap.classList.remove("sticky")
            }
        })
        
        
        const btns = [App.$.radBtn1, App.$.radBtn2, App.$.radBtn3, App.$.radBtn4]
        
        btns.forEach((btn) => 
            btn.addEventListener("click", (e) => {
                App.resetTimer();
            })
        )
    },
    
    slidechange() {
        
        if(App.$.radBtn1.checked === true){
            App.$.radBtn2.checked = true;
        }
        else if(App.$.radBtn2.checked === true){
            App.$.radBtn3.checked = true;
        }
        else if(App.$.radBtn3.checked === true){
            App.$.radBtn4.checked = true;
        }
        else {
            App.$.radBtn1.checked = true;
        }
        
    }
    
}




App.init()