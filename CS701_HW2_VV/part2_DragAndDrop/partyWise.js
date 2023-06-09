(function () {
    window.onload = init;

    var senators_villagomez = [];
    var senVote = [];

    function init() {
        demo = document.getElementById("democrats");
        demo.ondragenter = dragEnterDemocratsHandler;
        demo.ondragover = dragEnterDemocratsHandler;
        demo.ondragend = dragEnterDemocratsHandler;
        demo.ondrop = dropDemocratsHandler;

        repub = document.getElementById("republicans");
        repub.ondragenter = dragEnterRepublicansHandler;
        repub.ondragover = dragEnterRepublicansHandler;
        repub.ondragend = dragEnterRepublicansHandler;
        repub.ondrop = dropRepublicansHandler;

        personnel = document.getElementById("members");
        personnel.ondragstart = dragStartHandler;
        personnel.ondragend = dragEndHandler;
        personnel.ondrag = dragHandler;

        var key = JSON.parse(
            window.localStorage.getItem("senators_villagomez")
        );
        if (key == "" || key == null) {
            ajaxGetReq(); //AJAX call is done -  sessionStorage stores until tab is closed
        } else {
            dispLocStorage(key); //local storage is 1st checked. localStorage lasts until you delete it or user deletes it.
        }
    }

    function ajaxGetReq() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200 || this.status == 0) {
                    ajaXml(this);
                }
            }
        };
        xhr.open("GET", "partyList.xml", true);
        xhr.send();
    }

    function displaySenatorList(name, party) {
        var list = document.getElementById("members");
        var itemList = document.createElement("li");
        itemList.setAttribute("draggable", true);
        if (party == "Democrat") {
            itemList.style.color = "blue";
        } else if (party == "Republican") {
            itemList.style.color = "red";
        }
        itemList.innerHTML = name;
        list.appendChild(itemList);
    }

    function ajaXml(xml) {
        var xmlFile = xml.responseXML;
        var senators_villagomez = []; //array for updated senator list
        var senator = xmlFile.getElementsByTagName("senator");

        for (var i = 0; i < senator.length; i++) {
            var name =
                senator[i].getElementsByTagName("name")[0].childNodes[0]
                    .nodeValue;
            var party =
                senator[i].getElementsByTagName("party")[0].childNodes[0]
                    .nodeValue;

            var senList = {
                name: name,
                party: party,
                voted: false
            };

            senators_villagomez.push(senList); //push to list
            displaySenatorList(name, party, false); // call display function
        }
        msg.innerHTML = "From AJAX Loaded 10 senators";
        localStor(senators_villagomez); // call to store in local storage
    }

    function dispLocStorage(key) {
        for (var i = 0; i < key.length; i++) {
            var name = key[i].name;
            var party = key[i].party;
            var voted = key[i].voted;
            displaySenatorList(name, party);
            dispSenators(name, party, voted);
        }
        document.getElementById("msg").innerHTML =
            "From LocalStorage Loaded 10 senators";
    }

    // use last name for local storage
    function localStor(senators_villagomez) {
        var json = JSON.stringify(senators_villagomez);
        var key = "senators_villagomez";
        window.localStorage.setItem(key, json);
    }

    function dispSenators(name, party, voted) {
        if (voted == true && party === "Democrat") {
            var list = document.getElementById("democrats");
            var itemList = document.createElement("li");
            itemList.innerHTML = name;
            list.appendChild(itemList);
        }
        if (voted == true && party === "Republican") {
            var list = document.getElementById("republicans");
            var itemList = document.createElement("li");
            itemList.innerHTML = name;
            list.appendChild(itemList);
        }
    }

    function dragStartHandler(e) {
        document.getElementById("msg").innerHTML = "Dragging";
        senators_villagomez = e.target.innerHTML;
        e.dataTransfer.setData("text/plain", senators_villagomez);
    }

    function dragEndHandler(e) {
        document.getElementById("msg").innerHTML = "Drag ended";
    }

    function dragHandler(e) {
        msg.innerHTML = "Dragging " + e.target.innerHTML;
        e.preventDefault(); //prevent the default behavior of an element from triggering
    }

    function dragEnterDemocratsHandler(e) {
        e.preventDefault();
    }

    function dropDemocratsHandler(e) {
        e.preventDefault();
        var list = document.getElementById("democrats");
        var itemList = document.createElement("li");
        var demDrop = e.dataTransfer.getData("text/plain", e.target.id);
        var key = JSON.parse(
            window.localStorage.getItem("senators_villagomez")
        );

        for (var i = 0; i < key.length; i++) {
            if (demDrop == key[i].name) {
                if (key[i].party == "Democrat") {
                    if (key[i].voted == false) {
                        if (senVote.includes(demDrop) == false) {
                            itemList.innerHTML = demDrop;
                            list.appendChild(itemList);
                            senVote.push(demDrop);
                            key[i].voted = true;
                            window.localStorage.setItem(
                                "senators_villagomez",
                                JSON.stringify(key)
                            );
                            break;
                        }
                    }
                }
            }
        }
    }

    function dragEnterRepublicansHandler(e) {
        e.preventDefault();
    }

    function dropRepublicansHandler(e) {
        var list = document.getElementById("republicans");
        var itemList = document.createElement("li");
        var repubDrop = e.dataTransfer.getData("text/plain", e.target.id);
        var key = JSON.parse(
            window.localStorage.getItem("senators_villagomez")
        );

        for (var i = 0; i < key.length; i++) {
            if (repubDrop == key[i].name) {
                if (key[i].party == "Republican") {
                    if (key[i].voted == false) {
                        if (senVote.includes(repubDrop) == false) {
                            itemList.innerHTML = repubDrop;
                            list.appendChild(itemList);
                            senVote.push(repubDrop);
                            key[i].voted = true;
                            window.localStorage.setItem(
                                "senators_villagomez",
                                JSON.stringify(key)
                            );
                            break;
                        }
                    }
                }
            }
        }
    }
})();
