const socket=io('http://localhost:8000');

const form=document.getElementById('send-container')
const MessageInput=document.getElementById('messageInput')
var messageContainer=document.querySelector('.container')

var audio=new Audio("chat.mp3");
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
    if(position=="left")
        audio.play();
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=MessageInput.value;
    append(`You: ${message}`,"right");
    socket.emit('send',message);
    MessageInput.value='';
})

const name=prompt("Enter your name");
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,"right");
})

socket.on('recieve',data=>{
    append(`${data.name}:${data.message}`,"left");
})

socket.on('left',name=>{
    append(`${name} left the chat` ,"left")
})