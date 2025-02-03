const Contentbox = {

    $: {
        contentHeaders: document.querySelectorAll(".content-header"),
      
    },

    init() {
        this.applyListeners()
    },

    applyListeners(){
        Contentbox.$.contentHeaders.forEach((header) => {
            header.addEventListener("click", (e) => {
                header.lastElementChild.classList.toggle("rotate")
                header.classList.toggle('flat')
                const contentBox = header.parentElement;
                contentBox.lastElementChild.classList.toggle("hidden")
                
            })
        })
    },


}

Contentbox.init()