showNotes();

// adding a note
let addBtn = document.getElementById(`addBtn`);
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById(`addTxt`);
    let noteName = document.getElementById('noteName');
    let notes = localStorage.getItem(`notes`);
    let titles = localStorage.getItem('titles');
    // all notes will be stored in an array of name notesObj
    if (notes == null) {
        notesObj = []
        titleObj = []
    }
    else {
        notesObj = JSON.parse(notes);
        titleObj = JSON.parse(titles);
    }
    notesObj.push(addTxt.value);
    titleObj.push(noteName.value);
    localStorage.setItem(`notes`, JSON.stringify(notesObj));
    localStorage.setItem('titles',JSON.stringify(titleObj));
    addTxt.value = ""; // reseting the text area
    noteName.value = "";
    // console.log(notesObj);

    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem(`notes`);
    let titles = localStorage.getItem('titles');
    if (notes == null) {
        notesObj = []
        titleObj = []
    }
    else {
        notesObj = JSON.parse(notes);
        titleObj = JSON.parse(titles);
    }
    let html = ``;
    notesObj.forEach(function (element, index) {
        let noteName = titleObj[index];
        html += `
            <div class=" noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${noteName}</h5>
                    <p class="card-text">${element}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>
    `;
    });
    let elem = document.getElementById('notes');
    if(notesObj.length != 0){
        elem.innerHTML = html;
    }
    else{
        elem.innerHTML = `No notes till now.`;
    }

}

// function to delete a note
function deleteNote(index){
    // console.log(`note deleted`);
    let notes = localStorage.getItem(`notes`);
    let titles = localStorage.getItem('titles')
    if (notes == null) {
        notesObj = []
        titleObj = []
    }
    else {
        notesObj = JSON.parse(notes);
        titleObj = JSON.parse(titles);
    }
    notesObj.splice(index, 1);
    titleObj.splice(index, 1);
    localStorage.setItem(`notes`, JSON.stringify(notesObj));
    localStorage.setItem(`titles`, JSON.stringify(titleObj));
    showNotes();

}

let search = document.getElementById('searchTxt');
search.addEventListener('input', function(){
    let inputVal = search.value.toLowerCase();
    let notecards = document.getElementsByClassName('noteCard');
    Array.from(notecards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText; //cardTxt is element(gebt gives html collection, so mentioning index is necessary to get single element), .innerText converts it to text format
        cardTxt.toLowerCase();
        if(cardTxt.includes(inputVal)){
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
        }
    })
})