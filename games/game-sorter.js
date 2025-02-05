


const GameSorter = {

    $: {
        gameContainer: document.querySelector(".game-container"),

        gameGroups: document.querySelectorAll(".game-group"),
        gameNames: document.querySelectorAll(".game-name"),
        filterGroups: document.querySelectorAll(".filter-group"),

        filterBtn: document.querySelector("#filter-btn"),
        filterTags: document.querySelectorAll(".filter-tag"),

        searchBtn: document.querySelector("#search-btn"),
        searchBar: document.querySelector("#search-bar"),

        positionArray: [],
    },


    init(){
        this.applyListeners()
    },


    applyListeners(){
        this.$.filterBtn.addEventListener("click", (e) => {
            this.wipe()
            this.filterToggle()
            GameSorter.search()
        })
        this.$.searchBtn.addEventListener("click", (e) => {
            GameSorter.search()
        })
        this.$.searchBar.addEventListener("keydown", (e) => {
            if(e.key === "Enter"){
                GameSorter.search()
            }
        })
    },

    search(){
        const value = this.$.searchBar.value.replace(/\s/g, "").toLowerCase()
        const regex = /\S/;

        this.$.gameNames.forEach(name => {
            const realName = name.innerHTML.toLowerCase()
            const isVisible = realName.replace(/\s/g, "").includes(value)
            name.parentElement.classList.toggle("hidden", !isVisible)
        })
        
        this.hiddenGroupCheck();
    },

    hiddenGroupCheck(){
        this.$.filterGroups.forEach(filGroup => {
            let gameGroups = filGroup.querySelectorAll(".game-group");
            const groupNum = gameGroups.length
            let hidden = 0
            gameGroups.forEach(group => {
                
                if(group.classList.contains("hidden")){
                    hidden++
                }
            })
            
            if(hidden === groupNum){
                filGroup.classList.add("hidden")
            }
            else{
                filGroup.classList.remove("hidden")
            }

        })
    },

    filterToggle(){

        this.$.filterTags.forEach(tag => {
            tag.classList.toggle("hidden")
        })

        if(GameSorter.$.filterBtn.classList.contains("letter")){
            GameSorter.$.filterBtn.classList.remove("letter");
            GameSorter.$.filterBtn.classList.add("number");
            this.numberFilter()
        }
        else{
            GameSorter.$.filterBtn.classList.remove("number");
            GameSorter.$.filterBtn.classList.add("letter");
            this.letterFilter()
        }

        
    },

    wipe(){
        this.$.filterGroups.forEach(group => {
            group.remove()
        })
    },

    refreash(){
        this.$.filterGroups = document.querySelectorAll(".filter-group")
        this.$.gameGroups = document.querySelectorAll(".game-group")
        this.$.gameNames = document.querySelectorAll(".game-name")
        this.$.positionArray = []

    },

    numberFilter(){
        this.subDateFinder();
        this.numArrayConverter();
        this.gameGroupAssignerNum();
        this.refreash()
    },

    letterFilter(){
        this.letterFinder();
        this.letArrayConverter();
        this.gameGroupAssignerLet();
        this.refreash()
    },
    
    subDateFinder(){
        
        this.$.gameGroups.forEach(gameGroup => {
            let name = gameGroup.lastElementChild
            this.datify(name.classList.value.substring(10));
        })
    },
    
    letterFinder(){
        this.$.gameGroups.forEach(gameGroup => {
            let name = gameGroup.lastElementChild
            let trimed = name.innerHTML.trim();
            this.letterify(trimed.substring(0, 1));
        })
    },

    datify(subDate){
        if(subDate === "tba"){
            this.tbaChecker(subDate);
        }
        else{
            this.$.positionArray.push(`00${subDate}`);
            this.$.positionArray.sort((a, b) => b - a)
        }
    },

    letterify(letter){
        this.$.positionArray.push(letter);
        this.$.positionArray.sort()
    },


    numArrayConverter(){
        this.$.positionArray.forEach(num => {
            this.numFilterGroupCreator(num);
        })
    },

    letArrayConverter(){
        this.$.positionArray.forEach(letter => {
            this.letFilterGroupCreator(letter);
        })
    },

    numFilterGroupCreator(num){
        if(this.groupChecker(num)){
            
            const filterGroup = document.createElement("div");
            const gameBox = document.createElement("div");
            const filterNumber = document.createElement("h4");

            filterGroup.classList.add("filter-group");
            gameBox.classList.add("game-box");
            filterNumber.classList.add("filter-number");

            filterNumber.innerHTML = num

            filterGroup.appendChild(filterNumber);
            filterGroup.appendChild(gameBox);

            GameSorter.$.gameContainer.appendChild(filterGroup);
        }
    },

    letFilterGroupCreator(letter){
        if(this.groupChecker(letter)){
            
            const filterGroup = document.createElement("div");
            const gameBox = document.createElement("div");
            const filterLetter = document.createElement("h4");

            filterGroup.classList.add("filter-group");
            gameBox.classList.add("game-box");
            filterLetter.classList.add("filter-letter");

            filterLetter.innerHTML = letter

            filterGroup.appendChild(filterLetter);
            filterGroup.appendChild(gameBox);

            GameSorter.$.gameContainer.appendChild(filterGroup);
        }
    },

    tbaChecker(tba){
        let counter = 0
        const groups = document.querySelectorAll(".filter-group");
        groups.forEach(group => {
            const filterNumber = group.firstChild;
            
            if(filterNumber.innerHTML === tba){
                counter++
            }
            
        })
        
        if(counter === 0){
            
            const filterGroup = document.createElement("div");
            const gameBox = document.createElement("div");
            const filterNumber = document.createElement("h4");

            filterGroup.classList.add("filter-group");
            gameBox.classList.add("game-box");
            filterNumber.classList.add("filter-number");

            filterNumber.innerHTML = tba

            filterGroup.appendChild(filterNumber);
            filterGroup.appendChild(gameBox);

            GameSorter.$.gameContainer.appendChild(filterGroup);
        }

    },

    groupChecker(filterE){
        let counter = 0
        const groups = document.querySelectorAll(".filter-group");
        
        
        
        groups.forEach(group => {
            const filterElement = group.firstChild;
            

            if(filterElement.innerHTML === filterE){
                counter++
            }
        }) 
        if (counter > 0){
            return false
        }
        else {
            return true
        }
        
    },

  

    gameGroupAssignerNum(){
        this.$.gameGroups.forEach(gamegroup => {
            let name = gamegroup.lastElementChild
            let date = name.classList.value.substring(10);
            if(date === 'tba'){
                const filterNumbers = document.querySelectorAll(".filter-number")
                filterNumbers.forEach(filterNum => {
                    if(filterNum.innerHTML === date){
                        const parent = filterNum.parentElement
                        parent.lastElementChild.appendChild(gamegroup);
                    }
                })
            }
            else{
                let Fulldate = `00${date}`
                const filterNumbers = document.querySelectorAll(".filter-number")
                filterNumbers.forEach(filterNum => {
                    if(filterNum.innerHTML === Fulldate){
                        const parent = filterNum.parentElement
                        parent.lastElementChild.appendChild(gamegroup);
                    }
                })

            }
        })
    },

    gameGroupAssignerLet(){
        this.$.gameGroups.forEach(gamegroup => {
            let name = gamegroup.lastElementChild
            let letter = name.innerHTML.trim().substring(0, 1);

                const filterLetters = document.querySelectorAll(".filter-letter")
                filterLetters.forEach(filterletter => {
                    if(filterletter.innerHTML === letter){
                        const parent = filterletter.parentElement
                        parent.lastElementChild.appendChild(gamegroup);
                    }
                })

            
        })
    },
    
}

GameSorter.init()