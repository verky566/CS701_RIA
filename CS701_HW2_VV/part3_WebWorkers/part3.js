(function () {
    window.onload = init;
    let accumRes = 0;
    var stor = [];

    function init() {
        document.getElementById("startButton").onclick = sendDataToWorkers;
    }
    // Complete the following code
    // Handle messages received from the Web Worker
    function handleReceipt(event) {
        var resList = document.getElementById("items"); //Received Messages
        var messages = document.createElement("li");
        var res = JSON.stringify(event.data);
        messages.innerHTML = res;
        resList.appendChild(messages);

        accumRes + event.data.res;

        var displayContent = document.getElementById("sum");
        displayContent.innerHTML = accumRes + event.data.res; //displayContent of sum results
        stor.push(event.data);

        //stored messages displayContent
        var resList = document.getElementById("storageItems"); //Local Storage
        var storedMsg = document.createElement("li");
        var json = JSON.stringify(stor);
        var key = "storedMsg";
        window.localStorage.setItem(key, json);
        storedMsg.innerHTML = res;
        resList.appendChild(storedMsg);
    }

    // Complete the following code
    // send messages to the Web Workers
    function sendDataToWorkers(e) {
        startButton.disabled = true;
        rangData = document.getElementById("range").value;
        //numWorkers is id from html document
        let numberofWorkers = document.getElementById("numWorkers").value;
        let partitionData = rangData / numberofWorkers;
        //iterate through the workers and compute calculation
        for (var i = 1; i <= numberofWorkers; i++) {
            let workers = new Worker("computeWorker.js");
            workers.onmessage = handleReceipt;
            //clone message and transfer using postMessage
            workers.postMessage({
                index: i - 1,
                start: 1 + partitionData * (i - 1),
                end: partitionData * i
            });
        }
    }
    // Feel free to add any helper methods
})();
