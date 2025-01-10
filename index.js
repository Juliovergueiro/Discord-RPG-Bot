// Load Libraries

const Discord = require('discord.js');
const fs = require('fs')
const low = require("lowdb")
const FileSync = require('lowdb/adapters/FileSync')
const sqlite3 = require('sqlite3').verbose();

// Database

const adapter = new FileSync('usuarios.json')
const db = low(adapter)
const adapter2 = new FileSync('techs.json')
const techs = low(adapter2)
// const adapter3 = new FileSync('pokedex.json)
// const pokedex = low(adapter3)

// Database 2

// let db2 = new sqlite3.Database('./DB.Sql', (err) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log("ronaldo");
//   });

//   db2.serialize(() => {
//     db2.each('SELECT nome, sobrenome FROM usuarios', (err, row) => {
//       if (err) {
//         console.error(err.message);
//       }
//       console.log(row.Nome + "\t" + row.Sobrenome);
//     });
//   });

//   db2.run(`INSERT INTO usuarios (Nome, Sobrenome) VALUES ('ronaldin2', 'alien from bh');`, function(err) {
//     if (err) {
//       return console.log(err.message);
//     }
// })


// Starts the Bot
const rpgBot = new Discord.Client();
const token = '';
rpgBot.login(token)
rpgBot.on('ready', () => {
    console.log('Pronto!')
})

// Loads Data
const tecnicas = require('./data/tecnicas.js')
tecnicas.all(rpgBot,db,techs)
// add pokedex do lado de techs

// Loads users files

var usuarios = {}
fs.readFile('./usuarios.json', 'utf8' , (err, data) => {
if (err) {
    console.error(err)
    return
}
usuarios = JSON.parse(data).usuarios
// console.log(usuarios[0].nome)
})


// Command to log in a character

rpgBot.on('message',msg=>{
    let inicio_comando = msg.content.toUpperCase().split(" ")[0]
    if(inicio_comando == "LOGIN"){
        let nome_personagem = msg.content.split(" ")
        nome_personagem = nome_personagem.splice(1, 5)
        nome_personagem = nome_personagem.join(" ")

        let char = db.get("usuarios").find({Nome : nome_personagem}).value()
        let id_member = msg.member.id
        let deslogando = personagem_logado(id_member)
        deslogando.id_membro = null

        char.id_membro = id_member

/*        db.get("usuarios").find({ id_membro: char.id_membro }).assign({ id_membro: id_member }).value()
        db.get("usuarios").find({ id_memmbro: deslogando.id_membro }).assign({ id_membro: atualizar }).value() */
        db.write()
        msg.delete()
    }
})

// How our commands will reach our characters

function personagem_existe(nome_personagem){
let usuario_existente = db.get("usuarios").find({ Nome: nome_personagem }).value()
return usuario_existente ? true : false
}

function atualiza_usuarios(){
    let new_usuarios = {
        "usuarios": usuarios

    }

    fs.writeFile("./usuarios.json", JSON.stringify(new_usuarios), 'utf8', err => {
        if (err) throw err;
        console.log('File has been saved!');
      });
}

function atualiza_techs(){
        let new_techs = {
            "techs": techs

}

fs.writeFile("./techs.json", JSON.stringify(new_techs), 'utf8', err => {
            if (err) throw err;
            console.log('File has been saved!');
          });
}



// Used when i want the person to target its own character

function personagem_logado(id_member){

    let personagem = db.get("usuarios").find({id_membro : id_member}).value()
    return personagem ? personagem : false

}

rpgBot.on('message',msg=>{
let inicio_comando = msg.content.toUpperCase().split(" ")[0]
if(inicio_comando == "GERARTECH"){

        let nome_personagem = msg.content.split(" ")
        nome_personagem = nome_personagem.splice(1, 5)
        nome_personagem = nome_personagem.join(" ")

        techs.get("Techs")
        .push({
        id_membro: msg.member.id,
        NomeTech: `${nome_personagem}`,
        Foto: "",
        FotoKill: "",
        DFA: "",
        DFD: "",
        DFE: "",
        DDE: "",
        DAC: "",
        DES: "",
        DIN: "",
        CustoHP: 0,
        CustoSP: 0,
        CustoMP: 0,
        AtivarHP: 0,
        AtivarMP: 0,
        AtivarSP: 0,
        FA: 0,
        FD: 0,
        FE: 0,
        DE: 0,
        AC: 0,
        ES: 0,
        LT: 0,
        AR: 0,
        IN: 0,
        FU: 0,
        PE: 0,
        Tipo: 0,
        Eff1: "tipo",
        Eff2: "",
        Eff3: "",
        Eff4: "",
        Eff5: "",
        ReqEff1: 0,
        ReqEff2: 0,
        ReqEff3: 0,
        ReqEff4: 0,
        ReqEff5: 0,
        DanoEff1: 0,
        DanoEff2: 0,
        DanoEff3: 0,
        DanoEff4: 0,
        DanoEff5: 0
        })
        .write()

        msg.reply(`*Tech gerada (nome = ${nome_personagem}), digita 'tech "(Nome)"', sem as aspas, pra poder ver ela11!!*`)

}
})

rpgBot.on('message',msg=>{
let inicio_comando = msg.content.toUpperCase().split(" ")[0]
if(inicio_comando == "EDITTECH"){
}
})

rpgBot.on('message',msg=>{
let inicio_comando = msg.content.toUpperCase().split(" ")[0]
if(inicio_comando == "NPCUP"){
        let nome_personagem = msg.content.split(" ")
        nome_personagem = nome_personagem.splice(1, 5)
        nome_personagem = nome_personagem.join(" ")

        let char = db.get("usuarios").find({Nome : nome_personagem}).value()
        char.Max_HP = 100
        char.HP = 100
        let Vig = 3
        let Agi = 3
        let Des = 3
        let Int = 3
        let Car = 3
        let Von = 3
        char.Vig = Vig*1
        char.Des = Des*1
        char.Agi = Agi*1
        char.Car = Car*1
        char.Int = Int*1
        char.Von = Von*1
        char.Pts_Atributo = Vig+Agi+Des+Car+Int+Von
        char.FA = Math.ceil(Vig*2.5) + Math.ceil(Car*2)
        char.FD = Math.ceil(Vig*2) + Math.ceil(Des*1) + Math.ceil(Von*2.5)
        char.AC = Math.ceil(Des*1) + Math.ceil(Int*0.5)
        char.ES = Math.ceil(Agi*1) + Math.ceil(Von*0.5)
        char.Ini = Math.ceil(Agi*1) + Math.ceil(Vig*0.5)
        char.Fur = Math.ceil(Int*1)
        char.FATemp = 0
        char.FDTemp = 0
        char.ACTemp = 0
        char.ESTemp = 0
        char.DifVel = 0
        db.write()

msg.channel.send('NPC Criado!')}
})

rpgBot.on('message',msg=>{
let inicio_comando = msg.content.toUpperCase().split(" ")[0]
if(inicio_comando == "CHECK"){
        let id_member = msg.member.id
let ver = personagem_logado(id_member)

msg.channel.send(`Ficha de **${ver.Sobrenome}** **${ver.Nomeread}**

Nível: **${ver.Nivel}** - Atributos: **${ver.Pts_Atributo}** — Pericias: **${ver.Pts_Pericia}** - Vantagens: **${ver.Pts_Vantagem}**.

Vigor: **${ver.Vig}** — Destreza: **${ver.Des}** — Agilidade: **${ver.Agi}**.

Intelecto: **${ver.Int}** — Carisma: **${ver.Car}** — Vontade: **${ver.Von}**.

HP Max.: **${ver.Max_HP}** — MP Max.: **${ver.Max_MP}** — SP Max.: **${ver.Max_SP}**.

HP Atual: **${ver.HP}** — MP Atual: **${ver.MP}** — SP Atual: **${ver.SP}**.

FA: **${ver.FA}** — FE: **${ver.FE}** — Res: **${ver.Res}**.

AC: **${ver.AC}** — ES: **${ver.ES}** — IN: **${ver.IN}** - Prof: **${ver.Prof}**.

Pericia em Armas: **${ver.PerArmas}** - Pericia em Conjuração: **${ver.PerCon}**.

Pericia em Corpo a Corpo: **${ver.PerCorpo}** - Pericia em Jogo de Pés: **${ver.PerJogoPes}**.

Vantagens: ${ver.Vtg}.`)

if(ver.Nomeread == "Ryushiro"){msg.channel.send({
files: [
'./pics/Ryushiro.jpg'
]
})}

if(ver.Nomeread == "Mahito"){msg.channel.send({
files: [
'./pics/Mahito.jpg'
]
})}

if(ver.Nomeread == "Kazuki"){msg.channel.send({
files: [
'./pics/Kazuki5.jpg'
]
})}

if(ver.Nomeread == "Ryoshi"){msg.channel.send({
files: [
'./pics/Ryoshi.png'
]
})}

if(ver.Nomeread == "Midori"){msg.channel.send({
files: [
'./pics/Midori.png'
]
})}

if(ver.Nomeread == "Kenzo"){msg.channel.send({
files: [
'./pics/Kenzo.png'
]
})}

if(ver.Nomeread == "Ryuji"){msg.channel.send({
files: [
'./pics/Ryuji.png'
]
})}

if(ver.Nomeread == "Cão Branco"){msg.channel.send({
files: [
'./pics/whitedogpic.png'
]
})}

if(ver.Nomeread == "Cão Negro"){msg.channel.send({
files: [
'./pics/blackdogpic.png'
]
})}

if(ver.Nomeread == "Rika"){msg.channel.send({
files: [
'./pics/rika.png'
]
})}

if(ver.Nomeread == "Totalidade"){msg.channel.send({
files: [
'./pics/totality.jpg'
]
})}

if(ver.Nomeread == "Marin"){msg.channel.send({
files: [
'./pics/Marin.png'
]
})}

if(ver.Nomeread == "Karin"){msg.channel.send({
files: [
'./pics/Karin.jpg'
]
})}

if(ver.Nomeread == "Mahoraga"){msg.channel.send({
files: [
'./pics/Mahoraga.png'
]
})}

if(ver.Nomeread == "Kuroi"){msg.channel.send({
files: [
'./pics/Kuroi.jpg'
]
})}

if(ver.Nomeread == "Iori"){msg.channel.send({
files: [
'./pics/Iori.jpg'
]
})}

if(ver.Nomeread == "Kiyo"){msg.channel.send({
files: [
'./pics/Kiyo2.jpg'
]
})}

if(ver.Nomeread == "Masamune"){msg.channel.send({
files: [
'./pics/Masamune2.jpg'
]
})}

msg.delete()
}
})

rpgBot.on('message',msg=>{
let inicio_comando = msg.content.toUpperCase().split(" ")[0]
if(inicio_comando == "TRACOS"){
        let id_member = msg.member.id
let ver = personagem_logado(id_member)

msg.channel.send(`Traços de **${ver.Sobrenome}** **${ver.Nomeread}**

Traços: **${ver.Tracos}**

Defeitos: **${ver.Dft}**

Vantagens: **${ver.Vtg}**`)

msg.delete()
}
})

rpgBot.on('message',msg=>{
let inicio_comando = msg.content.toUpperCase().split(" ")[0]
if(inicio_comando == "COMB"){
        let id_member = msg.member.id
let ver = personagem_logado(id_member)

msg.channel.send(`Informações de Combate de **${ver.Sobrenome}** **${ver.Nomeread}**

Código do Nome:** ${ver.Nome}.**

Ataque:** ${ver.Ataque}.** Ação Especial:** ${ver.AcaoEsp}.** Arma:** ${ver.Arma}.** Mira:** ${ver.Mira}.**

Pontos de Ação:** ${ver.PA}.** Hp de Ativação:** ${ver.HP_Ativacao}.** Mp de Ativação:** ${ver.MP_Ativacao}.** Sp de Ativação:** ${ver.SP_Ativacao}.**

Regeneração:** ${ver.TRG} / 5.** Recuperação, Sp:** ${ver.TRC} / 5.** Recuperação, Mp:** ${ver.TRM} / 5.**

Reação:** ${ver.Reacao}.**

Efeitos:** ${ver.Efeitos}**

Condições:** ${ver.Condicoes}**

Coordenadas:** ${ver.NS}.**

Ferimentos:** ${ver.Ferimentos}.**

Técnica:** ${ver.Tech}.**

Ataque de Oportunidade:** ${ver.AtkOport}.** Contra Ataque:** ${ver.CA}.**. Iniciação:** ${ver.Iniciacao}**.`)

// Machucado: **${Machucado}%** - **-${ReducTol} de Tolerância**

// Coordenadas: **NS ${ver.NS}** - **OL ${ver.OL}** - **CB ${ver.CB}**

// Fadiga: **${Fadigado}%** - **-${ReducIn} de Iniciativa**

msg.delete()
}
})

rpgBot.on('message',msg=>{
let inicio_comando = msg.content.toUpperCase().split(" ")[0]
if(inicio_comando == "CAMPO"){
        let id_member = msg.member.id
let ver = personagem_logado(id_member)

msg.channel.send(`

só poe os ${a} aqui em uma ordem de leitura p qm ta mais no norte ficar mais no norte, qm ta mais oeste fikr mais oeste e tals, mas sem os OL da vida, e do lado do nome da pessoa poe as coord

`)

msg.delete()
}
})

rpgBot.on('message',msg=>{
let inicio_comando = msg.content.toUpperCase().split(" ")[0]
if(inicio_comando == "TECNICA"){
        let id_member = msg.member.id
let ver = personagem_logado(id_member)

msg.channel.send(`Informações de Combate de **${ver.Sobrenome}** **${ver.Nome}**

Coordenadas: -

Ataque: **${ver.Ataque}** — Ataque Especial: **${ver.AcaoEsp}** - Arma: **${ver.Arma}**

Defesa: **${ver.Reacao}**

Ferimentos: -`)

msg.delete()
}
})

let Sangramento = `Sangramento [1]. `

Sangramento = Sangramento.slice(13, 14)

console.log(Sangramento)