document.addEventListener("keydown", (e) => {
    const key = e.key;
    if(key === "`"){
        chrome.windows.create({ url: "http://google.com/", type: "popup" });
    }
});