const TelegramApi = require("node-telegram-bot-api")
const {gameOptions,againOptions} = require("./options");

const token ="6990969645:AAGlqomIqsn90mR3zjksJ2l5CxyK_Fy0rZs";

const bot = new TelegramApi(token,{polling:true});
// const aboutPVC = `Мы можем предложить следующие варианты\n 1. Brusbox 5 камер\n 2. Rehau 4 камеры\n 3. Salamander 7 камер`
// const aboutGlass = `Чем больше стекол, тем меньше шума сможет проникнуть через окна. Если у тебя под окном оживленная
// восьми/четырехполоска, тогда бери 3/4 стекла, если же вид открыватся на городское кладбище, тогда хватит и 2 стекол`
const chats = {}


const startGame = async (chatId)=>{
    await  bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты попробуй угадать!`)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId,"отгадывай!",gameOptions)
}

const start = () =>{
    bot.on("message",  async msg =>{
            await bot.setMyCommands([
            {command: "/start", description: "СТАРТ!"},
            {command: "/info", description: "Что это? Где я?"},
            {command: "/game", description: "ИГРА"},
        ])
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === "/start") {
            await bot.sendSticker(chatId,"https://tlgrm.ru/_/stickers/d06/e20/d06e2057-5c13-324d-b94f-9b5a0e64f2da/11.webp")
            return  bot.sendMessage(chatId, `Добро пожаловать!!! Тебя приветствует бот, сын бота!`)
        }
        if (text === "/info") {
            return  bot.sendMessage(chatId, `Тебя зовут ${msg.from.username}!!! `)
        }
        if (text === "/game") {
           return  startGame(chatId)
        }
            return bot.sendMessage(chatId, "Я тебя не понимать!")
    }
    )

    bot.on("callback_query", async msg =>{
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === "again") {
            return  startGame(chatId)
        }
        if (+data === +chats[chatId]) {
            return await bot.sendMessage(chatId, `Поздравляю! Ты угадал цифру  ${data}`,againOptions)
        } else {
            return await bot.sendMessage(chatId, `К сожалению, но ты не угадал, бот загадал цифру  ${chats[chatId]}`,againOptions)
        }
    })
}

start()


// const start = ()=>{
//     const questOptions = {
//         reply_markup: JSON.stringify({
//             inline_keyboard:[
//                 [{text:"Рассрочка", callback_data: "Какая тебе рассрочка!?"}],
//                 [{text:"Какой мне нужен профиль?", callback_data: "У нас только немецкие и американские профиля"}],
//                 [{text:"Застеклить балкон или лоджию", callback_data: "А ты точно уверен что у тебя балкон?"}],
//                 [{text:"Сколько стекол мне нужно?", callback_data: "Бери 3 - не прогадаешь"}]
//             ]
//         })
//     }
//     bot.on("message",  async (msg)=>{
//         const text= msg.text;
//         const chatID = msg.chat.id;
//         await bot.setMyCommands([
//             {command: "/start", description: "СТАРТ!"},
//             {command: "/info", description: "Что это? Где я?"},
//             {command: "/money", description: "Рассрочка"},
//
//         ])
//         if (text === "/start") {
//             await bot.sendMessage(chatID, `Добро пожаловать, ${msg.from.first_name} ${msg.from.last_name}! `)
//             await bot.sendSticker(chatID,"https://tlgrm.ru/_/stickers/d06/e20/d06e2057-5c13-324d-b94f-9b5a0e64f2da/11.webp")
//             return bot.sendMessage(chatID, `Здесь можно узнать самые насущные вопросы:\n== Рассрочка\n== Какой профиль у нас есть?\n== Сколько стекл можно поставить?\n== У меня есть размеры, я хочу узнать цены\n`)
//             //  return bot.sendMessage(chatID, `Здесь можно узнать самые насущные вопросы:\n`,questOptions)
//
//         }
//         if (text === "/info") {
//             return bot.sendMessage(chatID, `Этот чат предназначен для удобного получения ответов на самые частые вопросы покупателей`)
//         }
//         if (text === "/money") {
//             return  bot.sendMessage(chatID, `РАССРОЧКА ДО 36 МЕСЯЦЕВ. БЕЗ ПЕРЕПЛАТ. БЕЗ ПЕРВОНАЧАЛЬНОГО ВЗНОСА. Вообще указать несколько
//             предложений для того чтобы меньше всё это рассказывать по телефону`)
//             // return  bot.sendMessage(chatID, `Здесь можно узнать самые насущные вопросы:`,questOptions)
//         }
//
//            return bot.sendMessage(chatID,"Я пока что немного глуповат и не всё понимаю")
//
//
//     })
//     bot.on("callback_query",async (msg)=>{
//         const data = msg.data
//         const messageID = msg.message.chat.id
//         console.log(data)
//         console.log(messageID)
//
//     })
// }
//
// start();