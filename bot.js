require('dotenv').config()
const { Telegraf } = require('telegraf')
const axios = require('axios')
console.log("welcome bot telegram")

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', ctx=>{
    sendStartMessage(ctx)  
})

function sendStartMessage(ctx){
    const startMessage = "Bienvenid@ este es mi Primer Bot"

    bot.telegram.sendMessage(ctx.chat.id, startMessage,{
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "Quiero una Frase", callback_data:'quote'}
                ],
                [
                    {text: "Youtube", url:"https://www.youtube.com"}
                ],
                [
                    {text: "Creditos", callback_data: "credits"}
                ]
            ]
        }

    })
}

bot.action('credits', ctx => {
    ctx.answerCbQuery();
    ctx.reply('Creado por Emanuel');
})

bot.action('quote', ctx =>{
    ctx.answerCbQuery();
    const menuMessage = "¿que tipo de frase quieres?"
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            keyboard: [
                [
                    { text: "Frases de amistad" },
                    { text: "Chistes cortos" },
                    { text: "Frases para informaticos" }
                ],
                [
                    { text: "Salir" }
                ]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
}) 

bot.hears('Frases de amistad', async (ctx) => {
   
    ctx.reply("ha seleccionado frases de amistad");
})

bot.hears('Chistes cortos', async (ctx) => {
    
    ctx.reply("ha seleccionado frases de chistes corto");
})

bot.hears('Frases para informaticos', async (ctx) => {
    
    ctx.reply("ha seleccionado frases para informaticos");

})

bot.hears('Salir', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Hasta luego", {
        reply_markup: {
            remove_keyboard: true
        }
    })
})


bot.launch()