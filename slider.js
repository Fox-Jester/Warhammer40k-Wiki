



const Slider = {

    $: {
        radBtn1: document.getElementById("radio1"),
        radBtn2: document.getElementById("radio2"),
        radBtn3: document.getElementById("radio3"),
        radBtn4: document.getElementById("radio4"),

        time: 0,

    },
    
    
    
    init(){
        this.timer()
        this.applyListeners()
    },
    
    timer(){
        Slider.$.time = setInterval(this.slidechange, 8000);
    },
    
    resetTimer(){
        clearInterval(this.$.time)
        Slider.$.time = setInterval(this.slidechange, 8000);
    },

    
    
    applyListeners(){
        
        const btns = [Slider.$.radBtn1, Slider.$.radBtn2, Slider.$.radBtn3, Slider.$.radBtn4]
        
        btns.forEach((btn) => 
            btn.addEventListener("click", (e) => {
                Slider.resetTimer();
            })
        )
    },
    
    slidechange() {
        
        if(Slider.$.radBtn1.checked === true){
            Slider.$.radBtn2.checked = true;
        }
        else if(Slider.$.radBtn2.checked === true){
            Slider.$.radBtn3.checked = true;
        }
        else if(Slider.$.radBtn3.checked === true){
            Slider.$.radBtn4.checked = true;
        }
        else {
            Slider.$.radBtn1.checked = true;
        }
        
    }
    
}




Slider.init()