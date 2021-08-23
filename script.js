const span = document.getElementById("target");

let assignedElement = null; //document.getElementById('h1');
let assigning = false;

console.log("**Click Bind Extension (CBE) loaded");

// looking for keystrokes
// Insert = assign new element
// \ = click assigned element
document.addEventListener("keydown", (e) => {
    const key = e.key;
    // console.log("**CBE -> Key pressed: " + key);
    if(key === "Insert"){
        console.log("**CBE -> Click any element to assign it");
        assigning = true;
    }else if(key === "\\"){
        click();
    }else{
        console.log("**CBE -> Other key pressed");
    }
});

document.addEventListener("click", (e) => {
    const clickTarget = e.target;
    if(assigning){
        assign(clickTarget);
        assigning = false;
    }
});

function click(){
    if(!assignedElement){
        console.log("**CBE -> No element assigned");
        return;
    }
    assignedElement.dispatchEvent(new MouseEvent('click',{
        bubbles: true,
        cancelable: true,
        view: window
    }));
    console.log(`**CBE -> ${assignedElement} clicked`);
}

function assign(el){
    if(assignedElement)
        assignedElement.classList.remove("target");

    //grab new element and highlight
    assignedElement = el;
    assignedElement.classList.add("target");

    console.log("**CBE -> assignment succesful")
}