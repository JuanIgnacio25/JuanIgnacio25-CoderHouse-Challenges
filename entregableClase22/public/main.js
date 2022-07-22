const socket = io()

const authorSchema = new normalizr.schema.Entity("authors",{},{idAttribute:"email"})
const messageSchema = new normalizr.schema.Entity("messages",{
    author:authorSchema
})
const messagesListSchema = new normalizr.schema.Entity("messagesList",{
    messages: [messageSchema]
})


const sendMessage = () => {
    const email = document.querySelector("#email").value;
    const name = document.querySelector("#name").value;
    const surname = document.querySelector("#surname").value;
    const age = parseInt(document.querySelector("#age").value);
    const alias = document.querySelector("#alias").value;
    const avatar = document.querySelector("#avatar").value;
    const date = new Date();
    const timeStamp = `${date.getDate() < 10 ? '0' + (date.getDate() + 1) : (date.getDate() + 1)}/${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}/${date.getFullYear()} ${date.getHours() < 10 ? '0' + (date.getHours()) : (date.getHours())}:${date.getMinutes() < 10 ? '0' + (date.getMinutes()) : (date.getMinutes())}:${date.getSeconds() < 10 ? '0' + (date.getSeconds()) : (date.getSeconds())}`
    const author = {email, name, surname, age, alias, avatar}
    const text = document.querySelector("#message").value;
    const message = {author, text, timeStamp};
    socket.emit("new_message", message);
    return false
}


const createTagMessage = (message) => {
    const {author, text, timeStamp} = message;
    return (`
        <p><span class="email">${author.alias}</span><span class="date">${timeStamp} :</span><span class="text">${text}</span><span><img class="imgAvatar" src= ${author.avatar} alt= ${author.name} ${author.surname}/></span></p>
    `)
}


const createTagCompressionPercentage = (normalizedMessages, denormalizedMessages) => {
    const normalizedMessagesLength = JSON.stringify(normalizedMessages).length
    const denormalizedMessagesLength = JSON.stringify(denormalizedMessages).length
    const percentage = ((normalizedMessagesLength * 100) / denormalizedMessagesLength).toFixed(0)
    const tag = (`
    <>
        (Compresión: ${percentage}%)
    </>
    `)
    const percentageContainer = document.querySelector("#compressionPercentage");
    if (percentageContainer) percentageContainer.innerHTML = tag;
}

const addMessage = (normalizedMessages) => {
    const denormalizedMessages = normalizr.denormalize(normalizedMessages.result, messagesListSchema, normalizedMessages.entities)
    const messages = denormalizedMessages.messages;
    const finalMessage = messages.map(message => createTagMessage(message)).join(" ");
    const messageContainer = document.querySelector("#messagesContainer")
    if (messageContainer) messageContainer.innerHTML = finalMessage;
    createTagCompressionPercentage(normalizedMessages, denormalizedMessages);
}



socket.on('messages', (normalizedMessages) => addMessage(normalizedMessages));