



const App = {

    $: {
        radBtn1: document.getElementById("radio1"),
        radBtn2: document.getElementById("radio2"),
        radBtn3: document.getElementById("radio3"),
        radBtn4: document.getElementById("radio4"),

        navBar: document.querySelector('#hidden-nav'),
        pageContainer: document.querySelector(".page-container"),

        time: 0,

    },
    
    
    
    init(){
        this.timer()
        this.applyListeners()
    },
    
    timer(){
        App.$.time = setInterval(this.slidechange, 8000);
    },
    
    resetTimer(){
        clearInterval(this.$.time)
        App.$.time = setInterval(this.slidechange, 8000);
    },
    
    applyListeners(){

        this.$.pageContainer.addEventListener("scroll", (e) => {
            if(this.$.pageContainer.scrollTop > 199){
                this.$.navBar.classList.remove("hidden")
            }
            else {
                this.$.navBar.classList.add("hidden")
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