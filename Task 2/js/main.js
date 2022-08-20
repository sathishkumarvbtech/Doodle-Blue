var dropdownButton = document.querySelector(".dropdown-btn");
var dropdown = document.querySelector(".dropdown");

dropdownButton.addEventListener('click', () => {
    dropdown.classList.toggle("show");
    chatbox.classList.toggle("show");
    virtualText.classList.add("show");
})


var users = document.querySelectorAll(".user-link");
var virtualText = document.querySelector(".virtual");
var chatbox = document.querySelector(".chatbox");
var userArr = [...users];


userArr.forEach((person, i) => {
    person.addEventListener('click', () => {
        dropdown.classList.remove("show");
        chatbox.classList.add("show");
        virtualText.classList.add("hide");
        messageValidation(person.innerHTML)
    })
})



const messageValidation = (person) => {
    chatbox.innerHTML = `<div class="chatbox--container">
    <div class="person--profile">
        <div class="profile">
            <img src="chat-person.jpg" alt="Profile">
        </div>
        <div class="person--name">
            <p>${person}</p>
        </div>
    </div>
    <div class="message--row">
        <div class="message">
            <div class="msg-img">
                <img src="./chat-person.jpg" alt="Person">
            </div>
            <div class="msg-text">
                <h5>${person}</h5>
                <p>Hey!</p>
            </div>
        </div> 
    </div>
    <div class="input-values">
        <input type="text" id="input-value" placeholder="Type here...">
        <button type="button" onclick="showSendmessage()" id="send">Send</button>
    </div>
</div>`
}


const CreateElement = (input) => {
    var sendmsgContainer = document.querySelector(".message--row");
    sendmsgContainer.classList.add("visible");
    sendmsgContainer.insertAdjacentHTML("beforeend", `<div class="message send-message">
    <div class="msg-text send--msg">
                <h5>Sathish</h5>
                <p>${input}</p>
            </div>
            <div class="msg-img">
                <img src="./profile.jpg" alt="Profile">
            </div>
            </div>`)
}

const showSendmessage = () => {
    var input = document.querySelector("#input-value").value;
    if (input != "") {
        CreateElement(input)
        document.querySelector("#input-value").value = "";
    }
}







// function createElements(person) {
//     var span = document.createElement("span");
//     var para = document.createElement("p");
//     span.innerText = person;
//     para.innerText = "Hey!, Are you there";
//     receiveMsg.append(span, para);
//     recDiv.previousSibling.style.display="none";
//     inputContainer.style.visibility = "visible";
// }

// sendBtn.addEventListener('click', () => {
//     var meassage = inputSendmsg.value;
//     createElementsSend(meassage)
// })

// function createElementsSend(Msg) {
//     if (Msg != "") {
//         var span = document.createElement("span");
//         var para = document.createElement("p");
//         span.innerText = "Sathish";
//         para.innerText = Msg;
//         sendMsg.append(span, para);
//         document.querySelector("#sendmsg-value").value = ""
//     }

//     else {
//         console.log("Enter Message")
//     }

// }



