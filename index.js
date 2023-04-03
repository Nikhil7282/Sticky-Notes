const notesContainer =document.getElementById('app');
const addNoteButton=notesContainer.querySelector(".add-note");

getNotes().forEach(note =>{
    const noteElement =createNoteElement(note.id,note.content);
    notesContainer.insertBefore(noteElement,addNoteButton);
});

addNoteButton.addEventListener("click",()=>addNote());


function getNotes(){
    return JSON.parse(localStorage.getItem("stickynotes-notes")||"[]");
}


function saveNotes(notes){
    localStorage.setItem("stickynotes-notes",JSON.stringify(notes));
}

function createNoteElement(id,content){
    const element= document.createElement("textarea");
    // const val=Date.now()
    element.classList.add("note");
    element.value=content;
    element.placeholder="Empty";
    // element.setAttribute('id',val);
    element.addEventListener("change",()=>{
        updateNotes(id,element.value);
    });

    element.addEventListener("dblclick",()=>{
        const doDelete=confirm("Are you sure you wish to delete the note ?");

        if(doDelete){
            deleteNote(id,element,val);
        }
    });

    return element;
}


function addNote(){
    const notes=getNotes();
    const noteObject={
        id:Math.floor(Math.random()*100000),
        content:""
    };

    const noteElement=createNoteElement(noteObject.id,noteObject.content);
    notesContainer.insertBefore(noteElement,addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);
}

function updateNotes(id,newcontent){
    const notes=getNotes();
    const targetNote=notes.filter(note => note.id==id)[0];

    targetNote.content=newcontent;
    saveNotes(notes);
}
function deleteNote(id,element){
    const notes=getNotes().filter(note => note.id !=id);
    saveNotes(notes);
    // console.log(element)
    // console.log(val);
    // if(val===element.id)
    notesContainer.removeChild(element);
}