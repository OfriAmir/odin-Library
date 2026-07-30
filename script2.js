let myLibrary = []
let bookCardsDisplayed = 0
let domRefObj = {
    dialog : document.querySelector(".form-dialog"),
    cancelBtn : document.querySelector(".cancel-btn"),
    addBtn : document.querySelector(".add-btn"),
    titleInput : document.querySelector(".title-input"),
    authorInput : document.querySelector(".author-input"), 
    pagesInput : document.querySelector(".pages-input"),
    readInput : document.querySelector(".read-input"),
    body : document.querySelector("body"),
}

function addElementToDOM(refName,elementType,className,parentRef) {
    domRefObj[refName] = document.createElement(elementType);
    if (className) domRefObj[refName].classList.toggle(className);
    parentRef.appendChild(domRefObj[refName]);
}

addElementToDOM("booksContainer","div","books-container",domRefObj.body)
addElementToDOM("newBtn", "button", "new-button", domRefObj.body)
domRefObj.newBtn.textContent = "New"


//Object constructor which is called to create an object for any book in the library.
function Book(title, author, numberOfPages, readAlready){
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.readAlready = readAlready;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, numberOfPages, readAlready){
    let book = new Book(title, author, numberOfPages, readAlready)
    myLibrary.push(book)
    return
}

function displayBooks(arr){
    //When adding or removing a card, displayBooks will be called, removing all cards and creating new display that will suit the altered library.
    if (bookCardsDisplayed > 0){ //increments in 1 for every book displayed in the webpage.
        let allCards = document.querySelectorAll(".book-card")
        allCards.forEach(item => {
            domRefObj.booksContainer.removeChild(item)
        })
        bookCardsDisplayed = 0
    }
    
    let currentBookRef

    for (let i = 0; i < arr.length; i++){
        myLibrary[i].ref = document.createElement("div")
        currentBookRef = myLibrary[i].ref
        currentBookRef.classList.toggle("book-card")
        domRefObj.booksContainer.appendChild(currentBookRef)
        let isFirstIteration = true
        let infoList
        for (let key in myLibrary[i]){
            let bookInfo
            if (key == "title"){
                bookInfo = document.createElement("h2")
                currentBookRef.appendChild(bookInfo)
                bookInfo.textContent = `${myLibrary[i][key]}`
            }
            if (key == "author"){
                bookInfo = document.createElement("h3")
                currentBookRef.appendChild(bookInfo)
                bookInfo.textContent = `${myLibrary[i][key]}` 
            }
            if (key == "numberOfPages") {
                infoList = document.createElement("ul")   
                currentBookRef.appendChild(infoList)
                isFirstIteration = false
            }
            if (key == "numberOfPages"){ 
                bookInfo = document.createElement("li")
                bookInfo.textContent = `Pages: ${myLibrary[i][key]}`
                infoList.appendChild(bookInfo)
            }
            if (key == "readAlready"){
                bookInfo = document.createElement("li")
                if (myLibrary[i][key]) bookInfo.textContent = `Finished`
                else bookInfo.textContent = `Not Finished`
                infoList.appendChild(bookInfo)
            }
            bookCardsDisplayed ++
        }
    }
}



addBookToLibrary("h","hfa afafa fafafaaf aafafa fafaafafaaf aafaf aa","h","h")
addBookToLibrary("h","hfa afafa fafafaaf aafafa fafaafafaaf aafaf aa","h","h")
addBookToLibrary("h","hfa afafa fafafaaf aafafa fafaafafaaf aafaf aa","h","h")
addBookToLibrary("h","hfa afafa fafafaaf aafafa fafaafafaaf aafaf aa","h","h")
addBookToLibrary("h","hfa afafa fafafaaf aafafa fafaafafaaf aafaf aa","h","h")
addBookToLibrary("h","hfa afafa fafafaaf aafafa fafaafafaaf aafaf aa","h","h")
addBookToLibrary("h","hfa afafa fafafaaf aafafa fafaafafaaf aafaf aa","h","h")

//You stopped at creating objects for DOM elements and event listeners in 260727. Please continue from that.
displayBooks(myLibrary)


domRefObj.newBtn.addEventListener('click', () => {
    domRefObj.dialog.showModal()
})
domRefObj.cancelBtn.addEventListener('click', () => {
    domRefObj.dialog.close()
})
domRefObj.addBtn.addEventListener('click', (e) => {
    addNewBook()
    domRefObj.dialog.close()
})
function addNewBook () {
    let title = domRefObj.titleInput.value
    let author = domRefObj.authorInput.value
    let pages = domRefObj.pagesInput.value
    let read = domRefObj.readInput.value
    addBookToLibrary(title, author, pages, read)
    domRefObj.titleInput.value = ""
    domRefObj.authorInput.value = ""
    domRefObj.pagesInput.value = ""
    domRefObj.readInput.checked = false
    displayBooks(myLibrary)
}

// function removeBook ()