let myLibrary = []
let bookCardsDisplayed = 0
let domRefObj = {
    dialog : document.querySelector(".form-dialog"),
    cancelBtn : document.querySelector(".cancel-btn"),
    addBtn : document.querySelector(".add-btn"),
    titleInput : document.querySelector(".title-input"),
    authorInput : document.querySelector(".author-input"), 
    pagesInput : document.querySelector(".pages-input"),
    finishInput : document.querySelector(".finish-input"),
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

Book.prototype.removeBook = function() {
    domRefObj.booksContainer.removeChild(this.ref)
    const bookIndex = myLibrary.indexOf(this)
    myLibrary.splice(bookIndex, 1) //instead of removing the book card from the DOM, remove it from the library and refresh the display using display books.
    //Maybe remove from library and from DOM without using displayBooks again as it might be too cumbersome in bigger scales (displayBooks removes all book cards from UI and creates them again)
}
Book.prototype.toggleReadAlready = function() {
    this.readAlready = false
    const readAlreadyLi = document.querySelector(`[data-id = "${this.id}"] .read-already`)
    console.log(readAlreadyLi)
    if (readAlreadyLi.textContent == "Finished"){
        readAlreadyLi.textContent = "Not finished"
    } else {
        readAlreadyLi.textContent = "Finished"
    }
}
function addBookToLibrary(title, author, numberOfPages, readAlready){
    let book = new Book(title, author, numberOfPages, readAlready)
    myLibrary.push(book)
    return
}

function displayBooks(arr){
    //When adding a card, displayBooks will be called, removing all cards and creating new display that will suit the altered library. That might be a bad practice in bigger scales of webs...
    if (bookCardsDisplayed > 0){ //increments in 1 for every book displayed in the webpage.
        let allCards = document.querySelectorAll(".book-card")
        allCards.forEach(item => {
            domRefObj.booksContainer.removeChild(item)
        })
        bookCardsDisplayed = 0
    }
    
    let currentBookRef
    let removeBtnArray = []
    let finishBtnArray = []
    for (let i = 0; i < arr.length; i++){
        myLibrary[i].ref = document.createElement("div")
        currentBookRef = myLibrary[i].ref
        currentBookRef.classList.toggle("book-card")
        currentBookRef.dataset.id = myLibrary[i].id // set a "data-id" attribute that will equal the special id set on the Book constructor with "crypto.randomUUID()".
        domRefObj.booksContainer.appendChild(currentBookRef)
        let infoList
        for (let key in myLibrary[i]){
            let bookInfo
            if (key == "title"){
                bookInfo = document.createElement("h2")
                bookInfo.classList.toggle(key)
                currentBookRef.appendChild(bookInfo)
                bookInfo.textContent = `${myLibrary[i][key]}`
            }
            if (key == "author"){
                bookInfo = document.createElement("h3")
                bookInfo.classList.toggle(key)
                currentBookRef.appendChild(bookInfo)
                bookInfo.textContent = `by ${myLibrary[i][key]}` 
            }
            if (key == "numberOfPages") {
                infoList = document.createElement("ul")   
                currentBookRef.appendChild(infoList)
                bookInfo = document.createElement("li")
                bookInfo.classList.toggle("number-of-pages")
                bookInfo.textContent = `Pages: ${myLibrary[i][key]}`
                infoList.appendChild(bookInfo)                
            }
            if (key == "readAlready"){
                bookInfo = document.createElement("li")
                bookInfo.classList.toggle("read-already")
                if (myLibrary[i][key]) bookInfo.textContent = `Finished`
                else bookInfo.textContent = `Not Finished`
                infoList.appendChild(bookInfo)
            }
        }
        //add remove button
        let removeBtn = document.createElement("button")
        removeBtnArray.push(removeBtn)
        removeBtn.setAttribute("type", "button")
        removeBtn.classList.toggle("remove-btn")
        removeBtn.textContent = "remove"
        currentBookRef.appendChild(removeBtn)

        //add read-unread button
        let finishBtn = document.createElement("button")
        finishBtnArray.push(finishBtn)
        finishBtn.setAttribute("type", "button")
        finishBtn.classList.toggle("finish-btn")
        if (myLibrary[i].readAlready) finishBtn.textContent = "Mark unFinished"
        else finishBtn.textContent = "Mark Finished"
        currentBookRef.appendChild(finishBtn)

        bookCardsDisplayed ++
    }
    domRefObj.removeBtns = removeBtnArray
    domRefObj.finishBtns = finishBtnArray
    addEventListenerstoRemoveAndFinish()
}

//Add book card functionality
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
    let read = domRefObj.finishInput.checked
    addBookToLibrary(title, author, pages, read)
    domRefObj.titleInput.value = ""
    domRefObj.authorInput.value = ""
    domRefObj.pagesInput.value = ""
    domRefObj.finishInput.checked = false
    displayBooks(myLibrary)

}

function addEventListenerstoRemoveAndFinish(){
    for (let i = 0; i < domRefObj.removeBtns.length; i++){
        let parentId = domRefObj.removeBtns[i].parentElement.dataset.id
        let bookObjToManipulate = myLibrary.find(obj => obj.id == parentId)
        domRefObj.removeBtns[i].addEventListener("click", () => {
            bookObjToManipulate.removeBook()
        })
        domRefObj.finishBtns[i].addEventListener("click", () => {
            bookObjToManipulate.toggleReadAlready()
            if (domRefObj.finishBtns[i].textContent == "Mark Finished"){
                domRefObj.finishBtns[i].textContent = "Mark Unfinished"
            } else {
                domRefObj.finishBtns[i].textContent = "Mark Finished"
            }
        })
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



