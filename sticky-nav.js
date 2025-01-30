


const Nav = {
    $: {
        menuWrap: document.querySelector('#menu-wrap'),
        pageContainer: document.querySelector(".page-container"),
        mobileBtn: document.querySelector(".mobile-btn-box"),
        linkContainer: document.querySelector(".link-container"),
        dropdowns: document.querySelectorAll(".dropdown"),
        buffer: document.querySelector(".buffer"),
    },

    init(){
        this.sizeCheck();
        this.applyListeners();
    },

    applyListeners(){


        window.addEventListener("resize", (e) => {
            if(window.innerWidth < 481) {
                Nav.$.menuWrap.classList.add("sticky")
            }
            else{
                Nav.$.menuWrap.classList.remove("sticky")
            }
        })

        Nav.$.mobileBtn.addEventListener("click", (e) => {
            Nav.$.mobileBtn.lastElementChild.classList.toggle("rotate");
            Nav.$.linkContainer.classList.toggle("reveal-flex")
            
        })

        Nav.$.dropdowns.forEach((dropdown) => {
            dropdown.addEventListener("click", (e) => {
                dropdown.children[1].classList.toggle("rotate")


                dropdown.lastElementChild.classList.toggle("reveal-flex");
            
            })
        })


        this.$.pageContainer.addEventListener("scroll", (e) => {
            console.log(this.$.pageContainer.scrollTop )
            if(this.$.pageContainer.scrollTop > 400){
                this.$.buffer.classList.add("buff")
                this.$.menuWrap.classList.add("sticky")
            }
            else if (window.innerWidth >= 481) {
                this.$.menuWrap.classList.remove("sticky")
                this.$.buffer.classList.remove("buff")
            }
        })
        
    },

    sizeCheck(){
        if(window.innerWidth < 481){
            Nav.$.menuWrap.classList.add("sticky")
        }
    },
}


Nav.init()