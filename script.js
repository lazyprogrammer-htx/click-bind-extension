let assignedElement = null;
let serviceUnitStops = null;
let tooltipDivs = null;
let assigning = false;

printLog("Loaded up cuz");


// looking for keystrokes
// Insert = assign new element
// \ = click assigned element
document.addEventListener("keydown", (e) => {
    const key = e.key;
    // console.log("**CBE -> Key pressed: " + key);
    if(key === "Insert"){
        printLog("Click any element to assign it");
        assigning = true;
    }else if(key === "\\"){
        
        // //test code vv
        // const query = document.querySelector("#service_order_address_line1").value + ", " +
        // document.querySelector("#service_order_city").value + ", " +
        // document.querySelector("#service_order_state").value + ", " +
        // document.querySelector("#service_order_zipcode").value;
        // printLog("search this-> "+query);


        //keep this
        click();
    }else{
        printLog("Other key pressed " + key);
        // printLog(e);
    }
});
/*
document.addEventListener("dblclick", (e) => {
    if (document.activeElement.id === "edit_setup_time"){
        document.activeElement.value = 12;
    }
});


document.addEventListener("click", (e) => {
    const clickTarget = e.target;
    if(assigning){
        assign(clickTarget);
        assigning = false;
    }else if (document.activeElement.id === "edit_setup_time"){
        printLog("detected setuptime input box!");
        const setupTimeInputBox = document.activeElement;

        const form = setupTimeInputBox.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        const lockButtonList = form.querySelectorAll(".service_time_lock");
        const submitButtonList = form.querySelectorAll("#submitButtonSetupTime");
        const lockButton = lockButtonList[0];
        const submitButton = submitButtonList[0];

        printLog(form);
        printLog(lockButton);
        printLog(submitButton);

        const temp = parseInt(setupTimeInputBox.value);
        setupTimeInputBox.value = temp + 15;

        setupTimeInputBox.addEventListener("keydown", (e) => {
            const key = e.key;
            if(key === "Enter"){
                
                lockButton.dispatchEvent(new MouseEvent('click',{
                    bubbles: true,
                    cancelable: true,
                    view: window
                }));
                // submitButton.dispatchEvent(new MouseEvent('click',{
                //     bubbles: true,
                //     cancelable: true,
                //     view: window
                // }));
                e.preventDefault();
            }
        });
        setupTimeInputBox.removeEventListener("keydown", (e) => { });

        //lock button to click <a href="#" class="pull-left service_time_lock mt-10 routeUnlocked" style="cursor:pointer;width: 14px;height: 14px;" title="Service Time is Locked. Click to Unlock"></a>
        //submit button <input class="btn btn-primary" id="submitButtonSetupTime" name="commit" type="submit" value="Save">
    }
});
*/

function printLog(str){
    console.log("***** CBE *****");
    console.log(str);
    console.log("**********");
}

function click(){
    if(!assignedElement){
        printLog("No element assigned");
        return;
    }
    assignedElement.dispatchEvent(new MouseEvent('click',{
        bubbles: true,
        cancelable: true,
        view: window
    }));
    printLog(`Clicked = ${assignedElement}`);
}

function assign(el){
    if(assignedElement)
        assignedElement.classList.remove("target");

    //grab new element and highlight
    assignedElement = el;
    // assignedElement.classList.add("target");

    const elementId = assignedElement.getAttribute("id");
    printLog(`elementid = ${elementId}`);

    // if(elementId.match(/time_\d+/).index >= 0){
    //     printLog("calc button detekted");
    //     const assignedServiceUnit = elementId.substring(5);
    //     printLog("service id = "+assignedServiceUnit);
    //     const ul = document.getElementById(`unit_orders_${assignedServiceUnit}`)
    //     serviceUnitStops = ul.children;
    //     // printLog(serviceUnitStops);
    //     tooltipDivs = [];
    //     for(let i = 0; i < serviceUnitStops.length; i++){
    //         let stop = serviceUnitStops[i];

    //         const id = stop.getAttribute("id");
    //         printLog("route stop id# "+id);
            

    //         let psssh = stop.querySelector("fieldset").children[1].querySelector(".order_info_tooltip");
    //         tooltipDivs[i] = psssh;

    //         let helper3 = psssh.innerHTML.split("aria-describedby=\"");
    //         let psssh2 = document.getElementById(helper3[1].substring(0,helper3[1].indexOf("\"")));
    //         let info = psssh2.querySelector(".ui-tooltip-content");
    //         printLog(info);

    //         stop.appendChild(info);
    //     }
        
    //     console.log(ul);
    // }else{
    //     printLog("not calc button");
    // }
    printLog("Assignment succesful");
}


// document.addEventListener("keydown", (e) => {
//     const key = e.key;
//     console.log("**testing -> Key pressed: " + key);
//     if(key === "\\"){
//        const query = document.querySelector("#service_order_address_line1").value + ", " +
//         document.querySelector("#service_order_city").value + ", " +
//         document.querySelector("#service_order_state").value + ", " +
//         document.querySelector("#service_order_zipcode").value;
//         console.log("search this-> "+query);
//     }
// });




// else if(key ==="="){
//     // printLog(" = pressed")
//     const inputBox = document.activeElement;
//     printLog(inputBox);
//     if(inputBox.id === "edit_setup_time"){
//         printLog("in the setup time input");
//         // inputBox.parentElement.focus();
//         // inputBox.value = 0;

//         let setTime = null;
//         //while true
//         inputBox.addEventListener("keydown",(e) => {
//             const key = e.key;
//             printLog("insid event listenter" + key);
            
//             if(key === "1"){
//                 setTime = 27;
//             }
//         });
        
//         inputBox.removeEventListener("keydown", (e) => { });

//         inputBox.value = setTime;

//     }
// }
