const socket = io();

$(() => {
    $("#send").click((event) => {
        const messageText = $("#message").val();
        $.post("/messages",
            {name: window.name, message: messageText},
            () => {
                console.log("added");
            }
        );
    });
    window.name = prompt("your name : ");
    getMessages();
});

function addMessages(message){
    $('#messages').append(`
        <h4>${message.name}</h4>
        <p>${message.message}</p>
    `);
}

function getMessages(){
    cleanMessages();
    $.get("/messages", (data) => {
        data.forEach(addMessages);
    });
}

function cleanMessages(){
    $('#messages').empty();
}

socket.on("message", (message) => {
    addMessages(message);
})