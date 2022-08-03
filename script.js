let assignedElement = null;
let serviceUnitStops = null;
let tooltipDivs = null;
let assigning = false;

let lastKeyPressed = null;

let testDiv = null;

printLog("Loaded up cuz");


// looking for keystrokes
// Insert = assign new element
// \ = click assigned element
document.addEventListener("keydown", (e) => {
    const key = e.key;
    console.log("**CBE -> Key pressed: " + key);
    if(key === "Insert"){
        printLog("Click any element to assign it");
        assigning = true;
    }else if(key === "\\"){
        click();
    }else{
        printLog("Other key pressed " + key);
        // printLog(e);
    }
});

document.addEventListener("dblclick", (e) => {
    if (document.activeElement.id === "edit_setup_time"){
        document.activeElement.value = 12;
    }else{
        if (document.activeElement.id === "edit_start_time"){
            document.activeElement.value = "7:00 AM";
        }
    }
});

document.addEventListener("auxclick", (e) => {
    click();
    e.preventDefault();
});



document.addEventListener("click", (e) => {
    const clickTarget = e.target;
    //printLog("click on element id =  "+clickTarget.id+" "+clickTarget.classList);

    if(clickTarget.id === "service_order_address_line1"){
        const query = document.querySelector("#service_order_address_line1").value + ", " +
        document.querySelector("#service_order_city").value + ", " +
        document.querySelector("#service_order_state").value + ", " +
        document.querySelector("#service_order_zipcode").value;
        //printLog("search this-> "+query);

        const searchLink = document.createElement("a");
        searchLink.target = "_BLANK";
        searchLink.href = "https://www.google.com/search?q="+encodeURI(query);
        searchLink.text = "Google Search";
        searchLink.style.marginLeft = "20px";

        const searchLink2 = document.createElement("a");
        searchLink2.target = "_BLANK";
        searchLink2.href = "https://duckduckgo.com/?q="+encodeURI(query)+"&t=h_&ia=web&iaxm=maps";
        searchLink2.text = "DuckDuckGo Maps";
        searchLink2.style.marginLeft = "20px";

        clickTarget.parentNode.insertBefore(searchLink2, clickTarget);        
        clickTarget.parentNode.insertBefore(searchLink, clickTarget);        
    }else 
    if (document.activeElement.id === "edit_setup_time"){
        const setupTimeInputBox = document.activeElement;
        var temp = parseInt(setupTimeInputBox.value);
        printLog(temp);
        if(temp < 27){
            printLog("less than 27, so setting to 27");
            setupTimeInputBox.value = 27;
        }else{
            temp -= 12;
            while (temp % 15 > 0){
                printLog("inc temp = "+ temp++);
            }
            setupTimeInputBox.value = temp + 15 + 12;;
        }
    }else
    if(assigning){
        assign(clickTarget);
        assigning = false;
    }else
    if (document.activeElement.id === "edit_start_time"){
        const startTimeInputBox = document.activeElement;
        const oldTime = startTimeInputBox.value.split(" ");
        const ampm = oldTime[1];
        const numsOfOldTime = oldTime[0].split(":");
        const hrs = parseInt(numsOfOldTime[0]);
        let mins = parseInt(numsOfOldTime[1]);
        while(mins % 15 > 0)
            mins --;
        let newHrs = 0;
        let newMins = 0;
        if(mins + 15 >= 60){
            newHrs = hrs + 1;
            newMins = mins + 15 - 60;
        }else{
            newHrs = hrs;
            newMins = mins + 15;
        }
        startTimeInputBox.value = `${newHrs}:${newMins} ${ampm}`;
    }
});

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
    assignedElement.classList.add("target");

    const elementId = assignedElement.getAttribute("id");
    printLog(`elementid = ${elementId}`);

    if(elementId.match(/time_\d+/).index >= 0){
        printLog("calc button detekted");
        const assignedServiceUnit = elementId.substring(5);
        printLog("service id = "+assignedServiceUnit);
        const ul = document.getElementById(`unit_orders_${assignedServiceUnit}`)
        serviceUnitStops = ul.children;
        // printLog(serviceUnitStops);
        tooltipDivs = [];

        //this is an attempt to make simulated mouse overs on all the orders on this route only
        const all = document.getElementsByTagName("a");
        // printLog(all);
        for (var j=0, max=all.length; j < max; j++) {
            // <a href="/edit_order/16452727/1732" class="edit_order_bucket rcui-edit-order-bucket admin_menu_underline route_unlocked" id="editBucketOrder_16452727_1732" aria-describedby="ui-tooltip-service_orders-16452727">
            //   110E896926-1<span class="edit_routing_order route_unlocked" style="margin-top:1px;"></span>
            // </a>

            //limit to only order edit links (dont want to simulate 1000 mouse hovers, too laggy)
            if(all[j].classList.contains("edit_order_bucket") && 
                all[j].classList.contains("admin_menu_underline") && 
                all[j].classList.contains("route_unlocked") && 
                all[j].href.search("/"+assignedServiceUnit) > 0
            ) {
                // console.log("And another one..");
                // console.log(all[j]);  

                var event = new MouseEvent('mouseover', {
                'view': window,
                'bubbles': true,
                'cancelable': true
                });
                var canceled = !all[j].dispatchEvent(event);
                if (canceled) {
                    printLog("FAILED hover simulation");
                }
            }
        }
        printLog('mouse over sim should be done!');

        //wait 1 sec to let them load??
        //await new Promise(resolve => setTimeout(resolve, 1000));


        for(let i = 0; i < serviceUnitStops.length; i++){
            let stop = serviceUnitStops[i];

            const id = stop.getAttribute("id");
            printLog("route stop id# "+id);

            let psssh = stop.querySelector("fieldset").children[1].querySelector(".order_info_tooltip");

            // var event = new MouseEvent('mouseover', {
            //     'view': window,
            //     'bubbles': true,
            //     'cancelable': true
            // });
            // var canceled = !psssh.dispatchEvent(event);
            // if (canceled) {
            //     printLog("FAILED hover simulation");
            // } else {
            //     printLog("Successful hover simulation");
            // }                      

            

            tooltipDivs[i] = psssh;
            // printLog(psssh);
            
            try {
                let helper3 = psssh.innerHTML.split("aria-describedby=\"");
                let psssh2 = document.getElementById(helper3[1].substring(0,helper3[1].indexOf("\"")));
                let info = psssh2.querySelector(".ui-tooltip-content");
                // printLog("Type = "+ (typeof info));
                
                // Array.from(info).forEach((c, inc) => {
                //     console.log(c);
                //     if(inc<15){
                //         c.style.display = "none";
                //     }
                // });
                

                // this is where I'm stuck !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                // for(let q = 0; q < 15; q++){
                //     // insertedDiv.appendChild(info[q]);
                //     // info.children[q].remove();
                //     // console.log(info.children[q]);
                //     // info.firstChild.remove();
                //     info.removeChild(info.childNodes.item(0));
                // }

                // // console.log("adding VV");
                // console.log(insertedDiv);
                // console.log(info);

                testDiv = info;

                stop.appendChild(info);
            } catch (error) {
                printLog(error);
            }

        }
        
        // console.log(ul);
    }
    //else{
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
