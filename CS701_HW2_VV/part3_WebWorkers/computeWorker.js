self.onmessage = messageHandler;

function messageHandler(e) {
    let data = e.data;
    console.log("Received", data);
    let result = 0;

    let start = data.start;
    let end = data.end;

    for (let i = start; i <= end; i++) {
        result += i * i;
    }

    data.result = result;
    // Timeout delay
    setTimeout(function () {
        self.postMessage(data);
        self.close();
    }, Math.floor(Math.random() * 10000));
}

// Write the code to compute the desired result
/** computes the sum of the squares of all the integers
    from the specified start value to the specified end value using 
    a for loop and sends back the result after a random delay.
    **/
