

const GridDropDown = {
    $: {
        gridHeader: document.querySelector(".grid-header"),
        chapterGrid: document.querySelector(".chapter-grid")
    },


    init(){
        this.applyListeners()
    },

    applyListeners(){
        this.$.gridHeader.addEventListener("click", (e) => {
            this.$.chapterGrid.classList.toggle("hidden");
            GridDropDown.$.gridHeader.lastElementChild.classList.toggle("rotate");
        })
    },
}

GridDropDown.init()