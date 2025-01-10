// Area reserved for skills (so i wouldn't spam index.js)

/* Basically, i have the skill name for the person to type and he can choose a character to use the skill against. I always check Esquiva (Dodge) and Acerto (Precision)
to know if the skill will hit, and then i want to know about attack x defense.
if(dado_dano = 20) is my way of replicating critical strikes, where i just double the dice.
Skills have different rolls of dices and effects. One example is 'Preciso (Bullseye)', where if he hits the person with a result of 4 or plus, he will do extra damage.
Skills will also always spend MP, that's 'mp_gasta (spent_mp)'.
*/

/* Not all of those skills are 100% done without any mistakes or programmed on the most time-effective way.
*/

module.exports = {
all:(rpgBot, db, techs, pokedex)=>{

this.all

rpgBot.on('message',msg=>{
let inicio_comando = msg.content.toUpperCase().split(" ")[0]


if(inicio_comando == "D"){

let nome_personagem = msg.content.split(" ")[1]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let id_member = msg.member.id
let atacante = personagem_logado(id_member)
let dado = rollDice1d20()
let vigor = atacante.Vig + dado
let agilidade = atacante.Agi + dado
let destreza = atacante.Des + dado
let intelecto = atacante.Int + dado
let carisma = atacante.Car + dado
let vontade = atacante.Von + dado
let iniciativa = 0

let Dificuldade = techs.get("Techs").find({Nome : "Dificuldade" }).value()

msg.channel.send(`rolou os dados e tirou **${dado}**!`)

if (dado <= 1){
msg.reply(`**Erro Crítico**.. aimds`)
}

if(dado >= 20){
msg.reply(`**Acerto Crítico!**`)
}

if(nome_personagem == "In"){
msg.reply(`**${atacante.Nomeread}** rodou **Iniciativa**!

**${dado}** + ${atacante.IN} + ${atacante.Iniciacao} = **${dado + atacante.IN + atacante.Iniciacao}**.`)
}

if(nome_personagem == "Vig"){
  msg.reply(`**${atacante.Nomeread}** rodou **Vigor**!

**${dado}** + ${atacante.Vig} = **${vigor}**.`)
}

if(nome_personagem == "Agi"){
  msg.reply(`**${atacante.Nomeread}** rodou **Agilidade**!

**${dado}** + ${atacante.Agi} = **${agilidade}**.`)
}

if(nome_personagem == "Des"){
  msg.reply(`**${atacante.Nomeread}** rodou **Destreza**!

**${dado}** + ${atacante.Des} = **${destreza}**.`)
}

if(nome_personagem == "Int"){
  msg.reply(`**${atacante.Nomeread}** rodou **Intelecto**!

**${dado}** + ${atacante.Int} = **${intelecto}**.`)
}

if(nome_personagem == "Car"){
  msg.reply(`**${atacante.Nomeread}** rodou **Carisma**!

**${dado}** + ${atacante.Car} = **${carisma}**.`)
}

if(nome_personagem == "Von"){
  msg.reply(`**${atacante.Nomeread}** rodou **Vontade**!

**${dado}** + ${atacante.Von} = **${vontade}**.`)
}

}
if(inicio_comando == "DEAMOR"){

let id_member = msg.member.id
let atacante = personagem_logado(id_member)

atacante.PA -= 1

db.write()

let dado = rollDice1d10()

if (dado == 1){
msg.reply(`Puxou a espada da **Técnica de Proporção** [cmd: tech ratio].`)
}

if (dado == 2){
msg.reply(`Puxou a espada da **Manipulação de Sangue** [cmd: tech piercingblood].`)
}

if (dado == 3){
msg.reply(`Puxou a espada da **Fala Amaldiçoada** [cmd: tech desmorone, t alvo].`)
}

if (dado == 4){
msg.reply(`Puxou a espada da **Roda de Oito Alças - Adaptação** [sem comando].`)
}

if (dado == 5){
msg.reply(`Puxou a espada da **Manipulação de Lava** [cmd: tech lavacannon, t alvo].`)
}

if(dado == 6){
msg.reply(`Puxou a espada da **Técnica de Construção - Professor Ryushiro** [cmd: tech silverbullet (Ativação pra atk básico)].`)
}

if(dado == 7){
msg.reply(`Puxou a espada de **Ilimitado** [cmd: tech bluelapse, eff fortal (numero), t alvo. cmd²: tech mugen].`)
}

if(dado == 8){
msg.reply(`Puxou a espada de **Energia Elétrica - Andorinha** [cmd: tech andorinha (Ativação pra atk básico de espada). Se acertar, cmd: ado > cmd: tech raio, t Koji].`)
}

if(dado == 9){
msg.reply(`Puxou a espada de **Cronos** [cmd: tech cronos (Ativação) > tech quicksilver (Ativação 2) > a alvo.]`)
}

if(dado == 10){
msg.reply(`Puxou a espada de **Feitiçaria de Projeção** [cmd: tech projsorc, ac toq, a alvo. Se acertar, cmd: ado, faz oq quiser (pode sacar outra espada)].`)
}

}
if(inicio_comando == "DEATHCLOCK"){

let id_member = msg.member.id
let atacante = personagem_logado(id_member)

let dado = rollDice1d10()

atacante.Deathclock += dado*0.10

msg.channel.send(`Se passaram **${dado * 0.10}** Segundos.`)

db.write()

}
if(inicio_comando == "RESET"){

let id_member = msg.member.id
let atacante = personagem_logado(id_member)

atacante.Deathclock = 0

db.write()

}
if(inicio_comando == "TESTE"){

// Capitalizar 1º letra

let meiocomando = msg.content.split(" ")[1]

let meiocomando1st = meiocomando.charAt(0).toUpperCase() + meiocomando.slice(1)

meiocomando = meiocomando1st

let id_member = msg.member.id
let Ver = personagem_logado(id_member)
let Dado = rollDice1d20()

let Vigor = Ver.Vig + Dado
let Agilidade = Ver.Agi + Dado
let Destreza = Ver.Des + Dado
let Carisma = Ver.Car + Dado
let Intelecto = Ver.Int + Dado
let Vontade = Ver.Von + Dado

/*
let dificuldade = nome_personagem
let LeituraDados = ""
let SearchWord = meiocomando

 while(DadosJogados < Ver.DadoQ){
DadosJogados += 1

if(DadosJogados == 2){
      Dado2 = Math.floor((Math.random() * Ver.DadoN) + 1)
} if(DadosJogados == 3){
      Dado3 = Math.floor((Math.random() * Ver.DadoN) + 1)
} if(DadosJogados == 4){
      Dado4 = Math.floor((Math.random() * Ver.DadoN) + 1)
}
}

 if(meiocomando1st == "Investigacao" && Ver.PericiasExpert.includes(SearchWord)){
msg.reply(`achouuu

2 dado ${Dado2} 3 dado ${Dado3} 4 dado ${Dado4}`)
} */

      if (Dado == 1){
      msg.channel.send(`**Erro Crítico**.. aimds`)
      }

      if(Dado == 20){
      msg.channel.send(`**Acerto Crítico!**`)
      }

      if(meiocomando == "Vig"){
      msg.channel.send(`Vigor: ${Dado} + ${Ver.Vig} = **${Vigor}**`)
      }

      if(meiocomando == "Agi"){
      msg.channel.send(`Agilidade: ${Dado} + ${Ver.Agi} = **${Agilidade}**`)
      }

      if(meiocomando == "Des"){
      msg.channel.send(`Destreza: ${Dado} + ${Ver.Des} = **${Destreza}**`)
      }

      if(meiocomando == "Int"){
      msg.channel.send(`Intelecto: ${Dado} + ${Ver.Int} = **${Intelecto}**`)
      }

      if(meiocomando == "Car"){
      msg.channel.send(`Carisma: ${Dado} + ${Ver.Car} = **${Carisma}**`)
      }

      if(meiocomando == "Von"){
      msg.channel.send(`Vontade: ${Dado} + ${Ver.Von} = **${Vontade}**`)
      }

}
if(inicio_comando == "FMOD"){

// Vai capitalizar todas as letras escritas no meiocomando, se tiver um if precisa ter a condição toda em maiusculo, igual inicio_comando

let meiocomando = msg.content.split(" ")[1]

let meiocomando1st = meiocomando.charAt(0).toUpperCase() + meiocomando.toLowerCase().slice(1)

meiocomando = meiocomando1st

let nome_personagem = msg.content.split(" ")[2]

let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)

let restodamensagem = ` ${msg.content.split(" ")[3]}`
restodamensagem += ` ${msg.content.split(" ")[4]}`
restodamensagem += ` ${msg.content.split(" ")[5]}`
restodamensagem += ` ${msg.content.split(" ")[6]}`
restodamensagem += ` ${msg.content.split(" ")[7]}`
restodamensagem += ` ${msg.content.split(" ")[8]}`
restodamensagem += ` ${msg.content.split(" ")[9]}`
restodamensagem += ` ${msg.content.split(" ")[10]}`

let id_member = msg.member.id
let Char = personagem_logado(id_member)

if(restodamensagem.includes("undefined")){

const Replace = restodamensagem.replaceAll(" undefined", "")

restodamensagem = Replace

}

/*
if(meiocomando == "+"){
Char.EscritaTestando += " Rolar — "
db.write()
}

if(meiocomando == "++"){
Char.EscritaTestando += " Correndo — "
db.write()
}

if(meiocomando == "AA"){
const Replace = Char.EscritaTestando.replace(" Correndo — ", "")
Char.EscritaTestando = Replace
db.write()
msg.reply(`${Replace}`)
}

if(meiocomando == "-"){
Char.EscritaTestando = ""
db.write()
} */

if(meiocomando == "Teste" && nome_personagem == "Teste"){

if(Char.Testinho.includes("Armadura")){
msg.channel.send(`${Char.Testinho}`)
}

}

if(meiocomando == "Sobrenome"){

nome_personagem = nomepersonagem1st

Char.Sobrenome = nome_personagem
db.write()

}

if(meiocomando == "Traco"){

nome_personagem = nomepersonagem1st

Char.Tracos += `${nome_personagem}${restodamensagem} — `
db.write()

}

if(meiocomando == "Tracofim"){

nome_personagem = nomepersonagem1st

Char.Tracos += `${nome_personagem}${restodamensagem}.`
db.write()

}

if(meiocomando == "Tracoreset"){

nome_personagem = nomepersonagem1st

Char.Tracos = nome_personagem
Char.Tracos = ""
db.write()

}

if(meiocomando == "Vtg"){

nome_personagem = nomepersonagem1st

Char.Vtg += `${nome_personagem}${restodamensagem} — `
db.write()

}

if(meiocomando == "Vtgfim"){

nome_personagem = nomepersonagem1st

Char.Vtg += `${nome_personagem}${restodamensagem}.`
db.write()

}

if(meiocomando == "Vtgreset"){

nome_personagem = nomepersonagem1st

Char.Vtg = nome_personagem
Char.Vtg = ""
db.write()

}

if(meiocomando == "Dft"){

nome_personagem = nomepersonagem1st

Char.Dft += `${nome_personagem}${restodamensagem} — `
db.write()

}

if(meiocomando == "Dftfim"){

nome_personagem = nomepersonagem1st

Char.Dft += `${nome_personagem}${restodamensagem}.`
db.write()

}

if(meiocomando == "Dftreset"){

nome_personagem = nomepersonagem1st

Char.Dft = nome_personagem
Char.Dft = ""
db.write()

}

if(meiocomando == "Vig"){
nome_personagem = parseInt(nome_personagem)
msg.channel.send(`${nome_personagem}`)
Char.Vig = nome_personagem
db.write()
}

if(meiocomando == "Des"){
nome_personagem = parseInt(nome_personagem)
msg.channel.send(`${nome_personagem}`)
Char.Des = nome_personagem
db.write()
}

if(meiocomando == "Agi"){
nome_personagem = parseInt(nome_personagem)
msg.channel.send(`${nome_personagem}`)
Char.Agi = nome_personagem
db.write()
}

if(meiocomando == "Car"){
nome_personagem = parseInt(nome_personagem)
msg.channel.send(`${nome_personagem}`)
Char.Car = nome_personagem
db.write()
}

if(meiocomando == "Int"){
nome_personagem = parseInt(nome_personagem)
msg.channel.send(`${nome_personagem}`)
Char.Int = nome_personagem
db.write()
}

if(meiocomando == "Von"){
nome_personagem = parseInt(nome_personagem)
msg.channel.send(`${nome_personagem}`)
Char.Von = nome_personagem
db.write()
}

if(meiocomando == "Percor"){
nome_personagem = parseInt(nome_personagem)
msg.channel.send(`${nome_personagem}`)
Char.PerCorpo = nome_personagem
db.write()
}

if(meiocomando == "Percon"){
nome_personagem = parseInt(nome_personagem)
msg.channel.send(`${nome_personagem}`)
Char.PerCon = nome_personagem
db.write()
}

if(meiocomando == "Perarm"){
nome_personagem = parseInt(nome_personagem)
msg.channel.send(`${nome_personagem}`)
Char.PerArmas = nome_personagem
db.write()
}

if(meiocomando == "Perjog"){
nome_personagem = parseInt(nome_personagem)
msg.channel.send(`${nome_personagem}`)
Char.PerJogoPes = nome_personagem
db.write()
}

}
if(inicio_comando == "STATS"){

let nome_personagem = msg.content.split(" ")
nome_personagem = nome_personagem.splice(1, 5)
nome_personagem = nome_personagem.join(" ")

let id_member = msg.member.id
let char = personagem_logado(id_member)
let Vig = char.Vig
let Des = char.Des
let Agi = char.Agi
let Int = char.Int
let Car = char.Car
let Von = char.Von
char.Pts_Atributo = 15 + Math.floor(char.Nivel*0.5)
char.Pts_Pericia = 2 + Math.floor(char.Nivel*0.334)
char.Pts_Vantagem = 2 + Math.floor(char.Nivel*0.25)
char.Max_HP = (char.Nivel*2) + (Von*10)
char.HP = (char.Nivel*2) + (Von*10)
char.Max_MP = (char.Nivel*1) + (Int*5) + (Car*5)
char.MP = (char.Nivel*1) + (Int*5) + (Car*5)
char.Max_SP = (char.Nivel*1) + (Vig*3)
char.SP = (char.Nivel*1) + (Vig*3)
char.FA = Math.floor(Vig*1) + Math.floor(char.Nivel*0.20)
char.FE = Math.floor(Car*1) + Math.floor(char.Nivel*0.20)
char.AC = Math.floor(Des*1) + Math.floor(char.Nivel*0.20)
char.ES = char.PerJogoPes
char.IN = Math.floor(Agi*1) + Math.floor(char.Nivel*0.20)
char.RG = Math.floor(Von*1)
char.RC = Math.floor(Vig*1)
char.Res = Math.floor(Von*1) + Math.floor(char.Nivel*0.20)
char.Ten = Math.floor(Von*1) + Math.floor(char.Nivel*0.20)
char.Prof = Math.floor(Int*1)
char.AS = Math.floor(Int*1) + Math.floor(char.Nivel*0.20)
char.Fur = Des*1
char.Per = Int*1

if(char.Vtg.includes("Vigor Avancado (1)")){

let VigorAvancadoHP = 20

let VigorAvancadoRG = 1

char.Max_HP += VigorAvancadoHP

char.HP += VigorAvancadoHP

char.RG += VigorAvancadoRG

db.write()

}

if(char.Vtg.includes("Vigor Avancado (2)")){

let VigorAvancadoHP = 40

let VigorAvancadoRG = 2

char.Max_HP += VigorAvancadoHP

char.HP += VigorAvancadoHP

char.RG += VigorAvancadoRG

db.write()

}

if(char.Vtg.includes("Vigor Avancado (3)")){

let VigorAvancadoHP = 60

let VigorAvancadoRG = 3

char.Max_HP += VigorAvancadoHP

char.HP += VigorAvancadoHP

char.RG += VigorAvancadoRG

db.write()

}

if(char.Vtg.includes("Vigor Avancado (4)")){

let VigorAvancadoHP = 80

let VigorAvancadoRG = 4

char.Max_HP += VigorAvancadoHP

char.HP += VigorAvancadoHP

char.RG += VigorAvancadoRG

db.write()

}

if(char.Vtg.includes("Energia Avancada (1)")){

let EnergiaAvancadaMP = 20

char.Max_MP += EnergiaAvancadaMP

char.MP += EnergiaAvancadaMP

db.write()

}

if(char.Vtg.includes("Energia Avancada (2)")){

let EnergiaAvancadaMP = 40

char.Max_MP += EnergiaAvancadaMP

char.MP += EnergiaAvancadaMP

db.write()

}

if(char.Vtg.includes("Energia Avancada (3)")){

let EnergiaAvancadaMP = 60

char.Max_MP += EnergiaAvancadaMP

char.MP += EnergiaAvancadaMP

db.write()

}

if(char.Vtg.includes("Energia Avancada (4)")){

let EnergiaAvancadaMP = 80

char.Max_MP += EnergiaAvancadaMP

char.MP += EnergiaAvancadaMP

db.write()

}

if(char.Vtg.includes("Energia Avancada (5)")){

let EnergiaAvancadaMP = 100

char.Max_MP += EnergiaAvancadaMP

char.MP += EnergiaAvancadaMP

db.write()

}

if(char.Vtg.includes("Força Imensa (1)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

char.FA += 1

}

if(char.Vtg.includes("Força Imensa (2)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

char.FA += 2

}

if(char.Vtg.includes("Força Imensa (3)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

char.FA += 3

}

if(char.Vtg.includes("Tenaz (1)")){

let TenazRes = 1

let TenazTen = 1

char.Res += TenazRes

char.Ten += TenazTen

db.write()

}

if(char.Vtg.includes("Tenaz (2)")){

let TenazRes = 2

let TenazTen = 2

char.Res += TenazRes

char.Ten += TenazTen

db.write()

}

if(char.Vtg.includes("Tenaz (3)")){

let TenazRes = 3

let TenazTen = 3

char.Res += TenazRes

char.Ten += TenazTen

db.write()

}

if(char.Vtg.includes("Escamas Grossas (2)")){

char.Res += 4

db.write()

}

if(char.Nomeread == "Ouroboros"){

char.Max_HP += 300
char.HP += 300

}

if(char.Nomeread == "Cão Branco"){

char.IN += 1

}

if(char.Nomeread == "Cão Negro"){

char.IN += 1

}

if(char.Nomeread == "Totalidade"){

char.IN += 1

}

if(char.Nomeread == "Sapo"){

char.AC += 3
char.FA -= 2

}

if(char.Nomeread == "Nue"){

char.FE += 2

}

if(char.Nomeread == "King"){

char.FA += 2
char.RG += 5
char.RC += 2
char.Res += 3
char.ES -= 4
char.Max_HP += 150
char.HP += 150

}

if(char.Nomeread == "Bearo"){

char.FA += 4
char.Res += 2
char.ES -= 6
char.Max_HP += 50
char.HP += 50

}

if(char.Nomeread == "Rika"){

char.MP += 200
char.Max_MP += 200
char.ES -= 5
char.Max_HP += 200
char.HP += 200

}

if(char.Nomeread == "Mahoraga"){

char.ES -= 2
char.Max_HP += 100
char.HP += 100
char.Res += 5
char.FA += 5

}

if(char.Nomeread == "Grande Serpente"){

char.FA += 2

}

if(char.Nomeread == "Sumo Elefante"){

char.FA += 3
char.Res += 3
char.Ten += 3
char.IN -= 4
char.Max_HP += 100
char.HP += 100

}

db.write()
msg.reply(`**${char.Nome}** atualizou os Atributos!`)

}
if(inicio_comando == "GFICHA"){

let nome_personagem = msg.content.split(" ")
nome_personagem = nome_personagem.splice(1, 5)
nome_personagem = nome_personagem.join(" ")

db.get("usuarios")
.push({
id_membro: msg.member.id,
Nome: `${nome_personagem}`,
Sobrenome: null,
Foto: null,
Pts_Atributo: 0,
XP: null,
XP_Drop: 0,
Vig: 0,
Des: 0,
Agi: 0,
Car: 0,
Int: 0,
Von: 0,
Max_HP: 0,
HP: 0,
Max_SP: 0,
SP: 0,
Max_MP: 0,
MP: 0,
FA: 0,
FD: 0,
FE: 0,
DE: 0,
AC: 0,
ES: 0,
IN: 0,
AR: 0,
LT: 0,
Fur: 0,
Per: 0,
Rgen: 0,
Rcup: 0,
Pen: 0,
Res: 0,
ARCorpo: 0,
ARNuca: 0,
AROlho: 0,
ARRosto: 0,
ARPescoco: 0,
ARBracos: 0,
ARPeito: 0,
ARAbdomem: 0,
ARCostas: 0,
ARPernas: 0,
ARMao: 0,
Atencao: "",
Furtivo: "",
Ferimentos: "",
Ataque: "N",
Mira: "N",
Guarda: "N",
Reacao: "N",
AtkOport: "N",
AtkFur: "N",
AtkSus: "N",
AtkMult: "N",
AcaoEsp: "N",
ReacEsp: "N",
Ativacao: "",
Equipamento: "",
Eff: "",
Tec: "",
Tracos: "",
Vtg: "",
Dft: "",
VantagemES: 0
})
.write()

msg.channel.send(`*Ficha gerada, digita 'check' sem as aspas pra ver11!!*`)
}
if(inicio_comando == "UP"){

  let nome_personagem = msg.content.split(" ")
  nome_personagem = nome_personagem.splice(1, 5)
  nome_personagem = nome_personagem.join(" ")

  let id_member = msg.member.id
  let atacante = personagem_logado(id_member)

  if(nome_personagem == "Vig+1"){
  atacante.Vig += 1
  msg.reply(`Upou`)
  msg.delete()
  }

  if(nome_personagem == "Ref+1"){
  atacante.Ref += 1
  msg.reply(`Upou`)
  msg.delete()
  }

  if(nome_personagem == "Des+1"){
  atacante.Des += 1
  msg.reply(`Upou`)
  msg.delete()
  }

  if(nome_personagem == "Int+1"){
  atacante.Int += 1
  msg.reply(`Upou`)
  msg.delete()
  }

  if(nome_personagem == "Car+1"){
  atacante.Car += 1
  msg.reply(`Upou`)
  msg.delete()
  }

  if(nome_personagem == "Von+1"){
  atacante.Von += 1
  msg.reply(`Upou`)
  msg.delete()
  }

  if(nome_personagem == "Vig-1"){
    atacante.Vig -= 1
    msg.reply(`Desupou`)
    msg.delete()
    }

    if(nome_personagem == "Ref-1"){
    atacante.Ref -= 1
    msg.reply(`Desupou`)
    msg.delete()
    }

    if(nome_personagem == "Des-1"){
    atacante.Des -= 1
    msg.reply(`Desupou`)
    msg.delete()
    }

    if(nome_personagem == "Int-1"){
    atacante.Int -= 1
    msg.reply(`Desupou`)
    msg.delete()
    }

    if(nome_personagem == "Car-1"){
    atacante.Car -= 1
    msg.reply(`Desupou`)
    msg.delete()
    }

    if(nome_personagem == "Von-1"){
    atacante.Von -= 1
    msg.reply(`Desupou`)
    msg.delete()
    }

}
if(inicio_comando == "ANALISE"){

let nome_personagem = msg.content.split(" ")[1]

let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)

nome_personagem = nomepersonagem1st

let id_member = msg.member.id
let Char = personagem_logado(id_member)

Char.PA -= 2

if(nome_personagem == "Pontofraco"){
Char.Mira = "o Ponto Fraco"
db.write()
}

}
if(inicio_comando == "M"){

let nome_personagem = msg.content.split(" ")[1]

let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)

nome_personagem = nomepersonagem1st

let id_member = msg.member.id
let Char = personagem_logado(id_member)

if(nome_personagem == "Pontofraco"){
Char.Mira = "o Ponto Fraco"
db.write()
}

if(nome_personagem == "Ros"){
Char.Mira = "o Rosto"
msg.channel.send(`**${Char.Nome}** vai mirar no **Rosto**.`)
db.write()
}

if(nome_personagem == "Pes"){
Char.Mira = "o Pescoco"
msg.channel.send(`**${Char.Nome}** vai mirar no **Pescoço**.`)
db.write()
}

if(nome_personagem == "Pei"){
Char.Mira = "o Peito"
msg.channel.send(`**${Char.Nome}** vai mirar no **Peito**.`)
db.write()
}

if(nome_personagem == "Abd"){
Char.Mira = "o Abdomem"
msg.channel.send(`**${Char.Nome}** vai mirar no **Abdomem**.`)
db.write()
}

if(nome_personagem == "Bra"){
Char.Mira = "o Braco"
msg.channel.send(`**${Char.Nome}** vai mirar no **Braço**.`)
db.write()
}

if(nome_personagem == "Mao"){
Char.Mira = "a Mao"
msg.channel.send(`**${Char.Nome}** vai mirar na **Mão**.`)
db.write()
}

if(nome_personagem == "Cor"){
Char.Mira = "o Corpo"
msg.channel.send(`**${Char.Nome}** vai mirar no **Corpo**.`)
db.write()
}

if(nome_personagem == "Per"){
Char.Mira = "a Perna"
msg.channel.send(`**${Char.Nome}** vai mirar nas **Pernas**.`)
db.write()
}

}
if(inicio_comando == "MO"){

let nome_personagem = msg.content.split(" ")[1]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let personagem2 = msg.content.split(" ")[2]
let personagem2st = personagem2.charAt(0).toUpperCase() + personagem2.toLowerCase().slice(1)
personagem2 = personagem2st

let id_member = msg.member.id
let Char = db.get("usuarios").find({Nome : nome_personagem}).value()

if(nome_personagem == "Pontofraco"){
Char.Mira = "o Ponto Fraco"
db.write()
}

if(personagem2 == "Ros"){
Char.Mira = "o Rosto"
msg.channel.send(`**${Char.Nomeread}** mudou a Mira para o **Rosto**.`)
db.write()
}

if(personagem2 == "Pes"){
Char.Mira = "o Pescoco"
msg.channel.send(`**${Char.Nomeread}** mudou a Mira para o **Pescoço**.`)
db.write()
}

if(personagem2 == "Pei"){
Char.Mira = "o Peito"
msg.channel.send(`**${Char.Nomeread}** mudou a Mira para o **Peito**.`)
db.write()
}

if(personagem2 == "Abd"){
Char.Mira = "o Abdomem"
msg.channel.send(`**${Char.Nomeread}** mudou a Mira para o **Abdomem**.`)
db.write()
}

if(personagem2 == "Bra"){
Char.Mira = "o Braco"
msg.channel.send(`**${Char.Nomeread}** mudou a Mira para o **Braço**.`)
db.write()
}

if(personagem2 == "Mao"){
Char.Mira = "a Mao"
msg.channel.send(`**${Char.Nomeread}** mudou a Mira para a **Mão**.`)
db.write()
}

if(personagem2 == "Cor"){
Char.Mira = "o Corpo"
msg.channel.send(`**${Char.Nomeread}** mudou a Mira para o **Corpo**.`)
db.write()
}

if(personagem2 == "Per"){
Char.Mira = "a Perna"
msg.channel.send(`**${Char.Nomeread}** mudou a Mira para o **Perna**.`)
db.write()
}

}
if(inicio_comando == "ARMACODIGO"){

let nome_personagem = msg.content.split(" ")[1]

let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)

nome_personagem = nomepersonagem1st

let id_member = msg.member.id
let Char = personagem_logado(id_member)

}
if(inicio_comando == "ADO"){

    let id_member = msg.member.id
    let char = personagem_logado(id_member)

if(char.AtkOport == "S"){

msg.channel.send(`**${char.Nomeread}** despreparou um **Ataque de Oportunidade**.`)

char.AtkOport = "N"

db.write()

} else {

char.AtkOport = "S"

msg.channel.send(`**${char.Nomeread}** preparou um **Ataque de Oportunidade**.`)

db.write()

}

}
if(inicio_comando == "ARMA"){

let nome_personagem = msg.content.split(" ")[1]

let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)

nome_personagem = nomepersonagem1st

let id_member = msg.member.id
let Char = personagem_logado(id_member)

if(nome_personagem == "Desarmado"){
Char.Arma = "Desarmado"
msg.channel.send(`**${Char.Nomeread}** equipou **${Char.Arma}**.`)
db.write()
}

if(nome_personagem == "Katana"){
Char.Arma = "Katana"
msg.channel.send(`**${Char.Nomeread}** equipou **${Char.Arma}**.`)
db.write()
}

if(nome_personagem == "Playful"){
Char.Arma = "Playful Cloud"
msg.channel.send(`**${Char.Nomeread}** equipou **${Char.Arma}**.`)
db.write()
}

if(nome_personagem == "Lancainvertida"){
Char.Arma = "Lança Invertida"
msg.channel.send(`**${Char.Nomeread}** equipou **${Char.Arma}**.`)
db.write()
}

}
if(inicio_comando == "ARMAO"){

let nome_personagem = msg.content.split(" ")[1]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let personagem2 = msg.content.split(" ")[2]
let personagem2st = personagem2.charAt(0).toUpperCase() + personagem2.toLowerCase().slice(1)
personagem2 = personagem2st

let id_member = msg.member.id
let Char = db.get("usuarios").find({Nome : nome_personagem}).value()

if(personagem2 == "Desarmado"){
Char.Arma = "Desarmado"
msg.channel.send(`**${Char.Nomeread}** equipou **${Char.Arma}**.`)
db.write()
}

if(personagem2 == "Katana"){
Char.Arma = "Katana"
msg.channel.send(`**${Char.Nomeread}** equipou **${Char.Arma}**.`)
db.write()
}

if(personagem2 == "Playful"){
Char.Arma = "Playful Cloud"
msg.channel.send(`**${Char.Nomeread}** equipou **${Char.Arma}**.`)
db.write()
}

if(personagem2 == "Lancainvertida"){
Char.Arma = "Lança Invertida"
msg.channel.send(`**${Char.Nomeread}** equipou **${Char.Arma}**.`)
db.write()
}

}
if(inicio_comando == "AC"){

let nome_personagem = msg.content.split(" ")[1]

let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)

nome_personagem = nomepersonagem1st

let id_member = msg.member.id
let char = personagem_logado(id_member)

if(nome_personagem == "Toq"){
char.Ataque = "Toque"
db.write()
}

if(nome_personagem == "Soc"){
char.Ataque = "Soco"
msg.channel.send(`**${char.Nome}** vai atacar com **Soco**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Chu"){
char.Ataque = "Chute"
msg.channel.send(`**${char.Nome}** vai atacar com **Chute**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Cot"){
char.Ataque = "Cotovelada"
msg.channel.send(`**${char.Nome}** vai atacar com **Cotovelada**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Joe"){
char.Ataque = "Joelhada"
msg.channel.send(`**${char.Nome}** vai atacar com **Joelhada**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Cor"){
char.Ataque = "Corte"
msg.channel.send(`**${char.Nome}** vai atacar com **Corte**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Est"){
char.Ataque = "Estocada"
msg.channel.send(`**${char.Nome}** vai atacar com **Estocada**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Baq"){
char.Ataque = "Baque"
msg.channel.send(`**${char.Nome}** vai atacar com **Baque**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Dis"){
char.Ataque = "Disparar"
msg.channel.send(`**${char.Nome}** vai atacar com **Disparar**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Chukat"){
char.Ataque = "Chutar Katana"
msg.channel.send(`**${char.Nome}** vai atacar com **Chutar Katana**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Mor"){
char.Ataque = "Mordida"
msg.channel.send(`**${char.Nome}** vai atacar com **Mordida**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Morlar"){
char.Ataque = "Mordida Larga"
msg.channel.send(`**${char.Nome}** vai atacar com **Mordida Larga**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Atacau"){
char.Ataque = "Ataque de Cauda"
msg.channel.send(`**${char.Nome}** vai atacar com **Ataque de Cauda**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Atatro"){
char.Ataque = "Ataque de Tromba"
msg.channel.send(`**${char.Nome}** vai atacar com **Ataque de Tromba**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Pis"){
char.Ataque = "Pisao"
msg.channel.send(`**${char.Nome}** vai atacar com **Pisão**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Agaga"){
char.Ataque = "Agarrar Galho"
msg.channel.send(`**${char.Nome}** vai atacar com **Agarrar Galho**.

Não pode ser Bloqueado. Acerto -3.`)
msg.delete()
db.write()
}

}
if(inicio_comando == "ACO"){

let nome_personagem = msg.content.split(" ")[1]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let personagem2 = msg.content.split(" ")[2]
let personagem2st = personagem2.charAt(0).toUpperCase() + personagem2.toLowerCase().slice(1)
personagem2 = personagem2st

let id_member = msg.member.id
let char = db.get("usuarios").find({Nome : nome_personagem}).value()

if(personagem2 == "Toq"){
char.Ataque = "Toque"
db.write()
}

if(personagem2 == "Soc"){
char.Ataque = "Soco"
msg.channel.send(`**${char.Nome}** vai atacar com **Soco**.`)
msg.delete()
db.write()
}

if(personagem2 == "Chu"){
char.Ataque = "Chute"
msg.channel.send(`**${char.Nome}** vai atacar com **Chute**.`)
msg.delete()
db.write()
}

if(personagem2 == "Cot"){
char.Ataque = "Cotovelada"
msg.channel.send(`**${char.Nome}** vai atacar com **Cotovelada**.`)
msg.delete()
db.write()
}

if(personagem2 == "Joe"){
char.Ataque = "Joelhada"
msg.channel.send(`**${char.Nome}** vai atacar com **Joelhada**.`)
msg.delete()
db.write()
}

if(personagem2 == "Cor"){
char.Ataque = "Corte"
msg.channel.send(`**${char.Nome}** vai atacar com **Corte**.`)
msg.delete()
db.write()
}

if(personagem2 == "Est"){
char.Ataque = "Estocada"
msg.channel.send(`**${char.Nome}** vai atacar com **Estocada**.`)
msg.delete()
db.write()
}

if(personagem2 == "Baq"){
char.Ataque = "Baque"
msg.channel.send(`**${char.Nome}** vai atacar com **Baque**.`)
msg.delete()
db.write()
}

if(personagem2 == "Dis"){
char.Ataque = "Disparar"
msg.channel.send(`**${char.Nome}** vai atacar com **Disparar**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Chukat"){
char.Ataque = "Chutar Katana"
msg.channel.send(`**${char.Nome}** vai atacar com **Chutar Katana**.`)
msg.delete()
db.write()
}

if(personagem2 == "Mor"){
char.Ataque = "Mordida"
msg.channel.send(`**${char.Nome}** vai atacar com **Mordida**.`)
msg.delete()
db.write()
}

if(personagem2 == "Morlar"){
char.Ataque = "Mordida Larga"
msg.channel.send(`**${char.Nome}** vai atacar com **Mordida Larga**.`)
msg.delete()
db.write()
}

if(personagem2 == "Atacau"){
char.Ataque = "Ataque de Cauda"
msg.channel.send(`**${char.Nome}** vai atacar com **Ataque de Cauda**.`)
msg.delete()
db.write()
}

if(personagem2 == "Atatro"){
char.Ataque = "Ataque de Tromba"
msg.channel.send(`**${char.Nome}** vai atacar com **Ataque de Tromba**.`)
msg.delete()
db.write()
}

if(personagem2 == "Pis"){
char.Ataque = "Pisao"
msg.channel.send(`**${char.Nome}** vai atacar com **Pisão**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Agaga"){
char.Ataque = "Agarrar Galho"
msg.channel.send(`**${char.Nome}** vai atacar com **Agarrar Galho**.

Não pode ser Bloqueado. Acerto -3.`)
msg.delete()
db.write()
}

}
if(inicio_comando == "CONC"){

let nome_personagem = msg.content.split(" ")[1]

let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)

nome_personagem = nomepersonagem1st

let personagemdois = ""

if(msg.content.split(" ")[2]){

personagemdois = msg.content.split(" ")[2]

}

let id_member = msg.member.id
let char = personagem_logado(id_member)

if(nome_personagem == "Ace" && char.Efeitos.includes("Acelerar")){

const AcelerarReplace = char.Efeitos.replace(`Acelerar [${personagemdois}]. `, ``)
char.Efeitos = AcelerarReplace

personagemdois = parseInt(personagemdois)

char.PA_Ativacao += personagemdois
char.SP_Ativacao -= personagemdois

db.write()
} else if (nome_personagem == "Ace" && !char.Efeitos.includes("Acelerar")){

char.Efeitos += `Acelerar [${personagemdois}]. `

personagemdois = parseInt(personagemdois)

char.PA_Ativacao -= personagemdois
char.SP_Ativacao += personagemdois

db.write()
}

if(nome_personagem == "Foco"){

let Focar = char.AS + rollDice1d12()

let FocoTempo = Math.floor(char.AS*0.5)

if(Focar <= 8){

char.PA -= 3

}

if(Focar > 8){

char.Efeitos += `Focado [${FocoTempo}].`

}

if(Focar > 16){

char.Efeitos += `Hiperfoco [${FocoTempo}].`

}

db.write()
}

}
if(inicio_comando == "CONCO"){

let char_personagem = msg.content.split(" ")[1]
let char_personagem1st = char_personagem.charAt(0).toUpperCase() + char_personagem.toLowerCase().slice(1)
char_personagem = char_personagem1st

let nome_personagem = msg.content.split(" ")[2]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let personagemdois = ""

if(msg.content.split(" ")[3]){

personagemdois = msg.content.split(" ")[3]

}

let id_member = msg.member.id
let char = db.get("usuarios").find({Nome : char_personagem}).value()

if(nome_personagem == "Ace" && char.Efeitos.includes("Acelerar")){

const AcelerarReplace = char.Efeitos.replace(`Acelerar [${personagemdois}]. `, ``)
char.Efeitos = AcelerarReplace

personagemdois = parseInt(personagemdois)

char.PA_Ativacao += personagemdois
char.SP_Ativacao -= personagemdois

db.write()
} else if (nome_personagem == "Ace" && !char.Efeitos.includes("Acelerar")){

char.Efeitos += `Acelerar [${personagemdois}]. `

personagemdois = parseInt(personagemdois)

char.PA_Ativacao -= personagemdois
char.SP_Ativacao += personagemdois

db.write()
}

if(nome_personagem == "Foco"){

let Focar = char.AS + rollDice1d12()

let FocoTempo = Math.floor(char.AS*0.5)

if(Focar <= 8){

char.PA -= 3

}

if(Focar > 8){

char.Efeitos += `Focado [${FocoTempo}].`

}

if(Focar > 16){

char.Efeitos += `Hiperfoco [${FocoTempo}].`

}

db.write()
}

}
if(inicio_comando == "COND"){

let nome_personagem = msg.content.split(" ")[1]

let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)

nome_personagem = nomepersonagem1st

let ReagirMov = techs.get("Techs").find({Nome : "ReacMov" }).value()

let id_member = msg.member.id
let char = personagem_logado(id_member)

if(nome_personagem == "Blo"){
char.Reacao = "Bloqueio"
msg.channel.send(`**${char.Nome}** vai defender com **Bloqueio**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Esq"){
char.Reacao = "Esquiva"
msg.channel.send(`**${char.Nome}** vai defender com **Esquiva**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Con"){
char.Reacao = "Contra Ataque"
msg.channel.send(`**${char.Nome}** vai defender com **Contra Ataque**.`)
msg.delete()
db.write()

if(char.PA <= -8){

msg.channel.send(`**${char.Nome}** não tem Pontos de Ação e não pode usar essa Reação.`)

}

}

if(nome_personagem == "Apa"){
char.Reacao = "Aparar"
msg.channel.send(`**${char.Nome}** vai defender com **Aparar**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Rec"){
char.Reacao = "Recuo"
msg.channel.send(`**${char.Nome}** vai defender com **Recuo**.`)
msg.delete()
db.write()

if(char.PA <= -9){

msg.channel.send(`**${char.Nome}** não tem Pontos de Ação e não pode usar essa Reação.`)

}

}

if(nome_personagem == "Neu"){
char.Reacao = "Neutro"
msg.channel.send(`**${char.Nome}** não vai defender.`)
msg.delete()
db.write()
}

if(personagem2 == "Blocru"){
char.Reacao = "Bloqueio Cruzado"
msg.channel.send(`**${char.Nome}** vai defender com **Bloqueio Cruzado**.`)
msg.delete()
db.write()
}

if(personagem2 == "Esqdes"){
char.Reacao = "Esquiva Desesperada"
msg.channel.send(`**${char.Nome}** vai defender com **Esquiva Desesperada**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Opo"){
ReagirMov.Oportunismo = "S"
ReagirMov.ManterDistancia = "N"
msg.channel.send(`**${char.Nome}** vai tentar um Ataque de Oportunidade.`)
msg.delete()
techs.write()
db.write()
}

if(nome_personagem == "Mandis"){
ReagirMov.Oportunismo = "N"
ReagirMov.ManterDistancia = "S"
msg.channel.send(`**${char.Nome}** vai manter a Distância.`)
msg.delete()
techs.write()
db.write()
}

if(nome_personagem == "Nada"){
ReagirMov.Oportunismo = "N"
ReagirMov.ManterDistancia = "N"
msg.channel.send(`**${char.Nome}** não vai reagir á Movimentação.`)
msg.delete()
techs.write()
db.write()
}

}
if(inicio_comando == "RMVCOND"){

let nome_personagem = msg.content.split(" ")[1]

let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)

nome_personagem = nomepersonagem1st

let ReagirMov = techs.get("Techs").find({Nome : "ReacMov" }).value()

let id_member = msg.member.id
let char = personagem_logado(id_member)

if(nome_personagem == "Sangramento"){

let CortarEff = char.Efeitos.substring(char.Efeitos.indexOf("Sangramento"), 18)

SliceEff = CortarEff.slice(13, 15)

if(SliceEff.includes("]")){

SliceEff = CortarEff.slice(13, 14)

}

let SangrEff = char.Efeitos.replace(`Sangramento [${SliceEff}]. `, ``)

char.Efeitos = SangrEff

}

if(nome_personagem == "Brevepausa"){

let CortarEff = char.Efeitos.substring(char.Efeitos.indexOf("Breve Pausa"), 18)

SliceEff = CortarEff.slice(13, 15)

if(SliceEff.includes("]")){

SliceEff = CortarEff.slice(13, 14)

}

let PausaEff = char.Efeitos.replace(`Breve Pausa [${SliceEff}]. `, ``)

char.Efeitos = PausaEff

}

db.write()

// le oq escreveu. poe q já le as [].  dps do nome

// é o [], o . e o espaço

}
if(inicio_comando == "DEF"){

let nome_personagem = msg.content.split(" ")[1]

let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)

nome_personagem = nomepersonagem1st

let ReagirMov = techs.get("Techs").find({Nome : "ReacMov" }).value()

let id_member = msg.member.id
let char = personagem_logado(id_member)

if(nome_personagem == "Blo"){
char.Reacao = "Bloqueio"
msg.channel.send(`**${char.Nome}** vai defender com **Bloqueio**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Res"){
char.Reacao = "Resistir"
msg.channel.send(`**${char.Nome}** vai defender com **Resistir**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Esq"){
char.Reacao = "Esquiva"
msg.channel.send(`**${char.Nome}** vai defender com **Esquiva**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Con"){
char.Reacao = "Contra Ataque"
msg.channel.send(`**${char.Nome}** vai defender com **Contra Ataque**.`)
msg.delete()
db.write()

if(char.PA <= -8){

msg.channel.send(`**${char.Nome}** não tem Pontos de Ação e não pode usar essa Reação.`)

}

}

if(nome_personagem == "Apa"){
char.Reacao = "Aparar"
msg.channel.send(`**${char.Nome}** vai defender com **Aparar**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Rec"){
char.Reacao = "Recuo"
msg.channel.send(`**${char.Nome}** vai defender com **Recuo**.`)
msg.delete()
db.write()

if(char.PA <= -9){

msg.channel.send(`**${char.Nome}** não tem Pontos de Ação e não pode usar essa Reação.`)

}

}

if(nome_personagem == "Neu"){
char.Reacao = "Neutro"
msg.channel.send(`**${char.Nome}** não vai defender.`)
msg.delete()
db.write()
}

if(nome_personagem == "Blocru"){
char.Reacao = "Bloqueio Cruzado"
msg.channel.send(`**${char.Nome}** vai defender com **Bloqueio Cruzado**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Esqdes"){
char.Reacao = "Esquiva Desesperada"
msg.channel.send(`**${char.Nome}** vai defender com **Esquiva Desesperada**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Opo"){
ReagirMov.Oportunismo = "S"
ReagirMov.ManterDistancia = "N"
msg.channel.send(`**${char.Nome}** vai tentar um Ataque de Oportunidade.`)
msg.delete()
techs.write()
db.write()
}

if(nome_personagem == "Mandis"){
ReagirMov.Oportunismo = "N"
ReagirMov.ManterDistancia = "S"
msg.channel.send(`**${char.Nome}** vai manter a Distância.`)
msg.delete()
techs.write()
db.write()
}

if(nome_personagem == "Nada"){
ReagirMov.Oportunismo = "N"
ReagirMov.ManterDistancia = "N"
msg.channel.send(`**${char.Nome}** não vai reagir á Movimentação.`)
msg.delete()
techs.write()
db.write()
}

}
if(inicio_comando == "DEFO"){

let nome_personagem = msg.content.split(" ")[1]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let personagem2 = msg.content.split(" ")[2]
let personagem2st = personagem2.charAt(0).toUpperCase() + personagem2.toLowerCase().slice(1)
personagem2 = personagem2st

let ReagirMov = techs.get("Techs").find({Nome : "ReacMov" }).value()

let id_member = msg.member.id
let char = db.get("usuarios").find({Nome : nome_personagem}).value()

if(personagem2 == "Blo"){
char.Reacao = "Bloqueio"
msg.channel.send(`**${char.Nome}** vai defender com **Bloqueio**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Res"){
char.Reacao = "Resistir"
msg.channel.send(`**${char.Nome}** vai defender com **Resistir**.`)
msg.delete()
db.write()
}

if(personagem2 == "Esq"){
char.Reacao = "Esquiva"
msg.channel.send(`**${char.Nome}** vai defender com **Esquiva**.`)
msg.delete()
db.write()
}

if(personagem2 == "Con"){
char.Reacao = "Contra Ataque"
msg.channel.send(`**${char.Nome}** vai defender com **Contra Ataque**.`)
msg.delete()
db.write()

if(char.PA <= -8){

msg.channel.send(`**${char.Nome}** não tem Pontos de Ação e não pode usar essa Reação.`)

}

}

if(personagem2 == "Apa"){
char.Reacao = "Aparar"
msg.channel.send(`**${char.Nome}** vai defender com **Aparar**.`)
msg.delete()
db.write()
}

if(personagem2 == "Rec"){
char.Reacao = "Recuo"
msg.channel.send(`**${char.Nome}** vai defender com **Recuo**.`)
msg.delete()
db.write()

if(char.PA <= -9){

msg.channel.send(`**${char.Nome}** não tem Pontos de Ação e não pode usar essa Reação.`)

}

}

if(personagem2 == "Neu"){
char.Reacao = "Neutro"
msg.channel.send(`**${char.Nome}** não vai defender.`)
msg.delete()
db.write()
}

if(personagem2 == "Blocru"){
char.Reacao = "Bloqueio Cruzado"
msg.channel.send(`**${char.Nome}** vai defender com **Bloqueio Cruzado**.`)
msg.delete()
db.write()
}

if(personagem2 == "Esqdes"){
char.Reacao = "Esquiva Desesperada"
msg.channel.send(`**${char.Nome}** vai defender com **Esquiva Desesperada**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Opo"){
ReagirMov.Oportunismo = "S"
ReagirMov.ManterDistancia = "N"
msg.channel.send(`**${char.Nome}** vai tentar um Ataque de Oportunidade.`)
msg.delete()
techs.write()
db.write()
}

if(personagem2 == "Mandis"){
ReagirMov.Oportunismo = "N"
ReagirMov.ManterDistancia = "S"
msg.channel.send(`**${char.Nome}** vai manter a Distância.`)
msg.delete()
techs.write()
db.write()
}

if(personagem2 == "Nada"){
ReagirMov.Oportunismo = "N"
ReagirMov.ManterDistancia = "N"
msg.channel.send(`**${char.Nome}** não vai reagir á Movimentação.`)
msg.delete()
techs.write()
db.write()
}

}
if(inicio_comando == "AE"){

let nome_personagem = msg.content.split(" ")[1]

let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)

nome_personagem = nomepersonagem1st

    let id_member = msg.member.id
    let char = personagem_logado(id_member)

if(nome_personagem == "Com"){
char.AcaoEsp += "Compacto - "
msg.reply(`**${char.Nome}** vai usar **Ataque Compacto**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Rap"){
char.AcaoEsp += "Rapido - "
msg.reply(`**${char.Nome}** vai usar **Ataque Rápido**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Cru"){
char.AcaoEsp += "Cruzado - "
msg.reply(`**${char.Nome}** vai usar **Ataque Cruzado**.`)
msg.delete()
db.write()
}

if(nome_personagem == "For"){
char.AcaoEsp += "Forte - "
msg.reply(`**${char.Nome}** vai usar **Ataque Forte**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Mul"){
char.AcaoEsp += "Multiplo - "
msg.reply(`**${char.Nome}** vai usar **Ataque Múltiplo**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Sim"){
char.AcaoEsp += "Simultaneo — "
char.AtkOport = "S"
let SimultaneoBuff = rollDice1d6()

char.Iniciacao += SimultaneoBuff

msg.reply(`**${char.Nome}** vai usar **Ataque Simultâneo**.

Iniciação: **+${SimultaneoBuff}**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Reset"){

char.AcaoEsp = ""
msg.reply(`**${char.Nome}** limpou as ações especiais.`)
msg.delete()
db.write()

}

}
if(inicio_comando == "AEO"){

let nome_personagem = msg.content.split(" ")[1]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let personagem2 = msg.content.split(" ")[2]
let personagem2st = personagem2.charAt(0).toUpperCase() + personagem2.toLowerCase().slice(1)
personagem2 = personagem2st

    let id_member = msg.member.id
let char = db.get("usuarios").find({Nome : nome_personagem}).value()

if(personagem2 == "Com"){
char.AcaoEsp += "Compacto - "
msg.reply(`**${char.Nome}** vai usar **Ataque Compacto**.`)
msg.delete()
db.write()
}

if(personagem2 == "Rap"){
char.AcaoEsp += "Rapido - "
msg.reply(`**${char.Nome}** vai usar **Ataque Rápido**.`)
msg.delete()
db.write()
}

if(personagem2 == "Cru"){
char.AcaoEsp += "Cruzado - "
msg.reply(`**${char.Nome}** vai usar **Ataque Cruzado**.`)
msg.delete()
db.write()
}

if(personagem2 == "For"){
char.AcaoEsp += "Forte - "
msg.reply(`**${char.Nome}** vai usar **Ataque Forte**.`)
msg.delete()
db.write()
}

if(personagem2 == "Imp"){
char.AE += "Impactar — "
msg.reply(`**${char.Nome}** vai usar **Impactar**.`)
msg.delete()
db.write()
}

if(personagem2 == "Sim"){
char.AcaoEsp += "Simultaneo — "
char.AtkOport = "S"
let SimultaneoBuff = rollDice1d6()

char.Iniciacao += SimultaneoBuff

msg.reply(`**${char.Nome}** vai usar **Ataque Simultâneo**.

Iniciação: **+${SimultaneoBuff}**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Carregar"){
char.AE += "Carregar Ataque — "
msg.reply(`**${char.Nome}** vai usar **Carregar Ataque**.`)
msg.delete()
db.write()
}

if(nome_personagem == "Reset"){

char.AcaoEsp = ""
msg.reply(`**${char.Nome}** limpou as ações especiais.`)
msg.delete()
db.write()

}

}
if(inicio_comando == "HANAMIFUGA"){

let id_member = msg.member.id

let Kenzo = db.get("usuarios").find({Nomeread : "Kenzo"}).value()
let Ryoshi = db.get("usuarios").find({Nomeread : "Ryoshi"}).value()
let Kazuki = db.get("usuarios").find({Nomeread : "Kazuki"}).value()
let Midori = db.get("usuarios").find({Nomeread : "Midori"}).value()
let Ryuji = db.get("usuarios").find({Nomeread : "Ryuji"}).value()
let Ryushiro = db.get("usuarios").find({Nomeread : "Ryushiro"}).value()

Kenzo.XP += 250
Ryoshi.XP += 250
Kazuki.XP += 250
Midori.XP += 250
Ryuji.XP += 250
Ryushiro.XP += 250

msg.channel.send(`Hanami fugiu e todos receberam **250 de XP**!`)

if(Ryuji.Nivel > 1){

Randomgif = 0

if(Ryuji.Nivel < 9 && Ryuji.XP > 750){

Randomgif = rollDice1d10()

Kenzo.Nivel = 9
Ryoshi.Nivel = 9
Kazuki.Nivel = 9
Midori.Nivel = 9
Ryuji.Nivel = 9

msg.channel.send(`> **Level Up!** Todos uparam pro nível **${Ryuji.Nivel}**!`)

}

if(Ryuji.Nivel < 10 && Ryuji.XP > 1000){

Randomgif = rollDice1d10()

Kenzo.Nivel = 10
Ryoshi.Nivel = 10
Kazuki.Nivel = 10
Midori.Nivel = 10
Ryuji.Nivel = 10

msg.channel.send(`> Level Up! **${Ryuji.Nivel}**`)

}

if(Randomgif == 1){msg.channel.send({
files: [
'./pics/gif15.gif'
]
})}

if(Randomgif == 2){msg.channel.send({
files: [
'./pics/gif7.gif'
]
})}

if(Randomgif == 3){msg.channel.send({
files: [
'./pics/gif35.gif'
]
})}

if(Randomgif == 4){msg.channel.send({
files: [
'./pics/tojirabbit.gif'
]
})}

if(Randomgif == 5){msg.channel.send({
files: [
'./pics/Gif41.gif'
]
})}

if(Randomgif == 6){msg.channel.send({
files: [
'./pics/Gif43.gif'
]
})}

if(Randomgif == 7){msg.channel.send({
files: [
'./pics/Random9.png'
]
})}

if(Randomgif == 8){msg.channel.send({
files: [
'./pics/Random46.gif'
]
})}

if(Randomgif == 9){msg.channel.send({
files: [
'./pics/Random47.gif'
]
})}

if(Randomgif == 10){msg.channel.send({
files: [
'./pics/Random49.gif'
]
})}

}

}
if(inicio_comando == "F"){

let id_member = msg.member.id
let char = personagem_logado(id_member)

char.AtkMult = 0
db.write()

techs.write()

let MPAtiv = ``
let SPAtiv = ``
let HPAtiv = ``
let PAAtiv = ``

let RegenRead = ``

let HPRegen = 0

let MPRegen = 0

let SPRegen = 0

let MPReducao = char.MP_Ativacao
let SPReducao = char.SP_Ativacao
let HPReducao = char.HP_Ativacao
let PAReducao = char.PA_Ativacao

if(char.Efeitos.includes("Revestimento Comum")){

MPReducao += 1 + Math.floor(char.MP*0.02)

}

if(char.Efeitos.includes("Revestimento Avançado")){

MPReducao += 2 + Math.floor(char.MP*0.03)

}

if(char.Efeitos.includes("Revestimento Excessivo")){

MPReducao += 5 + Math.floor(char.MP*0.05)

}

let Reducao = 1 - (char.Prof*0.05 + char.PerCon*0.05)

if(Reducao <= 0.30){

Reducao = 0.30

}

MPReducao *= Reducao
MPReducao = Math.ceil(MPReducao)

if(char.Efeitos.includes("Sangramento")){

let CortarSangr = char.Efeitos.substring(char.Efeitos.indexOf("Sangramento"), 18)

let SliceSangramento = CortarSangr.slice(13, 15)

if(SliceSangramento.includes("]")){

SliceSangramento = CortarSangr.slice(13, 14)

}

parseInt(SliceSangramento)

console.log(SliceSangramento)

HPRegen -= SliceSangramento

}

if(char.Efeitos.includes("Sangue se tornando Energia")){

char.TRM += char.Prof*0.25

MPRegen += rollDice(1*char.FE, 4*char.FE)

}

if(char.Efeitos.includes("Circular Sangue")){

char.TRG += char.Prof*0.25

char.TRC += char.Prof*0.25

SPRegen += rollDice(1*char.FE, 2*char.FE)

HPRegen += rollDice(1*char.FE, 4*char.FE)

}

if(char.Efeitos.includes("Loan Shark")){

MPReducao *= 3

}

if(char.Efeitos.includes("Sucção do Broto")){

MPReducao += 2
SPReducao += 1

}

let FraseReducaoHP = "gastou"

if(HPReducao <= 0){

FraseReducaoHP = "ganhou"

}

char.HP -= HPReducao
char.SP -= SPReducao
char.MP -= MPReducao
char.PA -= PAReducao

char.TRG += 1.5
char.TRC += 1.5
char.TRM += 1.5

if(char.HP < char.Max_HP*0.50 && char.Vtg.includes("Persistente (1)")){

HPRegen += 1

}

if(PAReducao > 0){

PAAtiv = `
**${char.Nomeread}** gastou **${PAReducao}** de PA com Ativações.
`

}

if(PAReducao < 0){

PAAtiv = `
**${char.Nomeread}** recuperou **${Math.abs(PAReducao)}** de PA com Ativações.
`

}

if(HPReducao > 0){

HPAtiv = `
**${char.Nomeread}** ${FraseReducaoHP} **${Math.abs(HPReducao)}** de HP com Ativações.
`

}

if(MPReducao > 0){

MPAtiv = `
**${char.Nomeread}** gastou **${MPReducao}** de MP com Ativações.
`

}

if(SPReducao > 0){

SPAtiv = `
**${char.Nomeread}** gastou **${SPReducao}** de SP com Ativações.
`

}

let RecuperarPA = 4

if(char.Efeitos.includes("Restricao Celestial")){

// RecuperarPA += 2

}

if(char.Nomeread == "Kenzo" && char.TRM >= 5){

let Rika = db.get("usuarios").find({Nomeread : "Rika"}).value()

if(Rika.MP > 0){

Rika.MP -= 80
Kenzo.HP += 20
Kenzo.MP += 80

msg.channel.send(msg.channel.send(`**Rika** entregou 80 de MP e 20 de HP pra **Kenzo**.

MP da Rika: **${Rika.MP}**.`))

}

if(Rika.MP <= 0){

msg.channel.send(`**Rika** ficou sem energia extra e se juntou á energia de Kenzo. Rika não está mais curando o Kenzo e tá inativa na luta.`)

}

}

if(char.TRG >= 5){

char.TRG -= 5

HPRegen += rollDice1d6() + char.RG

char.HP += HPRegen

RegenRead = `
**${char.Nome}** recuperou **${HPRegen}** de Vida, **${MPRegen}** de Mana e **${SPRegen}** de Stamina.
`

if(char.HP > char.Max_HP){

char.HP = char.Max_HP

}

}

if(char.TRC >= 5){

char.TRC -= 5

SPRegen += rollDice1d4() + Math.floor(char.RC*0.5)

char.SP += SPRegen

RegenRead = `
**${char.Nome}** recuperou **${HPRegen}** de Vida, **${MPRegen}** de Mana e **${SPRegen}** de Stamina.
`

if(char.SP > char.Max_SP){

char.SP = char.Max_SP

}

}

if(char.TRM >= 5){

char.TRM -= 5

MPRegen += rollDice1d6()

char.MP += MPRegen

RegenRead = `
**${char.Nome}** recuperou **${HPRegen}** de Vida, **${MPRegen}** de Mana e **${SPRegen}** de Stamina.
`

if(char.MP > char.Max_MP){

char.MP = char.Max_MP

}

}

let ParalisiaPorVez = "N"

if(char.Efeitos.includes("Paralisia [3]" && ParalisiaPorVez == "N")){

const ParalisiaReplace = char.Efeitos.replace("Paralisia [3] - ", "Paralisia [2] - ")
char.Efeitos = ParalisiaReplace

ParalisiaPorVez = "S"

char.PA -= 1

db.write()

}

if(char.Efeitos.includes("Paralisia [2]" && ParalisiaPorVez == "N")){

const ParalisiaReplace = char.Efeitos.replace("Paralisia [2] - ", "Paralisia [1] - ")
char.Efeitos = ParalisiaReplace

ParalisiaPorVez = "S"

char.PA -= 1

db.write()

}

if(char.Efeitos.includes("Paralisia [1]") && ParalisiaPorVez == "N"){

const ParalisiaReplace = char.Efeitos.replace("Paralisia [1] - ", "")
char.Efeitos = ParalisiaReplace

ParalisiaPorVez = "S"

char.PA -= 1

db.write()

}

if(RecuperarPA <= 0){

RecuperarPA = 1

}

char.PA += RecuperarPA

if(char.PA > char.MaxPA){

char.PA = char.MaxPA

db.write()

}

if(char.PA < char.MinPA) {

char.PA = char.MinPA

db.write()

}

msg.channel.send(`**${char.Nome}** encerrou seu turno.

**${char.Nome}** tem **${char.PA}** Pontos de Ação restando.
${HPAtiv}${SPAtiv}${MPAtiv}${RegenRead}`)


db.write()
techs.write()

}
if(inicio_comando == "FO"){

let nome_personagem = msg.content.split(" ")[1]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let id_member = msg.member.id
let char = db.get("usuarios").find({Nome : nome_personagem}).value()

char.AtkMult = 0
db.write()

techs.write()

let MPAtiv = ``
let SPAtiv = ``
let HPAtiv = ``
let PAAtiv = ``

let RegenRead = ``

let HPRegen = 0

let MPRegen = 0

let SPRegen = 0

let MPReducao = char.MP_Ativacao
let SPReducao = char.SP_Ativacao
let HPReducao = char.HP_Ativacao
let PAReducao = char.PA_Ativacao

if(char.Efeitos.includes("Revestimento Comum")){

MPReducao += 1 + Math.floor(char.MP*0.02)

}

if(char.Efeitos.includes("Revestimento Avançado")){

MPReducao += 2 + Math.floor(char.MP*0.03)

}

if(char.Efeitos.includes("Revestimento Excessivo")){

MPReducao += 5 + Math.floor(char.MP*0.05)

}

let Reducao = 1 - (char.Prof*0.05 + char.PerCon*0.05)

if(Reducao <= 0.30){

Reducao = 0.30

}

MPReducao *= Reducao
MPReducao = Math.ceil(MPReducao)

if(char.Efeitos.includes("Sangramento")){

let CortarSangr = char.Efeitos.substring(char.Efeitos.indexOf("Sangramento"), 18)

let SliceSangramento = CortarSangr.slice(13, 15)

if(SliceSangramento.includes("]")){

SliceSangramento = CortarSangr.slice(13, 14)

}

parseInt(SliceSangramento)

console.log(SliceSangramento)

HPRegen -= SliceSangramento

}

if(char.Efeitos.includes("Cura Constante da Reversão")){

char.TRG += char.Prof*0.25

HPRegen += rollDice(1*char.FE, 4*char.FE)

}

if(char.Efeitos.includes("Sangue se tornando Energia")){

char.TRM += char.Prof*0.25

MPRegen += rollDice(1*char.FE, 4*char.FE)

}

if(char.Efeitos.includes("Circular Sangue")){

char.TRG += char.Prof*0.25

char.TRC += char.Prof*0.25

SPRegen += rollDice(1*char.FE, 2*char.FE)

HPRegen += rollDice(1*char.FE, 4*char.FE)

}

if(char.Efeitos.includes("Loan Shark")){

MPReducao *= 3

}

if(char.Efeitos.includes("Sucção do Broto")){

MPReducao += 2
SPReducao += 1

}

let FraseReducaoHP = "gastou"

if(HPReducao <= 0){

FraseReducaoHP = "ganhou"

}

char.HP -= HPReducao
char.SP -= SPReducao
char.MP -= MPReducao
char.PA -= PAReducao

char.TRG += 1.5
char.TRC += 1.5
char.TRM += 1.5

if(char.HP < char.Max_HP*0.50 && char.Vtg.includes("Persistente (1)")){

HPRegen += 1

}

if(PAReducao > 0){

PAAtiv = `
**${char.Nomeread}** gastou **${PAReducao}** de PA com Ativações.
`

}

if(PAReducao < 0){

PAAtiv = `
**${char.Nomeread}** recuperou **${Math.abs(PAReducao)}** de PA com Ativações.
`

}

if(HPReducao > 0){

HPAtiv = `
**${char.Nomeread}** ${FraseReducaoHP} **${Math.abs(HPReducao)}** de HP com Ativações.
`

}

if(MPReducao > 0){

MPAtiv = `
**${char.Nomeread}** gastou **${MPReducao}** de MP com Ativações.
`

}

if(SPReducao > 0){

SPAtiv = `
**${char.Nomeread}** gastou **${SPReducao}** de SP com Ativações.
`

}

let RecuperarPA = 4

if(char.Efeitos.includes("Restricao Celestial")){

// RecuperarPA += 2

}

if(char.Nomeread == "Kenzo" && char.TRM >= 5){

let Rika = db.get("usuarios").find({Nomeread : "Rika"}).value()

if(Rika.MP > 0){

Rika.MP -= 80
Kenzo.HP += 20
Kenzo.MP += 80

msg.channel.send(msg.channel.send(`**Rika** entregou 80 de MP e 20 de HP pra **Kenzo**.

MP da Rika: **${Rika.MP}**.`))

}

if(Rika.MP <= 0){

msg.channel.send(`**Rika** ficou sem energia extra e se juntou á energia de Kenzo. Rika está inativa na luta.`)

}

}

if(char.TRG >= 5){

char.TRG -= 5

HPRegen += rollDice1d6() + char.RG

char.HP += HPRegen

RegenRead = `
**${char.Nome}** recuperou **${HPRegen}** de Vida, **${MPRegen}** de Mana e **${SPRegen}** de Stamina.
`

if(char.HP > char.Max_HP){

char.HP = char.Max_HP

}

}

if(char.TRC >= 5){

char.TRC -= 5

SPRegen += rollDice1d4() + Math.floor(char.RC*0.5)

char.SP += SPRegen

RegenRead = `
**${char.Nome}** recuperou **${HPRegen}** de Vida, **${MPRegen}** de Mana e **${SPRegen}** de Stamina.
`

if(char.SP > char.Max_SP){

char.SP = char.Max_SP

}

}

if(char.TRM >= 5){

char.TRM -= 5

MPRegen += rollDice1d6()

char.MP += MPRegen

RegenRead = `
**${char.Nome}** recuperou **${HPRegen}** de Vida, **${MPRegen}** de Mana e **${SPRegen}** de Stamina.
`

if(char.MP > char.Max_MP){

char.MP = char.Max_MP

}

}

let ParalisiaPorVez = "N"

if(char.Efeitos.includes("Paralisia [3]" && ParalisiaPorVez == "N")){

const ParalisiaReplace = char.Efeitos.replace("Paralisia [3] - ", "Paralisia [2] - ")
char.Efeitos = ParalisiaReplace

ParalisiaPorVez = "S"

char.PA -= 1

db.write()

}

if(char.Efeitos.includes("Paralisia [2]" && ParalisiaPorVez == "N")){

const ParalisiaReplace = char.Efeitos.replace("Paralisia [2] - ", "Paralisia [1] - ")
char.Efeitos = ParalisiaReplace

ParalisiaPorVez = "S"

char.PA -= 1

db.write()

}

if(char.Efeitos.includes("Paralisia [1]") && ParalisiaPorVez == "N"){

const ParalisiaReplace = char.Efeitos.replace("Paralisia [1] - ", "")
char.Efeitos = ParalisiaReplace

ParalisiaPorVez = "S"

char.PA -= 1

db.write()

}

if(RecuperarPA <= 0){

RecuperarPA = 1

}

char.PA += RecuperarPA

if(char.PA > char.MaxPA){

char.PA = char.MaxPA

db.write()

}

if(char.PA < char.MinPA) {

char.PA = char.MinPA

db.write()

}

msg.channel.send(`**${char.Nome}** encerrou seu turno.

**${char.Nome}** tem **${char.PA}** Pontos de Ação restando.
${HPAtiv}${SPAtiv}${MPAtiv}${RegenRead}`)


db.write()
techs.write()

}
if(inicio_comando == "S"){

// Start, joga pro primeiro turno

    let id_member = msg.member.id
    let char = personagem_logado(id_member)

char.AtkMult = 0
db.write()

let MPAtiv = ""

let TurnosLista = techs.get("Techs").find({Nome : "CheckIn" }).value()

TurnosLista.TurnoAtual = "Um"
TurnosLista.TurnoAtualNome = TurnosLista.UmNome
TurnosLista.ProxTurno = "Dois"
TurnosLista.ProxTurnoNome = TurnosLista.DoisNome

UmPorVez = "S"

techs.write()


let ProximoTurnoNome = TurnosLista.ProxTurnoNome

char.MP -= char.MP_Ativacao

char.PA = 5

if(char.SP <= 0){

char.PA -= 3

}

if(char.PA > char.MaxPA){

char.PA = 10

db.write()

}

let ParalisiaPorVez = "N"

if(char.Efeitos.includes("Paralisia [3]" && ParalisiaPorVez == "N")){

const ParalisiaReplace = char.Efeitos.replace("Paralisia [3]", "Paralisia [2]")
char.Efeitos = ParalisiaReplace

ParalisiaPorVez = "S"

char.PA -= 1

db.write()

}

if(char.Efeitos.includes("Paralisia [2]" && ParalisiaPorVez == "N")){

const ParalisiaReplace = char.Efeitos.replace("Paralisia [2]", "Paralisia [1]")
char.Efeitos = ParalisiaReplace

ParalisiaPorVez = "S"

char.PA -= 1

db.write()

}

if(char.Efeitos.includes("Paralisia [1]") && ParalisiaPorVez == "N"){

const ParalisiaReplace = char.Efeitos.replace("Paralisia [1]", "")
char.Efeitos = ParalisiaReplace

ParalisiaPorVez = "S"

char.PA -= 1

db.write()

}

msg.channel.send(`**${char.Nome}** encerrou o Turno. Pela ordem, agora é o turno do **${ProximoTurnoNome}**.

**${char.Nome}** tem **${char.PA}** Pontos de Ação.

${MPAtiv}`)


db.write()
techs.write()

}
if(inicio_comando == "IN"){

let id_member = msg.member.id
let Char = personagem_logado(id_member)

let InCheck = techs.get("Techs").find({Nome : "CheckIn" }).value()

let InRoll = Char.IN + rollDice1d20()

Char.PA = 4

Char.InSort = InRoll

Char.TRG = 0

Char.TRC = 0

Char.TRM = 0

msg.channel.send(`**${Char.Nomeread}** tirou **${InRoll}** de **Iniciativa.**`)

if(msg.content.split(" ")[1]){

let personagem2 = msg.content.split(" ")[1]
let personagem2st = personagem2.charAt(0).toUpperCase() + personagem2.toLowerCase().slice(1)
personagem2 = personagem2st

let Char2 = db.get("usuarios").find({Nome : personagem2}).value()

let InRoll2 = Char2.IN + rollDice1d20()

Char2.PA = 4

Char2.InSort = InRoll

Char2.TRG = 0

Char2.TRC = 0

Char2.TRM = 0

msg.channel.send(`**${Char2.Nomeread}** tirou **${InRoll2}** de **Iniciativa.**`)

}

if(msg.content.split(" ")[2]){

let personagem3 = msg.content.split(" ")[2]
let personagem3st = personagem3.charAt(0).toUpperCase() + personagem3.toLowerCase().slice(1)
personagem3 = personagem3st

let Char3 = db.get("usuarios").find({Nome : personagem3}).value()

let InRoll3 = Char3.IN + rollDice1d20()

Char3.PA = 4

Char3.InSort = InRoll

Char3.TRG = 0

Char3.TRC = 0

Char3.TRM = 0

msg.channel.send(`**${Char3.Nomeread}** tirou **${InRoll3}** de **Iniciativa.**`)

}

techs.write()
db.write()

}
if(inicio_comando == "INO"){

let nome_personagem = msg.content.split(" ")[1]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let id_member = msg.member.id
let Char = db.get("usuarios").find({Nome : nome_personagem}).value()

let InRoll = Char.IN + rollDice1d20()

Char.PA = 4

Char.InSort = InRoll

Char.TRG = 0

Char.TRC = 0

Char.TRM = 0

msg.channel.send(`**${Char.Nomeread}** tirou **${InRoll}** de **Iniciativa.**`)

techs.write()
db.write()

}
if(inicio_comando == "PUNCH"){

let nome_personagem = msg.content.split(" ")[1]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let id_member = msg.member.id
let Char = db.get("usuarios").find({Nome : nome_personagem}).value()

let InRoll = Char.IN + rollDice1d20()

let Atacante = personagem_logado(id_member)

let AtkAR_Roll = rollDice(1, 8)

let DefAR_Roll = rollDice(1, 8)

Char.InSort = InRoll

Char.TRG = 0

Char.TRC = 0

Char.TRM = 0

msg.channel.send(`**${Atacante.Nomeread}** punched **${Char.Nomeread}**.

${Atacante.Nomeread} AR: ${AtkAR_Roll}

${Char.Nomeread} AR: ${DefAR_Roll}

`)

techs.write()
db.write()

}
if(inicio_comando == "FLANCO"){

let nome_personagem = msg.content.split(" ")[1]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let id_member = msg.member.id
let Char = db.get("usuarios").find({Nome : nome_personagem}).value()

let Atacante = personagem_logado()

let InChallenge = Atacante.IN


let InRoll = Char.IN + rollDice1d20()

Char.PA = 4

Char.InSort = InRoll

Char.TRG = 0

Char.TRC = 0

Char.TRM = 0

msg.channel.send(`**${Char.Nomeread}** tirou **${InRoll}** de **Iniciativa.**`)

techs.write()
db.write()

}
if(inicio_comando == "MOV"){

let nome_personagem = msg.content.split(" ")[1]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let id_member = msg.member.id

let Coordenada = parseInt(nome_personagem)

let CoordenadaMaxima = -1

let Atacante = personagem_logado(id_member)

let tecAtk = techs.get("Techs").find({Cmd : Atacante.Tech}).value()

let CoordHold = Atacante.NS

let DadoMov = rollDice1d10()

let TesteMov = DadoMov + Atacante.IN
TesteMov = Math.floor(TesteMov*0.5)

let MetrosPercorridos = 0

// Gastos
if(TesteMov >= 0){

let MPReducaoAtk = tecAtk.Custo

let ReducaoAtk = 1 - (Atacante.Prof*0.05 + Atacante.PerCon*0.05)

if(ReducaoAtk <= 0.30){

ReducaoAtk = 0.30

}

MPReducaoAtk *= ReducaoAtk
MPReducaoAtk = Math.ceil(MPReducaoAtk)

Atacante.MP -= MPReducaoAtk

Atacante.PA -= tecAtk.PA

}

if(tecAtk.Efeitos.includes("Teleporte")){

TesteMov = (Atacante.PerCon + Atacante.Prof) * tecAtk.Alcance

}

if(Atacante.Efeitos.includes("Pernas Turbinadas")){

TesteMov += 4 + rollDice1d12()

}

if(msg.content.split(" ")[2]){

let personagem2 = msg.content.split(" ")[2]
let personagem2st = personagem2.charAt(0).toUpperCase() + personagem2.toLowerCase().slice(1)
personagem2 = personagem2st

let Alvo = db.get("usuarios").find({Nome : personagem2}).value()

let tecDef = techs.get("Techs").find({Cmd : Alvo.Tech}).value()

CoordenadaMaxima = Alvo.NS

if(tecAtk.Efeitos.includes("Sumico") && tecAtk.ModSurpresa == "Astucia"){

let AtkSumico = Atacante.AS + rollDice1d20()

let DefSumico = Alvo.Per + rollDice1d20()

let SumicoTeste = AtkSumico - DefSumico

let SucessoOuN = ""

if(SumicoTeste > 0){

SucessoOuN = "Sucesso"

Atacante.AtkSus = "S"

}

if(SumicoTeste <= 0){

SucessoOuN = "Falha"

}

msg.channel.send(`**${Atacante.Nomeread}** usou **Sumiço** em **${Alvo.Nomeread}** e teve; **${SucessoOuN}**.

Teste: ${Atacante.AS} + **${AtkSumico - Atacante.AS}** x. **${DefSumico}** + ${Alvo.Per}.`)

}

}

if(TesteMov > Coordenada){

TesteMov = Coordenada

}

if(Atacante.NS <= Coordenada){

Atacante.NS += TesteMov

if(Atacante.NS >= Coordenada){

Atacante.NS = Coordenada

}

db.write()

}

if(Atacante.NS >= Coordenada){

Atacante.NS -= TesteMov

if(Atacante.NS <= Coordenada){

Atacante.NS = Coordenada

}

}

let LeituraMov = `Teste: ${Atacante.IN} + **${DadoMov}**.`

if(tecAtk.Efeitos.includes("Teleporte")){

LeituraMov = `Teste: ${Atacante.PerCon + Atacante.Prof} x **${tecAtk.Alcance}**. `

}

db.write()

msg.channel.send(`**${Atacante.Nomeread}** se moveu da Coordenada **${CoordHold}** pra Coordenada **${Atacante.NS}.**

${LeituraMov}

Pontos de Ação: **${Atacante.PA}.**`)

}
if(inicio_comando == "MOVO"){

let nome_personagem = msg.content.split(" ")[1]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let personagem2 = msg.content.split(" ")[2]
let personagem2st = personagem2.charAt(0).toUpperCase() + personagem2.toLowerCase().slice(1)
personagem2 = personagem2st

let id_member = msg.member.id

let Coordenada = parseInt(personagem2)

let Atacante = db.get("usuarios").find({Nome : nome_personagem}).value()

let tecAtk = techs.get("Techs").find({Cmd : Atacante.Tech}).value()

let CoordHold = Atacante.NS

let DadoMov = rollDice1d10()

let TesteMov = DadoMov + Atacante.IN
TesteMov = Math.floor(TesteMov*0.5)

let MetrosPercorridos = 0

// Gastos
if(TesteMov >= 0){

let MPReducaoAtk = tecAtk.Custo

let ReducaoAtk = 1 - (Atacante.Prof*0.05 + Atacante.PerCon*0.05)

if(ReducaoAtk <= 0.30){

ReducaoAtk = 0.30

}

MPReducaoAtk *= ReducaoAtk
MPReducaoAtk = Math.ceil(MPReducaoAtk)

Atacante.MP -= MPReducaoAtk

Atacante.PA -= tecAtk.PA

}

if(tecAtk.Efeitos.includes("Teleporte")){

TesteMov = (Atacante.PerCon + Atacante.Prof) * tecAtk.Alcance

}

if(Atacante.Efeitos.includes("Pernas Turbinadas")){

TesteMov += 4 + rollDice1d12()

}

if(msg.content.split(" ")[3]){

let personagem3 = msg.content.split(" ")[3]
let personagem3st = personagem3.charAt(0).toUpperCase() + personagem3.toLowerCase().slice(1)
personagem3 = personagem3st

let Alvo = db.get("usuarios").find({Nome : personagem2}).value()

let tecDef = techs.get("Techs").find({Cmd : Alvo.Tech}).value()

if(tecAtk.Efeitos.includes("Sumico") && tecAtk.ModSurpresa == "Astucia"){

let AtkSumico = Atacante.AS + rollDice1d20()

let DefSumico = Alvo.Per + rollDice1d20()

let SumicoTeste = AtkSumico - DefSumico

let SucessoOuN = ""

if(SumicoTeste > 0){

SucessoOuN = "Sucesso"

Atacante.AtkSus = "S"

}

if(SumicoTeste <= 0){

SucessoOuN = "Falha"

}

msg.channel.send(`**${Atacante.Nomeread}** usou **Sumiço** em **${Alvo.Nomeread}** e teve; **${SucessoOuN}**.

Teste: ${Atacante.AS} + **${AtkSumico - Atacante.AS}** x. **${DefSumico}** + ${Alvo.Per}.`)

}

}

if(TesteMov > Coordenada){

TesteMov = Coordenada

}

if(Atacante.NS <= Coordenada){

Atacante.NS += TesteMov

if(Atacante.NS >= Coordenada){

Atacante.NS = Coordenada

}

db.write()

}

if(Atacante.NS >= Coordenada){

Atacante.NS -= TesteMov

if(Atacante.NS <= Coordenada){

Atacante.NS = Coordenada

}

}

let LeituraMov = `Teste: ${Atacante.IN} + **${DadoMov}**.`

if(tecAtk.Efeitos.includes("Teleporte")){

LeituraMov = `Teste: ${Atacante.PerCon + Atacante.Prof} x **${tecAtk.Alcance}**. `

}

db.write()

msg.channel.send(`**${Atacante.Nomeread}** se moveu da Coordenada **${CoordHold}** pra Coordenada **${Atacante.NS}.**

${LeituraMov}

Pontos de Ação: **${Atacante.PA}.**`)

}
if(inicio_comando == "AFAST"){

let nome_personagem = msg.content.split(" ")[1]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let Alvo = db.get("usuarios").find({Nome : nome_personagem}).value()

let id_member = msg.member.id

let Atacante = personagem_logado(id_member)

let CoordHold = Atacante.NS

let DadoMov = rollDice1d10()

let TesteMov = DadoMov + Atacante.IN
TesteMov = Math.floor(TesteMov*0.5)

if(msg.content.split(" ")[2]){

let personagem2 = msg.content.split(" ")[2]
let personagem2st = personagem2.charAt(0).toUpperCase() + personagem2.toLowerCase().slice(1)
personagem2 = personagem2st

let Coordenada = parseInt(personagem2)

if(TesteMov > Coordenada){

TesteMov = Coordenada

}

}

if(Atacante.NS < Alvo.NS){

Atacante.NS -= TesteMov

db.write()

}

if(Atacante.NS >= Alvo.NS){

Atacante.NS += TesteMov

db.write()

}

msg.channel.send(`**${Atacante.Nomeread}** se afastou da Coordenada **${CoordHold}** pra Coordenada **${Atacante.NS}.**

Teste: ${Atacante.IN} + **${DadoMov}.**

Pontos de Ação: **${Atacante.PA}.**`)

db.write()

}
if(inicio_comando == "APROX"){

let nome_personagem = msg.content.split(" ")[1]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let Alvo = db.get("usuarios").find({Nome : nome_personagem}).value()

let id_member = msg.member.id

let Atacante = personagem_logado(id_member)

let CoordHold = Atacante.NS

let DadoMov = rollDice1d10()

let TesteMov = DadoMov + Atacante.IN
TesteMov = Math.floor(TesteMov*0.5)

if(msg.content.split(" ")[2]){

let personagem2 = msg.content.split(" ")[2]
let personagem2st = personagem2.charAt(0).toUpperCase() + personagem2.toLowerCase().slice(1)
personagem2 = personagem2st

let Coordenada = parseInt(personagem2)

if(TesteMov > Coordenada){

TesteMov = Coordenada

}

}

if(Atacante.NS < Alvo.NS){

Atacante.NS += TesteMov

db.write()

}

if(Atacante.NS >= Alvo.NS){

Atacante.NS -= TesteMov

db.write()

}

msg.channel.send(`**${Atacante.Nomeread}** se aproximou da Coordenada **${CoordHold}** pra Coordenada **${Atacante.NS}.**

Teste: ${Atacante.IN} + **${DadoMov}.**

Pontos de Ação: **${Atacante.PA}.**`)

db.write()

}
if(inicio_comando == "REACMOV"){

let nome_personagem = msg.content.split(" ")[1]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let personagem2 = msg.content.split(" ")[2]
let personagem2st = personagem2.charAt(0).toUpperCase() + personagem2.toLowerCase().slice(1)
personagem2 = personagem2st

let id_member = msg.member.id

let Atacante = personagem_logado(id_member)

let Alvo = db.get("usuarios").find({Nome : personagem2}).value()

let ReagirMov = techs.get("Techs").find({Nome : "ReacMov" }).value()

let Metros = Math.abs(Atacante.NS - Coordenada)

let TesteReacao = rollDice1d10() + Atacante.IN - rollDice1d10() + Alvo.Per

Alvo.ReducaoMetros = 0

let Coordenada = nome_personagem

if(Atacante.NS <= Coordenada){

Atacante.NS += TesteMov

db.write()

}

if(Atacante.NS >= Coordenada){

Atacante.NS -= TesteMov

db.write()

}

if(msg.content.split(" ")[2]){

if(Atacante.NS <= Alvo.NS){

Atacante.NS = Coordenada + 1

}

if(Atacante.NS >= Alvo.NS){

Atacante.NS = Coordenada - 1

}

}

db.write()

msg.channel.send(`${TesteMov}`)

}
if(inicio_comando == "DIST"){

let nome_personagem = msg.content.split(" ")[1]

let id_member = msg.member.id
let Char = personagem_logado(id_member)

nome_personagem = parseInt(nome_personagem)

Char.NS = nome_personagem

msg.channel.send(`**${Char.Nomeread}** se moveu pra **${nome_personagem} Distância**.`)

techs.write()
db.write()

}
if(inicio_comando == "CURA"){

let nome_personagem = msg.content.split(" ")[1]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let id_member = msg.member.id
let Defensor = db.get("usuarios").find({Nome : nome_personagem}).value()

Defensor.HP = Defensor.Max_HP
Defensor.MP = Defensor.Max_MP
Defensor.SP = Defensor.Max_SP

msg.channel.send(`**${Defensor.Nomeread}** tá curadin ^^`)


if(Defensor.Efeitos.includes("Desmaio")){

const Newefeitos = Defensor.Efeitos.replace("Desmaio", "")

Defensor.Efeitos = Newefeitos

}

}
if(inicio_comando == "REVERSAO"){

let id_member = msg.member.id
let Defensor = personagem_logado(id_member)

let Cura = rollDice(Defensor.FE, Defensor.FE*4)

Defensor.HP += Cura
Defensor.MP -= 10
Defensor.PA -= 2
Defensor.FE -= 1

msg.channel.send(`**${Defensor.Nomeread}** se curou em **${Cura}**.`)

}
if(inicio_comando == "VERTIGINOSO"){

let id_member = msg.member.id
let Char1 = db.get("usuarios").find({Nome : "Ryu"}).value()
let Char2 = db.get("usuarios").find({Nome : "Mido"}).value()
let Char3 = db.get("usuarios").find({Nome : "Ken"})
let Char4 = db.get("usuarios").find({Nome : "Kazu"})
let Char5 = db.get("usuarios").find({Nome : "Ryo"})
let Char6 = db.get("usuarios").find({Nome : "Nayu"})

Char1.Efeitos += "Dominio Vertiginoso"
Char2.Efeitos += "Dominio Vertiginoso"
Char3.Efeitos += "Dominio Vertiginoso"
Char4.Efeitos += "Dominio Vertiginoso"
Char5.Efeitos += "Dominio Vertiginoso"
Char6.Efeitos += "Dominio Vertiginoso"

}
if(inicio_comando == "REMOVEEFF"){

let nome_personagem = msg.content.split(" ")[1]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let id_member = msg.member.id
let Defensor = db.get("usuarios").find({Nome : nome_personagem}).value()

Defensor.HP = Defensor.Max_HP
Defensor.MP = Defensor.Max_MP
Defensor.SP = Defensor.Max_SP

msg.channel.send(`**${Defensor.Nomeread}** tá sem efeitin ^^`)


if(Defensor.Efeitos.includes("Sucção do Broto")){

const Brotoefeitos = Defensor.Efeitos.replace("Sucção do Broto - ", "")

Defensor.Efeitos = Brotoefeitos

}

}
if(inicio_comando == "FUR"){

let nome_personagem = msg.content.split(" ")[1]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let id_member = msg.member.id
let Defensor = db.get("usuarios").find({Nome : nome_personagem}).value()
let Atacante = personagem_logado(id_member)

let DadoFur = rollDice1d20()

let DadoPer = rollDice1d20()

let TesteFur = (Atacante.Fur + DadoFur) - (DadoPer + Defensor.Per)

Atacante.PA -= 2

if(TesteFur > 0){

Atacante.Furtivo = "S"

msg.channel.send(`**${Atacante.Nomeread}** ficou **Furtivo**.

Teste**:** ${Atacante.Fur} + **${DadoFur}** x. **${DadoPer}** + ${Atacante.Per}.`)
}

if(TesteFur <= 0){

Atacante.Furtivo = "N"

msg.channel.send(`**${Atacante.Nomeread}** foi **Detectado**.

Teste**:** ${Atacante.Fur} + **${DadoFur}** x. **${DadoPer}** + ${Atacante.Per}.`)

}

}
if(inicio_comando == "FURO"){

let nome_personagem = msg.content.split(" ")[1]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let personagem2 = msg.content.split(" ")[2]
let personagem2st = personagem2.charAt(0).toUpperCase() + personagem2.toLowerCase().slice(1)
personagem2 = personagem2st

let id_member = msg.member.id
let Defensor = db.get("usuarios").find({Nome : personagem2}).value()
let Atacante = db.get("usuarios").find({Nome : nome_personagem}).value()

let DadoFur = rollDice1d20()

let DadoPer = rollDice1d20()

let TesteFur = (Atacante.Fur + DadoFur) - (DadoPer + Defensor.Per)

Atacante.PA -= 2

if(TesteFur > 0){

Atacante.Furtivo = "S"

msg.channel.send(`**${Atacante.Nomeread}** ficou **Furtivo**.

Teste**:** ${Atacante.Fur} + **${DadoFur}** x. **${DadoPer}** + ${Atacante.Per}.`)
}

if(TesteFur <= 0){

Atacante.Furtivo = "N"

msg.channel.send(`**${Atacante.Nomeread}** foi **Detectado**.

Teste**:** ${Atacante.Fur} + **${DadoFur}** x. **${DadoPer}** + ${Atacante.Per}.`)

}

}
if(inicio_comando == "PER"){

let nome_personagem = msg.content.split(" ")[1]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let id_member = msg.member.id
let Defensor = db.get("usuarios").find({Nome : nome_personagem}).value()
let Atacante = personagem_logado(id_member)

let DadoFur = rollDice1d20()

let DadoPer = rollDice1d20()

let TestePer = (Atacante.Per + DadoPer) - (DadoFur + Defensor.Fur)

if(TestePer > 0){

Defensor.Furtivo = "N"

msg.channel.send(`**${Atacante.Nomeread}** detectou **${Defensor.Nomeread}**.

Teste**:** ${Atacante.Per} + **${DadoPer}** x. **${DadoFur}** + ${Atacante.Fur}.`)
}

if(TestePer <= 0){

Defensor.PA -= 2

msg.channel.send(`**${Atacante.Nomeread}** não achou **${Defensor.Nomeread}**.

Teste**:** ${Atacante.Per} + **${DadoPer}** x. **${DadoFur}** + ${Atacante.Fur}.`)
}

}
if(inicio_comando == "PERO"){

let nome_personagem = msg.content.split(" ")[1]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let personagem2 = msg.content.split(" ")[2]
let personagem2st = personagem2.charAt(0).toUpperCase() + personagem2.toLowerCase().slice(1)
personagem2 = personagem2st

let id_member = msg.member.id
let Defensor = db.get("usuarios").find({Nome : personagem2}).value()
let Atacante = db.get("usuarios").find({Nome : nome_personagem}).value()

let DadoFur = rollDice1d20()

let DadoPer = rollDice1d20()

let TestePer = (Atacante.Per + DadoPer) - (DadoFur + Defensor.Fur)

if(TestePer > 0){

Defensor.Furtivo = "N"

msg.channel.send(`**${Atacante.Nomeread}** detectou **${Defensor.Nomeread}**.

Teste**:** ${Atacante.Per} + **${DadoPer}** x. **${DadoFur}** + ${Atacante.Fur}.`)
}

if(TestePer <= 0){

Defensor.PA -= 2

msg.channel.send(`**${Atacante.Nomeread}** não achou **${Defensor.Nomeread}**.

Teste**:** ${Atacante.Per} + **${DadoPer}** x. **${DadoFur}** + ${Atacante.Fur}.`)
}

}
if(inicio_comando == "ACORDAR"){

    let id_member = msg.member.id
    let char = personagem_logado(id_member)

let TesteAcordar = rollDice1d20() + char.FR + char.RG

let HPDiff = char.HP + char.HP*2

if(TesteAcordar < HPDiff){

char.PA = -4

msg.channel.send(`**${char.Nome}** não conseguiu acordar. Finaliza o turno.`)

}

if(TesteAcordar > HPDiff){

char.HP = rollDice1d6() + char.RG
char.PA = 0

const Acordar = char.Efeitos.replace("Desmaio", "")

char.Efeitos = Acordar

msg.channel.send(`**${char.Nome}** acordou.`)
db.write()
}

}
if(inicio_comando == "PRIVADOTREM"){

let id_member = msg.member.id
let char = personagem_logado(id_member)

let nome_personagem = msg.content.split(" ")[1]

let HPDiff = char.HP + char.HP*2

let Numero1 = 0
let Numero2 = 0
let Numero3 = 0

if(nome_personagem == "20"){

Numero1 = rollDice1d7()
Numero2 = rollDice1d7()
Numero3 = rollDice1d7()

}

if(nome_personagem == "40"){

Numero1 = rollDice1d6()
Numero2 = rollDice1d6()
Numero3 = rollDice1d6()

}


if(nome_personagem == "60"){

Numero1 = rollDice1d4()
Numero2 = rollDice1d4()
Numero3 = rollDice1d4()

}

if(nome_personagem == "80"){

Numero1 = 2
Numero2 = 2
Numero3 = 2

}

if(char.Efeitos.includes("Reducao de Probabilidade")){

Numero1 = Numero3

}

if(((Numero1 && Numero2) || Numero3) && !char.Efeitos.includes("Reducao de Probabilidade")){

char.Efeitos += "Reducao de Probabilidade"

msg.channel.send(`**${char.Nome}** recebeu uma **Redução de Probabilidade**.`)

db.write()

}

msg.channel.send(`**${Numero1}** **${Numero2}** **${Numero3}**...`)

if(Numero1 == Numero2 && Numero1 == Numero3){

msg.channel.send(`**${char.Nome}** acertou um **Jackpot**!`)

char.Efeitos += "Jackpot"

db.write()

}

}
if(inicio_comando == "A"){

let nome_personagem = msg.content.split(" ")[1]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let id_member = msg.member.id
let Defensor = db.get("usuarios").find({Nome : nome_personagem}).value()
let Atacante = personagem_logado(id_member)
// let EfeitosAtk = techs.get("Techs").find({Cmd : Atacante.Efeitos}).value()
// let EfeitosDef = techs.get("Techs").find({Cmd : Defensor.Efeitos}).value()
let Dano = Atacante.FA
let Defesa = Defensor.Res
let Acerto = Atacante.AC
let AcertoDefensor = Defensor.AC
let Esquiva = Defensor.ES + Defensor.IN
let IniciativaAtk = Atacante.IN + Atacante.Iniciacao
let IniciativaDef = Defensor.IN + Defensor.Iniciacao
let Letalidade = 0
let Armadura = 0
let Penetracao = 0
let Furtividade = Atacante.Fur
let Percepcao = Defensor.Per
let Tenacidade = Defensor.Ten

let tecAtk = techs.get("Techs").find({Cmd : Atacante.Tech}).value()
let tecDef = techs.get("Techs").find({Cmd : Defensor.Tech}).value()

let Contato = "N"

let ContraAtk = rollDice1d20()
let ContraDef = rollDice1d20()
let dadoAparar = rollDice1d20()
let contraAparar = rollDice1d20()

let ApararBuff = 0
let DanopreRes = 0

let FACrit = -1
let ResCrit = -1
let ACCrit = 20
let ESCrit = 20

let FFAtk = 0
let FFDef = 0

let FEAtk = 0
let FEDef = 0

let VantInAtk = IniciativaAtk
let VantInDef = IniciativaDef
let VantIn = 0
let VitoriosoIn = ""

let MovAtk = 0 + Atacante.Iniciacao
let MovDef = 0 + Defensor.Iniciacao

let Aparar = 0
let ApararDef = 0

let TipoDano = ""
let MultiplAcerto = 0
let TesteCA = 0
let TesteRecuo = 0
let EsquivaIncomum = 0
let TabelaAcerto = ""
let DanoLetalidade = 0
let Pen = Penetracao
let ReducAR = 0
let AtkArmado = "N"
let DefArmado = "N"

let Furarguarda = 0
let Guarda = 0

// Reads
let GuardaFurada = "N"
let TabelaOrdem = 0

let Distancia = Math.abs(Atacante.NS - Defensor.NS)
let DistanciaNome = ""
let IniciacaoStart = Atacante.Iniciacao

// Holds
let Mirahold = Atacante.Mira
let MiraParte = ""
let TipoReacao = ""

// Dados
let DadoFA = 0
let DadoRes = 0
let DadoAC = rollDice1d20()
let DadoES = rollDice1d20()

let RecuoAtk = 0
let RecuoDef = 0

// Grau e Classes
Classe1 = Atacante.Classe
Classe2 = Defensor.Classe
Grau1 = Atacante.Grau
Grau2 = Defensor.Grau

// Mods dos Custos
let AtaqueMP = 0 + tecAtk.Custo
let AtaqueSP = 0
let DefesaMP = 0
let DefesaSP = 0
let DefPA = 0
let AtkPA = 0

let BlackFlash = rollDice1d100() + Atacante.Des
let BFRandom = rollDice1d6()
let FlavorRead = techs.get("Techs").find({Nome : "FlavorRead" }).value()

// Effs
if(Defensor.FA >= 0){

if(Atacante.Efeitos.includes("Enxame")){

// AtkPA -= 5

}

if(Atacante.Efeitos.includes("Sombra de Ryoshi")){

let RyoshiInvocador = db.get("usuarios").find({Nome : "Ryo"}).value()

let FortalecimentoFA = Math.floor(RyoshiInvocador.FE*1 + RyoshiInvocador.Nivel*0.30)

let FortalecimentoFE = Math.floor(RyoshiInvocador.Prof*1 + RyoshiInvocador.Nivel*0.30)

let FortalecimentoPen = Math.floor(RyoshiInvocador.FE*0.5 + RyoshiInvocador.Nivel*0.10)

let FortalecimentoIN = Math.floor(RyoshiInvocador.Prof*1 + RyoshiInvocador.Nivel*0.30)

Penetracao += FortalecimentoPen

Dano += FortalecimentoFA

FEAtk += FortalecimentoFE

IniciativaAtk += FortalecimentoIN

}

if(Defensor.Efeitos.includes("Sombra de Ryoshi")){

let RyoshiInvocador = db.get("usuarios").find({Nome : "Ryo"}).value()

let FortalecimentoRes = Math.floor(RyoshiInvocador.FE*1 + RyoshiInvocador.Nivel*0.30)

let FortalecimentoIN = Math.floor(RyoshiInvocador.Prof*1 + RyoshiInvocador.Nivel*0.30)

let FortalecimentoFE = Math.floor(RyoshiInvocador.Prof*1 + RyoshiInvocador.Nivel*0.30)

let FortalecimentoAR = Math.floor(RyoshiInvocador.FE*0.25 + RyoshiInvocador.Nivel*0.05)

Armadura += FortalecimentoAR

FEDef += FortalecimentoFE

Defesa += FortalecimentoRes

IniciativaDef += FortalecimentoIN

}

if(Atacante.Efeitos.includes("Revestimento Comum")){

// let EnergiaExtra = Math.floor(RyoshiInvocador.FE*0.25) + Math.floor(RyoshiInvocador.Max_MP*0.05)

let FortalecimentoFA = Math.floor(Atacante.FE*0.25 + Atacante.MP*0.02)

let FortalecimentoFE = Math.floor(Atacante.Prof*0.25 + Atacante.MP*0.02)

let FortalecimentoPEN = Math.floor(Atacante.FE*0.5 + Atacante.MP*0.02)

let FortalecimentoIN = Math.floor(Atacante.Prof*0.25 + Atacante.MP*0.02)

Penetracao += FortalecimentoPEN

Dano += FortalecimentoFA

IniciativaAtk += FortalecimentoIN

FEAtk += FortalecimentoFE

BlackFlash += 2

}

if(Defensor.Efeitos.includes("Revestimento Comum")){

let FortalecimentoAR = Math.floor(Defensor.FE*0.5 + Defensor.MP*0.02)

let FortalecimentoRES = Math.floor(Defensor.FE*0.25 + Defensor.MP*0.02)

let FortalecimentoFE = Math.floor(Defensor.Prof*0.25 + Defensor.MP*0.02)

let FortalecimentoIN = Math.floor(Defensor.Prof*0.25 + Defensor.MP*0.02)

Armadura += FortalecimentoAR

Defesa += FortalecimentoRES

IniciativaDef += FortalecimentoIN

FEDef += FortalecimentoFE

}

if(Atacante.Efeitos.includes("Revestimento Avançado")){

// let EnergiaExtra = Math.floor(RyoshiInvocador.FE*0.25) + Math.floor(RyoshiInvocador.Max_MP*0.05)

let FortalecimentoFA = Math.floor(Atacante.FE*0.25 + Atacante.MP*0.03) + 1

let FortalecimentoFE = Math.floor(Atacante.Prof*0.25 + Atacante.MP*0.03) + 1

let FortalecimentoPEN = Math.floor(Atacante.FE*0.5 + Atacante.MP*0.03) + 1

let FortalecimentoIN = Math.floor(Atacante.Prof*0.25 + Atacante.MP*0.03) + 1

Penetracao += FortalecimentoPEN

Dano += FortalecimentoFA

IniciativaAtk += FortalecimentoIN

FEAtk += FortalecimentoFE

BlackFlash += 5

}

if(Defensor.Efeitos.includes("Revestimento Avançado")){

let FortalecimentoAR = Math.floor(Defensor.FE*0.5 + Defensor.MP*0.03) + 1

let FortalecimentoRES = Math.floor(Defensor.FE*0.25 + Defensor.MP*0.03) + 1

let FortalecimentoFE = Math.floor(Defensor.Prof*0.25 + Defensor.MP*0.03) + 1

let FortalecimentoIN = Math.floor(Defensor.Prof*0.25 + Defensor.MP*0.03) + 1

Armadura += FortalecimentoAR

Defesa += FortalecimentoRES

IniciativaDef += FortalecimentoIN

FEDef += FortalecimentoFE

}

if(Atacante.Efeitos.includes("Revestimento Excessivo")){

// let EnergiaExtra = Math.floor(RyoshiInvocador.FE*0.25) + Math.floor(RyoshiInvocador.Max_MP*0.05)

let FortalecimentoFA = Math.floor(Atacante.FE*0.25 + Atacante.MP*0.05) + 5

let FortalecimentoFE = Math.floor(Atacante.Prof*0.25 + Atacante.MP*0.05) + 5

let FortalecimentoPEN = Math.floor(Atacante.FE*0.5 + Atacante.MP*0.05) + 5

let FortalecimentoIN = Math.floor(Atacante.Prof*0.25 + Atacante.MP*0.05) + 5

Penetracao += FortalecimentoPEN

Dano += FortalecimentoFA

IniciativaAtk += FortalecimentoIN

FEAtk += FortalecimentoFE

BlackFlash += 5

}

if(Defensor.Efeitos.includes("Revestimento Excessivo")){

let FortalecimentoAR = Math.floor(Defensor.FE*0.5 + Defensor.MP*0.05) + 5

let FortalecimentoRES = Math.floor(Defensor.FE*0.25 + Defensor.MP*0.05) + 5

let FortalecimentoFE = Math.floor(Defensor.Prof*0.25 + Defensor.MP*0.05) + 5

let FortalecimentoIN = Math.floor(Defensor.Prof*0.25 + Defensor.MP*0.05) + 5

Armadura += FortalecimentoAR

Defesa += FortalecimentoRES

IniciativaDef += FortalecimentoIN

FEDef += FortalecimentoFE

}

if(Atacante.Efeitos.includes("Pulsação Aumentada [1]")){

IniciativaAtk += 1

}

if(Defensor.Efeitos.includes("Pulsação Aumentada [1]")){

IniciativaDef += 1

}

if(Atacante.Efeitos.includes("Pulsação Aumentada [2]")){

IniciativaAtk += 2

}

if(Defensor.Efeitos.includes("Pulsação Aumentada [2]")){

IniciativaDef += 2

}

if(Atacante.Efeitos.includes("Flowing Red Scale")){

FFAtk += 1
Dano += 2
Acerto += 2

}

if(Defensor.Efeitos.includes("Flowing Red Scale")){

FFDef += 1
Esquiva += 2
Defesa += 1
Tenacidade += 1

}

if(Atacante.Efeitos.includes("Flowing Red Scale: Stack")){

FFAtk += 2
Dano += 1 + Math.floor(Atacante.FE*0.25)

IniciativaAtk += 2 + Math.floor(Atacante.Prof*0.5)

}

if(Defensor.Efeitos.includes("Flowing Red Scale: Stack")){

FFDef += 2
Armadura += 1 + Math.floor(Defensor.FE*0.25)
Defesa += 1 + Math.floor(Defensor.FE*0.25)
Tenacidade += 1 + Math.floor(Defensor.FE*0.25)

IniciativaDef += 2 + Math.floor(Atacante.Prof*0.5)

}

if(Atacante.Efeitos.includes("Compressão de Sangue: Olhos")){

Acerto += Atacante.Prof

}

if(Defensor.Efeitos.includes("Compressão de Sangue: Olhos")){

Esquiva += Defensor.Prof

}

if(Atacante.Efeitos.includes("Compressão de Sangue: Punhos")){

Dano += Atacante.Prof

}

if(Atacante.Efeitos.includes("Paralisia [3]")){

IniciativaAtk -= 5

}

if(Defensor.Efeitos.includes("Paralisia [3]")){

IniciativaDef -= 5

}

if(Atacante.Efeitos.includes("Paralisia [2]")){

IniciativaAtk -= 2

}

if(Defensor.Efeitos.includes("Paralisia [2]")){

IniciativaDef -= 2

}

if(Atacante.Efeitos.includes("Paralisia [1]")){

IniciativaAtk -= 1

}

if(Defensor.Efeitos.includes("Paralisia [1]")){

IniciativaDef -= 1

}

}

// Black Flash
if(Defensor.FA >= 0){

if(Atacante.Nomeread == "Ryuji"){

BlackFlash += 5

}

if(Atacante.Nomeread == "Kenzo"){

BlackFlash += 2

}

if(Atacante.Nomeread == "Karin"){

BlackFlash += 10

}

if(Atacante.Efeitos.includes("Restricao Celestial")){

BFRandom = 0
BlackFlash = 0

}

if(Atacante.Efeitos.includes("Abençoado pelas Faiscas")){

Acerto += 1
Dano += 1
IniciativaAtk += 1
BlackFlash += 10
BFRandom = 6

}

if(Defensor.Efeitos.includes("Abençoado pelas Faiscas")){

Esquiva += 1
Defesa += 1
IniciativaDef += 1

}

if(Atacante.Efeitos.includes("Abençoado pelas Faiscas") && Defensor.Efeitos.includes("Abençoado pelas Faiscas") && FlavorRead.BF == "N"){

FlavorRead.BF = "S"

msg.channel.send(`**${Atacante.Nomeread}** e **${Defensor.Nomeread}** estão usando 120% do seu Potencial.`, {
files: [
'./pics/120potencial.jpg'
]
})

}

}

// Vantagens
if(Defensor.FA >= 0){

if(Atacante.Vtg.includes("Agil (1)")){

MovAtk += 1

}

if(Defensor.Vtg.includes("Agil (1)")){

MovDef += 1

}

if(Atacante.Vtg.includes("Agil (2)")){

MovAtk += 2

}

if(Defensor.Vtg.includes("Agil (2)")){

MovDef += 2

}

if(Defensor.HP < Defensor.Max_HP*0.50 && Defensor.Vtg.includes("Persistente (1)")){

Defesa += 2

}

if(Defensor.HP < Defensor.Max_HP*0.25 && Defensor.Vtg.includes("Persistente (2)")){

Defesa += 3

}

if(Defensor.Vtg.includes("Força Imensa (1)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

FFDef += 1

}

if(Defensor.Vtg.includes("Força Imensa (2)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

FFDef += 2

}

if(Defensor.Vtg.includes("Força Imensa (3)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

FFDef += 3

}

if(Atacante.Vtg.includes("Velocidade Imensa (1)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

IniciativaAtk += 1

}

if(Atacante.Vtg.includes("Velocidade Imensa (2)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

IniciativaAtk += 2

}

if(Atacante.Vtg.includes("Velocidade Imensa (3)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

IniciativaAtk += 3

}

if(Defensor.Vtg.includes("Reflexos Imensos (1)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

IniciativaDef += 1

}

if(Defensor.Vtg.includes("Reflexos Imensos (2)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

IniciativaDef += 2

}

if(Atacante.Vtg.includes("Poder Excessivo (1)")){

FEAtk += 1

}

if(Atacante.Vtg.includes("Poder Excessivo (2)")){

FEAtk += 2

}

if(Atacante.Vtg.includes("Poder Excessivo (3)")){

FEAtk += 3

}

}

// Armas
if(Defensor.FA >= 0){
if(Atacante.Arma == "Desarmado"){

IniciativaAtk += 1

}

if(Atacante.Arma == "Braco de Lamina"){

IniciativaAtk += 1

Letalidade += 2

}

if(Defensor.Arma == "Braco de Lamina"){

IniciativaDef += 1

}

if(Atacante.Arma == "Espada Bokken"){



}

if(Atacante.Arma == "Playful Cloud"){

AtkArmado = "S"

Dano += Math.floor(Atacante.FA*0.5)

}

if(Defensor.Arma == "Playful Cloud"){

DefArmado = "S"

IniciativaDef -= 2

}

if(Atacante.Arma == "Katana" && Atacante.Ataque == "Corte"){

AtkArmado = "S"

Letalidade += 5

}

if(Atacante.Arma == "Katana" && Atacante.Ataque == "Estocada"){

AtkArmado = "S"

Letalidade += 5

}

if(Defensor.Arma == "Katana"){

DefArmado = "S"

Esquiva -= 1

}

if(Atacante.Arma == "Presas Amaldicoadas"){

AtkArmado = "S"

Letalidade += 2

// let PresasMagicasAtk = Atacante.FE + rollDice1d10()

// let PresasMagicasDef = Defensor.Res*2 + rollDice1d10()

let PresasMagicasAtk = 3 + Atacante.FE + FEAtk - Defensor.FE - FEDef

if(PresasMagicasAtk < 0){

PresasMagicasAtk = 0

}

Dano += PresasMagicasAtk

}

if(Atacante.Arma == "Garras"){

Dano += 2

Letalidade += 2

}

if(Atacante.Arma == "Lingua"){

Dano -= 5

}

if(Defensor.Arma == "Lingua"){

AcertoDefensor += 3

}

if(Defensor.Arma == "Desarmado"){

IniciativaDef += 1

}
}

// Ações Comuns e Reações
if(Defensor.FA >= 0){
if(Atacante.Ataque == "Soco"){

TipoDano = "Concussao"

DadoFA = rollDice1d10()

FACrit = 10

AtaqueSP += 0

AtkPA += 2

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Chute"){

TipoDano = "Concussao"

DadoFA = rollDice1d10()

FACrit = 10

AtkPA += 2
AtaqueSP += 0
Dano += 1

IniciativaAtk -= 1

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Cotovelada"){

TipoDano = "Concussao"

DadoFA = rollDice1d12()

FACrit = 12

AtkPA += 3
AtaqueSP += 0
Dano += 2

IniciativaAtk -= 2

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Joelhada"){

TipoDano = "Concussao"

DadoFA = rollDice1d12()

FACrit = 12

AtkPA += 3
AtaqueSP += 0
Dano += 3

IniciativaAtk -= 3

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Asa Eletrica"){

TipoDano = "Eletrico"

DadoFA = rollDice1d20()

Dano -= Atacante.FA

Dano += Atacante.FE + FEAtk

AtkPA += 3

FACrit = 20

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Queda Mental"){

TipoDano = "Concussao"

Furarguarda += 100

DadoFA = rollDice1d12()

FACrit = 12

Dano -= Atacante.FA

Dano += Atacante.FE + FEAtk

Atacante.Mira = "o Corpo"

AtkPA += 4
AtaqueSP += 0

Acerto += Atacante.PerCon

Esquiva += Defensor.PerCon + Defensor.FE

Esquiva -= Defensor.ES

IniciativaDef = 0

IniciativaAtk = 0

}

if(Atacante.Ataque == "Baque"){

TipoDano = "Concussao"

DadoFA = rollDice1d10()

FACrit = 10

AtkPA += 3

Acerto += Atacante.PerArmas + 1

MovAtk += Atacante.PerArmas

}

if(Atacante.Ataque == "Toque"){

TipoDano = "Concussao"

DadoFA = 0

FACrit = 10

AtaqueSP += 0

AtkPA += 2

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Corte"){

TipoDano = "Cortante"

DadoFA = rollDice1d12()

FACrit = 12

AtkPA += 2

Acerto += Atacante.PerArmas

MovAtk += Atacante.PerArmas

}

if(Atacante.Ataque == "Estocada"){

TipoDano = "Perfurante"

DadoFA = rollDice1d20()

FACrit = 20

Letalidade += 1

AtkPA += 3

Acerto -= 1

Acerto += Atacante.PerArmas

MovAtk += Atacante.PerArmas

}

if(Atacante.Ataque == "Disparar"){

TipoDano = "Perfurante"

DadoFA = rollDice1d20()

FACrit = 20

Letalidade += 2

AtkPA += 2

FA -= Atacante.FA

FA += Atacante.AC + Atacante.PerArmas

Acerto += Atacante.PerArmas

MovAtk += Atacante.PerArmas

}

if(Atacante.Ataque == "Chutar Katana"){

DadoFA = 0

Dano = 0

FACrit = 1

AtkPA += 2

let TesteDesarme = Atacante.Des + Atacante.PerCorpo + 10 - Defensor.Des - Defensor.PerCorpo

if(TesteDesarme > 0){

Defensor.Arma = "Desarmado"

msg.channel.send(`**${Atacante.Nomeread}** chutou a Katana de **${Defensor.Nomeread}** pra longe.`)

}

Acerto = -10

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Mordida"){

TipoDano = "Perfurante"

DadoFA = rollDice1d12()

Letalidade += 3

Acerto -= 2

AtkPA += 3

FACrit = 12

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Mordida Larga"){

TipoDano = "Perfurante"

DadoFA = rollDice1d20()

Letalidade += 6

Acerto -= 5

AtkPA += 4

FACrit = 20

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Ataque de Cauda"){

TipoDano = "Concussao"

DadoFA = rollDice1d10()

FFAtk += 2

Acerto += 2

AtkPA += 3

FACrit = 10

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Ataque de Tromba"){

TipoDano = "Concussao"

DadoFA = rollDice1d12()

Dano += 4

FACrit = 12

Acerto -= 2

AtaqueSP += 0

AtkPA += 3

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Pisao"){

TipoDano = "Concussao"

DadoFA = rollDice2d20()

Dano += 6

FACrit = 20

Acerto -= 12

AtaqueSP += 0

AtkPA += 5

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Defensor.Reacao == "Esquiva"){

Esquiva += 0

DefesaSP += 0

DefPA += 0

}

if(Defensor.Reacao == "Esquiva Desesperada"){

Esquiva += 1 + rollDice1d4()

DefesaSP += 2

DefPA += 1

}

if(Defensor.Reacao == "Contra Ataque"){

Esquiva -= 2
IniciativaDef -= 2

DefPA += 1

}

if(Defensor.Reacao == "Aparar"){

Esquiva -= 3

DefPA += 0

}

if(Defensor.Reacao == "Bloqueio"){

TipoReacao = "Bloqueio"

}

if(Defensor.Reacao == "Bloqueio Cruzado"){

TipoReacao = "Bloqueio"

DefPA += 1

DefesaSP += 1

}

if(Defensor.Reacao == "Resistir"){

TipoReacao = "Bloqueio"

DefPA -= 1

}

if(Defensor.Reacao == "Recuo"){

MovDef += Defensor.PerJogoPes

Esquiva -= 3

DefPA += 1

DefesaSP += 1

}

}

// Ações Especiais
if(Defensor.FA >= 0){

if(Atacante.AcaoEsp.includes("Rapido")){

let AtaqueRapido = rollDice1d2()

IniciativaAtk += AtaqueRapido

AtkPA += 1

AtaqueSP += 2

}

if(Atacante.AcaoEsp.includes("Forte")){

let AtaqueForte = rollDice1d2()

Dano += AtaqueForte

AtaqueSP += 2

AtkPA += 1

}

if(Atacante.AcaoEsp.includes("Compacto")){

AtaqueSP += 0

Dano -= 2

}

if(Atacante.AcaoEsp.includes("Cruzado")){

AtaqueSP += 1

AtkPA += 1

}

if(Atacante.AcaoEsp.includes("Multiplo")){

Acerto -= rollDice1d6()

AtaqueSP += 1

AtkPA -= 1

}

if(Atacante.AtkSus == "S"){

let AtkSurpresa = rollDice1d20() + Atacante.Fur

let DefSurpresa = rollDice1d20() + Defensor.Per

let TesteAtk = AtkSurpresa - DefSurpresa

if(TesteAtk > 0){

Atacante.Iniciacao += TesteAtk

msg.channel.send(`**${Atacante.Nomeread}** surpreendeu ${Defensor.Nomeread} em **${TesteAtk}**.`)

}

if(TesteAtk < 0){

msg.channel.send(`**${Atacante.Nomeread}** não surpreendeu ${Defensor.Nomeread}.`)

}

}

if(Atacante.Furtivo == "S"){

let AtkFurtivo = rollDice1d20() + Atacante.Fur

let DefFurtiva = rollDice1d20() + Defensor.Per

let TesteAtk = AtkFurtivo - DefFurtiva

if(TesteAtk > 0){

Defensor.Reacao = "Neutro"

msg.channel.send(`**${Atacante.Nomeread}** atacou ${Defensor.Nomeread} **Furtivamente**.`)

}

if(TesteAtk < 0){

AtkSus = "S"

msg.channel.send(`**${Atacante.Nomeread}** foi detectado por **${Defensor.Nomeread}** antes de concluir o ataque.`)

}

}

}

// Distância
if(Defensor.FA >= 0){

if(Distancia == 1){

IniciativaDef -= 1

DistanciaNome = "Queima Roupa"

}

if(Distancia == 2){

DistanciaNome = "Curta Distancia"

}

if(Distancia >= 3 && Distancia <= 5){

IniciativaDef += 1

DistanciaNome = "Meia Distancia"

}

if(Distancia >= 6){

IniciativaDef += 2

DistanciaNome = "Longa Distancia"

}

if(Atacante.Efeitos.includes("Ataque Aquatico")){

Distancia = 1

}

}

// Effs Pré-Iniciativa
if(Defensor.FA >= 0){

if(Atacante.Efeitos.includes("Flanco")){

IniciativaAtk += 1 + rollDice1d4()

}

if(Atacante.Efeitos.includes("Restricao Celestial")){

IniciativaAtk += 15

Dano += 12

Penetracao += 10

}

if(Defensor.Efeitos.includes("Restricao Celestial")){

IniciativaDef += 15

Defesa += 16

Armadura += 10

}

if(Atacante.Efeitos.includes("Machucado")){

Dano -= 1
Acerto -= 2

}

if(Defensor.Efeitos.includes("Machucado")){

Defesa -= 4
Esquiva -= 3

}

if(Atacante.Efeitos.includes("Tekken")){

Dano += 4
Acerto -= 2

}

if(Defensor.Efeitos.includes("Tekken")){

Defesa += 4
Esquiva -= 2

}

if(Atacante.Efeitos.includes("Feiticaria de Projeçao")){

IniciativaAtk += 5

}

if(Defensor.Efeitos.includes("Feiticaria de Projeçao")){

IniciativaDef += 5

}

if(Atacante.Efeitos.includes("Balas de Prata")){

AtkPA -= 1

Letalidade += 1
Acerto += 5
Dano += 5 + Atacante.FE

}


if(Atacante.Efeitos.includes("Andorinha")){

Dano += rollDice2d12() + Atacante.FE*2

}

if(Atacante.Efeitos.includes("Marionete")){

IniciativaAtk -= 2
Dano -= 2

}

if(Defensor.Efeitos.includes("Marionete")){

IniciativaDef -= 2
Defesa -= 2

}

if(Atacante.Efeitos.includes("Quicksilver")){

Distancia = 0
Furarguarda += 50
Penetracao += 5
Letalidade += Atacante.FE
Acerto += Atacante.Prof

}

if(Atacante.Efeitos.includes("Blackout")){

Furarguarda += 1000
Acerto += 1000

}

if(Defensor.Efeitos.includes("Blackout")){

Esquiva += 1000

}

if(Atacante.Efeitos.includes("Amor Verdadeiro")){

Dano += 3
IniciativaAtk += 3
Acerto += 3

}

if(Defensor.Efeitos.includes("Amor Verdadeiro")){

Defesa += 3
IniciativaDef += 3
Esquiva += 3

}

if(Atacante.Efeitos.includes("Deathclock")){

Dano += 3
IniciativaAtk += 3
Acerto += 3

}

if(Defensor.Efeitos.includes("Deathclock")){

Defesa += 3
IniciativaDef += 3
Esquiva += 3

}

if(Atacante.Efeitos.includes("Cronos")){

IniciativaAtk += 5 + rollDice1d6()

}

if(Defensor.Efeitos.includes("Cronos")){

IniciativaDef += 10 + rollDice1d8()

}

if(Atacante.Efeitos.includes("Em Movimentacao")){

AtkPA += 1

}

if(Defensor.Efeitos.includes("Em Movimentacao")){

Esquiva += Defensor.Per + rollDice1d10()

}

if(Atacante.Efeitos.includes("Nervos Acelerados")){

IniciativaAtk += 1 + rollDice1d4()

}

if(Defensor.Efeitos.includes("Nervos Acelerados")){

IniciativaDef += 1 + rollDice1d4()

}

if(Atacante.Efeitos.includes("Pernas Turbinadas")){

IniciativaAtk += 2 + rollDice1d8()

}

if(Atacante.Efeitos.includes("Manipulação de Tamanho")){

Acerto += Atacante.Prof + rollDice1d6()

}

if(Defensor.Efeitos.includes("Manipulação de Tamanho")){

Esquiva += Defensor.Prof + rollDice1d6()

}

if(Atacante.Efeitos.includes("Punhos de Missil")){

Dano += Atacante.FE
Acerto += rollDice1d4()

}

if(Atacante.Efeitos.includes("Azul: Imbuir")){

Dano += Math.floor(Atacante.FE*0.5)
Dano += rollDice1d4()

}

if(Defensor.Efeitos.includes("Cura Constante da Reversão")){

Defesa += 1 + Math.floor(Defensor.Prof*0.25)

}

if(Defensor.Efeitos.includes("Breve Pausa")){

let DiminuirIn1 = rollDice1d8()

let DiminuirIn2 = rollDice1d6()

IniciativaDef -= DiminuirIn1

IniciativaDef -= DiminuirIn2

const PausaReplace = Defensor.Efeitos.replace("Breve Pausa", "")
Defensor.Efeitos = PausaReplace

msg.channel.send(`**Breve Pausa** reduziu a Iniciativa de **${Defensor.Nomeread}** em **${DiminuirIn1 + DiminuirIn2}**.`)

}

if(Atacante.Efeitos.includes("Em Movimento")){

let EfeitoMov = Atacante.Efeitos.substring(Atacante.Efeitos.indexOf("Em Movimento"), 23)

let CoordQEstava = EfeitoMov.slice(14, 16) // slice do 1 []

let CoordQPara = EfeitoMov.slice(18, 20)

let MovReplace = Atacante.Efeitos.replace(`Em Movimento [${CoordQEstava}, ${CoordQPara}]. `, ``)

Atacante.Efeitos = MovReplace
db.write()

CoordQEstava = parseInt(CoordQEstava)

CoordQPara = parseInt(CoordQPara)

Atacante.NS = CoordQPara

msg.channel.send(`**${Atacante.Nomeread}** se moveu até **${CoordQPara}**.`)

}

if(Atacante.Efeitos.includes("Acelerar")){

// indexOf = vai achar a palavra Acelerar na string e retornar onde que tá o "A" de Acelerar, ou seja, a primeira letra

let CortarAce = Atacante.Efeitos.substring(Atacante.Efeitos.indexOf("Acelerar"), 15)

let NumeroAcelerar = CortarAce.slice(10, 12)
NumeroAcelerar = parseInt(NumeroAcelerar)

IniciativaAtk += NumeroAcelerar

console.log(CortarAce)

console.log(parseInt(NumeroAcelerar))

// const AcelerarReplace = Atacante.Efeitos.replace(`${1}`, "")

}

if(Atacante.Efeitos.includes("Tekkai 50%")){

Dano += Math.floor(Atacante.Vig*0.5)

}

if(Defensor.Efeitos.includes("Tekkai 50%") && (TipoDano == "Cortante" || TipoDano == "Perfurante")){

Defesa += Math.floor(Defensor.Vig*0.25)

}

if(Defensor.Efeitos.includes("Tekkai 50%") && TipoDano == "Concussão"){

Defesa += Math.floor(Defensor.Vig*0.5)

}

if(Atacante.Efeitos.includes("Tekkai 100%")){

Dano += Math.floor(Atacante.Vig)

}

if(Defensor.Efeitos.includes("Tekkai 100%") && (TipoDano == "Cortante" || TipoDano == "Perfurante")){

Defesa += Math.floor(Defensor.Vig*0.5)

}

if(Defensor.Efeitos.includes("Tekkai 100%") && TipoDano == "Concussão"){

Defesa += Math.floor(Defensor.Vig)

}

if(Atacante.Efeitos.includes("Tekkai 200%")){

Dano += Math.floor(Atacante.Vig)

}

if(Defensor.Efeitos.includes("Tekkai 200%") && (TipoDano == "Cortante" || TipoDano == "Perfurante")){

Defesa += Math.floor(Defensor.Vig*2)

}

if(Defensor.Efeitos.includes("Tekkai 200%") && TipoDano == "Concussão"){

Defesa += Math.floor(Defensor.Vig*1)

}

if(Defensor.Efeitos.includes("Tekkai 200%")){

IniciativaDef -= tecDef.CustoSP

}

if(Defensor.Efeitos.includes("Parado")){

Defensor.Reacao = "Neutro"

const ParadoReplace = Defensor.Efeitos.replace("Parado", "")
Defensor.Efeitos = ParadoReplace

}

if(Defensor.Efeitos.includes("Desmaio")){

Defensor.Reacao = "Neutro"

}

if(Defensor.Reacao == "Neutro"){

IniciativaAtk = 0

Esquiva = -10
IniciativaDef = 0
DadoES = 0

}

}

// Vantagem de Iniciativa
if(Defensor.FA >= 0){

Acerto += Math.floor(IniciativaAtk*0.5)

Esquiva += Math.floor(IniciativaDef*0.5)

if(IniciativaAtk > IniciativaDef){

VantIn = IniciativaAtk - IniciativaDef

if(Esquiva <= -2){

Esquiva = -2

}

VitoriosoIn = Atacante.Nome

}

if(IniciativaAtk < IniciativaDef){

VantIn = IniciativaDef - IniciativaAtk

VitoriosoIn = Defensor.Nome

}

if(IniciativaAtk == IniciativaDef){

VitoriosoIn = "Empate"

}
}

// Guarda
if(Defensor.FA >= 0){

if(tecAtk.Efeitos.includes("Inbloqueavel")){

Furarguarda += 1000

}

if(Atacante.AcaoEsp.includes("Cruzado" && !tecDef.Efeitos.includes("Defesa Segura"))){

let AtkCruzado = 1 + rollDice1d6()

Furarguarda += AtkCruzado

}

if(Atacante.Mira == "o Corpo" && !tecDef.Efeitos.includes("Defesa Segura")){

Furarguarda += 50

}

if(tecAtk.Efeitos.includes("Dois Lados") && tecDef.Cmd == "Mugen"){

Guarda -= 10

}

if(tecAtk.Efeitos.includes("Todos os Lados") && tecDef.Cmd == "Mugen"){

Guarda -= 1000

}

if(Atacante.CA == "S"){

let CAFurarGuarda = Atacante.Iniciacao

if(CAFurarGuarda > 3){

CAFurarGuarda = 3

}

Furarguarda += CAFurarGuarda

}

if(tecDef.Efeitos.includes("Defesa Perfeita")){

Furarguarda -= 1000

}

if(Defensor.Reacao == "Aparar"){

let ApararRead = `Aparar: ${AcertoDefensor} + **${dadoAparar}** x. **${contraAparar}** + ${Acerto}. `

Furarguarda = IniciativaAtk + rollDice1d20()

Guarda = IniciativaDef + rollDice1d20() + 5

DefesaSP += 1

Aparar = (AcertoDefensor + dadoAparar + 3) - (contraAparar + Acerto)

if(Guarda >= Furarguarda){

let GuardaFuradaRead = `Guarda: **${Guarda}** x. **${Furarguarda}**.`

}

if(Furarguarda > Guarda){

GuardaFurada = "S"

let GuardaFuradaRead = `! Furo de Guarda: **${Furarguarda}** x. **${Guarda}**.`

}

}

if(Defensor.Reacao == "Bloqueio"){

Furarguarda = IniciativaAtk + rollDice1d12() + Atacante.PerCorpo

Guarda = IniciativaDef + rollDice1d12() + 6 + Defensor.PerCorpo

if(tecDef.Nome == "Reforçar Braco"){

Guarda -= 2

}

if(tecDef.Nome == "Compressão: Braços"){

Guarda -= 2

}

if(Furarguarda > Guarda){

Esquiva -= 1

GuardaFurada = "S"

let GuardaFuradaRead = `! Furo de Guarda: **${Furarguarda}** x. **${Guarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

if(Guarda >= Furarguarda){

let GuardaFuradaRead = `Guarda: **${Guarda}** x. **${Furarguarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

}

if(Defensor.Reacao == "Bloqueio Cruzado"){

Furarguarda = IniciativaAtk + rollDice1d12()

Guarda = IniciativaDef + rollDice1d12() + 4

let GuardaCruzada = 1 + rollDice1d4()

if(Furarguarda > Guarda){

Esquiva -= 2

GuardaFurada = "S"

let GuardaFuradaRead = `! Furo de Guarda: **${Furarguarda}** x. **${Guarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

if(Guarda >= Furarguarda){

Defesa += GuardaCruzada

msg.channel.send(`**${Defensor.Nomeread}** usou Guarda Cruzada e recebeu: **+${GuardaCruzada}** de Defesa.`)

let GuardaFuradaRead = `Guarda: **${Guarda}** x. **${Furarguarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

}

if(Defensor.Reacao == "Resistir"){

Furarguarda = IniciativaAtk + rollDice1d12() + Atacante.PerCorpo

Guarda = IniciativaDef + rollDice1d12() + 10 + Defensor.PerCorpo

if(tecDef.Nome == "Reforçar Ponto"){

Guarda -= 8

}

if(Furarguarda > Guarda){

Esquiva -= 1

GuardaFurada = "S"

let GuardaFuradaRead = `! Furo de Guarda: **${Furarguarda}** x. **${Guarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

if(Guarda >= Furarguarda){

let GuardaFuradaRead = `Guarda: **${Guarda}** x. **${Furarguarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

}

if(tecDef.Nome == "Compressão: Ponto do Corpo" && GuardaFurada == "N"){

Defesa += 2 + Math.floor((Defensor.Prof + Defensor.FE) * 1.5)

Armadura += Defensor.Prof + Defensor.FE

}

if(tecDef.Nome == "Compressão: Braços" && GuardaFurada == "N"){

Defesa += 1 + Math.floor((Defensor.Prof + Defensor.FE) * 1)

Armadura += Defensor.Prof + Defensor.FE

}

if(tecDef.Nome == "Compressão: Corpo"){

Defesa += Math.floor((Defensor.Prof + Defensor.FE) * 0.5)

Armadura += Defensor.Prof + Defensor.FE

}

if(tecDef.Nome == "Reforçar Ponto do Corpo" && GuardaFurada == "N"){

Defesa += 2 + Math.floor(Defensor.FE * 0.75)

Armadura += 2 + Math.floor(Defensor.FE * 0.75)

}

if(tecDef.Nome == "Reforçar Braço" && GuardaFurada == "N"){

Defesa += 1 + Math.floor(Defensor.FE * 0.5)

Armadura += 1 + Math.floor(Defensor.FE * 0.5)

}

if(tecDef.Nome == "Reforçar Corpo"){

Defesa += Math.floor(Defensor.FE * 0.25)

Armadura += Math.floor(Defensor.FE * 0.25)

}

if(tecDef.Efeitos.includes("Guarda")){

Furarguarda = IniciativaAtk + rollDice1d20()

Guarda = IniciativaDef + rollDice1d20() + tecDef.ValorGuarda

if(Furarguarda > Guarda){

GuardaFurada = "S"

let GuardaFuradaRead = `! Furo de Guarda: **${Furarguarda}** x. **${Guarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

if(Guarda >= Furarguarda){

Defesa += tecDef.ValorDefesa

let GuardaFuradaRead = `Guarda: **${Guarda}** x. **${Furarguarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

}

if(GuardaFurada == "N" && tecDef.Efeitos.includes("Invulneravel")){

Esquiva += 1000

Tenacidade += 1000

}

if(GuardaFurada == "N" && TipoReacao == "Bloqueio" && Defensor.Reacao !== "Resistir"){

Atacante.Mira = "o Braco"
db.write()

}

if(GuardaFurada == "N" && DefArmado == "S" && Defensor.Reacao == "Aparar"){

Atacante.Mira = "a Arma"
db.write()

}

if(DefArmado == "N" && Aparar > 0 && GuardaFurada == "N" && Defensor.Reacao == "Aparar"){

Atacante.Mira = "a Mao"
db.write()

}
}

// Mira
if(Defensor.FA >= 0){
if(Atacante.Mira == "o Ponto Fraco"){

if(Defensor.Efeitos.includes("Galhos Frageis")){

let NerfDef = Math.floor(Defensor.Res*0.5) + 3

DadoRes = rollDice1d4()

Tenacidade -= 3

Acerto -= 10

Defesa -= NerfDef

}

}

if(Atacante.Mira == "o Olho"){

Letalidade += 5
Acerto -= 6

}

if(Atacante.Mira == "o Rosto"){

MiraParte = "a Cabeca"

DadoRes = rollDice1d4()

ResCrit = 4

Acerto -= 1

Defesa -= 3

}

if(Atacante.Mira == "o Braco"){

MiraParte = "o Membro Superior"

Tenacidade += 1

DadoRes = rollDice1d10()

ResCrit = 10

Defesa += 1

Acerto += 1

}

if(Atacante.Mira == "o Peito"){

MiraParte = "o Torso"

DadoRes = rollDice1d6()

Tenacidade -= 1

ResCrit = 6

Defesa -= 2

}

if(Atacante.Mira == "a Mao"){

MiraParte = "a Mao"

Tenacidade += 2

DadoRes = rollDice1d12()

ResCrit = 12

Defesa += 2

Acerto += 2

}

if(Atacante.Mira == "o Abdomem"){

MiraParte = "o Torso"

DadoRes = rollDice1d6()

ResCrit = 6

Tenacidade -= 2

Defesa -= 1

}

if(Atacante.Mira == "o Corpo"){

MiraParte = "o Torso"

DadoRes = rollDice1d8()

ResCrit = 8

Tenacidade -= 3

}

if(Atacante.Mira == "a Arma"){

let PegarNome = Defensor.ArmaCodigo

let ArmaNome = techs.get("Techs").find({Nome : Defensor.ArmaCodigo }).value()

let DanificarArma = FFAtk + DadoFA - ArmaNome.ArmaRes

if(DanificarArma < 0){

DanificarArma = 0

}

ArmaNome.ArmaRes -= DanificarArma

Dano = FFAtk

DadoRes = 0

Defesa = ArmaNome.ArmaRes

if(DanificarArma > 0){

msg.channel.send(`**${Defensor.Nomeread}** recebeu **${DanificarArma}** de Dano na sua **${Defensor.Arma}**.

${Defensor.Arma} de **${Defensor.Nomeread}**: **${ArmaNome.ArmaRes}** de Resistência.`)

}

db.write()
techs.write()

}
}

// Criticos Defensivos
if(Defensor.FA >= 0){

if(DadoRes >= ResCrit){

msg.channel.send(`**Acerto Crítico** na Defesa!`)

DadoRes += Math.ceil(ResCrit*0.5)

}

if(DadoES >= ESCrit){

msg.channel.send(`**Acerto Crítico** na Esquiva!`)

DadoES += Math.ceil(ESCrit*0.5)

}
}

// Effs Pré-Acerto
if(Defensor.FA >= 0){

}

// Teste de Acerto, Scoop Global
let TesteAcerto = Acerto + DadoAC - DadoES - Esquiva

// Transformar Teste de Acerto
if(Defensor.FA >= 0){

}

// Testes de Iniciativa
if(Defensor.FA >= 0){
if(Defensor.Reacao == "Contra Ataque"){

let PericiaCAAtk = Atacante.PerCorpo

let PericiaCADef = Defensor.PerCorpo

if(Atacante.AcaoEsp.includes("Compacto")){

let CompactoAtk = 1 + rollDice1d4()

PericiaCAAtk += CompactoAtk

}

TesteCA = (PericiaCADef + ContraDef + IniciativaDef) - (PericiaCAAtk + ContraAtk + IniciativaAtk)

let BonusAtkCA = TesteCA

if(TesteCA > 3){

BonusAtkCA = 3

}

if(TesteCA > 0){

TesteAcerto = -1

}

if(TesteCA < 0){

TesteCA = 0

}

Defensor.Iniciacao += TesteCA

Defensor.AtkOport = "S"

msg.channel.send(`Contra Ataque: ${PericiaCADef + IniciativaDef} + **${ContraDef}** x. **${ContraAtk}** + ${IniciativaAtk + PericiaCAAtk}.

Bônus Ganho: **${BonusAtkCA}**.`)

}

if(Defensor.Reacao == "Recuo"){

if(Atacante.AcaoEsp.includes("Compacto")){

let CompactoAtk = 1 + rollDice1d4()

TesteRecuo -= CompactoAtk

}

RecuoAtk = rollDice1d20()
RecuoDef = rollDice1d20()

if(tecDef.Efeitos.includes("Deslocacao")){

MovDef += (rollDice(tecDef.Deslocacao, tecDef.DeslocacaoDado) + (tecDef.DeslocacaoProf * Defensor.Prof) + tecDef.DeslocacaoFixo) * 0.5

}

TesteRecuo = (MovDef + IniciativaDef + RecuoDef) - (RecuoAtk + MovAtk + IniciativaAtk)

if(TesteRecuo <= 0){

TesteRecuo = 0

}

if(TesteRecuo > 0){

TesteAcerto = -1

// se move 0,5m pra kd 1 de diff de resultado. tem um cmd q faz o personagem se mover pra quantia exata q ele quer quando recua

if(Atacante.Distancia == "QR"){

Atacante.Distancia = "CD"

msg.reply(`**${Defensor.Nome}** recuou pra **Curta Distância**.`)

}

if(Atacante.Distancia == "CD"){

Atacante.Distancia = "LD"

msg.reply(`**${Defensor.Nome}** recuou pra **Longa Distância**.`)

}

}

msg.channel.send(`**Recuo**: ${MovDef} + ${IniciativaDef} + **${RecuoDef}** x. **${RecuoAtk}** + ${IniciativaAtk} + ${MovAtk}.`)

}
}

// Definir Teste de Acerto
if(Defensor.FA >= 0){

if(Atacante.Ataque == "Agarrar"){

DadoFA = 0

Dano = 0

FACrit = 1

AtkPA += 2

if(TesteAcerto > 0){

msg.channel.send(`**${Atacante.Nomeread}** agarrou **${Defensor.Nomeread}**.`)

}

Acerto = -10

MovAtk += Atacante.PerCorpo

}

if(TipoReacao == "Bloqueio" && Letalidade == 0 && GuardaFurada == "N"){

TesteAcerto = 2

}

if(TipoReacao == "Bloqueio" && Letalidade > 0 && TesteAcerto < 2 && GuardaFurada == "N"){

TesteAcerto = 2

}

if(Defensor.Reacao == "Aparar" && Aparar > 0 && Letalidade == 0 && GuardaFurada == "N"){

TesteAcerto = 2

}

if(Defensor.Reacao == "Aparar" && Aparar > 0 && Letalidade > 0 && TesteAcerto < 2 && GuardaFurada == "N"){

TesteAcerto = 2

}

if(tecAtk.Efeitos.includes("Indesviavel") && TesteAcerto < tecAtk.Indesviavel){

TesteAcerto = tecAtk.Indesviavel

}

if(TesteAcerto > 0 && Atacante.Mira !== "a Arma"){

Contato = "S"

}

if(TesteAcerto == 0 || TesteAcerto == 1){

TabelaAcerto = "de Raspão"

TabelaOrdem = 1

Dano -= 1

MultiplAcerto = 0.5

}

if(TesteAcerto >= 2 && TesteAcerto <= 5){

TabelaAcerto = "Direto"

TabelaOrdem = 2

MultiplAcerto = 1

}

if(TesteAcerto >= 6 && TesteAcerto <= 14){

TabelaAcerto = "Pesado"

TabelaOrdem = 3

Dano += 1

MultiplAcerto = 1.5

}

if(TesteAcerto >= 15 && TesteAcerto <= 19){

TabelaAcerto = "Massivo"

TabelaOrdem = 4

Dano += 2

MultiplAcerto = 2

}

if(TesteAcerto >= 20){

TabelaAcerto = "Grave"

TabelaOrdem = 5

Dano += 3

MultiplAcerto = 3

}

if(Atacante.Mira == "a Arma"){

TabelaAcerto = "na Arma"

TabelaOrdem = 0

MultiplAcerto = 0

}

}

// Criticos Ofensivos
if(Defensor.FA >= 0){

if(Atacante.Efeitos.includes("Ratio")){

FACrit = DadoFA

}

if(DadoFA >= FACrit && TesteAcerto >= 0){

DadoFA += Math.ceil(FACrit*0.5)

msg.channel.send(`**Acerto Crítico** no Dano!`)

if(Atacante.Ataque == "Soco"){

msg.channel.send({
files: [
'./pics/CriticoSoco.gif'
]
})

}

if(Atacante.Ataque == "Chute"){

msg.channel.send({
files: [
'./pics/CriticoChute.png'
]
})

}

}

if(DadoAC >= ACCrit){

msg.channel.send(`**Acerto Crítico** no Acerto!`)

DadoAC += Math.ceil(ACCrit*0.5)

}

}

// Effs Pré-Dano
if(Defensor.FA >= 0){
if(Atacante.Efeitos.includes("Ratio") && (Acerto + DadoAC) >= 10 && TesteAcerto >= 0){

let DanoRatio = rollDice1d6()

let Multipl = 0.5 * TabelaOrdem

let DadoRatio = DanoRatio + Atacante.FE

DadoRatio *= Multipl

let Ratio = DadoRatio

Dano += DadoRatio

msg.channel.send(`**${Atacante.Nomeread}** acertou com a **Técnica de Proporção** e ganhou: **+${Ratio}** de Dano.`)

}

if(Contato == "S" && BlackFlash >= 100 && BFRandom >= 5){

if(!Atacante.Efeitos.includes("Abençoado pelas Faiscas")){

Atacante.Efeitos += "Abençoado pelas Faiscas - "

}

let BFDano = rollDice2d6()

DadoFA += BFDano

Dano += DadoFA

FACrit = 0

Atacante.PA += 3

let Gifsorting = rollDice1d6()

msg.channel.send(`**Black Flash!**

+**${BFDano}** de Dano!`, {
files: [
'./pics/Bfgota.png'
]
})

if(Gifsorting == 1){
msg.channel.send({
files: [
'./pics/bf1.gif'
]
})}

if(Gifsorting == 2){
msg.channel.send({
files: [
'./pics/bf2.gif'
]
})}

if(Gifsorting == 3){
msg.channel.send({
files: [
'./pics/bf3.gif'
]
})}

if(Gifsorting == 4){
msg.channel.send({
files: [
'./pics/bf4.gif'
]
})}

if(Gifsorting == 5){
msg.channel.send({
files: [
'./pics/bf5.gif'
]
})}

if(Gifsorting == 6){
msg.channel.send({
files: [
'./pics/bf6.gif'
]
})}

}

if(Defensor.Vtg.includes("Escamas Grossas (2)") && Atacante.Mira !== "o Rosto"){

Armadura += 6

db.write()

}

if(Atacante.Efeitos.includes("Estatura Grande")){

Dano += 2

IniciativaAtk -= 1

}

if(Defensor.Efeitos.includes("Estatura Grande")){

Defesa += 1

Esquiva -= 2

IniciativaDef -= 1

}

if(Atacante.Efeitos.includes("Estatura Gigante")){

Dano += 4

IniciativaAtk -= 2

}

if(Defensor.Efeitos.includes("Estatura Gigante")){

Defesa += 2

Esquiva -= 4

IniciativaDef -= 2

}

if(Defensor.Efeitos.includes("Exoesqueleto Completo")){

Armadura += 10

Defesa += 5

db.write()

}

if(Defensor.Nomeread == "Ouroboros" && TipoDano == "Cortante"){

Defesa -= rollDice1d8()

}

}

// Teste de Dano, Scoop Global
let TesteDano = Dano + DadoFA - DadoRes - Defesa

// Tratamento de Dano Negativo
if(Defensor.FA >= 0){

if(TesteDano < 0){

TesteDano = 0

}

}

// Causar Dano, Scoop Global
let DanoCausado = TesteDano

// Effs Pós-Dano
if(Defensor.FA >= 0){

if(Atacante.Arma == "Asa Eletrica" && Contato == "S"){

if(TesteDano >= 1 && TesteDano <= 10 && !Defensor.Efeitos.includes("Paralisia [1]")){

Defensor.Efeitos = "Paralisia [1] - "

}

if(TesteDano >= 11 && TesteDano <= 20 && !Defensor.Efeitos.includes("Paralisia [2]")){

Defensor.Efeitos = "Paralisia [2] - "

}

if(TesteDano > 21  && !Defensor.Efeitos.includes("Paralisia [3]")){

Defensor.Efeitos = "Paralisia [3] - "

}

if(TesteDano >= 1 && TesteDano <= 10 && Defensor.Efeitos.includes("Paralisia [1]")){

Defensor.PA -= 1

}

if(TesteDano >= 11 && TesteDano <= 20 && Defensor.Efeitos.includes("Paralisia [2]")){

Defensor.PA -= 2

}

if(TesteDano > 21  && Defensor.Efeitos.includes("Paralisia [3]")){

Defensor.PA -= 3

}

}

techs.write()
db.write()

}

// Teste de Dano e Armadura
if(Defensor.FA >= 0){
if(Armadura < 0){

Armadura = 0

}

Armadura -= Penetracao

DanoLetalidade = Math.floor(Letalidade*MultiplAcerto)

TesteDano = Math.ceil(TesteDano*MultiplAcerto)

if(Armadura == 1){

DanoLetalidade = Math.floor(DanoLetalidade *= 0.90)

}

if(Armadura == 2){

DanoLetalidade = Math.floor(DanoLetalidade *= 0.80)

}

if(Armadura == 3){

DanoLetalidade = Math.floor(DanoLetalidade *= 0.70)

}

if(Armadura == 4){

DanoLetalidade = Math.floor(DanoLetalidade *= 0.60)

}

if(Armadura == 5){

DanoLetalidade = Math.floor(DanoLetalidade *= 0.50)

}

if(Armadura == 6){

DanoLetalidade = Math.floor(DanoLetalidade *= 0.40)

}

if(Armadura == 7){

DanoLetalidade = Math.floor(DanoLetalidade *= 0.30)

}

if(Armadura == 8){

DanoLetalidade = Math.floor(DanoLetalidade *= 0.20)

}

if(Armadura == 9){

DanoLetalidade = Math.floor(DanoLetalidade *= 0.10)

}

if(Armadura >= 10){

DanoLetalidade = 0

}

}

// One Time Uses
if(Defensor.FA >= 0){
if(Atacante.AtkOport == "S"){

msg.channel.send(`**Ataque de Oportunidade! **`)
Atacante.AtkOport = "N"

AtkPA -= AtkPA

}

if(Atacante.CA == "S" && TesteCA == 0){

Atacante.CA = "N"

}
}

// Gastos
if(Defensor.FA >= 0){

Atacante.SP -= AtaqueSP

Defensor.SP -= DefesaSP

Atacante.PA -= AtkPA

Defensor.PA -= DefPA

if(tecDef.Tipo.includes("Defensivo")){

DefesaMP += tecDef.Custo

let MPReducao = DefesaMP

let Reducao = 1 - (Defensor.Prof*0.05) - (Defensor.PerCon*0.05)

if(Reducao <= 0.30){

Reducao = 0.30

}

MPReducao *= Reducao
MPReducao = Math.ceil(MPReducao)

Defensor.MP -= MPReducao

}

}

// Ferimentos
if(Defensor.FA >= 0){

let TesteImpacto = TesteDano
let TesteSangramento = TesteDano
let TesteAtordoamento = TesteDano

if(Defensor.Efeitos.includes("Exoesqueleto Completo")){

TesteSangramento -= 100

}

if(TipoDano == "Concussao" && TesteImpacto >= 5 + Tenacidade && TesteImpacto <= 15 + (Tenacidade*2) && (Atacante.AcaoEsp.includes("Forte"))){

let DadoImpacto = rollDice1d4()

let ImpactoRate = 0

let TesteImpacto = DadoImpacto + ImpactoRate

if(Atacante.NS <= Defensor.NS){

Defensor.NS += TesteImpacto

}

if(Atacante.NS > Defensor.NS){

Defensor.NS -= TesteImpacto

}

msg.channel.send(`**${Defensor.Nome}** foi ferido com: **Impacto Leve**.

**${Defensor.Nome}** foi Impactado até **${Defensor.NS}**.`)

}

if(TipoDano == "Concussao" && TesteImpacto >= 15 + (Tenacidade*2) && (Atacante.AcaoEsp.includes("Forte"))){

let DadoImpacto = rollDice2d4()

let ImpactoRate = 0

let TesteImpacto = DadoImpacto + ImpactoRate

if(Atacante.NS <= Defensor.NS){

Defensor.NS += TesteImpacto

}

if(Atacante.NS > Defensor.NS){

Defensor.NS -= TesteImpacto

}

msg.channel.send(`**${Defensor.Nome}** foi ferido com: **Impacto Forte**.

**${Defensor.Nome}** foi Impactado até **${Defensor.NS}**.`)

}

if((TipoDano == "Cortante" || TipoDano == "Perfurante") && TesteSangramento >= 10 && TesteSangramento <= 24){

let SangramentoNumero = rollDice1d4()

let SangramentoEff = `Sangramento [${SangramentoNumero}]. `

let SliceSangramento = SangramentoEff.slice(13, 15)

if(!Defensor.Efeitos.includes("Sangramento")){

Defensor.Efeitos += SangramentoEff

} else {

let CortarSangr = Defensor.Efeitos.substring(Defensor.Efeitos.indexOf("Sangramento"), 18)

SliceSangramento = CortarSangr.slice(13, 15)

if(SliceSangramento.includes("]")){

SliceSangramento = CortarSangr.slice(13, 14)

}

let SangramentoAtualizado = SangramentoNumero + parseInt(SliceSangramento)

let SangrReplace = Defensor.Efeitos.replace(`Sangramento [${SliceSangramento}]. `, `Sangramento [${SangramentoAtualizado}]. `)

Defensor.Efeitos = SangrReplace

}

}

if((TipoDano == "Cortante" || TipoDano == "Perfurante") && TesteSangramento >= 25 && TesteSangramento <= 49){

let SangramentoNumero = rollDice1d4()

let SangramentoEff = `Sangramento [${SangramentoNumero}]. `

let SliceSangramento = SangramentoEff.slice(13, 15)

if(!Defensor.Efeitos.includes("Sangramento")){

Defensor.Efeitos += SangramentoEff

} else {

let CortarSangr = Defensor.Efeitos.substring(Defensor.Efeitos.indexOf("Sangramento"), 18)

SliceSangramento = CortarSangr.slice(13, 15)

console.log(SliceSangramento)

if(SliceSangramento.includes("]")){

SliceSangramento = CortarSangr.slice(13, 14)

}

console.log(SliceSangramento)

let SangramentoAtualizado = SangramentoNumero + parseInt(SliceSangramento)

console.log(SangramentoAtualizado)

let SangrReplace = Defensor.Efeitos.replace(`Sangramento [${SliceSangramento}]. `, `Sangramento [${SangramentoAtualizado}]. `)

Defensor.Efeitos = SangrReplace

}

}

if((TipoDano == "Cortante" || TipoDano == "Perfurante") && TesteSangramento >= 50){

let SangramentoNumero = rollDice3d4()

let SangramentoEff = `Sangramento [${SangramentoNumero}]. `

let SliceSangramento = SangramentoEff.slice(13, 15)

if(!Defensor.Efeitos.includes("Sangramento")){

Defensor.Efeitos += SangramentoEff

} else {

let CortarSangr = Defensor.Efeitos.substring(Defensor.Efeitos.indexOf("Sangramento"), 18)

SliceSangramento = CortarSangr.slice(13, 15)

if(SliceSangramento.includes("]")){

SliceSangramento = CortarSangr.slice(13, 14)

}

let SangramentoAtualizado = SangramentoNumero + parseInt(SliceSangramento)

let SangrReplace = Defensor.Efeitos.replace(`Sangramento [${SliceSangramento}]. `, `Sangramento [${SangramentoAtualizado}]. `)

Defensor.Efeitos = SangrReplace

}

}

if(TipoDano == "Concussao" && TesteAtordoamento >= 5 + Tenacidade && TesteAtordoamento <= 19 + Tenacidade){

Defensor.PA -= rollDice1d2()

msg.channel.send(`**${Defensor.Nome}** tomou **Atordoamento Leve**.

Pontos de Ação de **${Defensor.Nome}**: ${Defensor.PA}.`)

}

if(TipoDano == "Concussao" && TesteAtordoamento >= 20 + Tenacidade){

Defensor.PA -= rollDice2d2()

msg.channel.send(`**${Defensor.Nome}** tomou **Atordoamento Grave**.

Pontos de Ação de **${Defensor.Nome}**: ${Defensor.PA}.`)

}

}

// Late Reads
if(Defensor.FA >= 0){

if(Defensor.Nomeread == "Mahito" && Atacante.Nomeread !== "Kenzo" && Atacante.Arma !== "Desarmado"){

TesteDano = 0

DanoLetalidade = 0

}

if(Atacante.Ataque == "Toque"){

TesteDano = 0

}

}

// Fotos e Gifs
if(Defensor.FA >= 0){



}

// Acertou
if(TesteAcerto >= 0){

Defensor.HP -= TesteDano

Defensor.HP -= DanoLetalidade

let DanoTotal = TesteDano + DanoLetalidade

msg.channel.send(`${Atacante.Nomeread} acertou **${Atacante.Mira}** de ${Defensor.Nomeread} com **${Atacante.Ataque}**. ${Defensor.Sobrenome} ${Defensor.Nomeread} reagiu com **${Defensor.Reacao}** e foi atingido por um **Acerto ${TabelaAcerto}**.

**${Atacante.Sobrenome} ${Atacante.Nomeread}** causou **${DanoTotal}** de Dano. **${Defensor.Sobrenome} ${Defensor.Nomeread}** ficou com **${Defensor.HP}** de HP.

Acerto: ${Acerto} + **${DadoAC}** x. **${DadoES}** + ${Esquiva}.

Ataque: ${Dano} + **${DadoFA}** x. **${DadoRes}** + ${Defesa}.

> ${Atacante.Nomeread}, Pts. de Ação: **${Atacante.PA}**. Hp: **${Atacante.HP}**. Mp: **${Atacante.MP}**. Sp: **${Atacante.SP}**.

> ${Defensor.Nomeread}, Pts. de Ação: **${Defensor.PA}**. Hp: **${Defensor.HP}**. Mp: **${Defensor.MP}**. Sp: **${Defensor.SP}**.

> Iniciativa de ${Atacante.Nomeread}: **${IniciativaAtk}**. Iniciativa de ${Defensor.Nomeread}: **${IniciativaDef}**. Vantagem: **${VantIn}**.

> Dano Pré-Vantagem: **${DanoCausado}**. Dano Letal: **${DanoLetalidade}**.

> Vtg. de Acerto: **${TesteAcerto}**. Multiplicador de Acerto: **${MultiplAcerto}**. Iniciação: **${Atacante.Iniciacao}**.`)
} // Errou
else {

let Frase = ""

FACrit = -1

if(Defensor.Reacao == "Esquiva"){
Frase = `**${Defensor.Nome}** esquivou com sucesso.`
}

if(Defensor.Reacao == "Bloqueio" && TesteAcerto < 0){
Frase = `**${Defensor.Nome}** falhou em bloquear, mas evitou o ataque com sucesso.`
}

if(Defensor.Reacao == "Esquiva" && TesteCA < 0){
Frase = `**${Defensor.Nome}** esquivou com sucesso.`
}

if(Defensor.Reacao == "Contra Ataque" && TesteCA <= 0){
Frase = `**${Defensor.Nome}** falhou em contra-atacar, mas esquivou com sucesso.`
}

if(Defensor.Reacao == "Contra Ataque" && TesteCA > 0){
Frase = `**${Defensor.Nome}** contra atacou com sucesso.`
}

if(Defensor.Reacao == "Recuo"){
Frase = `**${Defensor.Nome}** recuou com sucesso.`
}

if(Defensor.Reacao == "Aparar"){
Frase = `**${Defensor.Nome}** aparou com sucesso.`
}

if(tecDef.Cmd == "Mugen"){

Frase = `**${Defensor.Nome}** parou o ataque no **Ilimitado**.`

let SortPic = rollDice1d2()

if(SortPic == 1){
msg.channel.send({
files: [
'./pics/limitless4.png'
]
})}

if(SortPic == 2){
msg.channel.send({
files: [
'./pics/limitless7.png'
]
})}

}

msg.channel.send(`
${Frase}

Esquiva: ${Esquiva} + **${DadoES}** x. **${DadoAC}** + ${Acerto}.

Vtg. Iniciativa: ${IniciativaAtk} x. ${IniciativaDef}**. +${VantIn}** de ${VitoriosoIn}.`)

}

let Kenzo = db.get("usuarios").find({Nomeread : "Kenzo"}).value()
let Ryoshi = db.get("usuarios").find({Nomeread : "Ryoshi"}).value()
let Kazuki = db.get("usuarios").find({Nomeread : "Kazuki"}).value()
let Midori = db.get("usuarios").find({Nomeread : "Midori"}).value()
let Ryuji = db.get("usuarios").find({Nomeread : "Ryuji"}).value()
let Ryushiro = db.get("usuarios").find({Nomeread : "Ryushiro"}).value()

// Fim de Turno Forçado
if(Defensor.FA >= 0){

if(Atacante.PA <= 0 && AtkPA > 0){

let id_member = msg.member.id
let char = personagem_logado(id_member)

char.AtkMult = 0
db.write()

techs.write()

let MPAtiv = ``
let SPAtiv = ``
let HPAtiv = ``
let PAAtiv = ``

let RegenRead = ``

let HPRegen = 0

let MPRegen = 0

let SPRegen = 0

let MPReducao = char.MP_Ativacao
let SPReducao = char.SP_Ativacao
let HPReducao = char.HP_Ativacao
let PAReducao = char.PA_Ativacao

if(char.Efeitos.includes("Revestimento Comum")){

MPReducao += 1 + Math.floor(char.MP*0.02)

}

if(char.Efeitos.includes("Revestimento Avançado")){

MPReducao += 2 + Math.floor(char.MP*0.03)

}

if(char.Efeitos.includes("Revestimento Excessivo")){

MPReducao += 5 + Math.floor(char.MP*0.05)

}

let Reducao = 1 - (char.Prof*0.05 + char.PerCon*0.05)

if(Reducao <= 0.30){

Reducao = 0.30

}

MPReducao *= Reducao
MPReducao = Math.ceil(MPReducao)

if(char.Efeitos.includes("Jackpot")){

char.TRG += 3.5
char.TRC += 3.5
char.TRM += 3.5

HPRegen += 20
MPRegen += 20
SPRegen += 20

}

if(char.Efeitos.includes("Sangramento")){

let CortarSangr = char.Efeitos.substring(char.Efeitos.indexOf("Sangramento"), 18)

let SliceSangramento = CortarSangr.slice(13, 15)

if(SliceSangramento.includes("]")){

SliceSangramento = CortarSangr.slice(13, 14)

}

parseInt(SliceSangramento)

console.log(SliceSangramento)

HPRegen -= SliceSangramento

}

if(char.Efeitos.includes("Cura Constante da Reversão")){

char.TRG += char.Prof*0.25

HPRegen += rollDice(1*char.FE, 4*char.FE)

}

if(char.Efeitos.includes("Sangue se tornando Energia")){

char.TRM += char.Prof*0.25

MPRegen += rollDice(1*char.FE, 4*char.FE)

}

if(char.Efeitos.includes("Loan Shark")){

MPReducao *= 3

}

if(char.Efeitos.includes("Circular Sangue")){

char.TRG += char.Prof*0.25

char.TRC += char.Prof*0.25

SPRegen += rollDice(1*char.FE, 2*char.FE)

HPRegen += rollDice(1*char.FE, 4*char.FE)

}

if(char.Efeitos.includes("Loan Shark")){

MPReducao *= 3

}

if(char.Efeitos.includes("Sucção do Broto")){

MPReducao += 2
SPReducao += 1

}

let FraseReducaoHP = "gastou"

if(HPReducao <= 0){

FraseReducaoHP = "ganhou"

}

char.HP -= HPReducao
char.SP -= SPReducao
char.MP -= MPReducao
char.PA -= PAReducao

char.TRG += 1.5
char.TRC += 1.5
char.TRM += 1.5

if(char.HP < char.Max_HP*0.50 && char.Vtg.includes("Persistente (1)")){

HPRegen += 1

}

if(char.HP_Ativacao > 0){

HPAtiv = `
> **${char.Nomeread}** ${FraseReducaoHP} **${Math.abs(HPReducao)}** de HP com Ativações.
`

}

if(char.MP_Ativacao > 0){

MPAtiv = `
> **${char.Nomeread}** gastou **${MPReducao}** de MP com Ativações.
`

}

if(char.SP_Ativacao > 0){

SPAtiv = `
> **${char.Nomeread}** gastou **${char.SP_Ativacao}** de SP com Ativações.
`

}

let RecuperarPA = 4

if(char.Efeitos.includes("Restricao Celestial")){

// RecuperarPA += 2

}

if(char.TRG >= 5){

char.TRG -= 5

HPRegen += rollDice1d6() + char.RG

char.HP += HPRegen

RegenRead = `
**${char.Nome}** recuperou **${HPRegen}** de Vida, **${MPRegen}** de Mana e **${SPRegen}** de Stamina.
`

if(char.HP > char.Max_HP){

char.HP = char.Max_HP

}

}

if(char.TRC >= 5){

char.TRC -= 5

SPRegen += rollDice1d4() + Math.floor(char.RC*0.5)

char.SP += SPRegen

RegenRead = `
**${char.Nome}** recuperou **${HPRegen}** de Vida, **${MPRegen}** de Mana e **${SPRegen}** de Stamina.
`

if(char.SP > char.Max_SP){

char.SP = char.Max_SP

}

}

if(char.TRM >= 5){

char.TRM -= 5

MPRegen += rollDice1d6()

char.MP += MPRegen

RegenRead = `
**${char.Nome}** recuperou **${HPRegen}** de Vida, **${MPRegen}** de Mana e **${SPRegen}** de Stamina.
`

if(char.MP > char.Max_MP){

char.MP = char.Max_MP

}

}

let ParalisiaPorVez = "N"

if(char.Efeitos.includes("Paralisia [3]" && ParalisiaPorVez == "N")){

const ParalisiaReplace = char.Efeitos.replace("Paralisia [3] - ", "Paralisia [2] - ")
char.Efeitos = ParalisiaReplace

ParalisiaPorVez = "S"

char.PA -= 1

db.write()

}

if(char.Efeitos.includes("Paralisia [2]" && ParalisiaPorVez == "N")){

const ParalisiaReplace = char.Efeitos.replace("Paralisia [2] - ", "Paralisia [1] - ")
char.Efeitos = ParalisiaReplace

ParalisiaPorVez = "S"

char.PA -= 1

db.write()

}

if(char.Efeitos.includes("Paralisia [1]") && ParalisiaPorVez == "N"){

const ParalisiaReplace = char.Efeitos.replace("Paralisia [1] - ", "")
char.Efeitos = ParalisiaReplace

ParalisiaPorVez = "S"

char.PA -= 1

db.write()

}

if(RecuperarPA <= 0){

RecuperarPA = 1

}

char.PA += RecuperarPA

if(char.PA > char.MaxPA){

char.PA = char.MaxPA

db.write()

}

if(char.PA < char.MinPA) {

char.PA = char.MinPA

db.write()

}

msg.channel.send(`**${char.Nome}** teve seu turno encerrado por falta de Pontos de Ação.

**${char.Nome}** tem **${char.PA}** Pontos de Ação restando.
${HPAtiv}${SPAtiv}${MPAtiv}${RegenRead}`)


db.write()
techs.write()

}

}

// Reset de Mods

Atacante.Mira = Mirahold

if(IniciacaoStart > 0){

Atacante.Iniciacao = 0

Defensor.Iniciacao = 0

}

// Classes
if(Defensor.FA >= 0){
if(Defensor.HP <= 0 && Defensor.Efeitos.includes("Evitar Desmaio")){

Defensor.HP = 1

let DanopraDesmaio = TesteDano - Defensor.Prof

if(DanopraDesmaio < 0){

DanopraDesmaio = 0

}

if(tecAtk.RedirecionarDano = "MP"){

Defensor.MP -= DanopraDesmaio

if(Defensor.MP == 0){

Defensor.HP = 0

}

}

msg.channel.send(`O **Bombeamento de Sangue** manteve **${Defensor.Nomeread}** acordado. O dano causado reduziu sua Mp em **${DanopraDesmaio}**.`)

}

if(Defensor.HP <= 0 && !Defensor.Efeitos.includes("Desmaio")){

Defensor.Efeitos += "Desmaio"

Defensor.PA = 0

if(Defensor.HP <= 0 && Defensor.Classe == "o Shikigami"){

msg.channel.send(`**${Defensor.Nomeread}** desmaiou.`)

}

if(Defensor.HP <= 0 && Defensor.Classe == "a Feiticeira"){

msg.channel.send(`**${Defensor.Nomeread}** desmaiou.`)

}

if(Defensor.HP <= 0 && Defensor.Classe == "o Feiticeiro"){

msg.channel.send(`**${Defensor.Nomeread}** desmaiou.`)

}

if(Defensor.HP <= 0 && Defensor.Classe == "a Maldição"){

msg.channel.send(`**${Defensor.Nomeread}** foi exorcizado.`)

}

if(Defensor.XP_Drop > 0){

Kenzo.XP += Defensor.XP_Drop
Ryoshi.XP += Defensor.XP_Drop
Kazuki.XP += Defensor.XP_Drop
Midori.XP += Defensor.XP_Drop
Ryuji.XP += Defensor.XP_Drop

msg.channel.send(`Todos os feiticeiros ganharam **${Defensor.XP_Drop}** de XP.`)

}

}

}

// Ups
if(Ryuji.Nivel > 1){

Randomgif = 0

if(Kenzo.Nivel < 12 && Ryuji.XP > 2500){

Randomgif = rollDice1d10()

Kenzo.Nivel = 12
Ryoshi.Nivel = 12
Kazuki.Nivel = 12
Midori.Nivel = 12
Ryuji.Nivel = 12

msg.channel.send(`> **Level Up!** Todos uparam pro nível **${Ryuji.Nivel}**!`)

}

if(Kenzo.Nivel < 13 && Ryuji.XP > 4000){

Randomgif = rollDice1d10()

Kenzo.Nivel = 13
Ryoshi.Nivel = 13
Kazuki.Nivel = 13
Midori.Nivel = 15
Ryuji.Nivel = 13

msg.channel.send(`> Level Up! **${Ryuji.Nivel}**`)

}

if(Kenzo.Nivel < 14 && Ryuji.XP > 6000){

Randomgif = rollDice1d10()

Kenzo.Nivel = 14
Ryoshi.Nivel = 14
Kazuki.Nivel = 14
Midori.Nivel = 14
Ryuji.Nivel = 14

msg.channel.send(`> Level Up! **${Ryuji.Nivel}**`)

}

if(Kenzo.Nivel < 15 && Ryuji.XP > 10000){

Randomgif = rollDice1d10()

Kenzo.Nivel = 15
Ryoshi.Nivel = 15
Kazuki.Nivel = 15
Midori.Nivel = 15
Ryuji.Nivel = 15

msg.channel.send(`> Level Up! **${Ryuji.Nivel}**`)

}

if(Kenzo.Nivel < 16 && Ryuji.XP > 12000){

Randomgif = rollDice1d10()

Kenzo.Nivel = 16
Ryoshi.Nivel = 16
Kazuki.Nivel = 16
Midori.Nivel = 16
Ryuji.Nivel = 16

msg.channel.send(`> Level Up! **${Ryuji.Nivel}**`)

}

if(Randomgif == 1){msg.channel.send({
files: [
'./pics/gif15.gif'
]
})}

if(Randomgif == 2){msg.channel.send({
files: [
'./pics/gif7.gif'
]
})}

if(Randomgif == 3){msg.channel.send({
files: [
'./pics/gif35.gif'
]
})}

if(Randomgif == 4){msg.channel.send({
files: [
'./pics/tojirabbit.gif'
]
})}

if(Randomgif == 5){msg.channel.send({
files: [
'./pics/Gif41.gif'
]
})}

if(Randomgif == 6){msg.channel.send({
files: [
'./pics/Gif43.gif'
]
})}

if(Randomgif == 7){msg.channel.send({
files: [
'./pics/Random9.png'
]
})}

if(Randomgif == 8){msg.channel.send({
files: [
'./pics/Random46.gif'
]
})}

if(Randomgif == 9){msg.channel.send({
files: [
'./pics/Random47.gif'
]
})}

if(Randomgif == 10){msg.channel.send({
files: [
'./pics/Random49.gif'
]
})}

}

db.write()

}
if(inicio_comando == "AO"){

let nome_personagem = msg.content.split(" ")[1]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let personagem2 = msg.content.split(" ")[2]
let personagem2st = personagem2.charAt(0).toUpperCase() + personagem2.toLowerCase().slice(1)
personagem2 = personagem2st

let id_member = msg.member.id
let Defensor = db.get("usuarios").find({Nome : personagem2}).value()
let Atacante = db.get("usuarios").find({Nome : nome_personagem}).value()
let Dano = Atacante.FA
let Defesa = Defensor.Res
let Acerto = Atacante.AC
let AcertoDefensor = Defensor.AC
let Esquiva = Defensor.ES + Defensor.IN
let IniciativaAtk = Atacante.IN + Atacante.Iniciacao
let IniciativaDef = Defensor.IN + Defensor.Iniciacao
let Letalidade = 0
let Armadura = Defensor.AR
let Penetracao = 0
let Furtividade = Atacante.Fur
let Percepcao = Defensor.Per
let Tenacidade = Defensor.Ten

let tecAtk = techs.get("Techs").find({Cmd : Atacante.Tech}).value()
let tecDef = techs.get("Techs").find({Cmd : Defensor.Tech}).value()

let Contato = "N"

let ContraAtk = rollDice1d20()
let ContraDef = rollDice1d20()
let dadoAparar = rollDice1d20()
let contraAparar = rollDice1d20()

let ApararBuff = 0
let DanopreRes = 0

let FACrit = -1
let ResCrit = -1
let ACCrit = 20
let ESCrit = 20

let FFAtk = 0
let FFDef = 0

let FEAtk = 0
let FEDef = 0

let VantInAtk = IniciativaAtk
let VantInDef = IniciativaDef
let VantIn = 0
let VitoriosoIn = ""

let MovAtk = 0 + Atacante.Iniciacao
let MovDef = 0 + Defensor.Iniciacao

let Aparar = 0

let ApararDef = 0

let MultiplAcerto = 0
let TesteCA = 0
let TesteRecuo = 0
let EsquivaIncomum = 0
let TabelaAcerto = ""
let DanoLetalidade = 0
let Pen = Penetracao
let ReducAR = 0
let Atkrmado = "N"
let DefArmado = "N"

let Furarguarda = 0
let Guarda = 0

// Reads
let GuardaFurada = "N"
let TabelaOrdem = 0

let Distancia = Math.abs(Atacante.NS - Defensor.NS)
let DistanciaNome = ""
let IniciacaoStart = Atacante.Iniciacao

// Holds
let Mirahold = Atacante.Mira
let MiraParte = ""
let TipoReacao = ""

// Dados
let DadoFA = 0
let DadoRes = 0
let DadoAC = rollDice1d20()
let DadoES = rollDice1d20()

let RecuoAtk = 0
let RecuoDef = 0

// Grau e Classes
Classe1 = Atacante.Classe
Classe2 = Defensor.Classe
Grau1 = Atacante.Grau
Grau2 = Defensor.Grau

// Mods dos Custos
let AtaqueMP = 0 + tecAtk.Custo
let AtaqueSP = 0
let DefesaMP = 0
let DefesaSP = 0
let DefPA = 0
let AtkPA = 0

let BlackFlash = rollDice1d100() + Atacante.Des
let BFRandom = rollDice1d6()
let FlavorRead = techs.get("Techs").find({Nome : "FlavorRead" }).value()

// Effs
if(Defensor.FA >= 0){

if(Atacante.Efeitos.includes("Enxame")){

// AtkPA -= 5

}

if(Atacante.Efeitos.includes("Sombra de Ryoshi")){

let RyoshiInvocador = db.get("usuarios").find({Nome : "Ryo"}).value()

let FortalecimentoFA = Math.floor(RyoshiInvocador.FE*1 + RyoshiInvocador.Nivel*0.30)

let FortalecimentoFE = Math.floor(RyoshiInvocador.Prof*1 + RyoshiInvocador.Nivel*0.30)

let FortalecimentoPen = Math.floor(RyoshiInvocador.FE*0.5 + RyoshiInvocador.Nivel*0.10)

let FortalecimentoIN = Math.floor(RyoshiInvocador.Prof*1 + RyoshiInvocador.Nivel*0.30)

Penetracao += FortalecimentoPen

Dano += FortalecimentoFA

FEAtk += FortalecimentoFE

IniciativaAtk += FortalecimentoIN

}

if(Defensor.Efeitos.includes("Sombra de Ryoshi")){

let RyoshiInvocador = db.get("usuarios").find({Nome : "Ryo"}).value()

let FortalecimentoRes = Math.floor(RyoshiInvocador.FE*1 + RyoshiInvocador.Nivel*0.30)

let FortalecimentoIN = Math.floor(RyoshiInvocador.Prof*1 + RyoshiInvocador.Nivel*0.30)

let FortalecimentoFE = Math.floor(RyoshiInvocador.Prof*1 + RyoshiInvocador.Nivel*0.30)

let FortalecimentoAR = Math.floor(RyoshiInvocador.FE*0.25 + RyoshiInvocador.Nivel*0.10)

Armadura += FortalecimentoAR

FEDef += FortalecimentoFE

Defesa += FortalecimentoRes

IniciativaDef += FortalecimentoIN

}

if(Atacante.Efeitos.includes("Revestimento Comum")){

// let EnergiaExtra = Math.floor(RyoshiInvocador.FE*0.25) + Math.floor(RyoshiInvocador.Max_MP*0.05)

let FortalecimentoFA = Math.floor(Atacante.FE*0.25 + Atacante.MP*0.02)

let FortalecimentoFE = Math.floor(Atacante.Prof*0.25 + Atacante.MP*0.02)

let FortalecimentoPEN = Math.floor(Atacante.FE*0.5 + Atacante.MP*0.02)

let FortalecimentoIN = Math.floor(Atacante.Prof*0.25 + Atacante.MP*0.02)

Penetracao += FortalecimentoPEN

Dano += FortalecimentoFA

IniciativaAtk += FortalecimentoIN

FEAtk += FortalecimentoFE

BlackFlash += 2

}

if(Defensor.Efeitos.includes("Revestimento Comum")){

let FortalecimentoAR = Math.floor(Defensor.FE*0.5 + Defensor.MP*0.02)

let FortalecimentoRES = Math.floor(Defensor.FE*0.25 + Defensor.MP*0.02)

let FortalecimentoFE = Math.floor(Defensor.Prof*0.25 + Defensor.MP*0.02)

let FortalecimentoIN = Math.floor(Defensor.Prof*0.25 + Defensor.MP*0.02)

Armadura += FortalecimentoAR

Defesa += FortalecimentoRES

IniciativaDef += FortalecimentoIN

FEDef += FortalecimentoFE

}

if(Atacante.Efeitos.includes("Revestimento Avançado")){

// let EnergiaExtra = Math.floor(RyoshiInvocador.FE*0.25) + Math.floor(RyoshiInvocador.Max_MP*0.05)

let FortalecimentoFA = Math.floor(Atacante.FE*0.25 + Atacante.MP*0.03) + 1

let FortalecimentoFE = Math.floor(Atacante.Prof*0.25 + Atacante.MP*0.03) + 1

let FortalecimentoPEN = Math.floor(Atacante.FE*0.5 + Atacante.MP*0.03) + 1

let FortalecimentoIN = Math.floor(Atacante.Prof*0.25 + Atacante.MP*0.03) + 1

Penetracao += FortalecimentoPEN

Dano += FortalecimentoFA

IniciativaAtk += FortalecimentoIN

FEAtk += FortalecimentoFE

BlackFlash += 5

}

if(Defensor.Efeitos.includes("Revestimento Avançado")){

let FortalecimentoAR = Math.floor(Defensor.FE*0.5 + Defensor.MP*0.03) + 1

let FortalecimentoRES = Math.floor(Defensor.FE*0.25 + Defensor.MP*0.03) + 1

let FortalecimentoFE = Math.floor(Defensor.Prof*0.25 + Defensor.MP*0.03) + 1

let FortalecimentoIN = Math.floor(Defensor.Prof*0.25 + Defensor.MP*0.03) + 1

Armadura += FortalecimentoAR

Defesa += FortalecimentoRES

IniciativaDef += FortalecimentoIN

FEDef += FortalecimentoFE

}

if(Atacante.Efeitos.includes("Revestimento Excessivo")){

// let EnergiaExtra = Math.floor(RyoshiInvocador.FE*0.25) + Math.floor(RyoshiInvocador.Max_MP*0.05)

let FortalecimentoFA = Math.floor(Atacante.FE*0.25 + Atacante.MP*0.05) + 5

let FortalecimentoFE = Math.floor(Atacante.Prof*0.25 + Atacante.MP*0.05) + 5

let FortalecimentoPEN = Math.floor(Atacante.FE*0.5 + Atacante.MP*0.05) + 5

let FortalecimentoIN = Math.floor(Atacante.Prof*0.25 + Atacante.MP*0.05) + 5

Penetracao += FortalecimentoPEN

Dano += FortalecimentoFA

IniciativaAtk += FortalecimentoIN

FEAtk += FortalecimentoFE

BlackFlash += 5

}

if(Defensor.Efeitos.includes("Revestimento Excessivo")){

let FortalecimentoAR = Math.floor(Defensor.FE*0.5 + Defensor.MP*0.05) + 5

let FortalecimentoRES = Math.floor(Defensor.FE*0.25 + Defensor.MP*0.05) + 5

let FortalecimentoFE = Math.floor(Defensor.Prof*0.25 + Defensor.MP*0.05) + 5

let FortalecimentoIN = Math.floor(Defensor.Prof*0.25 + Defensor.MP*0.05) + 5

Armadura += FortalecimentoAR

Defesa += FortalecimentoRES

IniciativaDef += FortalecimentoIN

FEDef += FortalecimentoFE

}

if(Atacante.Efeitos.includes("Pulsação Aumentada [1]")){

IniciativaAtk += 2

}

if(Defensor.Efeitos.includes("Pulsação Aumentada [1]")){

IniciativaDef += 2

}

if(Atacante.Efeitos.includes("Pulsação Aumentada [2]")){

IniciativaAtk += 4

}

if(Defensor.Efeitos.includes("Pulsação Aumentada [2]")){

IniciativaDef += 4

}

if(Atacante.Efeitos.includes("Flowing Red Scale")){

FFAtk += 1
Dano += 2
Acerto += 2

}

if(Defensor.Efeitos.includes("Flowing Red Scale")){

FFDef += 1
Esquiva += 2
Defesa += 1
Tenacidade += 1

}

if(Atacante.Efeitos.includes("Flowing Red Scale: Stack")){

FFAtk += 2
Dano += 4
Acerto += 4

}

if(Defensor.Efeitos.includes("Flowing Red Scale: Stack")){

FFDef += 2
Esquiva += 4
Defesa += 2
Tenacidade += 2

}

if(Atacante.Efeitos.includes("Paralisia [3]")){

IniciativaAtk -= 5

}

if(Defensor.Efeitos.includes("Paralisia [3]")){

IniciativaDef -= 5

}

if(Atacante.Efeitos.includes("Paralisia [2]")){

IniciativaAtk -= 2

}

if(Defensor.Efeitos.includes("Paralisia [2]")){

IniciativaDef -= 2

}

if(Atacante.Efeitos.includes("Paralisia [1]")){

IniciativaAtk -= 1

}

if(Defensor.Efeitos.includes("Paralisia [1]")){

IniciativaDef -= 1

}

}

// Black Flash
if(Defensor.FA >= 0){

if(Atacante.Nomeread == "Ryuji"){

BlackFlash += 5

}

if(Atacante.Nomeread == "Kenzo"){

BlackFlash += 40

}

if(Atacante.Efeitos.includes("Restricao Celestial")){

BFRandom = 0
BlackFlash = 0

}

if(Atacante.Efeitos.includes("Abençoado pelas Faiscas")){

Acerto += 1
Dano += 1
IniciativaAtk += 1
BlackFlash += 10
BFRandom = 6

}

if(Defensor.Efeitos.includes("Abençoado pelas Faiscas")){

Esquiva += 1
Defesa += 1
IniciativaDef += 1

}

if(Atacante.Efeitos.includes("Abençoado pelas Faiscas") && Defensor.Efeitos.includes("Abençoado pelas Faiscas") && FlavorRead.BF == "N"){

FlavorRead.BF = "S"

msg.channel.send(`**${Atacante.Nomeread}** e **${Defensor.Nomeread}** estão usando 120% do seu Potencial.`, {
files: [
'./pics/120potencial.jpg'
]
})

}

}

// Vantagens
if(Defensor.FA >= 0){

if(Atacante.Vtg.includes("Agil (1)")){

MovAtk += 1

}

if(Defensor.Vtg.includes("Agil (1)")){

MovDef += 1

}

if(Atacante.Vtg.includes("Agil (2)")){

MovAtk += 2

}

if(Defensor.Vtg.includes("Agil (2)")){

MovDef += 2

}

if(Defensor.HP < Defensor.Max_HP*0.50 && Defensor.Vtg.includes("Persistente (1)")){

Defesa += 2

}

if(Defensor.HP < Defensor.Max_HP*0.25 && Defensor.Vtg.includes("Persistente (2)")){

Defesa += 3

}

if(Atacante.Vtg.includes("Velocidade Imensa (1)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

IniciativaAtk += 1

}

if(Atacante.Vtg.includes("Velocidade Imensa (2)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

IniciativaAtk += 2

}

if(Atacante.Vtg.includes("Velocidade Imensa (3)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

IniciativaAtk += 3

}

if(Defensor.Vtg.includes("Reflexos Imensos (1)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

IniciativaDef += 1

}

if(Defensor.Vtg.includes("Reflexos Imensos (2)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

IniciativaDef += 2

}

if(Atacante.Vtg.includes("Poder Excessivo (1)")){

FEAtk += 1

}

if(Atacante.Vtg.includes("Poder Excessivo (2)")){

FEAtk += 2

}

if(Atacante.Vtg.includes("Poder Excessivo (3)")){

FEAtk += 3

}

}

// Armas
if(Defensor.FA >= 0){
if(Atacante.Arma == "Desarmado"){

IniciativaAtk += 1

}

if(Atacante.Arma == "Braco de Lamina"){

IniciativaAtk += 1

Letalidade += 2

}

if(Defensor.Arma == "Braco de Lamina"){

IniciativaDef += 1

}

if(Atacante.Arma == "Espada Bokken"){



}

if(Atacante.Arma == "Katana" && Atacante.Ataque == "Corte"){

AtkArmado = "S"

Letalidade += 5

}

if(Atacante.Arma == "Katana" && Atacante.Ataque == "Estocada"){

AtkArmado = "S"

Letalidade += 5

}

if(Defensor.Arma == "Katana"){

DefArmado = "S"

Esquiva -= 1

}

if(Atacante.Arma == "Playful Cloud"){

AtkArmado = "S"

Dano += Math.floor(Atacante.FA*0.5)

}

if(Defensor.Arma == "Playful Cloud"){

DefArmado = "S"

IniciativaDef -= 2

}

if(Atacante.Arma == "Presas Amaldicoadas"){

AtkArmado = "S"

Letalidade += 2

// let PresasMagicasAtk = Atacante.FE + rollDice1d10()

// let PresasMagicasDef = Defensor.Res*2 + rollDice1d10()

let PresasMagicasAtk = 3 + Atacante.FE + FEAtk - Defensor.FE - FEDef

if(PresasMagicasAtk < 0){

PresasMagicasAtk = 0

}

Dano += PresasMagicasAtk

}

if(Atacante.Arma == "Garras"){

Dano += 2

Letalidade += 2

}

if(Atacante.Arma == "Lingua"){

Dano -= 5

}

if(Defensor.Arma == "Lingua"){

AcertoDefensor += 3

}

if(Defensor.Arma == "Desarmado"){

IniciativaDef += 1

}
}

// Ações Comuns e Reações
if(Defensor.FA >= 0){
if(Atacante.Ataque == "Soco"){

TipoDano = "Concussao"

DadoFA = rollDice1d10()

FACrit = 10

AtaqueSP += 0

AtkPA += 2

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Chute"){

TipoDano = "Concussao"

DadoFA = rollDice1d10()

FACrit = 10

AtkPA += 2
AtaqueSP += 0
Dano += 1

IniciativaAtk -= 1

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Cotovelada"){

TipoDano = "Concussao"

DadoFA = rollDice1d12()

FACrit = 12

AtkPA += 3
AtaqueSP += 0
Dano += 2

IniciativaAtk -= 2

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Joelhada"){

TipoDano = "Concussao"

DadoFA = rollDice1d12()

FACrit = 12

AtkPA += 3
AtaqueSP += 0
Dano += 3

IniciativaAtk -= 3

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Asa Eletrica"){

TipoDano = "Eletrico"

DadoFA = rollDice1d20()

Dano -= Atacante.FA

Dano += Atacante.FE + FEAtk

AtkPA += 3

FACrit = 20

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Queda Mental"){

TipoDano = "Concussao"

Furarguarda += 100

DadoFA = rollDice1d12()

FACrit = 12

Dano -= Atacante.FA

Dano += Atacante.FE + FEAtk

Atacante.Mira = "o Corpo"

AtkPA += 4
AtaqueSP += 0

Acerto += Atacante.PerCon + Atacante.FE

Esquiva += Defensor.PerCon + Defensor.FE

Esquiva -= Defensor.PerJogoPes

IniciativaDef = 0

IniciativaAtk = 0

}

if(Atacante.Ataque == "Baque"){

TipoDano = "Concussao"

DadoFA = rollDice1d10()

FACrit = 10

AtkPA += 3

Acerto += Atacante.PerArmas + 1

MovAtk += Atacante.PerArmas

}

if(Atacante.Ataque == "Toque"){

TipoDano = "Concussao"

DadoFA = 0

FACrit = 10

AtaqueSP += 0

AtkPA += 2

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Corte"){

TipoDano = "Cortante"

DadoFA = rollDice1d12()

FACrit = 12

AtkPA += 2

Acerto += Atacante.PerArmas

MovAtk += Atacante.PerArmas

}

if(Atacante.Ataque == "Estocada"){

TipoDano = "Perfurante"

DadoFA = rollDice1d20()

FACrit = 20

Letalidade += 1

AtkPA += 3

Acerto -= 1

Acerto += Atacante.PerArmas

MovAtk += Atacante.PerArmas

}

if(Atacante.Ataque == "Mordida"){

TipoDano = "Perfurante"

DadoFA = rollDice1d12()

Letalidade += 3

Acerto -= 2

AtkPA += 3

FACrit = 12

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Mordida Larga"){

TipoDano = "Perfurante"

DadoFA = rollDice1d20()

Letalidade += 6

Acerto -= 5

AtkPA += 4

FACrit = 20

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Ataque de Cauda"){

TipoDano = "Concussao"

DadoFA = rollDice1d10()

FFAtk += 2

Acerto += 2

AtkPA += 3

FACrit = 10

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Ataque de Tromba"){

TipoDano = "Concussao"

DadoFA = rollDice1d12()

Dano += 4

FACrit = 12

Acerto -= 2

AtaqueSP += 0

AtkPA += 3

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Pisao"){

TipoDano = "Concussao"

DadoFA = rollDice2d20()

Dano += 6

FACrit = 20

Acerto -= 12

AtaqueSP += 0

AtkPA += 5

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Defensor.Reacao == "Esquiva"){

Esquiva += 0

DefesaSP += 0

DefPA += 0

}

if(Defensor.Reacao == "Esquiva Desesperada"){

Esquiva += 1 + rollDice1d4()

DefesaSP += 2

DefPA += 1

}

if(Defensor.Reacao == "Contra Ataque"){

Esquiva -= 2
IniciativaDef -= 2

DefPA += 1

}

if(Defensor.Reacao == "Aparar"){

Esquiva -= 3

DefPA += 0

}

if(Defensor.Reacao == "Bloqueio"){

TipoReacao = "Bloqueio"

}

if(Defensor.Reacao == "Bloqueio Cruzado"){

TipoReacao = "Bloqueio"

DefPA += 1

DefesaSP += 1

}

if(Defensor.Reacao == "Resistir"){

TipoReacao = "Bloqueio"

DefPA -= 1

}

if(Defensor.Reacao == "Recuo"){

MovDef += Defensor.PerJogoPes

Esquiva -= 3

DefPA += 1

DefesaSP += 1

}

}

// Ações Especiais
if(Defensor.FA >= 0){

if(Atacante.AcaoEsp.includes("Rapido")){

let AtaqueRapido = rollDice1d2()

IniciativaAtk += AtaqueRapido

AtaqueSP += 1

AtkPA += 1

}

if(Atacante.AcaoEsp.includes("Forte")){

let AtaqueForte = rollDice1d2()

Dano += AtaqueForte

AtaqueSP += 1

AtkPA += 1

}

if(Atacante.AcaoEsp.includes("Compacto")){

AtaqueSP += 0

Dano -= 2

}

if(Atacante.AcaoEsp.includes("Cruzado")){

AtaqueSP += 1

AtkPA += 1

}

if(Atacante.AcaoEsp.includes("Multiplo")){

Acerto -= rollDice1d6()

AtaqueSP += 1

AtkPA -= 1

}

if(Atacante.AtkSus == "S"){

let AtkSurpresa = rollDice1d20() + Atacante.Fur

let DefSurpresa = rollDice1d20() + Defensor.Per

let TesteAtk = AtkSurpresa - DefSurpresa

if(TesteAtk > 0){

Atacante.Iniciacao += TesteAtk

msg.channel.send(`**${Atacante.Nomeread}** surpreendeu ${Defensor.Nomeread} em **${TesteAtk}**.`)

}

if(TesteAtk < 0){

msg.channel.send(`**${Atacante.Nomeread}** não surpreendeu ${Defensor.Nomeread}.`)

}

}

if(Atacante.Furtivo == "S"){

let AtkFurtivo = rollDice1d20() + Atacante.Fur

let DefFurtiva = rollDice1d20() + Defensor.Per

let TesteAtk = AtkFurtivo - DefFurtiva

if(TesteAtk > 0){

Defensor.Reacao = "Neutro"

msg.channel.send(`**${Atacante.Nomeread}** atacou ${Defensor.Nomeread} **Furtivamente**.`)

}

if(TesteAtk < 0){

AtkSus = "S"

msg.channel.send(`**${Atacante.Nomeread}** foi detectado por ${Defensor.Nomeread} antes de concluir o ataque.`)

}

}

}

// Distância
if(Defensor.FA >= 0){

if(Distancia == 1){

IniciativaDef -= 1

DistanciaNome = "Queima Roupa"

}

if(Distancia == 2){

DistanciaNome = "Curta Distancia"

}

if(Distancia >= 3 && Distancia <= 5){

IniciativaDef += 1

DistanciaNome = "Meia Distancia"

}

if(Distancia >= 6){

IniciativaDef += 2

DistanciaNome = "Longa Distancia"

}

if(Atacante.Efeitos.includes("Ataque Aquatico")){

Distancia = 1

}

}

// Effs Pré-Iniciativa
if(Defensor.FA >= 0){

if(Atacante.Efeitos.includes("Flanco")){

IniciativaAtk += 1 + rollDice1d4()

}

if(Atacante.Efeitos.includes("Restricao Celestial")){

IniciativaAtk += 15

Dano += 12

Penetracao += 10

}

if(Defensor.Efeitos.includes("Restricao Celestial")){

IniciativaDef += 15

Defesa += 16

Armadura += 10

}

if(Atacante.Efeitos.includes("Machucado")){

Dano -= 1
Acerto -= 2

}

if(Defensor.Efeitos.includes("Machucado")){

Defesa -= 4
Esquiva -= 3

}

if(Atacante.Efeitos.includes("Tekken")){

Dano += 4
Acerto -= 2

}

if(Defensor.Efeitos.includes("Tekken")){

Defesa += 4
Esquiva -= 2

}

if(Atacante.Efeitos.includes("Feiticaria de Projeçao")){

IniciativaAtk += 5

}

if(Defensor.Efeitos.includes("Feiticaria de Projeçao")){

IniciativaDef += 5

}

if(Atacante.Efeitos.includes("Balas de Prata")){

AtkPA -= 1

Letalidade += 1
Acerto += 5
Dano += 5 + Atacante.FE

}


if(Atacante.Efeitos.includes("Andorinha")){

Dano += rollDice2d12() + Atacante.FE*2

}

if(Atacante.Efeitos.includes("Marionete")){

IniciativaAtk -= 2
Dano -= 2

}

if(Defensor.Efeitos.includes("Marionete")){

IniciativaDef -= 2
Defesa -= 2

}

if(Atacante.Efeitos.includes("Quicksilver")){

Distancia = 0
Furarguarda += 50
Penetracao += 5
Letalidade += Atacante.FE
Acerto += Atacante.Prof

}

if(Atacante.Efeitos.includes("Blackout")){

Furarguarda += 1000
Acerto += 1000

}

if(Defensor.Efeitos.includes("Blackout")){

Esquiva += 1000

}

if(Atacante.Efeitos.includes("Amor Verdadeiro")){

Dano += 3
IniciativaAtk += 3
Acerto += 3

}

if(Defensor.Efeitos.includes("Amor Verdadeiro")){

Defesa += 3
IniciativaDef += 3
Esquiva += 3

}

if(Atacante.Efeitos.includes("Deathclock")){

Dano += 3
IniciativaAtk += 3
Acerto += 3

}

if(Defensor.Efeitos.includes("Deathclock")){

Defesa += 3
IniciativaDef += 3
Esquiva += 3

}

if(Atacante.Efeitos.includes("Cronos")){

IniciativaAtk += 5 + rollDice1d6()

}

if(Defensor.Efeitos.includes("Cronos")){

IniciativaDef += 10 + rollDice1d8()

}

if(Atacante.Efeitos.includes("Nervos Acelerados")){

IniciativaAtk += 1 + rollDice1d4()

}

if(Defensor.Efeitos.includes("Nervos Acelerados")){

IniciativaDef += 1 + rollDice1d4()

}

if(Atacante.Efeitos.includes("Pernas Turbinadas")){

IniciativaAtk += 2 + rollDice1d8()

}

if(Atacante.Efeitos.includes("Manipulação de Tamanho")){

Acerto += Atacante.Prof + rollDice1d6()

}

if(Defensor.Efeitos.includes("Manipulação de Tamanho")){

Esquiva += Defensor.Prof + rollDice1d6()

}

if(Atacante.Efeitos.includes("Punhos de Missil")){

Dano += Atacante.FE
Acerto += rollDice1d4()

}

if(Atacante.Efeitos.includes("Azul: Imbuir")){

Dano += Math.floor(Atacante.FE*0.5)
Dano += rollDice1d4()

}

if(Atacante.Efeitos.includes("Dominio Vertigioso")){

let Vertigo = rollDice1d20() + Atacante.AC

if(Vertigo < 15){

Acerto *= 0.5

Acerto = Math.floor(Acerto) - 1

IniciativaAtk *= 0.5

IniciativaAtk = Math.floor(IniciativaAtk) - 1

msg.channel.send(`**${Atacante.Nome}** ficou com Vertigem.`)

}

}

if(Defensor.Efeitos.includes("Dominio Vertigioso")){

let Vertigo = rollDice1d20() + Defensor.AC

if(Vertigo < 15){

Acerto *= 0.5

Acerto = Math.floor(Acerto) - 1

IniciativaDef *= 0.5

IniciativaDef = Math.floor(IniciativaDef) - 1

msg.channel.send(`**${Defensor.Nome}** ficou com Vertigem.`)

}

}

if(Defensor.Efeitos.includes("Cura Constante da Reversão")){

Defesa += 1 + Math.floor(Defensor.Prof*0.25)

}

if(Defensor.Efeitos.includes("Breve Pausa")){

let DiminuirIn1 = rollDice1d10()

IniciativaDef -= DiminuirIn1 - 2

const PausaReplace = Defensor.Efeitos.replace("Breve Pausa", "")
Defensor.Efeitos = PausaReplace

msg.channel.send(`**Breve Pausa** reduziu a Iniciativa de **${Defensor.Nomeread}** em **${DiminuirIn1 + DiminuirIn2}**.`)

}

if(Atacante.Efeitos.includes("Acelerar")){

// indexOf = vai achar a palavra Acelerar na string e retornar onde que tá o "A" de Acelerar, ou seja, a primeira letra

let CortarAce = Atacante.Efeitos.substring(Atacante.Efeitos.indexOf("Acelerar"), 15)

let NumeroAcelerar = CortarAce.slice(10, 12)
NumeroAcelerar = parseInt(NumeroAcelerar)

IniciativaAtk += NumeroAcelerar

console.log(CortarAce)

console.log(parseInt(NumeroAcelerar))

// const AcelerarReplace = Atacante.Efeitos.replace(`${1}`, "")

}

if(Atacante.Efeitos.includes("Tekkai 50%")){

Dano += Math.floor(Atacante.Vig*0.5)

}

if(Defensor.Efeitos.includes("Tekkai 50%") && (tecAtk.TipoDano == "Cortante" || tecAtk.TipoDano == "Perfurante")){

Defesa += Math.floor(Defensor.Vig*0.25)

}

if(Defensor.Efeitos.includes("Tekkai 50%") && tecAtk.TipoDano == "Concussao"){

Defesa += Math.floor(Defensor.Vig*0.5)

}

if(Atacante.Efeitos.includes("Tekkai 100%")){

Dano += Math.floor(Atacante.Vig)

}

if(Defensor.Efeitos.includes("Tekkai 100%") && (tecAtk.TipoDano == "Cortante" || tecAtk.TipoDano == "Perfurante")){

Defesa += Math.floor(Defensor.Vig*0.5)

}

if(Defensor.Efeitos.includes("Tekkai 100%") && tecAtk.TipoDano == "Concussao"){

Defesa += Math.floor(Defensor.Vig)

}

if(Atacante.Efeitos.includes("Tekkai 200%")){

Dano += Math.floor(Atacante.Vig)

}

if(Defensor.Efeitos.includes("Tekkai 200%") && (tecAtk.TipoDano == "Cortante" || tecAtk.TipoDano == "Perfurante")){

Defesa += Math.floor(Defensor.Vig*2)

}

if(Defensor.Efeitos.includes("Tekkai 200%") && tecAtk.TipoDano == "Concussao"){

Defesa += Math.floor(Defensor.Vig*1)

}

if(Defensor.Efeitos.includes("Tekkai 200%")){

IniciativaDef -= tecDef.CustoSP

}

if(Atacante.Efeitos.includes("Tekkai 500%")){

Dano += Math.floor(Atacante.Vig)

}

if(Defensor.Efeitos.includes("Tekkai 500%") && (tecAtk.TipoDano == "Cortante" || tecAtk.TipoDano == "Perfurante")){

Defesa += Math.floor(Defensor.Vig*5)

}

if(Defensor.Efeitos.includes("Tekkai 500%") && tecAtk.TipoDano == "Concussao"){

Defesa += Math.floor(Defensor.Vig*2.5)

}

if(Defensor.Efeitos.includes("Tekkai 500%")){

IniciativaDef -= tecDef.CustoSP

}

if(Defensor.Efeitos.includes("Parado")){

Defensor.Reacao = "Neutro"

const ParadoReplace = Defensor.Efeitos.replace("Parado", "")
Defensor.Efeitos = ParadoReplace

}

if(Defensor.Efeitos.includes("Desmaio")){

Defensor.Reacao = "Neutro"

}

if(Atacante.Mira == "o Corpo" && Defensor.Efeitos.includes("Estatura de Monstro do Lago")){

Defensor.Reacao == "Neutro"

}

if(Atacante.Mira == "o Rosto" && Defensor.Efeitos.includes("Estatura de Monstro do Lago")){

Defesa -= 4

}

if(Defensor.Reacao == "Neutro"){

IniciativaAtk = 0

Esquiva = -10
IniciativaDef = 0
DadoES = 0

}

}

// Vantagem de Iniciativa
if(Defensor.FA >= 0){

Acerto += Math.floor(IniciativaAtk*0.5)

Esquiva += Math.floor(IniciativaDef*0.5)

if(IniciativaAtk > IniciativaDef){

VantIn = IniciativaAtk - IniciativaDef

if(Esquiva <= -2){

Esquiva = -2

}

VitoriosoIn = Atacante.Nome

}

if(IniciativaAtk < IniciativaDef){

VantIn = IniciativaDef - IniciativaAtk

VitoriosoIn = Defensor.Nome

}

if(IniciativaAtk == IniciativaDef){

VitoriosoIn = "Empate"

}
}

// Guarda
if(Defensor.FA >= 0){

if(tecAtk.Efeitos.includes("Inbloqueavel")){

Furarguarda += 1000

}

if(Atacante.AcaoEsp.includes("Cruzado" && !tecDef.Efeitos.includes("Defesa Segura"))){

let AtkCruzado = 1 + rollDice1d6()

Furarguarda += AtkCruzado

}

if(Atacante.Mira == "o Corpo" && !tecDef.Efeitos.includes("Defesa Segura")){

Furarguarda += 50

}

if(tecAtk.Efeitos.includes("Dois Lados") && tecDef.Cmd == "Mugen"){

Guarda -= 10

}

if(tecAtk.Efeitos.includes("Todos os Lados") && tecDef.Cmd == "Mugen"){

Guarda -= 1000

}

if(Atacante.CA == "S"){

let CAFurarGuarda = Atacante.Iniciacao

if(CAFurarGuarda > 3){

CAFurarGuarda = 3

}

Furarguarda += CAFurarGuarda

}

if(tecDef.Efeitos.includes("Defesa Perfeita")){

Furarguarda -= 1000

}

if(Defensor.Reacao == "Aparar"){

let ApararRead = `Aparar: ${AcertoDefensor} + **${dadoAparar}** x. **${contraAparar}** + ${Acerto}. `

Furarguarda = IniciativaAtk + rollDice1d20()

Guarda = IniciativaDef + rollDice1d20() + 5

DefesaSP += 1

Aparar = (AcertoDefensor + dadoAparar + 3) - (contraAparar + Acerto)

if(Guarda >= Furarguarda){

let GuardaFuradaRead = `Guarda: **${Guarda}** x. **${Furarguarda}**.`

}

if(Furarguarda > Guarda){

GuardaFurada = "S"

let GuardaFuradaRead = `! Furo de Guarda: **${Furarguarda}** x. **${Guarda}**.`

}

}

if(Defensor.Reacao == "Bloqueio"){

Furarguarda = IniciativaAtk + rollDice1d12() + Atacante.PerCorpo

Guarda = IniciativaDef + rollDice1d12() + 6 + Defensor.PerCorpo

if(tecDef.Nome == "Reforçar Braco"){

Guarda -= 2

}

if(tecDef.Nome == "Compressão: Braços"){

Guarda -= 2

}

if(Furarguarda > Guarda){

Esquiva -= 1

GuardaFurada = "S"

let GuardaFuradaRead = `! Furo de Guarda: **${Furarguarda}** x. **${Guarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

if(Guarda >= Furarguarda){

let GuardaFuradaRead = `Guarda: **${Guarda}** x. **${Furarguarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

}

if(Defensor.Reacao == "Bloqueio Cruzado"){

Furarguarda = IniciativaAtk + rollDice1d12()

Guarda = IniciativaDef + rollDice1d12() + 5

let GuardaCruzada = 1 + rollDice1d4()

if(Furarguarda > Guarda){

Esquiva -= 2

GuardaFurada = "S"

let GuardaFuradaRead = `! Furo de Guarda: **${Furarguarda}** x. **${Guarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

if(Guarda >= Furarguarda){

Defesa += GuardaCruzada

msg.channel.send(`**${Defensor.Nomeread}** usou Guarda Cruzada e recebeu: **+${GuardaCruzada}** de Defesa.`)

let GuardaFuradaRead = `Guarda: **${Guarda}** x. **${Furarguarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

}

if(Defensor.Reacao == "Resistir"){

Furarguarda = IniciativaAtk + rollDice1d12() + Atacante.PerCorpo

Guarda = IniciativaDef + rollDice1d12() + 10 + Defensor.PerCorpo

if(tecDef.Nome == "Reforçar Ponto"){

Guarda -= 8

}

if(Furarguarda > Guarda){

Esquiva -= 1

GuardaFurada = "S"

let GuardaFuradaRead = `! Furo de Guarda: **${Furarguarda}** x. **${Guarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

if(Guarda >= Furarguarda){

let GuardaFuradaRead = `Guarda: **${Guarda}** x. **${Furarguarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

}

if(tecDef.Nome == "Compressão: Ponto do Corpo" && GuardaFurada == "N"){

Defesa += 2 + Math.floor((Defensor.Prof + Defensor.FE) * 1.5)

Armadura += Defensor.Prof + Defensor.FE

}

if(tecDef.Nome == "Compressão: Braços" && GuardaFurada == "N"){

Defesa += 1 + Math.floor((Defensor.Prof + Defensor.FE) * 1)

Armadura += Defensor.Prof + Defensor.FE

}

if(tecDef.Nome == "Compressão: Corpo"){

Defesa += Math.floor((Defensor.Prof + Defensor.FE) * 0.5)

Armadura += Defensor.Prof + Defensor.FE

}

if(tecDef.Nome == "Reforçar Ponto do Corpo" && GuardaFurada == "N"){

Defesa += 2 + Math.floor(Defensor.FE * 0.75)

Armadura += 2 + Math.floor(Defensor.FE * 0.75)

}

if(tecDef.Nome == "Reforçar Braço" && GuardaFurada == "N"){

Defesa += 1 + Math.floor(Defensor.FE * 0.5)

Armadura += 1 + Math.floor(Defensor.FE * 0.5)

}

if(tecDef.Nome == "Reforçar Corpo"){

Defesa += Math.floor(Defensor.FE * 0.25)

Armadura += Math.floor(Defensor.FE * 0.25)

}

if(tecDef.Efeitos.includes("Guarda")){

Furarguarda = IniciativaAtk + rollDice1d20()

Guarda = IniciativaDef + rollDice1d20() + tecDef.ValorGuarda

if(Furarguarda > Guarda){

GuardaFurada = "S"

let GuardaFuradaRead = `! Furo de Guarda: **${Furarguarda}** x. **${Guarda}**.`

}

if(Guarda >= Furarguarda){

Defesa += tecDef.ValorDefesa

let GuardaFuradaRead = `Guarda: **${Guarda}** x. **${Furarguarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

}

if(GuardaFurada == "N" && tecDef.Efeitos.includes("Invulneravel")){

Esquiva += 1000

Tenacidade += 1000

}

if(GuardaFurada == "N" && TipoReacao == "Bloqueio" && Defensor.Reacao !== "Resistir"){

Atacante.Mira = "o Braco"
db.write()

}

if(GuardaFurada == "N" && DefArmado == "S" && Defensor.Reacao == "Aparar"){

Atacante.Mira = "a Arma"
db.write()

}

if(DefArmado == "N" && Aparar > 0 && GuardaFurada == "N" && Defensor.Reacao == "Aparar"){

Atacante.Mira = "a Mao"
db.write()

}
}

// Mira
if(Defensor.FA >= 0){
if(Atacante.Mira == "o Ponto Fraco"){

if(Defensor.Efeitos.includes("Galhos Frageis")){

let NerfDef = Math.floor(Defensor.Res*0.5) + 3

DadoRes = rollDice1d4()

Tenacidade -= 3

Acerto -= 10

Defesa -= NerfDef

}

}

if(Atacante.Mira == "o Olho"){

Letalidade += 5
Acerto -= 6

}

if(Atacante.Mira == "o Rosto"){

MiraParte = "a Cabeca"

DadoRes = rollDice1d4()

ResCrit = 4

Acerto -= 1

Defesa -= 3

}

if(Atacante.Mira == "o Braco"){

MiraParte = "o Membro Superior"

Tenacidade += 1

DadoRes = rollDice1d10()

ResCrit = 10

Defesa += 1

Acerto += 1

}

if(Atacante.Mira == "o Peito"){

MiraParte = "o Torso"

DadoRes = rollDice1d6()

Tenacidade -= 1

ResCrit = 6

Defesa -= 2

}

if(Atacante.Mira == "a Mao"){

MiraParte = "a Mao"

Tenacidade += 2

DadoRes = rollDice1d12()

ResCrit = 12

Defesa += 2

Acerto += 2

}

if(Atacante.Mira == "o Abdomem"){

MiraParte = "o Torso"

DadoRes = rollDice1d6()

ResCrit = 6

Tenacidade -= 2

Defesa -= 1

}

if(Atacante.Mira == "o Corpo"){

MiraParte = "o Torso"

DadoRes = rollDice1d8()

ResCrit = 8

Tenacidade -= 3

}

if(Atacante.Mira == "a Arma"){

let PegarNome = Defensor.ArmaCodigo

let ArmaNome = techs.get("Techs").find({Nome : Defensor.ArmaCodigo }).value()

let DanificarArma = FFAtk + DadoFA - ArmaNome.ArmaRes

if(DanificarArma < 0){

DanificarArma = 0

}

ArmaNome.ArmaRes -= DanificarArma

Dano = FFAtk

DadoRes = 0

Defesa = ArmaNome.ArmaRes

if(DanificarArma > 0){

msg.channel.send(`**${Defensor.Nomeread}** recebeu **${DanificarArma}** de Dano na sua **${Defensor.Arma}**.

${Defensor.Arma} de **${Defensor.Nomeread}**: **${ArmaNome.ArmaRes}** de Resistência.`)

}

db.write()
techs.write()

}
}

// Criticos Defensivos
if(Defensor.FA >= 0){

if(DadoRes >= ResCrit){

msg.channel.send(`**Acerto Crítico** na Defesa!`)

DadoRes += Math.ceil(ResCrit*0.5)

}

if(DadoES >= ESCrit){

msg.channel.send(`**Acerto Crítico** na Esquiva!`)

DadoES += Math.ceil(ESCrit*0.5)

}
}

// Effs Pré-Acerto

// Teste de Acerto, Scoop Global
let TesteAcerto = Acerto + DadoAC - DadoES - Esquiva

// Transformar Teste de Acerto
if(Defensor.FA >= 0){

}

// Testes de Iniciativa
if(Defensor.FA >= 0){
if(Defensor.Reacao == "Contra Ataque"){

let PericiaCAAtk = Atacante.PerCorpo

let PericiaCADef = Defensor.PerCorpo

if(Atacante.AcaoEsp.includes("Compacto")){

let CompactoAtk = 1 + rollDice1d4()

PericiaCAAtk += CompactoAtk

}

TesteCA = (PericiaCADef + ContraDef + IniciativaDef) - (PericiaCAAtk + ContraAtk + IniciativaAtk)

let BonusAtkCA = TesteCA

if(TesteCA > 3){

BonusAtkCA = 3

}

if(TesteCA > 0){

TesteAcerto = -1

}

if(TesteCA < 0){

TesteCA = 0

}

Defensor.Iniciacao += TesteCA

Defensor.AtkOport = "S"

msg.channel.send(`Contra Ataque: ${PericiaCADef + IniciativaDef} + **${ContraDef}** x. **${ContraAtk}** + ${IniciativaAtk + PericiaCAAtk}.

Bônus Ganho: **${BonusAtkCA}**.`)

}

if(Defensor.Reacao == "Recuo"){

if(Atacante.AcaoEsp.includes("Compacto")){

let CompactoAtk = 1 + rollDice1d4()

TesteRecuo -= CompactoAtk

}

RecuoAtk = rollDice1d20()
RecuoDef = rollDice1d20()

if(tecDef.Efeitos.includes("Deslocacao")){

MovDef += (rollDice(tecDef.Deslocacao, tecDef.DeslocacaoDado) + (tecDef.DeslocacaoProf * Defensor.Prof) + tecDef.DeslocacaoFixo) * 0.5

}

TesteRecuo = (MovDef + IniciativaDef + RecuoDef) - (RecuoAtk + MovAtk + IniciativaAtk)

if(TesteRecuo <= 0){

TesteRecuo = 0

}

if(TesteRecuo > 0){

TesteAcerto = -1

// se move 0,5m pra kd 1 de diff de resultado. tem um cmd q faz o personagem se mover pra quantia exata q ele quer quando recua

if(Atacante.Distancia == "QR"){

Atacante.Distancia = "CD"

msg.reply(`**${Defensor.Nome}** recuou pra **Curta Distância**.`)

}

if(Atacante.Distancia == "CD"){

Atacante.Distancia = "LD"

msg.reply(`**${Defensor.Nome}** recuou pra **Longa Distância**.`)

}

}

msg.channel.send(`**Recuo**: ${MovDef} + ${IniciativaDef} + **${RecuoDef}** x. **${RecuoAtk}** + ${IniciativaAtk} + ${MovAtk}.`)

}
}

// Definir Teste de Acerto
if(Defensor.FA >= 0){
if(TipoReacao == "Bloqueio" && Letalidade == 0 && GuardaFurada == "N"){

TesteAcerto = 2

}

if(TipoReacao == "Bloqueio" && Letalidade > 0 && TesteAcerto < 2 && GuardaFurada == "N"){

TesteAcerto = 2

}

if(Defensor.Reacao == "Aparar" && Aparar > 0 && Letalidade == 0 && GuardaFurada == "N"){

TesteAcerto = 2

}

if(Defensor.Reacao == "Aparar" && Aparar > 0 && Letalidade > 0 && TesteAcerto < 2 && GuardaFurada == "N"){

TesteAcerto = 2

}

if(tecAtk.Efeitos.includes("Indesviavel") && TesteAcerto < tecAtk.Indesviavel){

TesteAcerto = tecAtk.Indesviavel

}

if(TesteAcerto > 0 && Atacante.Mira !== "a Arma"){

Contato = "S"

}

if(TesteAcerto == 0 || TesteAcerto == 1){

TabelaAcerto = "de Raspão"

TabelaOrdem = 1

Dano -= 1

MultiplAcerto = 0.5

}

if(TesteAcerto >= 2 && TesteAcerto <= 5){

TabelaAcerto = "Direto"

TabelaOrdem = 2

MultiplAcerto = 1

}

if(TesteAcerto >= 6 && TesteAcerto <= 14){

TabelaAcerto = "Pesado"

TabelaOrdem = 3

Dano += 1

MultiplAcerto = 1.5

}

if(TesteAcerto >= 15 && TesteAcerto <= 19){

TabelaAcerto = "Massivo"

TabelaOrdem = 4

Dano += 2

MultiplAcerto = 2

}

if(TesteAcerto >= 20){

TabelaAcerto = "Grave"

TabelaOrdem = 5

Dano += 3

MultiplAcerto = 3

}

if(Atacante.Mira == "a Arma"){

TabelaAcerto = "na Arma"

TabelaOrdem = 0

MultiplAcerto = 0

}

}

// Criticos Ofensivos
if(Defensor.FA >= 0){

if(Atacante.Efeitos.includes("Ratio")){

FACrit = DadoFA

}

if(DadoFA >= FACrit && TesteAcerto >= 0){

DadoFA += Math.ceil(FACrit*0.5)

msg.channel.send(`**Acerto Crítico** no Dano!`)

if(Atacante.Ataque == "Soco"){

msg.channel.send({
files: [
'./pics/CriticoSoco.gif'
]
})

}

if(Atacante.Ataque == "Chute"){

msg.channel.send({
files: [
'./pics/CriticoChute.png'
]
})

}

}

if(DadoAC >= ACCrit){

msg.channel.send(`**Acerto Crítico** no Acerto!`)

DadoAC += Math.ceil(ACCrit*0.5)

}

}

// Effs Pré-Dano
if(Defensor.FA >= 0){
if(Atacante.Efeitos.includes("Ratio") && (Acerto + DadoAC) >= 10 && TesteAcerto >= 0){

let DanoRatio = rollDice(tecAtk.DanoQuant, tecAtk.DanoQuant*tecAtk.DanoNumb)

let Multipl = 0.5 * TabelaOrdem

let DadoRatio = DanoRatio + Math.floor(Atacante.FE*0.5)

DadoRatio *= Multipl

let Ratio = DadoRatio

Dano += DadoRatio

msg.channel.send(`**${Atacante.Nomeread}** acertou com a **Técnica de Proporção** e ganhou: **+${Ratio}** de Dano.`)

}

if(Contato == "S" && BlackFlash >= 100 && BFRandom >= 5){

if(!Atacante.Efeitos.includes("Abençoado pelas Faiscas")){

Atacante.Efeitos += "Abençoado pelas Faiscas - "

}

let BFDano = rollDice2d6()

DadoFA += BFDano

Dano += DadoFA

FACrit = 0

Atacante.PA += 3

let Gifsorting = rollDice1d6()

msg.channel.send(`**Black Flash!**

+**${BFDano}** de Dano!`, {
files: [
'./pics/Bfgota.png'
]
})

if(Gifsorting == 1){
msg.channel.send({
files: [
'./pics/bf1.gif'
]
})}

if(Gifsorting == 2){
msg.channel.send({
files: [
'./pics/bf2.gif'
]
})}

if(Gifsorting == 3){
msg.channel.send({
files: [
'./pics/bf3.gif'
]
})}

if(Gifsorting == 4){
msg.channel.send({
files: [
'./pics/bf4.gif'
]
})}

if(Gifsorting == 5){
msg.channel.send({
files: [
'./pics/bf5.gif'
]
})}

if(Gifsorting == 6){
msg.channel.send({
files: [
'./pics/bf6.gif'
]
})}

}

if(Defensor.Vtg.includes("Escamas Grossas (2)") && Atacante.Mira !== "o Rosto"){

Armadura += 5

db.write()

}

if(Atacante.Efeitos.includes("Estatura Grande")){

Dano += 2

IniciativaAtk -= 1

}

if(Defensor.Efeitos.includes("Estatura Grande")){

Defesa += 1

Esquiva -= 2

IniciativaDef -= 1

}

if(Atacante.Efeitos.includes("Estatura Gigante")){

Dano += 4

IniciativaAtk -= 2

}

if(Defensor.Efeitos.includes("Estatura Gigante")){

Defesa += 2

Esquiva -= 4

IniciativaDef -= 2

}

if(Defensor.Efeitos.includes("Exoesqueleto Completo")){

Armadura += 10

Defesa += 5

db.write()

}

if(Defensor.Nomeread == "Ouroboros" && TipoDano == "Cortante"){

Defesa -= rollDice1d8()

}

if(Defensor.Nomeread == "Ouroboros" && TipoDano == "Cortante"){

Defesa -= rollDice1d8()

}

}

// Teste de Dano, Scoop Global
let TesteDano = Dano + DadoFA - DadoRes - Defesa

// Tratamento de Dano Negativo
if(Defensor.FA >= 0){

if(TesteDano < 0){

TesteDano = 0

}

}

// Causar Dano, Scoop Global
let DanoCausado = TesteDano

// Effs Pós-Dano
if(Defensor.FA >= 0){

if(Atacante.Arma == "Asa Eletrica" && Contato == "S"){

if(TesteDano >= 1 && TesteDano <= 10 && !Defensor.Efeitos.includes("Paralisia [1]")){

Defensor.Efeitos = "Paralisia [1] - "

}

if(TesteDano >= 11 && TesteDano <= 20 && !Defensor.Efeitos.includes("Paralisia [2]")){

Defensor.Efeitos = "Paralisia [2] - "

}

if(TesteDano > 21  && !Defensor.Efeitos.includes("Paralisia [3]")){

Defensor.Efeitos = "Paralisia [3] - "

}

if(TesteDano >= 1 && TesteDano <= 10 && Defensor.Efeitos.includes("Paralisia [1]")){

Defensor.PA -= 1

}

if(TesteDano >= 11 && TesteDano <= 20 && Defensor.Efeitos.includes("Paralisia [2]")){

Defensor.PA -= 2

}

if(TesteDano > 21  && Defensor.Efeitos.includes("Paralisia [3]")){

Defensor.PA -= 3

}

}

techs.write()
db.write()

}

// Teste de Dano e Armadura
if(Defensor.FA >= 0){
if(Armadura < 0){

Armadura = 0

}

Armadura -= Pen

DanoLetalidade = Math.ceil(Letalidade*MultiplAcerto)

TesteDano = Math.ceil(TesteDano*MultiplAcerto)

if(Armadura == 1){

DanoLetalidade = Math.floor(DanoLetalidade *= 0.90)

}

if(Armadura == 2){

DanoLetalidade = Math.floor(DanoLetalidade *= 0.80)

}

if(Armadura == 3){

DanoLetalidade = Math.floor(DanoLetalidade *= 0.70)

}

if(Armadura == 4){

DanoLetalidade = Math.floor(DanoLetalidade *= 0.60)

}

if(Armadura == 5){

DanoLetalidade = Math.floor(DanoLetalidade *= 0.50)

}

if(Armadura == 6){

DanoLetalidade = Math.floor(DanoLetalidade *= 0.40)

}

if(Armadura == 7){

DanoLetalidade = Math.floor(DanoLetalidade *= 0.30)

}

if(Armadura == 8){

DanoLetalidade = Math.floor(DanoLetalidade *= 0.20)

}

if(Armadura == 9){

DanoLetalidade = Math.floor(DanoLetalidade *= 0.10)

}

if(Armadura >= 10){

DanoLetalidade = 0

}

}

// One Time Uses
if(Defensor.FA >= 0){
if(Atacante.AtkOport == "S"){

msg.channel.send(`**Ataque de Oportunidade!**`)
Atacante.AtkOport = "N"

AtkPA -= AtkPA

}

if(Atacante.CA == "S" && TesteCA == 0){

Atacante.CA = "N"

}
}

// Gastos
if(Defensor.FA >= 0){

Atacante.SP -= AtaqueSP

Defensor.SP -= DefesaSP

Atacante.PA -= AtkPA

Defensor.PA -= DefPA

if(tecDef.Tipo.includes("Defensivo")){

DefesaMP += tecDef.Custo

let MPReducao = DefesaMP

let Reducao = 1 - (Defensor.Prof*0.05) - (Defensor.PerCon*0.05)

if(Reducao <= 0.30){

Reducao = 0.30

}

MPReducao *= Reducao
MPReducao = Math.ceil(MPReducao)

Defensor.MP -= MPReducao

}

}

// Ferimentos
if(Defensor.FA >= 0){

let TesteImpacto = TesteDano
let TesteSangramento = TesteDano
let TesteAtordoamento = TesteDano

if(TipoDano == "Concussao" && TesteImpacto >= 5 + Tenacidade && TesteImpacto <= 15 + (Tenacidade*2) && (Atacante.AcaoEsp.includes("Forte"))){

let DadoImpacto = rollDice1d4()

let ImpactoRate = 0

let TesteImpacto = DadoImpacto + ImpactoRate

if(Atacante.NS <= Defensor.NS){

Defensor.NS += TesteImpacto

}

if(Atacante.NS > Defensor.NS){

Defensor.NS -= TesteImpacto

}

console.log(TesteImpacto)

msg.channel.send(`**${Defensor.Nome}** foi ferido com: **Impacto Leve**.

**${Defensor.Nome}** foi Impactado até **${Defensor.NS}**.`)

}

if(TipoDano == "Concussao" && TesteImpacto >= 15 + (Tenacidade*2) && (Atacante.AcaoEsp.includes("Forte"))){

let DadoImpacto = rollDice2d4()

let ImpactoRate = 0

let TesteImpacto = DadoImpacto + ImpactoRate

if(Atacante.NS <= Defensor.NS){

Defensor.NS += TesteImpacto

}

if(Atacante.NS > Defensor.NS){

Defensor.NS -= TesteImpacto

}

msg.channel.send(`**${Defensor.Nome}** foi ferido com: **Impacto Forte**.

**${Defensor.Nome}** foi Impactado até **${Defensor.NS}**.`)

}

if((TipoDano == "Cortante" || TipoDano == "Perfurante") && TesteSangramento >= 10 && TesteSangramento <= 24){

let SangramentoNumero = rollDice1d4()

let SangramentoEff = `Sangramento [${SangramentoNumero}]. `

let SliceSangramento = SangramentoEff.slice(13, 15)

if(!Defensor.Efeitos.includes("Sangramento")){

Defensor.Efeitos += SangramentoEff

} else {

let CortarSangr = Defensor.Efeitos.substring(Defensor.Efeitos.indexOf("Sangramento"), 18)

SliceSangramento = CortarSangr.slice(13, 15)

if(SliceSangramento.includes("]")){

SliceSangramento = CortarSangr.slice(13, 14)

}

let SangramentoAtualizado = SangramentoNumero + parseInt(SliceSangramento)

let SangrReplace = Defensor.Efeitos.replace(`Sangramento [${SliceSangramento}]. `, `Sangramento [${SangramentoAtualizado}]. `)

Defensor.Efeitos = SangrReplace

}

}

if((TipoDano == "Cortante" || TipoDano == "Perfurante") && TesteSangramento >= 25 && TesteSangramento <= 49){

let SangramentoNumero = rollDice1d4()

let SangramentoEff = `Sangramento [${SangramentoNumero}]. `

let SliceSangramento = SangramentoEff.slice(13, 15)

if(!Defensor.Efeitos.includes("Sangramento")){

Defensor.Efeitos += SangramentoEff

} else {

let CortarSangr = Defensor.Efeitos.substring(Defensor.Efeitos.indexOf("Sangramento"), 18)

SliceSangramento = CortarSangr.slice(13, 15)

console.log(SliceSangramento)

if(SliceSangramento.includes("]")){

SliceSangramento = CortarSangr.slice(13, 14)

}

console.log(SliceSangramento)

let SangramentoAtualizado = SangramentoNumero + parseInt(SliceSangramento)

console.log(SangramentoAtualizado)

let SangrReplace = Defensor.Efeitos.replace(`Sangramento [${SliceSangramento}]. `, `Sangramento [${SangramentoAtualizado}]. `)

Defensor.Efeitos = SangrReplace

}

}

if((TipoDano == "Cortante" || TipoDano == "Perfurante") && TesteSangramento >= 50){

let SangramentoNumero = rollDice3d4()

let SangramentoEff = `Sangramento [${SangramentoNumero}]. `

let SliceSangramento = SangramentoEff.slice(13, 15)

if(!Defensor.Efeitos.includes("Sangramento")){

Defensor.Efeitos += SangramentoEff

} else {

let CortarSangr = Defensor.Efeitos.substring(Defensor.Efeitos.indexOf("Sangramento"), 18)

SliceSangramento = CortarSangr.slice(13, 15)

if(SliceSangramento.includes("]")){

SliceSangramento = CortarSangr.slice(13, 14)

}

let SangramentoAtualizado = SangramentoNumero + parseInt(SliceSangramento)

let SangrReplace = Defensor.Efeitos.replace(`Sangramento [${SliceSangramento}]. `, `Sangramento [${SangramentoAtualizado}]. `)

Defensor.Efeitos = SangrReplace

}

}

if(TipoDano == "Concussao" && TesteAtordoamento >= 5 + Tenacidade && TesteAtordoamento <= 19 + Tenacidade){

Defensor.PA -= rollDice1d2()

msg.channel.send(`**${Defensor.Nome}** tomou **Atordoamento Leve**.

Pontos de Ação de **${Defensor.Nome}**: ${Defensor.PA}.`)

}

if(TipoDano == "Concussao" && TesteAtordoamento >= 20 + Tenacidade){

Defensor.PA -= rollDice2d2()

msg.channel.send(`**${Defensor.Nome}** tomou **Atordoamento Grave**.

Pontos de Ação de **${Defensor.Nome}**: ${Defensor.PA}.`)

}

}

// Late Reads
if(Defensor.FA >= 0){

if(Defensor.Nomeread == "Mahito" && Atacante.Nomeread !== "Kenzo" && Atacante.Arma !== "Desarmado"){

TesteDano = 0

DanoLetalidade = 0

}

if(Atacante.Ataque == "Toque"){

TesteDano = 0

}

}

// Fotos e Gifs
if(Defensor.FA >= 0){

}

// Acertou
if(TesteAcerto >= 0){

Defensor.HP -= TesteDano

Defensor.HP -= DanoLetalidade

let DanoTotal = TesteDano + DanoLetalidade

msg.channel.send(`${Atacante.Nomeread} acertou **${Atacante.Mira}** de ${Defensor.Nomeread} com **${Atacante.Ataque}**. ${Defensor.Sobrenome} ${Defensor.Nomeread} reagiu com **${Defensor.Reacao}** e foi atingido por um **Acerto ${TabelaAcerto}**.

**${Atacante.Sobrenome} ${Atacante.Nomeread}** causou **${DanoTotal}** de Dano. **${Defensor.Sobrenome} ${Defensor.Nomeread}** ficou com **${Defensor.HP}** de HP.

Acerto: ${Acerto} + **${DadoAC}** x. **${DadoES}** + ${Esquiva}.

Ataque: ${Dano} + **${DadoFA}** x. **${DadoRes}** + ${Defesa}.

> ${Atacante.Nomeread}, Pts. de Ação: **${Atacante.PA}**. Hp: **${Atacante.HP}**. Mp: **${Atacante.MP}**. Sp: **${Atacante.SP}**.

> ${Defensor.Nomeread}, Pts. de Ação: **${Defensor.PA}**. Hp: **${Defensor.HP}**. Mp: **${Defensor.MP}**. Sp: **${Defensor.SP}**.

> Iniciativa de ${Atacante.Nomeread}: **${IniciativaAtk}**. Iniciativa de ${Defensor.Nomeread}: **${IniciativaDef}**. Vantagem: **${VantIn}**.

> Dano Pré-Vantagem: **${DanoCausado}**. Dano Letal: **${DanoLetalidade}**.

> Vtg. de Acerto: **${TesteAcerto}**. Multiplicador de Acerto: **${MultiplAcerto}**. Iniciação: **${Atacante.Iniciacao}**.`)
} // Errou
else {

let Frase = ""

FACrit = -1

if(Defensor.Reacao == "Esquiva"){
Frase = `**${Defensor.Nome}** esquivou com sucesso.`
}

if(Defensor.Reacao == "Bloqueio" && TesteAcerto < 0){
Frase = `**${Defensor.Nome}** falhou em bloquear, mas evitou o ataque com sucesso.`
}

if(Defensor.Reacao == "Esquiva" && TesteCA < 0){
Frase = `**${Defensor.Nome}** esquivou com sucesso.`
}

if(Defensor.Reacao == "Contra Ataque" && TesteCA <= 0){
Frase = `**${Defensor.Nome}** falhou em contra-atacar, mas esquivou com sucesso.`
}

if(Defensor.Reacao == "Contra Ataque" && TesteCA > 0){
Frase = `**${Defensor.Nome}** contra atacou com sucesso.`
}

if(Defensor.Reacao == "Recuo"){
Frase = `**${Defensor.Nome}** recuou com sucesso.`
}

if(Defensor.Reacao == "Aparar"){
Frase = `**${Defensor.Nome}** aparou com sucesso.`
}

if(tecDef.Cmd == "Mugen"){

Frase = `**${Defensor.Nome}** parou o ataque no **Ilimitado**.`

let SortPic = rollDice1d2()

if(SortPic == 1){
msg.channel.send({
files: [
'./pics/limitless4.png'
]
})}

if(SortPic == 2){
msg.channel.send({
files: [
'./pics/limitless7.png'
]
})}

}

msg.channel.send(`
${Frase}

Esquiva: ${Esquiva} + **${DadoES}** x. **${DadoAC}** + ${Acerto}.

Vtg. Iniciativa: ${IniciativaAtk} x. ${IniciativaDef}**. +${VantIn}** de ${VitoriosoIn}.`)

}

// Reset de Mods

Atacante.Mira = Mirahold

if(IniciacaoStart > 0){

Atacante.Iniciacao = 0

Defensor.Iniciacao = 0

}

let Kenzo = db.get("usuarios").find({Nomeread : "Kenzo"}).value()
let Ryoshi = db.get("usuarios").find({Nomeread : "Ryoshi"}).value()
let Kazuki = db.get("usuarios").find({Nomeread : "Kazuki"}).value()
let Midori = db.get("usuarios").find({Nomeread : "Midori"}).value()
let Ryuji = db.get("usuarios").find({Nomeread : "Ryuji"}).value()
let Ryushiro = db.get("usuarios").find({Nomeread : "Ryushiro"}).value()

// Sempre lembrar de manter esse tipo de let char daqui, é o único diferente por ser ataque de outro char
// Fim de Turno Forçado
if(Defensor.FA >= 0){

if(Atacante.PA <= 0 && AtkPA > 0){

let id_member = msg.member.id
let char = db.get("usuarios").find({Nome : nome_personagem}).value()

char.AtkMult = 0
db.write()

techs.write()

let MPAtiv = ``
let SPAtiv = ``
let HPAtiv = ``
let PAAtiv = ``

let RegenRead = ``

let HPRegen = 0

let MPRegen = 0

let SPRegen = 0

let MPReducao = char.MP_Ativacao
let SPReducao = char.SP_Ativacao
let HPReducao = char.HP_Ativacao
let PAReducao = char.PA_Ativacao

if(char.Efeitos.includes("Revestimento Comum")){

MPReducao += 1 + Math.floor(char.MP*0.02)

}

if(char.Efeitos.includes("Revestimento Avançado")){

MPReducao += 2 + Math.floor(char.MP*0.03)

}

if(char.Efeitos.includes("Revestimento Excessivo")){

MPReducao += 5 + Math.floor(char.MP*0.05)

}

let Reducao = 1 - (char.Prof*0.05 + char.PerCon*0.05)

if(Reducao <= 0.30){

Reducao = 0.30

}

MPReducao *= Reducao
MPReducao = Math.ceil(MPReducao)

if(char.Efeitos.includes("Cura Constante da Reversão")){

char.TRG += char.Prof*0.25

HPRegen += rollDice(1*char.FE, 4*char.FE)

}

if(char.Efeitos.includes("Sangramento")){

let CortarSangr = char.Efeitos.substring(char.Efeitos.indexOf("Sangramento"), 18)

let SliceSangramento = CortarSangr.slice(13, 15)

if(SliceSangramento.includes("]")){

let SliceSangramento = CortarSangr.slice(13, 14)

parseInt(SliceSangramento)

}

HPRegen -= SliceSangramento

}

if(char.Efeitos.includes("Sangue se tornando Energia")){

char.TRM += char.Prof*0.25

MPRegen += rollDice(1*char.FE, 4*char.FE)

}

if(char.Efeitos.includes("Circular Sangue")){

char.TRG += char.Prof*0.25

char.TRC += char.Prof*0.25

SPRegen += rollDice(1*char.FE, 2*char.FE)

HPRegen += rollDice(1*char.FE, 4*char.FE)

}

if(char.Efeitos.includes("Loan Shark")){

MPReducao *= 3

}

if(char.Efeitos.includes("Sucção do Broto")){

MPReducao += 2
SPReducao += 1

}

let FraseReducaoHP = "gastou"

if(HPReducao <= 0){

FraseReducaoHP = "ganhou"

}

char.HP -= HPReducao
char.SP -= SPReducao
char.MP -= MPReducao
char.PA -= PAReducao

char.TRG += 1.5
char.TRC += 1.5
char.TRM += 1.5

if(char.HP < char.Max_HP*0.50 && char.Vtg.includes("Persistente (1)")){

HPRegen += 1

}

if(PAReducao > 0){

PAAtiv = `
**${char.Nomeread}** gastou **${PAReducao}** de PA com Ativações.
`

}

if(PAReducao < 0){

PAAtiv = `
**${char.Nomeread}** recuperou **${Math.abs(PAReducao)}** de PA com Ativações.
`

}

if(HPReducao > 0){

HPAtiv = `
**${char.Nomeread}** ${FraseReducaoHP} **${Math.abs(HPReducao)}** de HP com Ativações.
`

}

if(MPReducao > 0){

MPAtiv = `
**${char.Nomeread}** gastou **${MPReducao}** de MP com Ativações.
`

}

if(SPReducao > 0){

SPAtiv = `
**${char.Nomeread}** gastou **${SPReducao}** de SP com Ativações.
`

}

let RecuperarPA = 4

if(char.Efeitos.includes("Restricao Celestial")){

// RecuperarPA += 2

}

if(char.Nomeread == "Kenzo" && char.TRM >= 5){

let Rika = db.get("usuarios").find({Nomeread : "Rika"}).value()

if(Rika.MP > 0){

Rika.MP -= 80
Kenzo.HP += 20
Kenzo.MP += 80

msg.channel.send(msg.channel.send(`**Rika** entregou 80 de MP e 20 de HP pra **Kenzo**.

MP da Rika: **${Rika.MP}**.`))

}

if(Rika.MP <= 0){

msg.channel.send(`**Rika** ficou sem energia extra e se juntou á energia de Kenzo. Rika está inativa na luta.`)

}

}

if(char.TRG >= 5){

char.TRG -= 5

HPRegen += rollDice1d6() + char.RG

char.HP += HPRegen

RegenRead = `
**${char.Nome}** recuperou **${HPRegen}** de Vida, **${MPRegen}** de Mana e **${SPRegen}** de Stamina.
`

if(char.HP > char.Max_HP){

char.HP = char.Max_HP

}

}

if(char.TRC >= 5){

char.TRC -= 5

SPRegen += rollDice1d4() + Math.floor(char.RC*0.5)

char.SP += SPRegen

RegenRead = `
**${char.Nome}** recuperou **${HPRegen}** de Vida, **${MPRegen}** de Mana e **${SPRegen}** de Stamina.
`

if(char.SP > char.Max_SP){

char.SP = char.Max_SP

}

}

if(char.TRM >= 5){

char.TRM -= 5

MPRegen += rollDice1d6()

char.MP += MPRegen

RegenRead = `
**${char.Nome}** recuperou **${HPRegen}** de Vida, **${MPRegen}** de Mana e **${SPRegen}** de Stamina.
`

if(char.MP > char.Max_MP){

char.MP = char.Max_MP

}

}

let ParalisiaPorVez = "N"

if(char.Efeitos.includes("Paralisia [3]" && ParalisiaPorVez == "N")){

const ParalisiaReplace = char.Efeitos.replace("Paralisia [3] - ", "Paralisia [2] - ")
char.Efeitos = ParalisiaReplace

ParalisiaPorVez = "S"

char.PA -= 1

db.write()

}

if(char.Efeitos.includes("Paralisia [2]" && ParalisiaPorVez == "N")){

const ParalisiaReplace = char.Efeitos.replace("Paralisia [2] - ", "Paralisia [1] - ")
char.Efeitos = ParalisiaReplace

ParalisiaPorVez = "S"

char.PA -= 1

db.write()

}

if(char.Efeitos.includes("Paralisia [1]") && ParalisiaPorVez == "N"){

const ParalisiaReplace = char.Efeitos.replace("Paralisia [1] - ", "")
char.Efeitos = ParalisiaReplace

ParalisiaPorVez = "S"

char.PA -= 1

db.write()

}

if(RecuperarPA <= 0){

RecuperarPA = 1

}

char.PA += RecuperarPA

if(char.PA > char.MaxPA){

char.PA = char.MaxPA

db.write()

}

if(char.PA < char.MinPA) {

char.PA = char.MinPA

db.write()

}

msg.channel.send(`**${char.Nome}** teve seu turno encerrado por falta de Pontos de Ação.

**${char.Nome}** tem **${char.PA}** Pontos de Ação restando.
${HPAtiv}${SPAtiv}${MPAtiv}${RegenRead}`)


db.write()
techs.write()

}

}

// Classes
if(Defensor.FA >= 0){
if(Defensor.HP <= 0 && Defensor.Efeitos.includes("Evitar Desmaio")){

Defensor.HP = 1

let DanopraDesmaio = TesteDano - Defensor.Prof

if(DanopraDesmaio < 0){

DanopraDesmaio = 0

}

if(tecAtk.RedirecionarDano = "MP"){

Defensor.MP -= DanopraDesmaio

if(Defensor.MP == 0){

Defensor.HP = 0

}

}

msg.channel.send(`O **Bombeamento de Sangue** manteve **${Defensor.Nomeread}** acordado. O dano causado reduziu sua Mp em **${DanopraDesmaio}**.`)

}

if(Defensor.HP <= 0 && !Defensor.Efeitos.includes("Desmaio")){

Defensor.Efeitos += "Desmaio"

Defensor.PA = 0

if(Defensor.HP <= 0 && Defensor.Classe == "o Shikigami"){

msg.channel.send(`**${Defensor.Nomeread}** desmaiou.`)

}

if(Defensor.HP <= 0 && Defensor.Classe == "a Feiticeira"){

msg.channel.send(`**${Defensor.Nomeread}** desmaiou.`)

}

if(Defensor.HP <= 0 && Defensor.Classe == "o Feiticeiro"){

msg.channel.send(`**${Defensor.Nomeread}** desmaiou.`)

}

if(Defensor.HP <= 0 && Defensor.Classe == "a Maldição"){

msg.channel.send(`**${Defensor.Nomeread}** foi exorcizado.`)

}

if(Defensor.XP_Drop > 0){

Kenzo.XP += Defensor.XP_Drop
Ryoshi.XP += Defensor.XP_Drop
Kazuki.XP += Defensor.XP_Drop
Midori.XP += Defensor.XP_Drop
Ryuji.XP += Defensor.XP_Drop

msg.channel.send(`Todos os feiticeiros ganharam **${Defensor.XP_Drop}** de XP.`)

}

}

}

// Ups
if(Ryuji.Nivel > 1){

Randomgif = 0

if(Kenzo.Nivel < 12 && Ryuji.XP > 2500){

Randomgif = rollDice1d10()

Kenzo.Nivel = 12
Ryoshi.Nivel = 12
Kazuki.Nivel = 12
Midori.Nivel = 12
Ryuji.Nivel = 12

msg.channel.send(`> **Level Up!** Todos uparam pro nível **${Ryuji.Nivel}**!`)

}

if(Kenzo.Nivel < 13 && Ryuji.XP > 4000){

Randomgif = rollDice1d10()

Kenzo.Nivel = 13
Ryoshi.Nivel = 13
Kazuki.Nivel = 13
Midori.Nivel = 15
Ryuji.Nivel = 13

msg.channel.send(`> Level Up! **${Ryuji.Nivel}**`)

}

if(Kenzo.Nivel < 14 && Ryuji.XP > 6000){

Randomgif = rollDice1d10()

Kenzo.Nivel = 14
Ryoshi.Nivel = 14
Kazuki.Nivel = 14
Midori.Nivel = 14
Ryuji.Nivel = 14

msg.channel.send(`> Level Up! **${Ryuji.Nivel}**`)

}

if(Kenzo.Nivel < 15 && Ryuji.XP > 10000){

Randomgif = rollDice1d10()

Kenzo.Nivel = 15
Ryoshi.Nivel = 15
Kazuki.Nivel = 15
Midori.Nivel = 15
Ryuji.Nivel = 15

msg.channel.send(`> Level Up! **${Ryuji.Nivel}**`)

}

if(Kenzo.Nivel < 16 && Ryuji.XP > 12000){

Randomgif = rollDice1d10()

Kenzo.Nivel = 16
Ryoshi.Nivel = 16
Kazuki.Nivel = 16
Midori.Nivel = 16
Ryuji.Nivel = 16

msg.channel.send(`> Level Up! **${Ryuji.Nivel}**`)

}

if(Randomgif == 1){msg.channel.send({
files: [
'./pics/gif15.gif'
]
})}

if(Randomgif == 2){msg.channel.send({
files: [
'./pics/gif7.gif'
]
})}

if(Randomgif == 3){msg.channel.send({
files: [
'./pics/gif35.gif'
]
})}

if(Randomgif == 4){msg.channel.send({
files: [
'./pics/tojirabbit.gif'
]
})}

if(Randomgif == 5){msg.channel.send({
files: [
'./pics/Gif41.gif'
]
})}

if(Randomgif == 6){msg.channel.send({
files: [
'./pics/Gif43.gif'
]
})}

if(Randomgif == 7){msg.channel.send({
files: [
'./pics/Random9.png'
]
})}

if(Randomgif == 8){msg.channel.send({
files: [
'./pics/Random46.gif'
]
})}

if(Randomgif == 9){msg.channel.send({
files: [
'./pics/Random47.gif'
]
})}

if(Randomgif == 10){msg.channel.send({
files: [
'./pics/Random49.gif'
]
})}

}

db.write()

}
if(inicio_comando == "T"){

let nome_personagem = msg.content.split(" ")[1]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let id_member = msg.member.id
let Defensor = db.get("usuarios").find({Nome : nome_personagem}).value()

let Atacante = personagem_logado(id_member)
let tecAtk = techs.get("Techs").find({Cmd : Atacante.Tech}).value()
let tecDef = techs.get("Techs").find({Cmd : Defensor.Tech}).value()
let Dano = 0
let Defesa = Defensor.Res
let Acerto = Atacante.AC + Atacante.PerCon
let AcertoDefensor = Defensor.AC
let Esquiva = Defensor.ES + Defensor.IN
let IniciativaAtk = Atacante.IN + Atacante.Iniciacao
let IniciativaTec = 0
let IniciativaDef = Defensor.IN + Defensor.Iniciacao
let Letalidade = tecAtk.LT
let Armadura = Defensor.AR
let Penetracao = Atacante.PNT
let Furtividade = Atacante.Fur
let Percepcao = Defensor.Per
let Tenacidade = Defensor.Ten

let Contato = "N"

let ContraAtk = rollDice1d20()
let ContraDef = rollDice1d20()
let dadoAparar = rollDice1d20()
let contraAparar = rollDice1d20()

let ApararBuff = 0
let DanopreRes = 0

let FACrit = -1
let ResCrit = -1
let ACCrit = 20
let ESCrit = 20

let VelFE = Math.floor(Atacante.FE * tecAtk.VelFe)
let VelProf = Math.floor(Atacante.Prof * tecAtk.VelProf)
let VelPura = tecAtk.Vel
let VelAS = tecAtk.VelAs
let Vel = VelFE + VelProf + VelPura + VelAS
let IniciativaFisica = 0

IniciativaTec += Vel

let VantInAtk = IniciativaTec
let VantInDef = IniciativaDef
let VantIn = 0
let VitoriosoIn = ""

let FFAtk = 0
let FFDef = 0

let FEAtk = 0
let FEDef = 0

let MovAtk = 0
let MovDef = 0

let Aparar = 0
let ApararDef = 0

let MultiplAcerto = 0
let TesteCA = 0
let TesteRecuo = 0
let EsquivaIncomum = 0
let TabelaAcerto = ""
let DanoLetalidade = 0
let Pen = Penetracao
let ReducAR = 0
let AtkArmado = "N"
let DefArmado = "N"

let NomeAtual = tecAtk.Nome

let Furarguarda = 0
let Guarda = 0

// Reads
let GuardaFurada = "N"
let TabelaOrdem = 0

let Distancia = Math.abs(Atacante.NS - Defensor.NS)
let DistanciaNome = ""
let IniciacaoStart = Atacante.Iniciacao

// Holds
let Mirahold = Atacante.Mira
let TipoReacao = ""

// Dados
let DadoFE = rollDice(tecAtk.DanoQuant, tecAtk.DanoQuant*tecAtk.DanoNumb)
let DadoFA = 0
let DadoRes = 0
let DadoAC = rollDice1d20()
let DadoES = rollDice1d20()

let FECrit = tecAtk.DanoNumb * tecAtk.DanoQuant
let MiraParte = ""

// Mods dos Custos
let AtaqueMP = 0 + tecAtk.Custo
let AtaqueSP = 0
let DefesaMP = 0 + tecDef.Custo
let DefesaSP = 0
let DefPA = 0 + tecDef.PA
let AtkPA = 0 + tecAtk.PA

// Vantagens
if(Defensor.FA >= 0){

if(Atacante.Vtg.includes("Agil (1)")){

MovAtk += 1

}

if(Defensor.Vtg.includes("Agil (1)")){

MovDef += 1

}

if(Atacante.Vtg.includes("Agil (2)")){

MovAtk += 2

}

if(Defensor.Vtg.includes("Agil (2)")){

MovDef += 2

}

if(Defensor.HP < Defensor.Max_HP*0.50 && Defensor.Vtg.includes("Persistente (1)")){

Defesa += 2

}

if(Defensor.HP < Defensor.Max_HP*0.25 && Defensor.Vtg.includes("Persistente (2)")){

Defesa += 3

}

if(Defensor.Vtg.includes("Força Imensa (1)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

FFDef += 1

}

if(Defensor.Vtg.includes("Força Imensa (2)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

FFDef += 2

}

if(Defensor.Vtg.includes("Força Imensa (3)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

FFDef += 3

}

if(tecAtk.Tipo.includes("Fisico") && Atacante.Vtg.includes("Velocidade Imensa (1)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

IniciativaAtk += 1

}

if(tecAtk.Tipo.includes("Fisico") && Atacante.Vtg.includes("Velocidade Imensa (2)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

IniciativaAtk += 2

}

if(tecAtk.Tipo.includes("Fisico") && Atacante.Vtg.includes("Velocidade Imensa (3)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

IniciativaAtk += 3

}

if(tecAtk.Tipo.includes("Magico") && Atacante.Vtg.includes("Poder Excessivo (1)")){

FEAtk += 2

}

if(tecAtk.Tipo.includes("Magico") && Atacante.Vtg.includes("Poder Excessivo (2)")){

FEAtk += 4

}

if(tecAtk.Tipo.includes("Magico") && Atacante.Vtg.includes("Poder Excessivo (3)")){

FEAtk += 6

}

if(Defensor.Vtg.includes("Reflexos Imensos (1)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

IniciativaDef += 1

}

if(Defensor.Vtg.includes("Reflexos Imensos (2)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

IniciativaDef += 2

}

}

// Effs
if(Defensor.FA >= 0){

if(Atacante.Efeitos.includes("Enxame")){

// AtkPA -= 5

}

if(Defensor.Efeitos.includes("Extensao de Dominio") && tecAtk.TipoDano == "Magico"){

Defesa += rollDice1d8() + Defensor.FE

}

if(Atacante.Efeitos.includes("Sombra de Ryoshi")){

let RyoshiInvocador = db.get("usuarios").find({Nome : "Ryo"}).value()

let FortalecimentoFA = Math.floor(RyoshiInvocador.FE*1 + RyoshiInvocador.Nivel*0.30)

let FortalecimentoFE = Math.floor(RyoshiInvocador.Prof*1 + RyoshiInvocador.Nivel*0.30)

let FortalecimentoPen = Math.floor(RyoshiInvocador.FE*0.5 + RyoshiInvocador.Nivel*0.10)

let FortalecimentoIN = Math.floor(RyoshiInvocador.Prof*1 + RyoshiInvocador.Nivel*0.30)

Penetracao += FortalecimentoPen

Dano += FortalecimentoFA

FEAtk += FortalecimentoFE

IniciativaAtk += FortalecimentoIN

}

if(Defensor.Efeitos.includes("Sombra de Ryoshi")){

let RyoshiInvocador = db.get("usuarios").find({Nome : "Ryo"}).value()

let FortalecimentoRes = Math.floor(RyoshiInvocador.FE*1 + RyoshiInvocador.Nivel*0.30)

let FortalecimentoIN = Math.floor(RyoshiInvocador.Prof*1 + RyoshiInvocador.Nivel*0.30)

let FortalecimentoFE = Math.floor(RyoshiInvocador.Prof*1 + RyoshiInvocador.Nivel*0.30)

let FortalecimentoAR = Math.floor(RyoshiInvocador.FE*0.25 + RyoshiInvocador.Nivel*0.05)

Armadura += FortalecimentoAR

FEDef += FortalecimentoFE

Defesa += FortalecimentoRes

IniciativaDef += FortalecimentoIN

}

if(Atacante.Efeitos.includes("Revestimento Comum")){

// let EnergiaExtra = Math.floor(RyoshiInvocador.FE*0.25) + Math.floor(RyoshiInvocador.Max_MP*0.05)

let FortalecimentoFA = Math.floor(Atacante.FE*0.25 + Atacante.MP*0.02)

let FortalecimentoFE = Math.floor(Atacante.Prof*0.25 + Atacante.MP*0.02)

let FortalecimentoPEN = Math.floor(Atacante.FE*0.5 + Atacante.MP*0.02)

let FortalecimentoIN = Math.floor(Atacante.Prof*0.25 + Atacante.MP*0.02)

Penetracao += FortalecimentoPEN

Dano += FortalecimentoFA

IniciativaFisica += FortalecimentoIN

FEAtk += FortalecimentoFE

}

if(Defensor.Efeitos.includes("Revestimento Comum")){

let FortalecimentoAR = Math.floor(Defensor.FE*0.5 + Defensor.MP*0.02)

let FortalecimentoRES = Math.floor(Defensor.FE*0.25 + Defensor.MP*0.02)

let FortalecimentoFE = Math.floor(Defensor.Prof*0.25 + Defensor.MP*0.02)

let FortalecimentoIN = Math.floor(Defensor.Prof*0.25 + Defensor.MP*0.02)

Armadura += FortalecimentoAR

Defesa += FortalecimentoRES

IniciativaDef += FortalecimentoIN

FEDef += FortalecimentoFE

}

if(Atacante.Efeitos.includes("Revestimento Avançado")){

// let EnergiaExtra = Math.floor(RyoshiInvocador.FE*0.25) + Math.floor(RyoshiInvocador.Max_MP*0.05)

let FortalecimentoFA = Math.floor(Atacante.FE*0.25 + Atacante.MP*0.03) + 1

let FortalecimentoFE = Math.floor(Atacante.Prof*0.25 + Atacante.MP*0.03) + 1

let FortalecimentoPEN = Math.floor(Atacante.FE*0.5 + Atacante.MP*0.03) + 1

let FortalecimentoIN = Math.floor(Atacante.Prof*0.25 + Atacante.MP*0.03) + 1

Penetracao += FortalecimentoPEN

Dano += FortalecimentoFA

IniciativaFisica += FortalecimentoIN

FEAtk += FortalecimentoFE

}

if(Defensor.Efeitos.includes("Revestimento Avançado")){

let FortalecimentoAR = Math.floor(Defensor.FE*0.5 + Defensor.MP*0.03) + 1

let FortalecimentoRES = Math.floor(Defensor.FE*0.25 + Defensor.MP*0.03) + 1

let FortalecimentoFE = Math.floor(Defensor.Prof*0.25 + Defensor.MP*0.03) + 1

let FortalecimentoIN = Math.floor(Defensor.Prof*0.25 + Defensor.MP*0.03) + 1

Armadura += FortalecimentoAR

Defesa += FortalecimentoRES

IniciativaDef += FortalecimentoIN

FEDef += FortalecimentoFE

}

if(Atacante.Efeitos.includes("Revestimento Excessivo")){

// let EnergiaExtra = Math.floor(RyoshiInvocador.FE*0.25) + Math.floor(RyoshiInvocador.Max_MP*0.05)

let FortalecimentoFA = Math.floor(Atacante.FE*0.25 + Atacante.MP*0.05) + 5

let FortalecimentoFE = Math.floor(Atacante.Prof*0.25 + Atacante.MP*0.05) + 5

let FortalecimentoPEN = Math.floor(Atacante.FE*0.5 + Atacante.MP*0.05) + 5

let FortalecimentoIN = Math.floor(Atacante.Prof*0.25 + Atacante.MP*0.05) + 5

Penetracao += FortalecimentoPEN

Dano += FortalecimentoFA

IniciativaFisica += FortalecimentoIN

FEAtk += FortalecimentoFE

}

if(Defensor.Efeitos.includes("Revestimento Excessivo")){

let FortalecimentoAR = Math.floor(Defensor.FE*0.5 + Defensor.MP*0.05) + 5

let FortalecimentoRES = Math.floor(Defensor.FE*0.25 + Defensor.MP*0.05) + 5

let FortalecimentoFE = Math.floor(Defensor.Prof*0.25 + Defensor.MP*0.05) + 5

let FortalecimentoIN = Math.floor(Defensor.Prof*0.25 + Defensor.MP*0.05) + 5

Armadura += FortalecimentoAR

Defesa += FortalecimentoRES

IniciativaDef += FortalecimentoIN

FEDef += FortalecimentoFE

}

if(Atacante.Efeitos.includes("Pulsação Aumentada [1]")){

IniciativaAtk += 2

}

if(Defensor.Efeitos.includes("Pulsação Aumentada [1]")){

IniciativaDef += 2

}

if(Atacante.Efeitos.includes("Pulsação Aumentada [2]")){

IniciativaAtk += 4

}

if(Defensor.Efeitos.includes("Pulsação Aumentada [2]")){

IniciativaDef += 4

}

if(Atacante.Efeitos.includes("Flowing Red Scale")){

FFAtk += 1
Dano += 2
Acerto += 2

}

if(Defensor.Efeitos.includes("Flowing Red Scale")){

FFDef += 1
Esquiva += 2
Defesa += 1
Tenacidade += 1

}

if(Atacante.Efeitos.includes("Flowing Red Scale: Stack")){

FFAtk += 2
Dano += 4
Acerto += 4

}

if(Defensor.Efeitos.includes("Flowing Red Scale: Stack")){

FFDef += 2
Esquiva += 4
Defesa += 2
Tenacidade += 2

}

if(Atacante.Efeitos.includes("Paralisia [3]")){

IniciativaAtk -= 5

}

if(Defensor.Efeitos.includes("Paralisia [3]")){

IniciativaDef -= 5

}

if(Atacante.Efeitos.includes("Paralisia [2]")){

IniciativaAtk -= 2

}

if(Defensor.Efeitos.includes("Paralisia [2]")){

IniciativaDef -= 2

}

if(Atacante.Efeitos.includes("Paralisia [1]")){

IniciativaAtk -= 1

}

if(Defensor.Efeitos.includes("Paralisia [1]")){

IniciativaDef -= 1

}

}

// Armas
if(Atacante.FA >= 0){
if(Defensor.Arma == "Desarmado"){

IniciativaDef += 1

}

if(Defensor.Arma == "Braco de Lamina"){

IniciativaDef += 1

}
}

// Ações Comuns e Reações
if(Defensor.FA >= 0){
if(Atacante.Ataque == "Soco"){

TipoDano = "Concussao"

DadoFA = rollDice1d10()

FACrit = 10

AtaqueSP += 0

AtkPA += 2

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Chute"){

TipoDano = "Concussao"

DadoFA = rollDice1d10()

FACrit = 10

AtkPA += 2
AtaqueSP += 0
Dano += 1

IniciativaAtk -= 1

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Cotovelada"){

TipoDano = "Concussao"

DadoFA = rollDice1d12()

FACrit = 12

AtkPA += 3
AtaqueSP += 0
Dano += 2

IniciativaAtk -= 2

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Joelhada"){

TipoDano = "Concussao"

DadoFA = rollDice1d12()

FACrit = 12

AtkPA += 3
AtaqueSP += 0
Dano += 3

IniciativaAtk -= 3

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Asa Eletrica"){

TipoDano = "Eletrico"

DadoFA = rollDice1d20()

Dano -= Atacante.FA

Dano += Atacante.FE + FEAtk

AtkPA += 3

FACrit = 20

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Queda Mental"){

TipoDano = "Concussao"

Furarguarda += 100

DadoFA = rollDice1d12()

FACrit = 12

Dano -= Atacante.FA

Dano += Atacante.FE + FEAtk

Atacante.Mira = "o Corpo"

AtkPA += 4
AtaqueSP += 0

Acerto += Atacante.PerCon + Atacante.FE

Esquiva += Defensor.PerCon + Defensor.FE

Esquiva -= Defensor.ES

IniciativaDef = 0

IniciativaAtk = 0

}

if(Atacante.Ataque == "Baque"){

TipoDano = "Concussao"

DadoFA = rollDice1d10()

FACrit = 10

AtkPA += 3

Acerto += Atacante.PerArmas + 1

MovAtk += Atacante.PerArmas

}

if(Atacante.Ataque == "Toque"){

TipoDano = "Concussao"

DadoFA = 0

FACrit = 10

AtaqueSP += 0

AtkPA += 2

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Corte"){

TipoDano = "Cortante"

DadoFA = rollDice1d12()

FACrit = 12

AtkPA += 2

Acerto += Atacante.PerArmas

MovAtk += Atacante.PerArmas

}

if(Atacante.Ataque == "Estocada"){

TipoDano = "Perfurante"

DadoFA = rollDice1d20()

FACrit = 20

Letalidade += 1

AtkPA += 3

Acerto -= 1

Acerto += Atacante.PerArmas

MovAtk += Atacante.PerArmas

}

if(Atacante.Ataque == "Mordida"){

TipoDano = "Perfurante"

DadoFA = rollDice1d12()

Letalidade += 3

Acerto -= 2

AtkPA += 3

FACrit = 12

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Mordida Larga"){

TipoDano = "Perfurante"

DadoFA = rollDice1d20()

Letalidade += 6

Acerto -= 5

AtkPA += 4

FACrit = 20

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Ataque de Cauda"){

TipoDano = "Concussao"

DadoFA = rollDice1d10()

FFAtk += 2

Acerto += 2

AtkPA += 3

FACrit = 10

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Ataque de Tromba"){

TipoDano = "Concussao"

DadoFA = rollDice1d12()

Dano += 4

FACrit = 12

Acerto -= 2

AtaqueSP += 0

AtkPA += 3

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Pisao"){

TipoDano = "Concussao"

DadoFA = rollDice2d20()

Dano += 6

FACrit = 20

Acerto -= 12

AtaqueSP += 0

AtkPA += 5

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Defensor.Reacao == "Esquiva"){

Esquiva += 0

DefesaSP += 0

DefPA += 0

}

if(Defensor.Reacao == "Esquiva Desesperada"){

Esquiva += 1 + rollDice1d4()

DefesaSP += 2

DefPA += 1

}

if(Defensor.Reacao == "Contra Ataque"){

Esquiva -= 2
IniciativaDef -= 2

DefPA += 1

}

if(Defensor.Reacao == "Aparar"){

Esquiva -= 3

DefPA += 0

}

if(Defensor.Reacao == "Bloqueio"){

TipoReacao = "Bloqueio"

}

if(Defensor.Reacao == "Bloqueio Cruzado"){

TipoReacao = "Bloqueio"

DefPA += 1

DefesaSP += 1

}

if(Defensor.Reacao == "Resistir"){

TipoReacao = "Bloqueio"

DefPA -= 1

}

if(Defensor.Reacao == "Recuo"){

MovDef += Defensor.PerJogoPes

Esquiva -= 3

DefPA += 1

DefesaSP += 1

}

}

// Ações Especiais
if(Defensor.FA >= 0){

if(Atacante.AtkSus == "S"){

let AtkSurpresa = rollDice1d20() + Atacante.Fur

let DefSurpresa = rollDice1d20() + Defensor.Per

let TesteAtk = AtkSurpresa - DefSurpresa

if(TesteAtk > 0){

Atacante.Iniciacao += TesteAtk

msg.channel.send(`**${Atacante.Nomeread}** surpreendeu ${Defensor.Nomeread} em **${TesteAtk}**.`)

}

if(TesteAtk < 0){

msg.channel.send(`**${Atacante.Nomeread}** não surpreendeu ${Defensor.Nomeread}.`)

}

}

if(Atacante.Furtivo == "S"){

let AtkFurtivo = rollDice1d20() + Atacante.Fur

let DefFurtiva = rollDice1d20() + Defensor.Per

let TesteAtk = AtkFurtivo - DefFurtiva

if(TesteAtk > 0){

Defensor.Reacao = "Neutro"

msg.channel.send(`**${Atacante.Nomeread}** atacou ${Defensor.Nomeread} **Furtivamente**.`)

}

if(TesteAtk <= 0){

AtkSus = "S"

msg.channel.send(`**${Atacante.Nomeread}** foi detectado por **${Defensor.Nomeread}** antes de concluir o ataque.`)

}

}

}

// Distância
if(Defensor.FA >= 0){

if(Distancia == 1){

IniciativaDef -= 1

DistanciaNome = "Queima Roupa"

}

if(Distancia == 2){

DistanciaNome = "Curta Distancia"

}

if(Distancia >= 3 && Distancia <= 5){

IniciativaDef += 1

DistanciaNome = "Meia Distancia"

}

if(Distancia >= 6){

IniciativaDef += 2

DistanciaNome = "Longa Distancia"

}

if(Atacante.Efeitos.includes("Ataque Aquatico")){

Distancia = 1

}

}

// Effs Pré-Iniciativa
if(Defensor.FA >= 0){

if(tecAtk.Tipo.includes("Arma")){

if(Atacante.Arma == "Desarmado"){

IniciativaAtk += 1

}

if(Atacante.Arma == "Braco de Lamina"){

IniciativaAtk += 1

Letalidade += 2

}

if(Defensor.Arma == "Braco de Lamina"){

IniciativaDef += 1

}

if(Atacante.Arma == "Espada Bokken"){



}

if(Atacante.Arma == "Katana" && Atacante.Ataque == "Corte"){

AtkArmado = "S"

Letalidade += 5

}

if(Atacante.Arma == "Katana" && Atacante.Ataque == "Estocada"){

AtkArmado = "S"

Letalidade += 5

}

if(Defensor.Arma == "Katana"){

DefArmado = "S"

Esquiva -= 1

}

if(Atacante.Arma == "Playful Cloud"){

AtkArmado = "S"

Dano += Math.floor(Atacante.FA*0.5)

}

if(Defensor.Arma == "Playful Cloud"){

DefArmado = "S"

IniciativaDef -= 2

}

if(Atacante.Arma == "Presas Amaldicoadas"){

AtkArmado = "S"

Letalidade += 2

// let PresasMagicasAtk = Atacante.FE + rollDice1d10()

// let PresasMagicasDef = Defensor.Res*2 + rollDice1d10()

let PresasMagicasAtk = 3 + Atacante.FE + FEAtk - Defensor.FE - FEDef

if(PresasMagicasAtk < 0){

PresasMagicasAtk = 0

}

Dano += PresasMagicasAtk

}

if(Atacante.Arma == "Lingua"){

Dano -= 5

}

if(Defensor.Arma == "Lingua"){

AcertoDefensor += 3

}

}

if(Atacante.Efeitos.includes("Refinamento de Manipulação de Sangue") && Atacante.Tech == "Piercingblood"){

let BuffRefinamento = rollDice(Atacante.Prof, Atacante.Prof*2)

let BuffVel = rollDice1d8()

Dano += BuffRefinamento

Vel += BuffVel

const Effreplace = Atacante.Efeitos.replace("Refinamento de Manipulação de Sangue", "")
Atacante.Efeitos = Effreplace

}

if(Atacante.Efeitos.includes("Flanco")){

IniciativaAtk += 1 + rollDice1d4()

}

if(Atacante.Efeitos.includes("Restricao Celestial")){

IniciativaAtk += 15

Dano += 12

Penetracao += 10

}

if(Defensor.Efeitos.includes("Restricao Celestial")){

IniciativaDef += 15

Defesa += 16

Armadura += 10

}

if(Atacante.Efeitos.includes("Machucado")){

Dano -= 1
Acerto -= 2

}

if(Defensor.Efeitos.includes("Machucado")){

Defesa -= 4
Esquiva -= 3

}

if(Atacante.Efeitos.includes("Tekken")){

Dano += 4
Acerto -= 2

}

if(Defensor.Efeitos.includes("Tekken")){

Defesa += 4
Esquiva -= 2

}

if(Atacante.Efeitos.includes("Feiticaria de Projeçao")){

IniciativaAtk += 5

}

if(Defensor.Efeitos.includes("Feiticaria de Projeçao")){

IniciativaDef += 5

}

if(Atacante.Efeitos.includes("Balas de Prata")){

AtkPA -= 1

Letalidade += 1
Acerto += 5
Dano += 5 + Atacante.FE

}


if(Atacante.Efeitos.includes("Andorinha")){

Dano += rollDice2d12() + Atacante.FE*2

}

if(Atacante.Efeitos.includes("Marionete")){

IniciativaAtk -= 2
Dano -= 2

}

if(Defensor.Efeitos.includes("Marionete")){

IniciativaDef -= 2
Defesa -= 2

}

if(Atacante.Efeitos.includes("Quicksilver")){

Distancia = 0
Furarguarda += 50
Penetracao += 5
Letalidade += Atacante.FE
Acerto += Atacante.Prof

}

if(Atacante.Efeitos.includes("Blackout")){

Furarguarda += 1000
Acerto += 1000

}

if(Defensor.Efeitos.includes("Blackout")){

Esquiva += 1000

}

if(Atacante.Efeitos.includes("Amor Verdadeiro")){

Dano += 3
IniciativaAtk += 3
Acerto += 3

}

if(Defensor.Efeitos.includes("Amor Verdadeiro")){

Defesa += 3
IniciativaDef += 3
Esquiva += 3

}

if(Atacante.Efeitos.includes("Deathclock")){

Dano += 3
IniciativaAtk += 3
Acerto += 3

}

if(Defensor.Efeitos.includes("Deathclock")){

Defesa += 3
IniciativaDef += 3
Esquiva += 3

}

if(Atacante.Efeitos.includes("Cronos")){

IniciativaAtk += 5 + rollDice1d6()

}

if(Defensor.Efeitos.includes("Cronos")){

IniciativaDef += 10 + rollDice1d8()

}

if(Atacante.Efeitos.includes("Nervos Acelerados")){

IniciativaAtk += 1 + rollDice1d4()

}

if(Defensor.Efeitos.includes("Nervos Acelerados")){

IniciativaDef += 1 + rollDice1d4()

}

if(Atacante.Efeitos.includes("Pernas Turbinadas")){

IniciativaAtk += 2 + rollDice1d8()

}

if(Atacante.Efeitos.includes("Manipulação de Tamanho")){

Acerto += Atacante.Prof + rollDice1d6()

}

if(Defensor.Efeitos.includes("Manipulação de Tamanho")){

Esquiva += Defensor.Prof + rollDice1d6()

}

if(Atacante.Efeitos.includes("Punhos de Missil")){

Dano += Atacante.FE
Acerto += rollDice1d4()

}

if(Atacante.Efeitos.includes("Dominio Vertigioso")){

let Vertigo = rollDice1d20() + Atacante.AC

if(Vertigo < 15){

Acerto *= 0.5

Acerto = Math.floor(Acerto) - 1

IniciativaAtk *= 0.5

IniciativaAtk = Math.floor(IniciativaAtk) - 1

msg.channel.send(`**${Atacante.Nome}** ficou com Vertigem.`)

}

}

if(Defensor.Efeitos.includes("Dominio Vertigioso")){

let Vertigo = rollDice1d20() + Defensor.AC

if(Vertigo < 15){

Acerto *= 0.5

Acerto = Math.floor(Acerto) - 1

IniciativaDef *= 0.5

IniciativaDef = Math.floor(IniciativaDef) - 1

msg.channel.send(`**${Defensor.Nome}** ficou com Vertigem.`)

}

}

if(Defensor.Efeitos.includes("Cura Constante da Reversão")){

Defesa += 1 + Math.floor(Defensor.Prof*0.25)

}

if(Defensor.Efeitos.includes("Breve Pausa")){

let DiminuirIn1 = rollDice1d8()

let DiminuirIn2 = rollDice1d6()

IniciativaDef -= DiminuirIn1

IniciativaDef -= DiminuirIn2

const PausaReplace = Defensor.Efeitos.replace("Breve Pausa", "")
Defensor.Efeitos = PausaReplace

msg.channel.send(`**Breve Pausa** reduziu a Iniciativa de **${Defensor.Nomeread}** em **${DiminuirIn1 + DiminuirIn2}**.`)

}

if(Atacante.Efeitos.includes("Acelerar")){

// indexOf = vai achar a palavra Acelerar na string e retornar onde que tá o "A" de Acelerar, ou seja, a primeira letra

let CortarAce = Atacante.Efeitos.substring(Atacante.Efeitos.indexOf("Acelerar"), 15)

let NumeroAcelerar = CortarAce.slice(10, 12)
NumeroAcelerar = parseInt(NumeroAcelerar)

IniciativaAtk += NumeroAcelerar

console.log(CortarAce)

console.log(parseInt(NumeroAcelerar))

// const AcelerarReplace = Atacante.Efeitos.replace(`${1}`, "")

}

if(Atacante.Efeitos.includes("Tekkai 50%")){

Dano += Math.floor(Atacante.Vig*0.5)

}

if(Defensor.Efeitos.includes("Tekkai 200%") && (tecAtk.TipoDano == "Cortante" || tecAtk.TipoDano == "Perfurante")){

Defesa += Math.floor(Defensor.Vig*2)

}

if(Defensor.Efeitos.includes("Tekkai 200%") && tecAtk.TipoDano == "Concussao"){

Defesa += Math.floor(Defensor.Vig*1)

}

if(Defensor.Efeitos.includes("Tekkai 200%")){

IniciativaDef -= tecDef.CustoSP

}

if(Atacante.Efeitos.includes("Tekkai 500%")){

Dano += Math.floor(Atacante.Vig)

}

if(Defensor.Efeitos.includes("Tekkai 500%") && (tecAtk.TipoDano == "Cortante" || tecAtk.TipoDano == "Perfurante")){

Defesa += Math.floor(Defensor.Vig*5)

}

if(Defensor.Efeitos.includes("Tekkai 500%") && tecAtk.TipoDano == "Concussao"){

Defesa += Math.floor(Defensor.Vig*2.5)

}

if(Defensor.Efeitos.includes("Tekkai 500%")){

IniciativaDef -= tecDef.CustoSP

}

if(Atacante.Efeitos.includes("Perca da Habilidade de Andar") && tecAtk.Tipo.includes("Magico")){

Dano += 5

}

if(Defensor.Efeitos.includes("Breve Pausa [1]")){

Defensor.Reacao = "Neutro"

const ParadoReplace = Defensor.Efeitos.replace("Breve Pausa [1]. ", "")
Defensor.Efeitos = ParadoReplace

}

if(Defensor.Efeitos.includes("Parado [1]")){

Defensor.Reacao = "Neutro"

const ParadoReplace = Defensor.Efeitos.replace("Parado [1]. ", "")
Defensor.Efeitos = ParadoReplace

}

if(Defensor.Efeitos.includes("Imovel [1]")){

Defensor.Reacao = "Neutro"

const ImovelReplace = Defensor.Efeitos.replace("Imovel [1]. ", "")
Defensor.Efeitos = ImovelReplace

}

if(Defensor.Efeitos.includes("Imovel [2]")){

Defensor.Reacao = "Neutro"

const ImovelReplace = Defensor.Efeitos.replace("Imovel [2]. ", "Imovel [1]. ")
Defensor.Efeitos = ImovelReplace

}

if(Defensor.Efeitos.includes("Desmaio")){

Defensor.Reacao = "Neutro"

}

if(Atacante.Mira == "o Corpo" && Defensor.Efeitos.includes("Estatura de Monstro do Lago")){

Defensor.Reacao == "Neutro"

}

if(Atacante.Mira == "o Rosto" && Defensor.Efeitos.includes("Estatura de Monstro do Lago")){

Defesa -= 4

}

if(Defensor.Reacao == "Neutro"){

IniciativaAtk = 0

Esquiva = -10
IniciativaDef = 0
DadoES = 0

}

}

// Vantagem de Iniciativa
if(Defensor.FA >= 0){

Esquiva += Math.floor(IniciativaDef*0.5)

if(tecAtk.Tipo.includes("Fisico")){

Acerto += Math.floor(IniciativaAtk*0.5)

Dano += Atacante.FA

}

if(tecAtk.Tipo.includes("Magico")){

IniciativaAtk += IniciativaTec

IniciativaAtk -= Atacante.IN - IniciativaFisica

Acerto += Math.floor(IniciativaAtk*0.5)

let TecnicaDano = (Atacante.FE + tecAtk.FE) * tecAtk.FERate

TecnicaDano = Math.floor(TecnicaDano)

Dano += TecnicaDano

Dano += FEAtk

}

if(IniciativaAtk > IniciativaDef){

VantIn = IniciativaAtk - IniciativaDef

if(Esquiva <= -2){

Esquiva = -2

}

VitoriosoIn = Atacante.Nome

}

if(IniciativaAtk < IniciativaDef){

VantIn = IniciativaDef - IniciativaAtk

VitoriosoIn = Defensor.Nome

}

if(IniciativaAtk == IniciativaDef){

VitoriosoIn = "Empate"

}



}

// Guarda
if(Defensor.FA >= 0){

if(tecAtk.Efeitos.includes("Inbloqueavel")){

Furarguarda += 1000

}

if(Atacante.AcaoEsp.includes("Cruzado" && !tecDef.Efeitos.includes("Defesa Segura"))){

let AtkCruzado = 1 + rollDice1d6()

Furarguarda += AtkCruzado

}

if(Atacante.Mira == "o Corpo" && !tecDef.Efeitos.includes("Defesa Segura")){

Furarguarda += 50

}

if(tecAtk.Efeitos.includes("Dois Lados") && tecDef.Cmd == "Mugen"){

Guarda -= 10

}

if(tecAtk.Efeitos.includes("Todos os Lados") && tecDef.Cmd == "Mugen"){

Guarda -= 1000

}

if(Atacante.CA == "S"){

let CAFurarGuarda = Atacante.Iniciacao

if(CAFurarGuarda > 3){

CAFurarGuarda = 3

}

Furarguarda += CAFurarGuarda

}

if(tecDef.Efeitos.includes("Defesa Perfeita")){

Furarguarda -= 1000

}

if(Defensor.Reacao == "Aparar"){

let ApararRead = `Aparar: ${AcertoDefensor} + **${dadoAparar}** x. **${contraAparar}** + ${Acerto}. `

Furarguarda = IniciativaAtk + rollDice1d20()

Guarda = IniciativaDef + rollDice1d20() + 5

DefesaSP += 1

Aparar = (AcertoDefensor + dadoAparar + 3) - (contraAparar + Acerto)

if(Guarda >= Furarguarda){

let GuardaFuradaRead = `Guarda: **${Guarda}** x. **${Furarguarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

if(Furarguarda > Guarda){

GuardaFurada = "S"

let GuardaFuradaRead = `! Furo de Guarda: **${Furarguarda}** x. **${Guarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

}

if(Defensor.Reacao == "Bloqueio"){

Furarguarda = IniciativaAtk + rollDice1d12() + Atacante.PerCorpo

Guarda = IniciativaDef + rollDice1d12() + 6 + Defensor.PerCorpo

if(tecDef.Nome == "Reforçar Braco"){

Guarda -= 2

}

if(tecDef.Nome == "Compressão: Braços"){

Guarda -= 2

}

if(Furarguarda > Guarda){

Esquiva -= 1

GuardaFurada = "S"

let GuardaFuradaRead = `! Furo de Guarda: **${Furarguarda}** x. **${Guarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

if(Guarda >= Furarguarda){

let GuardaFuradaRead = `Guarda: **${Guarda}** x. **${Furarguarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

}

if(Defensor.Reacao == "Bloqueio Cruzado"){

Furarguarda = IniciativaAtk + rollDice1d12()

Guarda = IniciativaDef + rollDice1d12() + 5

let GuardaCruzada = 1 + rollDice1d4()

if(Furarguarda > Guarda){

Esquiva -= 2

GuardaFurada = "S"

let GuardaFuradaRead = `! Furo de Guarda: **${Furarguarda}** x. **${Guarda}**.`

}

if(Guarda >= Furarguarda){

Defesa += GuardaCruzada

msg.channel.send(`**${Defensor.Nomeread}** usou Guarda Cruzada e recebeu: **+${GuardaCruzada}** de Defesa.`)

let GuardaFuradaRead = `Guarda: **${Guarda}** x. **${Furarguarda}**.`

}

}

if(Defensor.Reacao == "Resistir"){

Furarguarda = IniciativaAtk + rollDice1d12() + Atacante.PerCorpo

Guarda = IniciativaDef + rollDice1d12() + 10 + Defensor.PerCorpo

if(tecDef.Nome == "Reforçar Ponto"){

Guarda -= 8

}

if(Furarguarda > Guarda){

Esquiva -= 1

GuardaFurada = "S"

let GuardaFuradaRead = `! Furo de Guarda: **${Furarguarda}** x. **${Guarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

if(Guarda >= Furarguarda){

let GuardaFuradaRead = `Guarda: **${Guarda}** x. **${Furarguarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

}

if(tecDef.Nome == "Compressão: Ponto do Corpo" && GuardaFurada == "N"){

Defesa += 2 + Math.floor((Defensor.Prof + Defensor.FE) * 1.5)

Armadura += Defensor.Prof + Defensor.FE

}

if(tecDef.Nome == "Compressão: Braços" && GuardaFurada == "N"){

Defesa += 1 + Math.floor((Defensor.Prof + Defensor.FE) * 1)

Armadura += Defensor.Prof + Defensor.FE

}

if(tecDef.Nome == "Compressão: Corpo"){

Defesa += Math.floor((Defensor.Prof + Defensor.FE) * 0.5)

Armadura += Defensor.Prof + Defensor.FE

}

if(tecDef.Nome == "Reforçar Ponto do Corpo" && GuardaFurada == "N"){

Defesa += 2 + Math.floor(Defensor.FE * 0.75)

Armadura += 2 + Math.floor(Defensor.FE * 0.75)

}

if(tecDef.Nome == "Reforçar Braço" && GuardaFurada == "N"){

Defesa += 1 + Math.floor(Defensor.FE * 0.5)

Armadura += 1 + Math.floor(Defensor.FE * 0.5)

}

if(tecDef.Nome == "Reforçar Corpo"){

Defesa += Math.floor(Defensor.FE * 0.25)

Armadura += Math.floor(Defensor.FE * 0.25)

}

if(tecDef.Efeitos.includes("Guarda")){

Furarguarda = IniciativaAtk + rollDice1d20()

Guarda = IniciativaDef + rollDice1d20() + tecDef.ValorGuarda

if(Furarguarda > Guarda){

GuardaFurada = "S"

let GuardaFuradaRead = `! Furo de Guarda: **${Furarguarda}** x. **${Guarda}**.`

}

if(Guarda >= Furarguarda){

Defesa += tecDef.ValorDefesa

let GuardaFuradaRead = `Guarda: **${Guarda}** x. **${Furarguarda}**.`

}

}

if(GuardaFurada == "N" && tecDef.Efeitos.includes("Invulneravel")){

Esquiva += 1000

Tenacidade += 1000

}

if(GuardaFurada == "N" && TipoReacao == "Bloqueio" && Defensor.Reacao !== "Resistir"){

Atacante.Mira = "o Braco"
db.write()

}

if(GuardaFurada == "N" && DefArmado == "S" && Defensor.Reacao == "Aparar"){

Atacante.Mira = "a Arma"
db.write()

}

if(DefArmado == "N" && GuardaFurada == "N" && Defensor.Reacao == "Aparar"){

Atacante.Mira = "a Mao"
db.write()

}
}

// Mira
if(Defensor.FA >= 0){
if(Atacante.Mira == "o Ponto Fraco"){

if(Defensor.Efeitos.includes("Galhos Frageis")){

let NerfDef = Math.floor(Defensor.Res*0.5) + 3

DadoRes = rollDice1d4()

Tenacidade -= 3

Acerto -= 10

Defesa -= NerfDef

}

}

if(Atacante.Mira == "o Olho"){

Letalidade += 5
Acerto -= 6

}

if(Atacante.Mira == "o Rosto"){

MiraParte = "a Cabeca"

DadoRes = rollDice1d4()

ResCrit = 4

Acerto -= 1

Defesa -= 3

}

if(Atacante.Mira == "o Braco"){

MiraParte = "o Membro Superior"

Tenacidade += 1

DadoRes = rollDice1d10()

ResCrit = 10

Defesa += 1

Acerto += 1

}

if(Atacante.Mira == "o Peito"){

MiraParte = "o Torso"

DadoRes = rollDice1d6()

Tenacidade -= 1

ResCrit = 6

Defesa -= 2

}

if(Atacante.Mira == "a Mao"){

MiraParte = "a Mao"

Tenacidade += 2

DadoRes = rollDice1d12()

ResCrit = 12

Defesa += 2

Acerto += 2

}

if(Atacante.Mira == "o Abdomem"){

MiraParte = "o Torso"

DadoRes = rollDice1d6()

ResCrit = 6

Tenacidade -= 2

Defesa -= 1

}

if(Atacante.Mira == "o Corpo"){

MiraParte = "o Torso"

DadoRes = rollDice1d8()

ResCrit = 8

Tenacidade -= 3

}

if(Atacante.Mira == "a Arma"){

let PegarNome = Defensor.ArmaCodigo

let ArmaNome = techs.get("Techs").find({Nome : Defensor.ArmaCodigo }).value()

let DanificarArma = FFAtk + DadoFA - ArmaNome.ArmaRes

if(DanificarArma < 0){

DanificarArma = 0

}

ArmaNome.ArmaRes -= DanificarArma

Dano = FFAtk

DadoRes = 0

Defesa = ArmaNome.ArmaRes

if(DanificarArma > 0){

msg.channel.send(`**${Defensor.Nomeread}** recebeu **${DanificarArma}** de Dano na sua **${Defensor.Arma}**.

${Defensor.Arma} de **${Defensor.Nomeread}**: **${ArmaNome.ArmaRes}** de Resistência.`)

}

db.write()
techs.write()

}
}

// Criticos Defensivos
if(Defensor.FA >= 0){

if(DadoRes >= ResCrit){

msg.channel.send(`**Acerto Crítico** na Defesa!`)

DadoRes += Math.ceil(ResCrit*0.5)

}

if(DadoES >= ESCrit){

msg.channel.send(`**Acerto Crítico** na Esquiva!`)

DadoES += Math.ceil(ESCrit*0.5)

}
}

// Effs Pré-Acerto
if(Defensor.FA >= 0){

if(tecAtk.Efeitos.includes("Estender")){

// setou 5 de energizar, tem o 6 de mpenergizar, faz 5*mpenergizar no custo final da tech (n precisa de um 3 mod)

AtaqueMP += tecAtk.Estender*tecAtk.MPEstender

Acerto += tecAtk.Estender*2

AtkPA -= tecAtk.Estender

}

}

// Teste de Acerto, Scoop Global
let TesteAcerto = Acerto + DadoAC - DadoES - Esquiva

// Transformar Teste de Acerto
if(Defensor.FA >= 0){

if(tecAtk.Efeitos.includes("Superioridade [Acerto, Fe x Fe]")){

let SuperioridadeAtk = rollDice(tecAtk.SuperioridadeQuant, tecAtk.SuperioridadeQuant*tecAtk.SuperioridadeNumb)
let SuperioridadeDef = rollDice1d20()

TesteAcerto = (SuperioridadeAtk + Atacante.FE + FEAtk) - (SuperioridadeDef + Defensor.FE + FEDef)

Acerto = Atacante.FE + tecAtk.BonusAcerto + Atacante.PerCon
Esquiva = Defensor.FE + Defensor.PerCon
DadoAC = SuperioridadeAtk
DadoES = SuperioridadeDef

}

if(tecAtk.Efeitos.includes("Fala Amaldicoada")){

let FalaAmaldAtk = rollDice(tecAtk.TesteQuant, tecAtk.TesteQuant*tecAtk.TesteNumb)
let FalaAmaldDef = Defensor.Prof

let BuffFalaAmald = 0

if(Atacante.Efeitos.includes("Perca da Habilidade de Andar")){

BuffFalaAmald += 5

}

FalaAmaldAtk -= tecAtk.BonusAcerto

Acerto = Atacante.FE + FEAtk + BuffFalaAmald + Math.ceil(Atacante.MP*0.05) + tecAtk.BonusAcerto + Atacante.PerCon
Esquiva = Defensor.FE + Math.ceil(Defensor.MP*0.10) + FEDef + Defensor.PerCon + Defensor.Prof
DadoAC = FalaAmaldAtk
DadoES = 0

TesteAcerto = Acerto + DadoAC - DadoES - Esquiva

if(TesteAcerto < 0){

let HPHold = Atacante.HP

Atacante.HP -= tecAtk.CustoHP

msg.channel.send(`**Fala Amaldiçoada** foi superada e **${Atacante.Nome}** tomou o dobro de dano.

**${Atacante.Nome}**: ${HPHold} > ${Atacante.HP}.`)

}

}

}

// Definir Teste de Acerto
if(Defensor.FA >= 0){
if(TipoReacao == "Bloqueio" && Letalidade == 0 && GuardaFurada == "N"){

TesteAcerto = 2

}

if(TipoReacao == "Bloqueio" && Letalidade > 0 && TesteAcerto < 2 && GuardaFurada == "N"){

TesteAcerto = 2

}

if(Defensor.Reacao == "Aparar" && Aparar > 0 && Letalidade == 0 && GuardaFurada == "N"){

TesteAcerto = 2

}

if(Defensor.Reacao == "Aparar" && Aparar > 0 && Letalidade > 0 && TesteAcerto < 2 && GuardaFurada == "N"){

TesteAcerto = 2

}

if(tecAtk.Efeitos.includes("Indesviavel") && TesteAcerto < tecAtk.Indesviavel){

TesteAcerto = tecAtk.Indesviavel

}

if(TesteAcerto > 0 && Atacante.Mira !== "a Arma"){

Contato = "S"

}

if(TesteAcerto == 0 || TesteAcerto == 1){

TabelaAcerto = "de Raspão"

TabelaOrdem = 1

Dano -= 1

MultiplAcerto = 0.5

}

if(TesteAcerto >= 2 && TesteAcerto <= 5){

TabelaAcerto = "Direto"

TabelaOrdem = 2

MultiplAcerto = 1

}

if(TesteAcerto >= 6 && TesteAcerto <= 14){

TabelaAcerto = "Pesado"

TabelaOrdem = 3

Dano += 1

MultiplAcerto = 1.5

}

if(TesteAcerto >= 15 && TesteAcerto <= 19){

TabelaAcerto = "Massivo"

TabelaOrdem = 4

Dano += 2

MultiplAcerto = 2

}

if(TesteAcerto >= 20){

TabelaAcerto = "Grave"

TabelaOrdem = 5

Dano += 3

MultiplAcerto = 3

}

if(Atacante.Mira == "a Arma"){

TabelaAcerto = "na Arma"

TabelaOrdem = 0

MultiplAcerto = 0

}

}

// Testes de Iniciativa
if(Defensor.FA >= 0){
if(Defensor.Reacao == "Contra Ataque"){

let PericiaCAAtk = Atacante.PerCorpo

let PericiaCADef = Defensor.PerCorpo

if(Atacante.AcaoEsp.includes("Compacto")){

let CompactoAtk = 1 + rollDice1d4()

PericiaCAAtk += CompactoAtk

}

TesteCA = (PericiaCADef + ContraDef + IniciativaDef) - (PericiaCAAtk + ContraAtk + IniciativaAtk)

let BonusAtkCA = TesteCA

if(TesteCA > 3){

BonusAtkCA = 3

}

if(TesteCA > 0){

TesteAcerto = -1

}

if(TesteCA < 0){

TesteCA = 0

}

Defensor.Iniciacao += TesteCA

Defensor.AtkOport = "S"

msg.channel.send(`Contra Ataque: ${PericiaCADef + IniciativaDef} + **${ContraDef}** x. **${ContraAtk}** + ${IniciativaAtk + PericiaCAAtk}.

Bônus Ganho: **${BonusAtkCA}**.`)

}

if(Defensor.Reacao == "Recuo"){

if(Atacante.AcaoEsp.includes("Compacto")){

let CompactoAtk = 1 + rollDice1d4()

TesteRecuo -= CompactoAtk

}

RecuoAtk = rollDice1d20()
RecuoDef = rollDice1d20()

if(tecDef.Efeitos.includes("Deslocacao")){

MovDef += (rollDice(tecDef.Deslocacao, tecDef.DeslocacaoDado) + (tecDef.DeslocacaoProf * Defensor.Prof) + tecDef.DeslocacaoFixo) * 0.5

}

TesteRecuo = (MovDef + IniciativaDef + RecuoDef) - (RecuoAtk + MovAtk + IniciativaAtk)

if(TesteRecuo <= 0){

TesteRecuo = 0

}

if(TesteRecuo > 0){

TesteAcerto = -1

// se move 0,5m pra kd 1 de diff de resultado. tem um cmd q faz o personagem se mover pra quantia exata q ele quer quando recua

if(Atacante.Distancia == "QR"){

Atacante.Distancia = "CD"

msg.reply(`**${Defensor.Nome}** recuou pra **Curta Distância**.`)

}

if(Atacante.Distancia == "CD"){

Atacante.Distancia = "LD"

msg.reply(`**${Defensor.Nome}** recuou pra **Longa Distância**.`)

}

}

msg.channel.send(`**Recuo**: ${MovDef} + ${IniciativaDef} + **${RecuoDef}** x. **${RecuoAtk}** + ${IniciativaAtk} + ${MovAtk}.`)

}
}

// Criticos Ofensivos
if(Defensor.FA >= 0){

if(DadoFE >= FECrit && TesteAcerto >= 0){

DadoFE += Math.ceil(FECrit*0.5)

msg.channel.send(`**Acerto Crítico** no Dano!`)

}

if(DadoAC >= ACCrit){

msg.channel.send(`**Acerto Crítico** no Acerto!`)

DadoAC += Math.ceil(ACCrit*0.5)

}

}

// Effs Pré-Dano
if(Defensor.FA >= 0){
if(tecAtk.Efeitos.includes("Fortalecer")){

// setou 5 de energizar, tem o 6 de mpenergizar, faz 5*mpenergizar no custo final da tech (n precisa de um 3 mod)

AtaqueMP += tecAtk.Fortalecer*tecAtk.MPFortalecer

let Fortalecer = rollDice(tecAtk.Fortalecer, tecAtk.Fortalecer*tecAtk.FortalecerDado)

Dano += Fortalecer

Dano += tecAtk.FortalecerRate*tecAtk.Fortalecer

msg.channel.send(`**${Atacante.Nome}** rolou dados pra **Fortalecer** e tirou: **${Fortalecer}**.`)

}

if(tecAtk.Efeitos.includes("Perigoso")){

Letalidade += tecAtk.PerigosoLT*TabelaOrdem

}

if(tecAtk.Cmd == "Brotoamald" && TabelaOrdem >= 2 && TesteAcerto >= 0){

Defensor.Efeitos += "Sucção do Broto - "

msg.channel.send(`**${Atacante.Nomeread}** acertou com o **Broto Amaldiçoado**.`)

}

if(AtaqueMP >= tecAtk.CustoTransform){

NomeAtual = tecAtk.NomeTransform

}

if(Defensor.Vtg.includes("Escamas Grossas (2)") && Atacante.Mira !== "o Rosto"){

Armadura += 8

db.write()

}

if(Atacante.Efeitos.includes("Estatura Grande")){

Dano += 2

IniciativaAtk -= 1

}

if(Defensor.Efeitos.includes("Estatura Grande")){

Defesa += 1

Esquiva -= 2

IniciativaDef -= 1

}

if(Atacante.Efeitos.includes("Estatura Gigante")){

Dano += 4

IniciativaAtk -= 2

}

if(Defensor.Efeitos.includes("Estatura Gigante")){

Defesa += 2

Esquiva -= 4

IniciativaDef -= 2

}

if(Defensor.Efeitos.includes("Exoesqueleto Completo")){

Armadura += 10

Defesa += 5

db.write()

}

if(Defensor.Nomeread == "Ouroboros" && TipoDano == "Cortante"){

Defesa -= rollDice1d8()

}

if(AtaqueMP >= tecAtk.CustoTransform){

NomeAtual = tecAtk.NomeTransform

}
}

// Teste de Dano, Scoop Global
let TesteDano = Dano + DadoFE - DadoRes - Defesa

// Tratamento de Dano Negativo
if(Defensor.FA >= 0){

if(TesteDano < 0){

TesteDano = 0

}

}

// Causar Dano, Scoop Global
let DanoCausado = TesteDano

// Effs Pós-Dano
if(Defensor.FA >= 0){

if(Atacante.Arma == "Asa Eletrica" && Contato == "S"){

if(TesteDano >= 1 && TesteDano <= 10 && !Defensor.Efeitos.includes("Paralisia [1]")){

Defensor.Efeitos = "Paralisia [1] - "

}

if(TesteDano >= 11 && TesteDano <= 20 && !Defensor.Efeitos.includes("Paralisia [2]")){

Defensor.Efeitos = "Paralisia [2] - "

}

if(TesteDano > 21  && !Defensor.Efeitos.includes("Paralisia [3]")){

Defensor.Efeitos = "Paralisia [3] - "

}

if(TesteDano >= 1 && TesteDano <= 10 && Defensor.Efeitos.includes("Paralisia [1]")){

Defensor.PA -= 1

}

if(TesteDano >= 11 && TesteDano <= 20 && Defensor.Efeitos.includes("Paralisia [2]")){

Defensor.PA -= 2

}

if(TesteDano > 21  && Defensor.Efeitos.includes("Paralisia [3]")){

Defensor.PA -= 3

}

}

techs.write()
db.write()

}

// Teste de Dano e Armadura
if(Defensor.FA >= 0){
if(Armadura < 0){

Armadura = 0

}

Armadura -= Pen

DanoLetalidade = Math.floor(MultiplAcerto*Letalidade)

TesteDano = Math.ceil(TesteDano*MultiplAcerto)

if(Armadura == 1){

Math.floor(DanoLetalidade *= 0.90)

}

if(Armadura == 2){

Math.floor(DanoLetalidade *= 0.80)

}

if(Armadura == 3){

Math.floor(DanoLetalidade *= 0.70)

}

if(Armadura == 4){

Math.floor(DanoLetalidade *= 0.60)

}

if(Armadura == 5){

Math.floor(DanoLetalidade *= 0.50)

}

if(Armadura == 6){

Math.floor(DanoLetalidade *= 0.40)

}

if(Armadura == 7){

Math.floor(DanoLetalidade *= 0.30)

}

if(Armadura == 8){

Math.floor(DanoLetalidade *= 0.20)

}

if(Armadura == 9){

Math.floor(DanoLetalidade *= 0.10)

}

if(Armadura >= 10){

DanoLetalidade = 0

}

}

// One Time Uses
if(Defensor.FA >= 0){
if(Atacante.AtkOport == "S"){

msg.channel.send(`**Ataque de Oportunidade! **`)
Atacante.AtkOport = "N"

AtkPA -= AtkPA

}

if(Atacante.CA == "S" && TesteCA == 0){

Atacante.CA = "N"

}
}

// Gastos
if(Defensor.FA >= 0){

if(tecAtk.Tipo.includes("Ofensivo")){

let MPReducaoAtk = AtaqueMP

let Reducao = 1 - (Atacante.Prof*0.05 + Atacante.PerCon*0.05)

if(Reducao <= 0.30){

Reducao = 0.30

}

MPReducaoAtk *= Reducao
MPReducaoAtk = Math.ceil(MPReducaoAtk)

Atacante.MP -= MPReducaoAtk

}

Atacante.SP -= AtaqueSP

Defensor.SP -= DefesaSP

Atacante.PA -= AtkPA

if(tecDef.Tipo.includes("Defensivo")){

DefesaMP += tecDef.Custo

let MPReducao = DefesaMP

let Reducao = 1 - (Defensor.Prof*0.05) - (Defensor.PerCon*0.05)

if(Reducao <= 0.30){

Reducao = 0.30

}

MPReducao *= Reducao
MPReducao = Math.ceil(MPReducao)

Defensor.MP -= MPReducao

Defensor.PA -= DefPA

}

if(tecAtk.Efeitos.includes("Custo Vital")){

Atacante.HP -= tecAtk.CustoHP

}

}

// Ferimentos
if(Defensor.FA >= 0){

let TesteImpacto = TesteDano
let TesteSangramento = TesteDano
let TesteAtordoamento = TesteDano

if(Defensor.Nomeread == "Mahito"){

TesteSangramento = 0

}

if(tecAtk.Efeitos.includes("Impactante")){

let ImpactanteDado = rollDice(tecAtk.Impactante, tecAtk.Impactante*tecAtk.ImpactanteDado)

let ImpactoRate = tecAtk.Impactante*tecAtk.ImpactanteRate

TesteImpacto += ImpactanteDado + ImpactoRate

AtaqueMP += tecAtk.Impactante*tecAtk.MPImpactante

msg.channel.send(`**${Atacante.Nome}** rolou dados pra **Impactante** e tirou: **${ImpactanteDado}**.`)

}

if(TipoDano == "Concussao" && TesteImpacto >= 5 + Tenacidade && TesteImpacto <= 15 + (Tenacidade*2) && tecAtk.Efeitos.includes("Impactante") && tecAtk.Impacto == "S"){

let DadoImpacto = rollDice1d4()

let ImpactoRate = 0

if(tecAtk.Tipo.includes("Fisico")){

ImpactoRate = Math.floor(Atacante.FA*0.5)

}

if(tecAtk.Tipo.includes("Magico")){

ImpactoRate = Math.floor(Atacante.FE*0.5)

}

let TesteImpacto = DadoImpacto + ImpactoRate

if(tecAtk.Efeitos.includes("Magnetismo")){

let Magnetismo = tecAtk.Magnetismo

if(tecAtk.Magnetismo > 0){

Magnetismo = tecAtk.Magnetismo

}

if(Magnetismo == Defensor.NS){

TesteImpacto = 0

// Defensor.Efeitos += "Pés Presos"

}

if(Magnetismo <= Defensor.NS){

Defensor.NS -= TesteImpacto

if(Defensor.NS < Magnetismo){

Defensor.NS = Magnetismo

}

}

if(Magnetismo >= Defensor.NS){

Defensor.NS += TesteImpacto

if(Defensoro.NS > Magnetismo){

Defensor.NS = Magnetismo

}

}

}

if(!tecAtk.Efeitos.includes("Magnetismo")){

if(Atacante.NS <= Defensor.NS){

Defensor.NS += TesteImpacto

}

if(Atacante.NS > Defensor.NS){

Defensor.NS -= TesteImpacto

}

}

msg.channel.send(`**${Defensor.Nome}** foi ferido com: **Impacto Leve**.

**${Defensor.Nome}** foi Impactado até **${Defensor.NS}**.`)

}

if(TipoDano == "Concussao" && TesteImpacto >= 15 + (Tenacidade*2) && tecAtk.Efeitos.includes("Impactante") && tecAtk.Impacto == "S"){

let DadoImpacto = rollDice2d4()

let ImpactoRate = 0

if(tecAtk.Tipo.includes("Fisico")){

ImpactoRate = Atacante.FA

}

if(tecAtk.Tipo.includes("Magico")){

ImpactoRate = Atacante.FE

}

let TesteImpacto = DadoImpacto + ImpactoRate

if(tecAtk.Efeitos.includes("Magnetismo")){

let Magnetismo = tecAtk.Magnetismo

if(tecAtk.Magnetismo > 0){

Magnetismo = tecAtk.Magnetismo

}

if(Magnetismo == Defensor.NS){

TesteImpacto = 0

// Defensor.Efeitos += "Pés Presos"

}

if(Magnetismo <= Defensor.NS){

Defensor.NS -= TesteImpacto

if(Defensor.NS < Magnetismo){

Defensor.NS = Magnetismo

}

}

if(Magnetismo >= Defensor.NS){

Defensor.NS += TesteImpacto

if(Defensoro.NS > Magnetismo){

Defensor.NS = Magnetismo

}

}

}

if(!tecAtk.Efeitos.includes("Magnetismo")){

if(Atacante.NS <= Defensor.NS){

Defensor.NS += TesteImpacto

}

if(Atacante.NS > Defensor.NS){

Defensor.NS -= TesteImpacto

}

}

msg.channel.send(`**${Defensor.Nome}** foi ferido com: **Impacto Forte**.

**${Defensor.Nome}** foi Impactado até **${Defensor.NS}**.`)

}

if((TipoDano == "Cortante" || TipoDano == "Perfurante") && TesteSangramento >= 10 && TesteSangramento <= 24){

let SangramentoNumero = rollDice1d4()

let SangramentoEff = `Sangramento [${SangramentoNumero}]. `

let SliceSangramento = SangramentoEff.slice(13, 15)

if(!Defensor.Efeitos.includes("Sangramento")){

Defensor.Efeitos += SangramentoEff

} else {

let CortarSangr = Defensor.Efeitos.substring(Defensor.Efeitos.indexOf("Sangramento"), 18)

SliceSangramento = CortarSangr.slice(13, 15)

if(SliceSangramento.includes("]")){

SliceSangramento = CortarSangr.slice(13, 14)

}

let SangramentoAtualizado = SangramentoNumero + parseInt(SliceSangramento)

let SangrReplace = Defensor.Efeitos.replace(`Sangramento [${SliceSangramento}]. `, `Sangramento [${SangramentoAtualizado}]. `)

Defensor.Efeitos = SangrReplace

}

}

if((TipoDano == "Cortante" || TipoDano == "Perfurante") && TesteSangramento >= 25 && TesteSangramento <= 49){

let SangramentoNumero = rollDice1d4()

let SangramentoEff = `Sangramento [${SangramentoNumero}]. `

let SliceSangramento = SangramentoEff.slice(13, 15)

if(!Defensor.Efeitos.includes("Sangramento")){

Defensor.Efeitos += SangramentoEff

} else {

let CortarSangr = Defensor.Efeitos.substring(Defensor.Efeitos.indexOf("Sangramento"), 18)

SliceSangramento = CortarSangr.slice(13, 15)

if(SliceSangramento.includes("]")){

SliceSangramento = CortarSangr.slice(13, 14)

}

let SangramentoAtualizado = SangramentoNumero + parseInt(SliceSangramento)

let SangrReplace = Defensor.Efeitos.replace(`Sangramento [${SliceSangramento}]. `, `Sangramento [${SangramentoAtualizado}]. `)

Defensor.Efeitos = SangrReplace

}

}

if((TipoDano == "Cortante" || TipoDano == "Perfurante") && TesteSangramento >= 50){

let SangramentoNumero = rollDice3d4()

let SangramentoEff = `Sangramento [${SangramentoNumero}]. `

let SliceSangramento = SangramentoEff.slice(13, 15)

if(!Defensor.Efeitos.includes("Sangramento")){

Defensor.Efeitos += SangramentoEff

} else {

let CortarSangr = Defensor.Efeitos.substring(Defensor.Efeitos.indexOf("Sangramento"), 18)

SliceSangramento = CortarSangr.slice(13, 15)

if(SliceSangramento.includes("]")){

SliceSangramento = CortarSangr.slice(13, 14)

}

let SangramentoAtualizado = SangramentoNumero + parseInt(SliceSangramento)

let SangrReplace = Defensor.Efeitos.replace(`Sangramento [${SliceSangramento}]. `, `Sangramento [${SangramentoAtualizado}]. `)

Defensor.Efeitos = SangrReplace

}

}

if(TipoDano == "Concussao" && TesteAtordoamento >= 5 + Tenacidade && TesteAtordoamento <= 19 + Tenacidade){

Defensor.PA -= rollDice1d2()

msg.channel.send(`**${Defensor.Nome}** tomou **Atordoamento Leve**.

Pontos de Ação de **${Defensor.Nome}**: ${Defensor.PA}.`)

}

if(TipoDano == "Concussao" && TesteAtordoamento >= 20 + Tenacidade){

Defensor.PA -= rollDice2d2()

msg.channel.send(`**${Defensor.Nome}** tomou **Atordoamento Grave**.

Pontos de Ação de **${Defensor.Nome}**: ${Defensor.PA}.`)

}

if(tecAtk.Efeitos.includes("Palavra: Não se Mova")){

if(TesteDano <= 0){

msg.channel.send(`**Palavra: Não se Mova** não surtiu efeito.`)

}

if(TesteDano >= 1 && TesteDano <= 9){

Defensor.Efeitos += "Breve Pausa [1]. "

msg.channel.send(`**Palavra: Não se Mova** causou **Breve Pausa [1]**.`)

}

if(TesteDano >= 10 && TesteDano <= 19){

Defensor.Efeitos += "Parado [1]. "

msg.channel.send(`**Palavra: Não se Mova** causou **Parado**.`)

}

if(TesteDano >= 20 && TesteDano <= 49){

Defensor.Efeitos += "Imovel [1]. "

msg.channel.send(`**Palavra: Não se Mova** causou **Imovel [1]**.`)

}

if(TesteDano >= 20 && TesteDano <= 49){

Defensor.Efeitos += "Imovel [2]. "

msg.channel.send(`**Palavra: Não se Mova** causou **Imovel [2]**.`)

}

}

}

// Late Reads
if(Defensor.FA >= 0){

let Alcance = tecAtk.Alcance

if(tecAtk.Efeitos.includes("Dois Lados") && tecDef.Cmd == "Mugen"){

TesteDano *= 0.5
TesteDano = Math.floor(TesteDano)

}

if(tecAtk.Efeitos.includes("Todos os Lados") && tecDef.Cmd == "Mugen"){

TesteDano *= 0.75
TesteDano = Math.floor(TesteDano)

}

if(tecAtk.Efeitos.includes("Inofensivo")){

TesteDano = 0

}

if(Defensor.Nomeread == "Mahito" && Atacante.Nomeread !== "Kenzo" && Atacante.Arma !== "Desarmado"){

TesteDano = 0

}

}

// Fotos e Gifs
if(Defensor.FA >= 0){

if(tecAtk.Cmd == "Bluelapse" && tecAtk.Fortalecer >= 4){

msg.channel.send({
files: [
'./pics/blue2.gif'
]
})
}

if(tecAtk.Cmd == "Canhaorika" && tecAtk.Fortalecer >= 10){

msg.channel.send({
files: [
'./pics/yutafinal.png'
]
})
}

}

if(TesteAcerto > 0 && tecAtk.Tipo.includes("Utilidade")){

msg.channel.send(`**${Atacante.Nome}** usou **${NomeAtual}** em **${Defensor.Nome}**.`)

}

// Acertou
if(TesteAcerto >= 0 && tecAtk.Tipo.includes("Ofensivo")){

Defensor.HP -= TesteDano

Defensor.HP -= DanoLetalidade

let DanoTotal = TesteDano + DanoLetalidade

msg.channel.send(`${Atacante.Nomeread} acertou **${Atacante.Mira}** de ${Defensor.Nomeread} com **${NomeAtual}**. ${Defensor.Sobrenome} ${Defensor.Nomeread} reagiu com **${Defensor.Reacao}** e foi atingido por um **Acerto ${TabelaAcerto}**.

**${Atacante.Sobrenome} ${Atacante.Nomeread}** causou **${DanoTotal}** de Dano. **${Defensor.Sobrenome} ${Defensor.Nomeread}** ficou com **${Defensor.HP}** de HP.

Acerto: ${Acerto} + **${DadoAC}** x. **${DadoES}** + ${Esquiva}.

Ataque: ${Dano} + **${DadoFE}** x. **${DadoRes}** + ${Defesa}.

> ${Atacante.Nomeread}, Pts. de Ação: **${Atacante.PA}**. Hp: **${Atacante.HP}**. Mp: **${Atacante.MP}**. Sp: **${Atacante.SP}**.

> ${Defensor.Nomeread}, Pts. de Ação: **${Defensor.PA}**. Hp: **${Defensor.HP}**. Mp: **${Defensor.MP}**. Sp: **${Defensor.SP}**.

> Iniciativa de ${Atacante.Nomeread}: **${IniciativaAtk}**. Iniciativa de ${Defensor.Nomeread}: **${IniciativaDef}**. Vantagem: **${VantIn}**.

> Dano Pré-Vantagem: **${DanoCausado}**. Dano Letal: **${DanoLetalidade}**.

> Vtg. de Acerto: **${TesteAcerto}**. Multiplicador de Acerto: **${MultiplAcerto}**. Iniciação: **${Atacante.Iniciacao}**.`)
} // Errou

if(TesteAcerto < 0 && tecAtk.Tipo.includes("Ofensivo")){

let Frase = ""

FACrit = -1

if(Defensor.Reacao == "Esquiva"){
Frase = `**${Defensor.Nome}** esquivou com sucesso.`
}

if(Defensor.Reacao == "Bloqueio" && TesteAcerto < 0){
Frase = `**${Defensor.Nome}** falhou em bloquear, mas evitou o ataque com sucesso.`
}

if(Defensor.Reacao == "Esquiva" && TesteCA < 0){
Frase = `**${Defensor.Nome}** esquivou com sucesso.`
}

if(Defensor.Reacao == "Contra Ataque" && TesteCA <= 0){
Frase = `**${Defensor.Nome}** falhou em contra-atacar, mas esquivou com sucesso.`
}

if(Defensor.Reacao == "Contra Ataque" && TesteCA > 0){
Frase = `**${Defensor.Nome}** contra atacou com sucesso.`
}

if(Defensor.Reacao == "Recuo"){
Frase = `**${Defensor.Nome}** recuou com sucesso.`
}

if(Defensor.Reacao == "Aparar"){
Frase = `**${Defensor.Nome}** aparou com sucesso.`
}

if(tecDef.Cmd == "Mugen"){

Frase = `**${Defensor.Nome}** parou o ataque no **Ilimitado**.`

let SortPic = rollDice1d2()

if(SortPic == 1){
msg.channel.send({
files: [
'./pics/limitless4.png'
]
})}

if(SortPic == 2){
msg.channel.send({
files: [
'./pics/limitless7.png'
]
})}

}

msg.channel.send(`
${Frase}

Esquiva: ${Esquiva} + **${DadoES}** x. **${DadoAC}** + ${Acerto}.

Vtg. Iniciativa: ${IniciativaAtk} x. ${IniciativaDef}**. +${VantIn}** de ${VitoriosoIn}.`)

}

// Reset de Miras

Atacante.Mira = Mirahold

if(IniciacaoStart > 0){

Atacante.Iniciacao = 0

Defensor.Iniciacao = 0

}

// Pós-Resets
if(Defensor.FA >= 0){
if(Defensor.Efeitos.includes("Campo de Flores")){

let CampoAS = rollDice1d10() + Atacante.AS

let CampoCar = rollDice1d10() + Defensor.Car

let TesteCampo = CampoCar - CampoAS

if(TesteCampo < 0){

TesteCampo = 0

}

Defensor.PA -= TesteCampo

Defensor.Iniciacao -= TesteCampo

msg.channel.send(`**${Atacante.Nome}** encarou o **Campo de Flores** e perdeu; **${TesteCampo}** de Iniciação e Pontos de Ação.`)

}
}

let Kenzo = db.get("usuarios").find({Nomeread : "Kenzo"}).value()
let Ryoshi = db.get("usuarios").find({Nomeread : "Ryoshi"}).value()
let Kazuki = db.get("usuarios").find({Nomeread : "Kazuki"}).value()
let Midori = db.get("usuarios").find({Nomeread : "Midori"}).value()
let Ryuji = db.get("usuarios").find({Nomeread : "Ryuji"}).value()
let Ryushiro = db.get("usuarios").find({Nomeread : "Ryushiro"}).value()

// Fim de Turno Forçado
if(Defensor.FA >= 0){

if(Atacante.PA <= 0 && AtkPA > 0){

let id_member = msg.member.id
let char = personagem_logado(id_member)

char.AtkMult = 0
db.write()

techs.write()

let MPAtiv = ``
let SPAtiv = ``
let HPAtiv = ``
let PAAtiv = ``

let RegenRead = ``

let HPRegen = 0

let MPRegen = 0

let SPRegen = 0

let MPReducao = char.MP_Ativacao
let SPReducao = char.SP_Ativacao
let HPReducao = char.HP_Ativacao
let PAReducao = char.PA_Ativacao

if(char.Efeitos.includes("Revestimento Comum")){

MPReducao += 1 + Math.floor(char.MP*0.02)

}

if(char.Efeitos.includes("Revestimento Avançado")){

MPReducao += 2 + Math.floor(char.MP*0.03)

}

if(char.Efeitos.includes("Revestimento Excessivo")){

MPReducao += 5 + Math.floor(char.MP*0.05)

}

let Reducao = 1 - (char.Prof*0.05 + char.PerCon*0.05)

if(Reducao <= 0.30){

Reducao = 0.30

}

MPReducao *= Reducao
MPReducao = Math.ceil(MPReducao)

if(char.Efeitos.includes("Sangramento")){

let CortarSangr = char.Efeitos.substring(char.Efeitos.indexOf("Sangramento"), 18)

let SliceSangramento = CortarSangr.slice(13, 15)

if(SliceSangramento.includes("]")){

SliceSangramento = CortarSangr.slice(13, 14)

}

parseInt(SliceSangramento)

console.log(SliceSangramento)

HPRegen -= SliceSangramento

}

if(char.Efeitos.includes("Cura Constante da Reversão")){

char.TRG += char.Prof*0.25

HPRegen += rollDice(1*char.FE, 4*char.FE)

}

if(char.Efeitos.includes("Sangue se tornando Energia")){

char.TRM += char.Prof*0.25

MPRegen += rollDice(1*char.FE, 4*char.FE)

}

if(char.Efeitos.includes("Circular Sangue")){

char.TRG += char.Prof*0.25

char.TRC += char.Prof*0.25

SPRegen += rollDice(1*char.FE, 2*char.FE)

HPRegen += rollDice(1*char.FE, 4*char.FE)

}

if(char.Efeitos.includes("Loan Shark")){

MPReducao *= 3

}

if(char.Efeitos.includes("Sucção do Broto")){

MPReducao += 2
SPReducao += 1

}

let FraseReducaoHP = "gastou"

if(HPReducao <= 0){

FraseReducaoHP = "ganhou"

}

char.HP -= HPReducao
char.SP -= SPReducao
char.MP -= MPReducao
char.PA -= PAReducao

char.TRG += 1.5
char.TRC += 1.5
char.TRM += 1.5

if(char.HP < char.Max_HP*0.50 && char.Vtg.includes("Persistente (1)")){

HPRegen += 1

}

if(PAReducao > 0){

PAAtiv = `
**${char.Nomeread}** gastou **${PAReducao}** de PA com Ativações.
`

}

if(PAReducao < 0){

PAAtiv = `
**${char.Nomeread}** recuperou **${Math.abs(PAReducao)}** de PA com Ativações.
`

}

if(HPReducao > 0){

HPAtiv = `
**${char.Nomeread}** ${FraseReducaoHP} **${Math.abs(HPReducao)}** de HP com Ativações.
`

}

if(MPReducao > 0){

MPAtiv = `
**${char.Nomeread}** gastou **${MPReducao}** de MP com Ativações.
`

}

if(SPReducao > 0){

SPAtiv = `
**${char.Nomeread}** gastou **${SPReducao}** de SP com Ativações.
`

}

let RecuperarPA = 4

if(char.Efeitos.includes("Restricao Celestial")){

// RecuperarPA += 2

}

if(char.Nomeread == "Kenzo" && char.TRM >= 5){

let Rika = db.get("usuarios").find({Nomeread : "Rika"}).value()

if(Rika.MP > 0){

Rika.MP -= 80
Kenzo.HP += 20
Kenzo.MP += 80

msg.channel.send(msg.channel.send(`**Rika** entregou 80 de MP e 20 de HP pra **Kenzo**.

MP da Rika: **${Rika.MP}**.`))

}

if(Rika.MP <= 0){

msg.channel.send(`**Rika** ficou sem energia extra e se juntou á energia de Kenzo. Rika está inativa na luta.`)

}

}

if(char.TRG >= 5){

char.TRG -= 5

HPRegen += rollDice1d6() + char.RG

char.HP += HPRegen

RegenRead = `
**${char.Nome}** recuperou **${HPRegen}** de Vida, **${MPRegen}** de Mana e **${SPRegen}** de Stamina.
`

if(char.HP > char.Max_HP){

char.HP = char.Max_HP

}

if(char.Nomeread == "Midori"){

//let GGRoucaMidori = techs.get("Techs").find({Nome : "Garganta Rouca da Midori" }).value()

//GGRoucaMidori.Garganta -= 5

//if(GGRoucaMidori.Garganta < 0){

// GGRoucaMidori.Garganta = 0

// }

}

if(char.Nomeread == "Kuroi"){

let GGRoucaKuroi = techs.get("Techs").find({Nome : "Garganta Rouca da Kuroi" }).value()

GGRoucaKuroi.Garganta -= 5

if(GGRoucaKuroi.Garganta < 0){

GGRoucaKuroi.Garganta = 0

}

}

}

if(char.TRC >= 5){

char.TRC -= 5

SPRegen += rollDice1d4() + Math.floor(char.RC*0.5)

char.SP += SPRegen

RegenRead = `
**${char.Nome}** recuperou **${HPRegen}** de Vida, **${MPRegen}** de Mana e **${SPRegen}** de Stamina.
`

if(char.SP > char.Max_SP){

char.SP = char.Max_SP

}

}

if(char.TRM >= 5){

char.TRM -= 5

MPRegen += rollDice1d6()

char.MP += MPRegen

RegenRead = `
**${char.Nome}** recuperou **${HPRegen}** de Vida, **${MPRegen}** de Mana e **${SPRegen}** de Stamina.
`

if(char.MP > char.Max_MP){

char.MP = char.Max_MP

}

}

let ParalisiaPorVez = "N"

if(char.Efeitos.includes("Paralisia [3]" && ParalisiaPorVez == "N")){

const ParalisiaReplace = char.Efeitos.replace("Paralisia [3] - ", "Paralisia [2] - ")
char.Efeitos = ParalisiaReplace

ParalisiaPorVez = "S"

char.PA -= 1

db.write()

}

if(char.Efeitos.includes("Paralisia [2]" && ParalisiaPorVez == "N")){

const ParalisiaReplace = char.Efeitos.replace("Paralisia [2] - ", "Paralisia [1] - ")
char.Efeitos = ParalisiaReplace

ParalisiaPorVez = "S"

char.PA -= 1

db.write()

}

if(char.Efeitos.includes("Paralisia [1]") && ParalisiaPorVez == "N"){

const ParalisiaReplace = char.Efeitos.replace("Paralisia [1] - ", "")
char.Efeitos = ParalisiaReplace

ParalisiaPorVez = "S"

char.PA -= 1

db.write()

}

if(RecuperarPA <= 0){

RecuperarPA = 1

}

char.PA += RecuperarPA

if(char.PA > char.MaxPA){

char.PA = char.MaxPA

db.write()

}

if(char.PA < char.MinPA) {

char.PA = char.MinPA

db.write()

}

msg.channel.send(`**${char.Nome}** teve seu turno encerrado por falta de Pontos de Ação.

**${char.Nome}** tem **${char.PA}** Pontos de Ação restando.
${HPAtiv}${SPAtiv}${MPAtiv}${RegenRead}`)


db.write()
techs.write()

}

}

//

// Classes
if(Defensor.FA >= 0){
if(Defensor.HP <= 0 && Defensor.Efeitos.includes("Evitar Desmaio")){

Defensor.HP = 1

let DanopraDesmaio = TesteDano - Defensor.Prof

if(DanopraDesmaio < 0){

DanopraDesmaio = 0

}

if(tecAtk.RedirecionarDano = "MP"){

Defensor.MP -= DanopraDesmaio

if(Defensor.MP == 0){

Defensor.HP = 0

}

}

msg.channel.send(`O **Bombeamento de Sangue** manteve **${Defensor.Nomeread}** acordado. O dano causado reduziu sua Mp em **${DanopraDesmaio}**.`)

}

if(Defensor.HP <= 0 && !Defensor.Efeitos.includes("Desmaio")){

Defensor.Efeitos += "Desmaio"

Defensor.PA = 0

if(Defensor.HP <= 0 && Defensor.Classe == "o Shikigami"){

msg.channel.send(`**${Defensor.Nomeread}** desmaiou.`)

}

if(Defensor.HP <= 0 && Defensor.Classe == "a Feiticeira"){

msg.channel.send(`**${Defensor.Nomeread}** desmaiou.`)

}

if(Defensor.HP <= 0 && Defensor.Classe == "o Feiticeiro"){

msg.channel.send(`**${Defensor.Nomeread}** desmaiou.`)

}

if(Defensor.HP <= 0 && Defensor.Classe == "a Maldição"){

msg.channel.send(`**${Defensor.Nomeread}** foi exorcizado.`)

}

if(Defensor.XP_Drop > 0){

Kenzo.XP += Defensor.XP_Drop
Ryoshi.XP += Defensor.XP_Drop
Kazuki.XP += Defensor.XP_Drop
Midori.XP += Defensor.XP_Drop
Ryuji.XP += Defensor.XP_Drop

msg.channel.send(`Todos os feiticeiros ganharam **${Defensor.XP_Drop}** de XP.`)

}

}
}

// Ups
if(Ryuji.Nivel > 1){

Randomgif = 0

if(Kenzo.Nivel < 12 && Ryuji.XP > 2500){

Randomgif = rollDice1d10()

Kenzo.Nivel = 12
Ryoshi.Nivel = 12
Kazuki.Nivel = 12
Midori.Nivel = 12
Ryuji.Nivel = 12

msg.channel.send(`> **Level Up!** Todos uparam pro nível **${Ryuji.Nivel}**!`)

}

if(Kenzo.Nivel < 13 && Ryuji.XP > 4000){

Randomgif = rollDice1d10()

Kenzo.Nivel = 13
Ryoshi.Nivel = 13
Kazuki.Nivel = 13
Midori.Nivel = 15
Ryuji.Nivel = 13

msg.channel.send(`> Level Up! **${Ryuji.Nivel}**`)

}

if(Kenzo.Nivel < 14 && Ryuji.XP > 6000){

Randomgif = rollDice1d10()

Kenzo.Nivel = 14
Ryoshi.Nivel = 14
Kazuki.Nivel = 14
Midori.Nivel = 14
Ryuji.Nivel = 14

msg.channel.send(`> Level Up! **${Ryuji.Nivel}**`)

}

if(Kenzo.Nivel < 15 && Ryuji.XP > 10000){

Randomgif = rollDice1d10()

Kenzo.Nivel = 15
Ryoshi.Nivel = 15
Kazuki.Nivel = 15
Midori.Nivel = 15
Ryuji.Nivel = 15

msg.channel.send(`> Level Up! **${Ryuji.Nivel}**`)

}

if(Kenzo.Nivel < 16 && Ryuji.XP > 12000){

Randomgif = rollDice1d10()

Kenzo.Nivel = 16
Ryoshi.Nivel = 16
Kazuki.Nivel = 16
Midori.Nivel = 16
Ryuji.Nivel = 16

msg.channel.send(`> Level Up! **${Ryuji.Nivel}**`)

}

if(Randomgif == 1){msg.channel.send({
files: [
'./pics/gif15.gif'
]
})}

if(Randomgif == 2){msg.channel.send({
files: [
'./pics/gif7.gif'
]
})}

if(Randomgif == 3){msg.channel.send({
files: [
'./pics/gif35.gif'
]
})}

if(Randomgif == 4){msg.channel.send({
files: [
'./pics/tojirabbit.gif'
]
})}

if(Randomgif == 5){msg.channel.send({
files: [
'./pics/Gif41.gif'
]
})}

if(Randomgif == 6){msg.channel.send({
files: [
'./pics/Gif43.gif'
]
})}

if(Randomgif == 7){msg.channel.send({
files: [
'./pics/Random9.png'
]
})}

if(Randomgif == 8){msg.channel.send({
files: [
'./pics/Random46.gif'
]
})}

if(Randomgif == 9){msg.channel.send({
files: [
'./pics/Random47.gif'
]
})}

if(Randomgif == 10){msg.channel.send({
files: [
'./pics/Random49.gif'
]
})}

}

db.write()

}
if(inicio_comando == "TO"){

let nome_personagem = msg.content.split(" ")[1]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let personagem2 = msg.content.split(" ")[2]
let personagem2st = personagem2.charAt(0).toUpperCase() + personagem2.toLowerCase().slice(1)
personagem2 = personagem2st

let id_member = msg.member.id
let Defensor = db.get("usuarios").find({Nome : personagem2}).value()
let Atacante = db.get("usuarios").find({Nome : nome_personagem}).value()
let tecAtk = techs.get("Techs").find({Cmd : Atacante.Tech}).value()
let tecDef = techs.get("Techs").find({Cmd : Defensor.Tech}).value()
let Dano = 0
let Defesa = Defensor.Res
let Acerto = Atacante.AC
let AcertoDefensor = Defensor.AC
let Esquiva = Defensor.ES + Defensor.IN
let IniciativaAtk = Atacante.IN + Atacante.Iniciacao
let IniciativaTec = 0
let IniciativaDef = Defensor.IN + Defensor.Iniciacao
let Letalidade = tecAtk.LT
let Armadura = Defensor.AR
let Penetracao = Atacante.PNT
let Furtividade = Atacante.Fur
let Percepcao = Defensor.Per
let Tenacidade = Defensor.Ten

let Contato = "N"

let ContraAtk = rollDice1d20()
let ContraDef = rollDice1d20()
let dadoAparar = rollDice1d20()
let contraAparar = rollDice1d20()

let ApararBuff = 0
let DanopreRes = 0

let FACrit = -1
let ResCrit = -1
let ACCrit = 20
let ESCrit = 20

let VelFE = Math.floor(Atacante.FE * tecAtk.VelFe)
let VelProf = Math.floor(Atacante.Prof * tecAtk.VelProf)
let VelPura = tecAtk.Vel
let VelAS = tecAtk.VelAs
let Vel = VelFE + VelProf + VelPura + VelAS
let IniciativaFisica = 0

IniciativaTec += Vel

let VantInAtk = IniciativaTec
let VantInDef = IniciativaDef
let VantIn = 0
let VitoriosoIn = ""

let FFAtk = 0
let FFDef = 0

let FEAtk = 0
let FEDef = 0

let MovAtk = 0
let MovDef = 0

let Aparar = 0
let ApararDef = 0

let MultiplAcerto = 0
let TesteCA = 0
let TesteRecuo = 0
let EsquivaIncomum = 0
let TabelaAcerto = ""
let DanoLetalidade = 0
let Pen = Penetracao
let ReducAR = 0
let AtkArmado = "N"
let DefArmado = "N"

let NomeAtual = tecAtk.Nome

let Furarguarda = 0
let Guarda = 0

// Reads
let GuardaFurada = "N"
let TabelaOrdem = 0

let Distancia = Math.abs(Atacante.NS - Defensor.NS)
let DistanciaNome = ""
let IniciacaoStart = Atacante.Iniciacao

// Holds
let Mirahold = Atacante.Mira
let TipoReacao = ""

// Dados
let DadoFE = rollDice(tecAtk.DanoQuant, tecAtk.DanoQuant*tecAtk.DanoNumb)
let DadoFA = 0
let DadoRes = 0
let DadoAC = rollDice1d20()
let DadoES = rollDice1d20()

let FECrit = tecAtk.DanoNumb * tecAtk.DanoQuant
let MiraParte = ""

// Mods dos Custos
let AtaqueMP = 0 + tecAtk.Custo
let AtaqueSP = 0
let DefesaMP = 0 + tecDef.Custo
let DefesaSP = 0
let DefPA = 0 + tecDef.PA
let AtkPA = 0 + tecAtk.PA

// Vantagens
if(Defensor.FA >= 0){

if(Atacante.Vtg.includes("Agil (1)")){

MovAtk += 1

}

if(Defensor.Vtg.includes("Agil (1)")){

MovDef += 1

}

if(Atacante.Vtg.includes("Agil (2)")){

MovAtk += 2

}

if(Defensor.Vtg.includes("Agil (2)")){

MovDef += 2

}

if(Defensor.HP < Defensor.Max_HP*0.50 && Defensor.Vtg.includes("Persistente (1)")){

Defesa += 2

}

if(Defensor.HP < Defensor.Max_HP*0.25 && Defensor.Vtg.includes("Persistente (2)")){

Defesa += 3

}

if(Defensor.Vtg.includes("Força Imensa (1)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

FFDef += 1

}

if(Defensor.Vtg.includes("Força Imensa (2)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

FFDef += 2

}

if(Defensor.Vtg.includes("Força Imensa (3)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

FFDef += 3

}

if(tecAtk.Tipo.includes("Fisico") && Atacante.Vtg.includes("Velocidade Imensa (1)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

IniciativaFisica += 1

}

if(tecAtk.Tipo.includes("Fisico") && Atacante.Vtg.includes("Velocidade Imensa (2)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

IniciativaFisica += 2

}

if(tecAtk.Tipo.includes("Fisico") && Atacante.Vtg.includes("Velocidade Imensa (3)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

IniciativaFisica += 3

}

if(tecAtk.Tipo.includes("Magico") && Atacante.Vtg.includes("Poder Excessivo (1)")){

FEAtk += 1

}

if(tecAtk.Tipo.includes("Magico") && Atacante.Vtg.includes("Poder Excessivo (2)")){

FEAtk += 2

}

if(tecAtk.Tipo.includes("Magico") && Atacante.Vtg.includes("Poder Excessivo (3)")){

FEAtk += 3

}

if(Defensor.Vtg.includes("Reflexos Imensos (1)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

IniciativaDef += 1

}

if(Defensor.Vtg.includes("Reflexos Imensos (2)")){

// && Atacante.tipodeataque = "Queima Roupa" || atacante.tipodeataque = "Curta Distancia"

IniciativaDef += 2

}

}

// Effs
if(Defensor.FA >= 0){

if(Atacante.Efeitos.includes("Enxame")){

// AtkPA -= 5

}

if(Defensor.Efeitos.includes("Extensao de Dominio") && tecAtk.TipoDano == "Magico"){

Defesa += rollDice1d8() + Defensor.FE

}

if(Atacante.Efeitos.includes("Sombra de Ryoshi")){

let RyoshiInvocador = db.get("usuarios").find({Nome : "Ryo"}).value()

let FortalecimentoFA = Math.floor(RyoshiInvocador.FE*1 + RyoshiInvocador.Nivel*0.30)

let FortalecimentoFE = Math.floor(RyoshiInvocador.Prof*1 + RyoshiInvocador.Nivel*0.30)

let FortalecimentoPen = Math.floor(RyoshiInvocador.FE*0.5 + RyoshiInvocador.Nivel*0.10)

let FortalecimentoIN = Math.floor(RyoshiInvocador.Prof*1 + RyoshiInvocador.Nivel*0.30)

Penetracao += FortalecimentoPen

Dano += FortalecimentoFA

FEAtk += FortalecimentoFE

IniciativaAtk += FortalecimentoIN

}

if(Defensor.Efeitos.includes("Sombra de Ryoshi")){

let RyoshiInvocador = db.get("usuarios").find({Nome : "Ryo"}).value()

let FortalecimentoRes = Math.floor(RyoshiInvocador.FE*1 + RyoshiInvocador.Nivel*0.30)

let FortalecimentoIN = Math.floor(RyoshiInvocador.Prof*1 + RyoshiInvocador.Nivel*0.30)

let FortalecimentoFE = Math.floor(RyoshiInvocador.Prof*1 + RyoshiInvocador.Nivel*0.30)

let FortalecimentoAR = Math.floor(RyoshiInvocador.FE*0.25 + RyoshiInvocador.Nivel*0.05)

Armadura += FortalecimentoAR

FEDef += FortalecimentoFE

Defesa += FortalecimentoRes

IniciativaDef += FortalecimentoIN

}

if(Atacante.Efeitos.includes("Revestimento Comum")){

// let EnergiaExtra = Math.floor(RyoshiInvocador.FE*0.25) + Math.floor(RyoshiInvocador.Max_MP*0.05)

let FortalecimentoFA = Math.floor(Atacante.FE*0.25 + Atacante.MP*0.02)

let FortalecimentoFE = Math.floor(Atacante.Prof*0.25 + Atacante.MP*0.02)

let FortalecimentoPEN = Math.floor(Atacante.FE*0.5 + Atacante.MP*0.02)

let FortalecimentoIN = Math.floor(Atacante.Prof*0.25 + Atacante.MP*0.02)

Penetracao += FortalecimentoPEN

Dano += FortalecimentoFA

IniciativaFisica += FortalecimentoIN

FEAtk += FortalecimentoFE

}

if(Defensor.Efeitos.includes("Revestimento Comum")){

let FortalecimentoAR = Math.floor(Defensor.FE*0.5 + Defensor.MP*0.02)

let FortalecimentoRES = Math.floor(Defensor.FE*0.25 + Defensor.MP*0.02)

let FortalecimentoFE = Math.floor(Defensor.Prof*0.25 + Defensor.MP*0.02)

let FortalecimentoIN = Math.floor(Defensor.Prof*0.25 + Defensor.MP*0.02)

Armadura += FortalecimentoAR

Defesa += FortalecimentoRES

IniciativaDef += FortalecimentoIN

FEDef += FortalecimentoFE

}

if(Atacante.Efeitos.includes("Revestimento Avançado")){

// let EnergiaExtra = Math.floor(RyoshiInvocador.FE*0.25) + Math.floor(RyoshiInvocador.Max_MP*0.05)

let FortalecimentoFA = Math.floor(Atacante.FE*0.25 + Atacante.MP*0.03) + 1

let FortalecimentoFE = Math.floor(Atacante.Prof*0.25 + Atacante.MP*0.03) + 1

let FortalecimentoPEN = Math.floor(Atacante.FE*0.5 + Atacante.MP*0.03) + 1

let FortalecimentoIN = Math.floor(Atacante.Prof*0.25 + Atacante.MP*0.03) + 1

Penetracao += FortalecimentoPEN

Dano += FortalecimentoFA

IniciativaFisica += FortalecimentoIN

FEAtk += FortalecimentoFE

}

if(Defensor.Efeitos.includes("Revestimento Avançado")){

let FortalecimentoAR = Math.floor(Defensor.FE*0.5 + Defensor.MP*0.03) + 1

let FortalecimentoRES = Math.floor(Defensor.FE*0.25 + Defensor.MP*0.03) + 1

let FortalecimentoFE = Math.floor(Defensor.Prof*0.25 + Defensor.MP*0.03) + 1

let FortalecimentoIN = Math.floor(Defensor.Prof*0.25 + Defensor.MP*0.03) + 1

Armadura += FortalecimentoAR

Defesa += FortalecimentoRES

IniciativaDef += FortalecimentoIN

FEDef += FortalecimentoFE

}

if(Atacante.Efeitos.includes("Revestimento Excessivo")){

// let EnergiaExtra = Math.floor(RyoshiInvocador.FE*0.25) + Math.floor(RyoshiInvocador.Max_MP*0.05)

let FortalecimentoFA = Math.floor(Atacante.FE*0.25 + Atacante.MP*0.05) + 5

let FortalecimentoFE = Math.floor(Atacante.Prof*0.25 + Atacante.MP*0.05) + 5

let FortalecimentoPEN = Math.floor(Atacante.FE*0.5 + Atacante.MP*0.05) + 5

let FortalecimentoIN = Math.floor(Atacante.Prof*0.25 + Atacante.MP*0.05) + 5

Penetracao += FortalecimentoPEN

Dano += FortalecimentoFA

IniciativaFisica += FortalecimentoIN

FEAtk += FortalecimentoFE

}

if(Defensor.Efeitos.includes("Revestimento Excessivo")){

let FortalecimentoAR = Math.floor(Defensor.FE*0.5 + Defensor.MP*0.05) + 5

let FortalecimentoRES = Math.floor(Defensor.FE*0.25 + Defensor.MP*0.05) + 5

let FortalecimentoFE = Math.floor(Defensor.Prof*0.25 + Defensor.MP*0.05) + 5

let FortalecimentoIN = Math.floor(Defensor.Prof*0.25 + Defensor.MP*0.05) + 5

Armadura += FortalecimentoAR

Defesa += FortalecimentoRES

IniciativaDef += FortalecimentoIN

FEDef += FortalecimentoFE

}

if(Atacante.Efeitos.includes("Pulsação Aumentada [1]")){

IniciativaFisica += 1

}

if(Defensor.Efeitos.includes("Pulsação Aumentada [1]")){

IniciativaDef += 2

}

if(Atacante.Efeitos.includes("Pulsação Aumentada [2]")){

IniciativaFisica += 2

}

if(Defensor.Efeitos.includes("Pulsação Aumentada [2]")){

IniciativaDef += 4

}

if(Atacante.Efeitos.includes("Flowing Red Scale")){

FFAtk += 1
Dano += 2
Acerto += 2

}

if(Defensor.Efeitos.includes("Flowing Red Scale")){

FFDef += 1
Esquiva += 2
Defesa += 1
Tenacidade += 1

}

if(Atacante.Efeitos.includes("Flowing Red Scale: Stack")){

FFAtk += 2
Dano += 4
Acerto += 4

}

if(Defensor.Efeitos.includes("Flowing Red Scale: Stack")){

FFDef += 2
Esquiva += 4
Defesa += 2
Tenacidade += 2

}

if(Atacante.Efeitos.includes("Paralisia [3]")){

IniciativaAtk -= 5

}

if(Defensor.Efeitos.includes("Paralisia [3]")){

IniciativaDef -= 5

}

if(Atacante.Efeitos.includes("Paralisia [2]")){

IniciativaAtk -= 2

}

if(Defensor.Efeitos.includes("Paralisia [2]")){

IniciativaDef -= 2

}

if(Atacante.Efeitos.includes("Paralisia [1]")){

IniciativaAtk -= 1

}

if(Defensor.Efeitos.includes("Paralisia [1]")){

IniciativaDef -= 1

}

}

// Armas
if(Atacante.FA >= 0){
if(Defensor.Arma == "Desarmado"){

IniciativaDef += 1

}

if(Defensor.Arma == "Braco de Lamina"){

IniciativaDef += 1

}
}

// Ações Comuns e Reações
if(Defensor.FA >= 0){
if(Atacante.Ataque == "Soco"){

TipoDano = "Concussao"

DadoFA = rollDice1d10()

FACrit = 10

AtaqueSP += 0

AtkPA += 2

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Chute"){

TipoDano = "Concussao"

DadoFA = rollDice1d10()

FACrit = 10

AtkPA += 2
AtaqueSP += 0
Dano += 1

IniciativaAtk -= 1

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Cotovelada"){

TipoDano = "Concussao"

DadoFA = rollDice1d12()

FACrit = 12

AtkPA += 3
AtaqueSP += 0
Dano += 2

IniciativaAtk -= 2

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Joelhada"){

TipoDano = "Concussao"

DadoFA = rollDice1d12()

FACrit = 12

AtkPA += 3
AtaqueSP += 0
Dano += 3

IniciativaAtk -= 3

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Asa Eletrica"){

TipoDano = "Eletrico"

DadoFA = rollDice1d20()

Dano -= Atacante.FA

Dano += Atacante.FE + FEAtk

AtkPA += 3

FACrit = 20

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Baque"){

TipoDano = "Concussao"

DadoFA = rollDice1d10()

FACrit = 10

AtkPA += 3

Acerto += Atacante.PerArmas + 1

MovAtk += Atacante.PerArmas

}

if(Atacante.Ataque == "Toque"){

TipoDano = "Concussao"

DadoFA = 0

FACrit = 10

AtaqueSP += 0

AtkPA += 2

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Corte"){

TipoDano = "Cortante"

DadoFA = rollDice1d12()

FACrit = 12

AtkPA += 2

Acerto += Atacante.PerArmas

MovAtk += Atacante.PerArmas

}

if(Atacante.Ataque == "Estocada"){

TipoDano = "Perfurante"

DadoFA = rollDice1d20()

FACrit = 20

Letalidade += 1

AtkPA += 3

Acerto -= 1

Acerto += Atacante.PerArmas

MovAtk += Atacante.PerArmas

}

if(Atacante.Ataque == "Mordida"){

TipoDano = "Perfurante"

DadoFA = rollDice1d12()

Letalidade += 3

Acerto -= 2

AtkPA += 3

FACrit = 12

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Mordida Larga"){

TipoDano = "Perfurante"

DadoFA = rollDice1d20()

Letalidade += 6

Acerto -= 5

AtkPA += 4

FACrit = 20

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Ataque de Cauda"){

TipoDano = "Concussao"

DadoFA = rollDice1d10()

FFAtk += 2

Acerto += 2

AtkPA += 3

FACrit = 10

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Ataque de Tromba"){

TipoDano = "Concussao"

DadoFA = rollDice1d12()

Dano += 4

FACrit = 12

Acerto -= 2

AtaqueSP += 0

AtkPA += 3

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Atacante.Ataque == "Pisao"){

TipoDano = "Concussao"

DadoFA = rollDice2d20()

Dano += 6

FACrit = 20

Acerto -= 12

AtaqueSP += 0

AtkPA += 5

Acerto += Atacante.PerCorpo

MovAtk += Atacante.PerCorpo

}

if(Defensor.Reacao == "Esquiva"){

Esquiva += 0

DefesaSP += 0

DefPA += 0

}

if(Defensor.Reacao == "Esquiva Desesperada"){

Esquiva += 1 + rollDice1d4()

DefesaSP += 2

DefPA += 1

}

if(Defensor.Reacao == "Contra Ataque"){

Esquiva -= 2
IniciativaDef -= 2

DefPA += 1

}

if(Defensor.Reacao == "Aparar"){

Esquiva -= 3

DefPA += 0

}

if(Defensor.Reacao == "Bloqueio"){

TipoReacao = "Bloqueio"

}

if(Defensor.Reacao == "Bloqueio Cruzado"){

TipoReacao = "Bloqueio"

DefPA += 1

DefesaSP += 1

}

if(Defensor.Reacao == "Resistir"){

TipoReacao = "Bloqueio"

DefPA -= 1

}

if(Defensor.Reacao == "Recuo"){

MovDef += Defensor.PerJogoPes

Esquiva -= 3

DefPA += 1

DefesaSP += 1

}

}

// Ações Especiais
if(Defensor.FA >= 0){

if(Atacante.AtkSus == "S"){

let AtkSurpresa = rollDice1d20() + Atacante.Fur

let DefSurpresa = rollDice1d20() + Defensor.Per

let TesteAtk = AtkSurpresa - DefSurpresa

if(TesteAtk > 0){

Atacante.Iniciacao += TesteAtk

msg.channel.send(`**${Atacante.Nomeread}** surpreendeu ${Defensor.Nomeread} em **${TesteAtk}**.`)

}

if(TesteAtk < 0){

msg.channel.send(`**${Atacante.Nomeread}** não surpreendeu ${Defensor.Nomeread}.`)

}

}

if(Atacante.Furtivo == "S"){

let AtkFurtivo = rollDice1d20() + Atacante.Fur

let DefFurtiva = rollDice1d20() + Defensor.Per

let TesteAtk = AtkFurtivo - DefFurtiva

if(TesteAtk > 0){

Defensor.Reacao = "Neutro"

msg.channel.send(`**${Atacante.Nomeread}** atacou ${Defensor.Nomeread} **Furtivamente**.`)

}

if(TesteAtk < 0){

AtkSus = "S"

msg.channel.send(`**${Atacante.Nomeread}** foi detectado por **${Defensor.Nomeread}** antes de concluir o ataque.`)

}

}

}

// Distância
if(Defensor.FA >= 0){

if(Distancia == 1){

IniciativaDef -= 1

DistanciaNome = "Queima Roupa"

}

if(Distancia == 2){

DistanciaNome = "Curta Distancia"

}

if(Distancia >= 3 && Distancia <= 5){

IniciativaDef += 1

DistanciaNome = "Meia Distancia"

}

if(Distancia >= 6){

IniciativaDef += 2

DistanciaNome = "Longa Distancia"

}

if(Atacante.Efeitos.includes("Ataque Aquatico")){

Distancia = 1

}

}

// Effs Pré-Iniciativa
if(Defensor.FA >= 0){

if(tecAtk.Tipo.includes("Arma")){

if(Atacante.Arma == "Desarmado"){

IniciativaFisica += 1

}

if(Atacante.Arma == "Espada Bokken"){



}

if(Atacante.Arma == "Katana" && Atacante.Ataque == "Corte"){

AtkArmado = "S"

Letalidade += 5

}

if(Atacante.Arma == "Katana" && Atacante.Ataque == "Estocada"){

AtkArmado = "S"

Letalidade += 5

}

if(Defensor.Arma == "Katana"){

DefArmado = "S"

Esquiva -= 1

}

if(Atacante.Arma == "Playful Cloud"){

AtkArmado = "S"

Dano += Math.floor(Atacante.FA*0.5)

}

if(Defensor.Arma == "Playful Cloud"){

DefArmado = "S"

IniciativaDef -= 2

}

if(Atacante.Arma == "Presas Amaldicoadas"){

AtkArmado = "S"

Letalidade += 2

// let PresasMagicasAtk = Atacante.FE + rollDice1d10()

// let PresasMagicasDef = Defensor.Res*2 + rollDice1d10()

let PresasMagicasAtk = 3 + Atacante.FE + FEAtk - Defensor.FE - FEDef

if(PresasMagicasAtk < 0){

PresasMagicasAtk = 0

}

Dano += PresasMagicasAtk

}

if(Atacante.Arma == "Lingua"){

Dano -= 5

}

if(Defensor.Arma == "Lingua"){

AcertoDefensor += 3

}

}

if(Atacante.Efeitos.includes("Refinamento de Manipulação de Sangue") && Atacante.Tech == "Piercingblood"){

let BuffRefinamento = rollDice(Atacante.Prof, Atacante.Prof*2)

let BuffVel = rollDice1d8()

Dano += BuffRefinamento

Vel += BuffVel

const Effreplace = Atacante.Efeitos.replace("Refinamento de Manipulação de Sangue", "")
Atacante.Efeitos = Effreplace

}

if(Atacante.Efeitos.includes("Flanco")){

IniciativaAtk += 1 + rollDice1d4()

}

if(Atacante.Efeitos.includes("Restricao Celestial")){

IniciativaAtk += 15

Dano += 12

Penetracao += 10

}

if(Defensor.Efeitos.includes("Restricao Celestial")){

IniciativaDef += 15

Defesa += 16

Armadura += 10

}

if(Atacante.Efeitos.includes("Machucado")){

Dano -= 1
Acerto -= 2

}

if(Defensor.Efeitos.includes("Machucado")){

Defesa -= 4
Esquiva -= 3

}

if(Atacante.Efeitos.includes("Tekken")){

Dano += 4
Acerto -= 2

}

if(Defensor.Efeitos.includes("Tekken")){

Defesa += 4
Esquiva -= 2

}

if(Atacante.Efeitos.includes("Feiticaria de Projeçao")){

IniciativaAtk += 5

}

if(Defensor.Efeitos.includes("Feiticaria de Projeçao")){

IniciativaDef += 5

}

if(Atacante.Efeitos.includes("Balas de Prata")){

AtkPA -= 1

Letalidade += 1
Acerto += 5
Dano += 5 + Atacante.FE

}


if(Atacante.Efeitos.includes("Andorinha")){

Dano += rollDice2d12() + Atacante.FE*2

}

if(Atacante.Efeitos.includes("Marionete")){

IniciativaAtk -= 2
Dano -= 2

}

if(Defensor.Efeitos.includes("Marionete")){

IniciativaDef -= 2
Defesa -= 2

}

if(Atacante.Efeitos.includes("Quicksilver")){

Distancia = 0
Furarguarda += 50
Penetracao += 5
Letalidade += Atacante.FE
Acerto += Atacante.Prof

}

if(Atacante.Efeitos.includes("Blackout")){

Furarguarda += 1000
Acerto += 1000

}

if(Defensor.Efeitos.includes("Blackout")){

Esquiva += 1000

}

if(Atacante.Efeitos.includes("Amor Verdadeiro")){

Dano += 3
IniciativaAtk += 3
Acerto += 3

}

if(Defensor.Efeitos.includes("Amor Verdadeiro")){

Defesa += 3
IniciativaDef += 3
Esquiva += 3

}

if(Atacante.Efeitos.includes("Deathclock")){

Dano += 3
IniciativaAtk += 3
Acerto += 3

}

if(Defensor.Efeitos.includes("Deathclock")){

Defesa += 3
IniciativaDef += 3
Esquiva += 3

}

if(Atacante.Efeitos.includes("Cronos")){

IniciativaAtk += 5 + rollDice1d6()

}

if(Defensor.Efeitos.includes("Cronos")){

IniciativaDef += 10 + rollDice1d8()

}

if(Atacante.Efeitos.includes("Nervos Acelerados")){

IniciativaAtk += 1 + rollDice1d4()

}

if(Defensor.Efeitos.includes("Nervos Acelerados")){

IniciativaDef += 1 + rollDice1d4()

}

if(Atacante.Efeitos.includes("Pernas Turbinadas")){

IniciativaAtk += 2 + rollDice1d8()

}

if(Atacante.Efeitos.includes("Manipulação de Tamanho")){

Acerto += Atacante.Prof + rollDice1d6()

}

if(Defensor.Efeitos.includes("Manipulação de Tamanho")){

Esquiva += Defensor.Prof + rollDice1d6()

}

if(Atacante.Efeitos.includes("Punhos de Missil")){

Dano += Atacante.FE
Acerto += rollDice1d4()

}

if(Atacante.Efeitos.includes("Dominio Vertigioso")){

let Vertigo = rollDice1d20() + Atacante.AC

if(Vertigo < 15){

Acerto *= 0.5

Acerto = Math.floor(Acerto) - 1

IniciativaAtk *= 0.5

IniciativaAtk = Math.floor(IniciativaAtk) - 1

msg.channel.send(`**${Atacante.Nome}** ficou com Vertigem.`)

}

}

if(Defensor.Efeitos.includes("Dominio Vertigioso")){

let Vertigo = rollDice1d20() + Defensor.AC

if(Vertigo < 15){

Acerto *= 0.5

Acerto = Math.floor(Acerto) - 1

IniciativaDef *= 0.5

IniciativaDef = Math.floor(IniciativaDef) - 1

msg.channel.send(`**${Defensor.Nome}** ficou com Vertigem.`)

}

}

if(Defensor.Efeitos.includes("Cura Constante da Reversão")){

Defesa += 1 + Math.floor(Defensor.Prof*0.25)

}

if(Defensor.Efeitos.includes("Breve Pausa")){

let DiminuirIn1 = rollDice1d8()

let DiminuirIn2 = rollDice1d6()

IniciativaDef -= DiminuirIn1

IniciativaDef -= DiminuirIn2

const PausaReplace = Defensor.Efeitos.replace("Breve Pausa", "")
Defensor.Efeitos = PausaReplace

msg.channel.send(`**Breve Pausa** reduziu a Iniciativa de **${Defensor.Nomeread}** em **${DiminuirIn1 + DiminuirIn2}**.`)

}

if(Atacante.Efeitos.includes("Acelerar")){

// indexOf = vai achar a palavra Acelerar na string e retornar onde que tá o "A" de Acelerar, ou seja, a primeira letra

let CortarAce = Atacante.Efeitos.substring(Atacante.Efeitos.indexOf("Acelerar"), 15)

let NumeroAcelerar = CortarAce.slice(10, 12)
NumeroAcelerar = parseInt(NumeroAcelerar)

IniciativaAtk += NumeroAcelerar

}

if(Atacante.Efeitos.includes("Tekkai 50%")){

Dano += Math.floor(Atacante.Vig*0.5)

}

if(Defensor.Efeitos.includes("Tekkai 200%") && (tecAtk.TipoDano == "Cortante" || tecAtk.TipoDano == "Perfurante")){

Defesa += Math.floor(Defensor.Vig*2)

}

if(Defensor.Efeitos.includes("Tekkai 200%") && tecAtk.TipoDano == "Concussão"){

Defesa += Math.floor(Defensor.Vig*1)

}

if(Defensor.Efeitos.includes("Tekkai 200%")){

IniciativaDef -= tecDef.CustoSP

}

if(Atacante.Efeitos.includes("Tekkai 500%")){

Dano += Math.floor(Atacante.Vig)

}

if(Defensor.Efeitos.includes("Tekkai 500%") && (tecAtk.TipoDano == "Cortante" || tecAtk.TipoDano == "Perfurante")){

Defesa += Math.floor(Defensor.Vig*5)

}

if(Defensor.Efeitos.includes("Tekkai 500%") && tecAtk.TipoDano == "Concussão"){

Defesa += Math.floor(Defensor.Vig*2.5)

}

if(Defensor.Efeitos.includes("Tekkai 500%")){

IniciativaDef -= tecDef.CustoSP

}

if(Atacante.Efeitos.includes("Perca da Habilidade de Andar") && tecAtk.Tipo.includes("Magico")){

Dano += 5

}

if(Defensor.Efeitos.includes("Parado")){

Defensor.Reacao = "Neutro"

const ParadoReplace = Defensor.Efeitos.replace("Parado", "")
Defensor.Efeitos = ParadoReplace

}

if(Defensor.Efeitos.includes("Desmaio")){

Defensor.Reacao = "Neutro"

}

if(Atacante.Mira == "o Corpo" && Defensor.Efeitos.includes("Estatura de Monstro do Lago")){

Defensor.Reacao == "Neutro"

}

if(Atacante.Mira == "o Rosto" && Defensor.Efeitos.includes("Estatura de Monstro do Lago")){

Defesa -= 4

}

if(Defensor.Reacao == "Neutro"){

IniciativaAtk = 0

Esquiva = -10
IniciativaDef = 0
DadoES = 0

}

}

// Vantagem de Iniciativa
if(Defensor.FA >= 0){

console.log(IniciativaDef*0.5)

Esquiva += Math.floor(IniciativaDef*0.5)

if(tecAtk.Tipo.includes("Fisico")){

Acerto += Math.floor(IniciativaAtk*0.5)

Dano += Atacante.FA

}

if(tecAtk.Tipo.includes("Magico")){

IniciativaAtk += IniciativaTec

IniciativaAtk -= Atacante.IN - IniciativaFisica

Acerto += Math.floor(IniciativaAtk*0.5)

let TecnicaDano = (Atacante.FE + tecAtk.FE) * tecAtk.FERate

TecnicaDano = Math.floor(TecnicaDano)

Dano += TecnicaDano

Dano += FEAtk

}

if(IniciativaAtk > IniciativaDef){

VantIn = IniciativaAtk - IniciativaDef

if(Esquiva <= -2){

Esquiva = -2

}

VitoriosoIn = Atacante.Nome

}

if(IniciativaAtk < IniciativaDef){

VantIn = IniciativaDef - IniciativaAtk

VitoriosoIn = Defensor.Nome

}

if(IniciativaAtk == IniciativaDef){

VitoriosoIn = "Empate"

}



}

// Guarda
if(Defensor.FA >= 0){

if(tecAtk.Efeitos.includes("Inbloqueavel")){

Furarguarda += 1000

}

if(Atacante.AcaoEsp.includes("Cruzado" && !tecDef.Efeitos.includes("Defesa Segura"))){

let AtkCruzado = 1 + rollDice1d6()

Furarguarda += AtkCruzado

}

if(Atacante.Mira == "o Corpo" && !tecDef.Efeitos.includes("Defesa Segura")){

Furarguarda += 50

}

if(tecAtk.Efeitos.includes("Dois Lados") && tecDef.Cmd == "Mugen"){

Guarda -= 10

}

if(tecAtk.Efeitos.includes("Todos os Lados") && tecDef.Cmd == "Mugen"){

Guarda -= 1000

}

if(Atacante.CA == "S"){

let CAFurarGuarda = Atacante.Iniciacao

if(CAFurarGuarda > 3){

CAFurarGuarda = 3

}

Furarguarda += CAFurarGuarda

}

if(tecDef.Efeitos.includes("Defesa Perfeita")){

Furarguarda -= 1000

}

if(Defensor.Reacao == "Aparar"){

let ApararRead = `Aparar: ${AcertoDefensor} + **${dadoAparar}** x. **${contraAparar}** + ${Acerto}. `

Furarguarda = IniciativaAtk + rollDice1d20()

Guarda = IniciativaDef + rollDice1d20() + 5

DefesaSP += 1

Aparar = (AcertoDefensor + dadoAparar + 3) - (contraAparar + Acerto)

if(Guarda >= Furarguarda){

let GuardaFuradaRead = `Guarda: **${Guarda}** x. **${Furarguarda}**.`

}

if(Furarguarda > Guarda){

GuardaFurada = "S"

let GuardaFuradaRead = `! Furo de Guarda: **${Furarguarda}** x. **${Guarda}**.`

}

}

if(Defensor.Reacao == "Bloqueio"){

Furarguarda = IniciativaAtk + rollDice1d12() + Atacante.PerCorpo

Guarda = IniciativaDef + rollDice1d12() + 6 + Defensor.PerCorpo

if(tecDef.Nome == "Reforçar Braco"){

Guarda -= 2

}

if(tecDef.Nome == "Compressão: Braços"){

Guarda -= 2

}

if(Furarguarda > Guarda){

Esquiva -= 1

GuardaFurada = "S"

let GuardaFuradaRead = `! Furo de Guarda: **${Furarguarda}** x. **${Guarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

if(Guarda >= Furarguarda){

let GuardaFuradaRead = `Guarda: **${Guarda}** x. **${Furarguarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

}

if(Defensor.Reacao == "Bloqueio Cruzado"){

Furarguarda = IniciativaAtk + rollDice1d12()

Guarda = IniciativaDef + rollDice1d12() + 5

let GuardaCruzada = 1 + rollDice1d4()

if(Furarguarda > Guarda){

Esquiva -= 2

GuardaFurada = "S"

let GuardaFuradaRead = `! Furo de Guarda: **${Furarguarda}** x. **${Guarda}**.`

}

if(Guarda >= Furarguarda){

Defesa += GuardaCruzada

msg.channel.send(`**${Defensor.Nomeread}** usou Guarda Cruzada e recebeu: **+${GuardaCruzada}** de Defesa.`)

let GuardaFuradaRead = `Guarda: **${Guarda}** x. **${Furarguarda}**.`

}

}

if(Defensor.Reacao == "Resistir"){

Furarguarda = IniciativaAtk + rollDice1d12() + Atacante.PerCorpo

Guarda = IniciativaDef + rollDice1d12() + 10 + Defensor.PerCorpo

if(tecDef.Nome == "Reforçar Ponto"){

Guarda -= 8

}

if(Furarguarda > Guarda){

Esquiva -= 1

GuardaFurada = "S"

let GuardaFuradaRead = `! Furo de Guarda: **${Furarguarda}** x. **${Guarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

if(Guarda >= Furarguarda){

let GuardaFuradaRead = `Guarda: **${Guarda}** x. **${Furarguarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

}

if(tecDef.Nome == "Compressão: Ponto do Corpo" && GuardaFurada == "N"){

Defesa += 2 + Math.floor((Defensor.Prof + Defensor.FE) * 1.5)

Armadura += Defensor.Prof + Defensor.FE

}

if(tecDef.Nome == "Compressão: Braços" && GuardaFurada == "N"){

Defesa += 1 + Math.floor((Defensor.Prof + Defensor.FE) * 1)

Armadura += Defensor.Prof + Defensor.FE

}

if(tecDef.Nome == "Compressão: Corpo"){

Defesa += Math.floor((Defensor.Prof + Defensor.FE) * 0.5)

Armadura += Defensor.Prof + Defensor.FE

}

if(tecDef.Nome == "Reforçar Ponto do Corpo" && GuardaFurada == "N"){

Defesa += 2 + Math.floor(Defensor.FE * 0.75)

Armadura += 2 + Math.floor(Defensor.FE * 0.75)

}

if(tecDef.Nome == "Reforçar Braço" && GuardaFurada == "N"){

Defesa += 1 + Math.floor(Defensor.FE * 0.5)

Armadura += 1 + Math.floor(Defensor.FE * 0.5)

}

if(tecDef.Nome == "Reforçar Corpo"){

Defesa += Math.floor(Defensor.FE * 0.25)

Armadura += Math.floor(Defensor.FE * 0.25)

}

if(tecDef.Efeitos.includes("Guarda")){

Furarguarda = IniciativaAtk + rollDice1d20()

Guarda = IniciativaDef + rollDice1d20() + tecDef.ValorGuarda

if(Furarguarda > Guarda){

GuardaFurada = "S"

let GuardaFuradaRead = `! Furo de Guarda: **${Furarguarda}** x. **${Guarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

if(Guarda >= Furarguarda){

Defesa += tecDef.ValorDefesa

let GuardaFuradaRead = `Guarda: **${Guarda}** x. **${Furarguarda}**.`

msg.channel.send(`${GuardaFuradaRead}`)

}

}

if(GuardaFurada == "N" && tecDef.Efeitos.includes("Invulneravel")){

Esquiva += 1000

Tenacidade += 1000

}

if(GuardaFurada == "N" && TipoReacao == "Bloqueio" && Defensor.Reacao !== "Resistir"){

Atacante.Mira = "o Braco"
db.write()

}

if(GuardaFurada == "N" && DefArmado == "S" && Defensor.Reacao == "Aparar"){

Atacante.Mira = "a Arma"
db.write()

}

if(DefArmado == "N" && GuardaFurada == "N" && Defensor.Reacao == "Aparar"){

Atacante.Mira = "a Mao"
db.write()

}
}

// Mira
if(Defensor.FA >= 0){
if(Atacante.Mira == "o Ponto Fraco"){

if(Defensor.Efeitos.includes("Galhos Frageis")){

let NerfDef = Math.floor(Defensor.Res*0.5) + 3

DadoRes = rollDice1d4()

Tenacidade -= 3

Acerto -= 10

Defesa -= NerfDef

}

}

if(Atacante.Mira == "o Olho"){

Letalidade += 5
Acerto -= 6

}

if(Atacante.Mira == "o Rosto"){

MiraParte = "a Cabeca"

DadoRes = rollDice1d4()

ResCrit = 4

Acerto -= 1

Defesa -= 3

}

if(Atacante.Mira == "o Braco"){

MiraParte = "o Membro Superior"

Tenacidade += 1

DadoRes = rollDice1d10()

ResCrit = 10

Defesa += 1

Acerto += 1

}

if(Atacante.Mira == "o Peito"){

MiraParte = "o Torso"

DadoRes = rollDice1d6()

Tenacidade -= 1

ResCrit = 6

Defesa -= 2

}

if(Atacante.Mira == "a Mao"){

MiraParte = "a Mao"

Tenacidade += 2

DadoRes = rollDice1d12()

ResCrit = 12

Defesa += 2

Acerto += 2

}

if(Atacante.Mira == "o Abdomem"){

MiraParte = "o Torso"

DadoRes = rollDice1d6()

ResCrit = 6

Tenacidade -= 2

Defesa -= 1

}

if(Atacante.Mira == "o Corpo"){

MiraParte = "o Torso"

DadoRes = rollDice1d8()

ResCrit = 8

Tenacidade -= 3

}

if(Atacante.Mira == "a Arma"){

let PegarNome = Defensor.ArmaCodigo

let ArmaNome = techs.get("Techs").find({Nome : Defensor.ArmaCodigo }).value()

let DanificarArma = FFAtk + DadoFA - ArmaNome.ArmaRes

if(DanificarArma < 0){

DanificarArma = 0

}

ArmaNome.ArmaRes -= DanificarArma

Dano = FFAtk

DadoRes = 0

Defesa = ArmaNome.ArmaRes

if(DanificarArma > 0){

msg.channel.send(`**${Defensor.Nomeread}** recebeu **${DanificarArma}** de Dano na sua **${Defensor.Arma}**.

${Defensor.Arma} de **${Defensor.Nomeread}**: **${ArmaNome.ArmaRes}** de Resistência.`)

}

db.write()
techs.write()

}
}

// Criticos Defensivos
if(Defensor.FA >= 0){

if(DadoRes >= ResCrit){

msg.channel.send(`**Acerto Crítico** na Defesa!`)

DadoRes += Math.ceil(ResCrit*0.5)

}

if(DadoES >= ESCrit){

msg.channel.send(`**Acerto Crítico** na Esquiva!`)

DadoES += Math.ceil(ESCrit*0.5)

}
}

// Effs Pré-Acerto
if(Defensor.FA >= 0){

if(tecAtk.Tipo.includes("Arma")){

if(Atacante.Arma == "Desarmado"){

IniciativaAtk += 1

}

if(Atacante.Arma == "Espada Bokken"){



}

if(Atacante.Arma == "Katana" && Atacante.Ataque == "Corte"){

AtkArmado = "S"

Letalidade += 5

}

if(Atacante.Arma == "Katana" && Atacante.Ataque == "Estocada"){

AtkArmado = "S"

Letalidade += 5

}

if(Defensor.Arma == "Katana"){

DefArmado = "S"

Esquiva -= 1

}

if(Atacante.Arma == "Playful Cloud"){

AtkArmado = "S"

Dano += Math.floor(Atacante.FA*0.5)

}

if(Defensor.Arma == "Playful Cloud"){

DefArmado = "S"

IniciativaDef -= 2

}

if(Atacante.Arma == "Presas Amaldicoadas"){

AtkArmado = "S"

Letalidade += 2

// let PresasMagicasAtk = Atacante.FE + rollDice1d10()

// let PresasMagicasDef = Defensor.Res*2 + rollDice1d10()

let PresasMagicasAtk = 3 + Atacante.FE + FEAtk - Defensor.FE - FEDef

if(PresasMagicasAtk < 0){

PresasMagicasAtk = 0

}

Dano += PresasMagicasAtk

}

if(Atacante.Arma == "Lingua"){

Dano -= 5

}

if(Defensor.Arma == "Lingua"){

AcertoDefensor += 3

}

}

}

// Teste de Acerto, Scoop Global
let TesteAcerto = Acerto + DadoAC - DadoES - Esquiva

// Transformar Teste de Acerto
if(Defensor.FA >= 0){

if(tecAtk.Efeitos.includes("Superioridade [Acerto, Fe x Fe]")){

let SuperioridadeAtk = rollDice(tecAtk.SuperioridadeQuant, tecAtk.SuperioridadeQuant*tecAtk.SuperioridadeNumb)
let SuperioridadeDef = rollDice1d20()

TesteAcerto = (SuperioridadeAtk + Atacante.FE + FEAtk) - (SuperioridadeDef + Defensor.FE + FEDef)

Acerto = Atacante.FE + tecAtk.BonusAcerto + Atacante.PerCon
Esquiva = Defensor.FE + Defensor.PerCon
DadoAC = SuperioridadeAtk
DadoES = SuperioridadeDef

}

if(tecAtk.Efeitos.includes("Fala Amaldicoada")){

let FalaAmaldAtk = rollDice(tecAtk.TesteQuant, tecAtk.TesteQuant*tecAtk.TesteNumb)
let FalaAmaldDef = Defensor.Prof

let BuffFalaAmald = 0

if(Atacante.Efeitos.includes("Perca da Habilidade de Andar")){

BuffFalaAmald += 5

}

FalaAmaldAtk -= tecAtk.BonusAcerto

Acerto = Atacante.FE + FEAtk + BuffFalaAmald + Math.ceil(Atacante.MP*0.05) + tecAtk.BonusAcerto + Atacante.PerCon
Esquiva = Defensor.FE + Math.ceil(Defensor.MP*0.10) + FEDef + Defensor.PerCon + Defensor.Prof
DadoAC = FalaAmaldAtk
DadoES = 0

TesteAcerto = Acerto + DadoAC - DadoES - Esquiva

if(TesteAcerto < 0){

let HPHold = Atacante.HP

Atacante.HP -= tecAtk.CustoHP

msg.channel.send(`**Fala Amaldiçoada** foi superada e **${Atacante.Nome}** tomou o dobro de dano.

**${Atacante.Nome}**: ${HPHold} > ${Atacante.HP}.`)

}

}

}

// Definir Teste de Acerto
if(Defensor.FA >= 0){
if(TipoReacao == "Bloqueio" && Letalidade == 0 && GuardaFurada == "N"){

TesteAcerto = 2

}

if(TipoReacao == "Bloqueio" && Letalidade > 0 && TesteAcerto < 2 && GuardaFurada == "N"){

TesteAcerto = 2

}

if(Defensor.Reacao == "Aparar" && Aparar > 0 && Letalidade == 0 && GuardaFurada == "N"){

TesteAcerto = 2

}

if(Defensor.Reacao == "Aparar" && Aparar > 0 && Letalidade > 0 && TesteAcerto < 2 && GuardaFurada == "N"){

TesteAcerto = 2

}

if(tecAtk.Efeitos.includes("Indesviavel") && TesteAcerto < tecAtk.Indesviavel){

TesteAcerto = tecAtk.Indesviavel

}

if(TesteAcerto > 0 && Atacante.Mira !== "a Arma"){

Contato = "S"

}

if(TesteAcerto == 0 || TesteAcerto == 1){

TabelaAcerto = "de Raspão"

TabelaOrdem = 1

Dano -= 1

MultiplAcerto = 0.5

}

if(TesteAcerto >= 2 && TesteAcerto <= 5){

TabelaAcerto = "Direto"

TabelaOrdem = 2

MultiplAcerto = 1

}

if(TesteAcerto >= 6 && TesteAcerto <= 14){

TabelaAcerto = "Pesado"

TabelaOrdem = 3

Dano += 1

MultiplAcerto = 1.5

}

if(TesteAcerto >= 15 && TesteAcerto <= 19){

TabelaAcerto = "Massivo"

TabelaOrdem = 4

Dano += 2

MultiplAcerto = 2

}

if(TesteAcerto >= 20){

TabelaAcerto = "Grave"

TabelaOrdem = 5

Dano += 3

MultiplAcerto = 3

}

if(Atacante.Mira == "a Arma"){

TabelaAcerto = "na Arma"

TabelaOrdem = 0

MultiplAcerto = 0

}

}

// Testes de Iniciativa
if(Defensor.FA >= 0){
if(Defensor.Reacao == "Contra Ataque"){

let PericiaCAAtk = Atacante.PerCorpo

let PericiaCADef = Defensor.PerCorpo

if(Atacante.AcaoEsp.includes("Compacto")){

let CompactoAtk = 1 + rollDice1d4()

PericiaCAAtk += CompactoAtk

}

TesteCA = (PericiaCADef + ContraDef + IniciativaDef) - (PericiaCAAtk + ContraAtk + IniciativaAtk)

let BonusAtkCA = TesteCA

if(TesteCA > 3){

BonusAtkCA = 3

}

if(TesteCA > 0){

TesteAcerto = -1

}

if(TesteCA < 0){

TesteCA = 0

}

Defensor.Iniciacao += TesteCA

Defensor.AtkOport = "S"

msg.channel.send(`Contra Ataque: ${PericiaCADef + IniciativaDef} + **${ContraDef}** x. **${ContraAtk}** + ${IniciativaAtk + PericiaCAAtk}.

Bônus Ganho: **${BonusAtkCA}**.`)

}

if(Defensor.Reacao == "Recuo"){

if(Atacante.AcaoEsp.includes("Compacto")){

let CompactoAtk = 1 + rollDice1d4()

TesteRecuo -= CompactoAtk

}

RecuoAtk = rollDice1d20()
RecuoDef = rollDice1d20()

if(tecDef.Efeitos.includes("Deslocacao")){

MovDef += (rollDice(tecDef.Deslocacao, tecDef.DeslocacaoDado) + (tecDef.DeslocacaoProf * Defensor.Prof) + tecDef.DeslocacaoFixo) * 0.5

}

TesteRecuo = (MovDef + IniciativaDef + RecuoDef) - (RecuoAtk + MovAtk + IniciativaAtk)

if(TesteRecuo <= 0){

TesteRecuo = 0

}

if(TesteRecuo > 0){

TesteAcerto = -1

// se move 0,5m pra kd 1 de diff de resultado. tem um cmd q faz o personagem se mover pra quantia exata q ele quer quando recua

if(Atacante.Distancia == "QR"){

Atacante.Distancia = "CD"

msg.reply(`**${Defensor.Nome}** recuou pra **Curta Distância**.`)

}

if(Atacante.Distancia == "CD"){

Atacante.Distancia = "LD"

msg.reply(`**${Defensor.Nome}** recuou pra **Longa Distância**.`)

}

}

msg.channel.send(`**Recuo**: ${MovDef} + ${IniciativaDef} + **${RecuoDef}** x. **${RecuoAtk}** + ${IniciativaAtk} + ${MovAtk}.`)

}
}

// Criticos Ofensivos
if(Defensor.FA >= 0){
if(DadoFE >= FECrit && TesteAcerto >= 0){

DadoFE += Math.ceil(FECrit*0.5)

msg.channel.send(`**Acerto Crítico** no Dano!`)

}

if(DadoAC >= ACCrit){

msg.channel.send(`**Acerto Crítico** no Acerto!`)

DadoAC += Math.ceil(ACCrit*0.5)

}

}

// Effs Pré-Dano
if(Defensor.FA >= 0){
if(tecAtk.Efeitos.includes("Fortalecer")){

// setou 5 de energizar, tem o 6 de mpenergizar, faz 5*mpenergizar no custo final da tech (n precisa de um 3 mod)

AtaqueMP += tecAtk.Fortalecer*tecAtk.MPFortalecer

let Fortalecer = rollDice(tecAtk.Fortalecer, tecAtk.Fortalecer*tecAtk.FortalecerDado)

Dano += Fortalecer

Dano += tecAtk.FortalecerRate*tecAtk.Fortalecer

msg.channel.send(`**${Atacante.Nome}** rolou dados pra **Fortalecer** e tirou: **${Fortalecer}**.`)

}

if(tecAtk.Efeitos.includes("Estender")){

// setou 5 de energizar, tem o 6 de mpenergizar, faz 5*mpenergizar no custo final da tech (n precisa de um 3 mod)

AtaqueMP += tecAtk.Estender*tecAtk.MPEstender

Acerto += tecAtk.Estender*2

AtkPA -= tecAtk.Estender

}

if(tecAtk.Efeitos.includes("Perigoso")){

Letalidade += tecAtk.PerigosoLT*TabelaOrdem

}

if(tecAtk.Cmd == "Brotoamald" && TabelaOrdem >= 2 && TesteAcerto >= 0){

Defensor.Efeitos += "Sucção do Broto - "

msg.channel.send(`**${Atacante.Nomeread}** acertou com o **Broto Amaldiçoado**.`)

}

if(Defensor.Vtg.includes("Escamas Grossas (2)") && Atacante.Mira !== "o Rosto"){

Armadura += 5

db.write()

}

if(Atacante.Efeitos.includes("Estatura Grande")){

Dano += 2

IniciativaAtk -= 1

}

if(Defensor.Efeitos.includes("Estatura Grande")){

Defesa += 1

Esquiva -= 2

IniciativaDef -= 1

}

if(Atacante.Efeitos.includes("Estatura Gigante")){

Dano += 4

IniciativaAtk -= 2

}

if(Defensor.Efeitos.includes("Estatura Gigante")){

Defesa += 2

Esquiva -= 4

IniciativaDef -= 2

}

if(Defensor.Efeitos.includes("Exoesqueleto Completo")){

Armadura += 10

Defesa += 5

db.write()

}

if(Defensor.Nomeread == "Ouroboros" && TipoDano == "Cortante"){

Defesa -= rollDice1d8()

}

if(AtaqueMP >= tecAtk.CustoTransform){

NomeAtual = tecAtk.NomeTransform

}
}

// Teste de Dano, Scoop Global
let TesteDano = Dano + DadoFE - DadoRes - Defesa

// Tratamento de Dano Negativo
if(Defensor.FA >= 0){

if(TesteDano < 0){

TesteDano = 0

}

}

// Causar Dano, Scoop Global
let DanoCausado = TesteDano

// Effs Pós-Dano
if(Defensor.FA >= 0){

if(Atacante.Arma == "Asa Eletrica" && Contato == "S"){

if(TesteDano >= 1 && TesteDano <= 10 && !Defensor.Efeitos.includes("Paralisia [1]")){

Defensor.Efeitos = "Paralisia [1] - "

}

if(TesteDano >= 11 && TesteDano <= 20 && !Defensor.Efeitos.includes("Paralisia [2]")){

Defensor.Efeitos = "Paralisia [2] - "

}

if(TesteDano > 21  && !Defensor.Efeitos.includes("Paralisia [3]")){

Defensor.Efeitos = "Paralisia [3] - "

}

if(TesteDano >= 1 && TesteDano <= 10 && Defensor.Efeitos.includes("Paralisia [1]")){

Defensor.PA -= 1

}

if(TesteDano >= 11 && TesteDano <= 20 && Defensor.Efeitos.includes("Paralisia [2]")){

Defensor.PA -= 2

}

if(TesteDano > 21  && Defensor.Efeitos.includes("Paralisia [3]")){

Defensor.PA -= 3

}

}

techs.write()
db.write()

}

// Teste de Dano e Armadura
if(Defensor.FA >= 0){
if(Armadura < 0){

Armadura = 0

}

Armadura -= Pen

DanoLetalidade = Math.ceil(Letalidade*MultiplAcerto)

TesteDano = Math.ceil(TesteDano*MultiplAcerto)

if(Armadura == 1){

Math.floor(DanoLetalidade *= 0.90)

}

if(Armadura == 2){

Math.floor(DanoLetalidade *= 0.80)

}

if(Armadura == 3){

Math.floor(DanoLetalidade *= 0.70)

}

if(Armadura == 4){

Math.floor(DanoLetalidade *= 0.60)

}

if(Armadura == 5){

Math.floor(DanoLetalidade *= 0.50)

}

if(Armadura == 6){

Math.floor(DanoLetalidade *= 0.40)

}

if(Armadura == 7){

Math.floor(DanoLetalidade *= 0.30)

}

if(Armadura == 8){

Math.floor(DanoLetalidade *= 0.20)

}

if(Armadura == 9){

Math.floor(DanoLetalidade *= 0.10)

}

if(Armadura >= 10){

DanoLetalidade = 0

}

}

// One Time Uses
if(Defensor.FA >= 0){
if(Atacante.AtkOport == "S" && OportDesseTurno == "N"){

msg.channel.send(`**Ataque de Oportunidade! **`)
Atacante.AtkOport = "N"

AtkPA -= AtkPA

}

if(Atacante.CA == "S" && TesteCA == 0){

Atacante.CA = "N"

}
}

// Gastos
if(Defensor.FA >= 0){

if(tecAtk.Tipo.includes("Ofensivo")){

let MPReducaoAtk = AtaqueMP

let Reducao = 1 - (Atacante.Prof*0.05 + Atacante.PerCon*0.05)

if(Reducao <= 0.30){

Reducao = 0.30

}

MPReducaoAtk *= Reducao
MPReducaoAtk = Math.ceil(MPReducaoAtk)

Atacante.MP -= MPReducaoAtk

}

Atacante.SP -= AtaqueSP

Defensor.SP -= DefesaSP

Atacante.PA -= AtkPA

if(tecDef.Tipo.includes("Defensivo")){

DefesaMP += tecDef.Custo

let MPReducao = DefesaMP

let Reducao = 1 - (Defensor.Prof*0.05) - (Defensor.PerCon*0.05)

if(Reducao <= 0.30){

Reducao = 0.30

}

MPReducao *= Reducao
MPReducao = Math.ceil(MPReducao)

Defensor.MP -= MPReducao

Defensor.PA -= DefPA

}

if(tecAtk.Efeitos.includes("Custo Vital")){

Atacante.HP -= tecAtk.CustoHP

}

}

// Ferimentos
if(Defensor.FA >= 0){

let TesteImpacto = TesteDano
let TesteSangramento = TesteDano
let TesteAtordoamento = TesteDano

if(Defensor.Nomeread == "Mahito"){

TesteSangramento = 0

}

if(tecAtk.Efeitos.includes("Impactante")){

let ImpactanteDado = rollDice(tecAtk.Impactante, tecAtk.Impactante*tecAtk.ImpactanteDado)

let ImpactoRate = tecAtk.Impactante*tecAtk.ImpactanteRate

TesteImpacto += ImpactanteDado + ImpactoRate

AtaqueMP += tecAtk.Impactante*tecAtk.MPImpactante

msg.channel.send(`**${Atacante.Nome}** rolou dados pra **Impactante** e tirou: **${ImpactanteDado}**.`)

}

if(TipoDano == "Concussao" && TesteImpacto >= 5 + Tenacidade && TesteImpacto <= 15 + (Tenacidade*2) && tecAtk.Efeitos.includes("Impactante") && (tecAtk.Impacto && tecAtk.Impacto == "S")){

let DadoImpacto = rollDice1d4()

let ImpactoRate = 0

if(tecAtk.Tipo.includes("Fisico")){

ImpactoRate = Math.floor(Atacante.FA*0.5)

}

if(tecAtk.Tipo.includes("Magico")){

ImpactoRate = Math.floor(Atacante.FE*0.5)

}

let TesteImpacto = DadoImpacto + ImpactoRate

if(tecAtk.Efeitos.includes("Magnetismo")){

let Magnetismo = tecAtk.Magnetismo

if(tecAtk.Magnetismo > 0){

Magnetismo = tecAtk.Magnetismo

}

if(Magnetismo == Defensor.NS){

TesteImpacto = 0

// Defensor.Efeitos += "Pés Presos"

}

if(Magnetismo <= Defensor.NS){

Defensor.NS -= TesteImpacto

if(Defensor.NS < Magnetismo){

Defensor.NS = Magnetismo

}

}

if(Magnetismo >= Defensor.NS){

Defensor.NS += TesteImpacto

if(Defensoro.NS > Magnetismo){

Defensor.NS = Magnetismo

}

}

}

if(!tecAtk.Efeitos.includes("Magnetismo")){

if(Atacante.NS <= Defensor.NS){

Defensor.NS += TesteImpacto

}

if(Atacante.NS > Defensor.NS){

Defensor.NS -= TesteImpacto

}

}

msg.channel.send(`**${Defensor.Nome}** foi ferido com: **Impacto Leve**.

**${Defensor.Nome}** foi Impactado até **${Defensor.NS}**.`)

}

if(TipoDano == "Concussao" && TesteImpacto >= 15 + (Tenacidade*2) && tecAtk.Efeitos.includes("Impactante") && (tecAtk.Impacto && tecAtk.Impacto == "S")){

let DadoImpacto = rollDice2d4()

let ImpactoRate = 0

if(tecAtk.Tipo.includes("Fisico")){

ImpactoRate = Atacante.FA

}

if(tecAtk.Tipo.includes("Magico")){

ImpactoRate = Atacante.FE

}

let TesteImpacto = DadoImpacto + ImpactoRate

if(tecAtk.Efeitos.includes("Magnetismo")){

let Magnetismo = tecAtk.Magnetismo

if(tecAtk.Magnetismo > 0){

Magnetismo = tecAtk.Magnetismo

}

if(Magnetismo == Defensor.NS){

TesteImpacto = 0

// Defensor.Efeitos += "Pés Presos"

}

if(Magnetismo <= Defensor.NS){

Defensor.NS -= TesteImpacto

if(Defensor.NS < Magnetismo){

Defensor.NS = Magnetismo

}

}

if(Magnetismo >= Defensor.NS){

Defensor.NS += TesteImpacto

if(Defensoro.NS > Magnetismo){

Defensor.NS = Magnetismo

}

}

}

if(!tecAtk.Efeitos.includes("Magnetismo")){

if(Atacante.NS <= Defensor.NS){

Defensor.NS += TesteImpacto

}

if(Atacante.NS > Defensor.NS){

Defensor.NS -= TesteImpacto

}

}

msg.channel.send(`**${Defensor.Nome}** foi ferido com: **Impacto Forte**.

**${Defensor.Nome}** foi Impactado até **${Defensor.NS}**.`)

}

if((TipoDano == "Cortante" || TipoDano == "Perfurante") && TesteSangramento >= 10 && TesteSangramento <= 24){

let SangramentoNumero = rollDice1d4()

let SangramentoEff = `Sangramento [${SangramentoNumero}]. `

let SliceSangramento = SangramentoEff.slice(13, 15)

if(!Defensor.Efeitos.includes("Sangramento")){

Defensor.Efeitos += SangramentoEff

} else {

let CortarSangr = Defensor.Efeitos.substring(Defensor.Efeitos.indexOf("Sangramento"), 18)

SliceSangramento = CortarSangr.slice(13, 15)

if(SliceSangramento.includes("]")){

SliceSangramento = CortarSangr.slice(13, 14)

}

let SangramentoAtualizado = SangramentoNumero + parseInt(SliceSangramento)

let SangrReplace = Defensor.Efeitos.replace(`Sangramento [${SliceSangramento}]. `, `Sangramento [${SangramentoAtualizado}]. `)

Defensor.Efeitos = SangrReplace

}

}

if((TipoDano == "Cortante" || TipoDano == "Perfurante") && TesteSangramento >= 25 && TesteSangramento <= 49){

let SangramentoNumero = rollDice1d4()

let SangramentoEff = `Sangramento [${SangramentoNumero}]. `

let SliceSangramento = SangramentoEff.slice(13, 15)

if(!Defensor.Efeitos.includes("Sangramento")){

Defensor.Efeitos += SangramentoEff

} else {

let CortarSangr = Defensor.Efeitos.substring(Defensor.Efeitos.indexOf("Sangramento"), 18)

SliceSangramento = CortarSangr.slice(13, 15)

if(SliceSangramento.includes("]")){

SliceSangramento = CortarSangr.slice(13, 14)

}

let SangramentoAtualizado = SangramentoNumero + parseInt(SliceSangramento)

let SangrReplace = Defensor.Efeitos.replace(`Sangramento [${SliceSangramento}]. `, `Sangramento [${SangramentoAtualizado}]. `)

Defensor.Efeitos = SangrReplace

}

}

if((TipoDano == "Cortante" || TipoDano == "Perfurante") && TesteSangramento >= 50){

let SangramentoNumero = rollDice3d4()

let SangramentoEff = `Sangramento [${SangramentoNumero}]. `

let SliceSangramento = SangramentoEff.slice(13, 15)

if(!Defensor.Efeitos.includes("Sangramento")){

Defensor.Efeitos += SangramentoEff

} else {

let CortarSangr = Defensor.Efeitos.substring(Defensor.Efeitos.indexOf("Sangramento"), 18)

SliceSangramento = CortarSangr.slice(13, 15)

if(SliceSangramento.includes("]")){

SliceSangramento = CortarSangr.slice(13, 14)

}

let SangramentoAtualizado = SangramentoNumero + parseInt(SliceSangramento)

let SangrReplace = Defensor.Efeitos.replace(`Sangramento [${SliceSangramento}]. `, `Sangramento [${SangramentoAtualizado}]. `)

Defensor.Efeitos = SangrReplace

}

}

if(TipoDano == "Concussao" && TesteAtordoamento >= 5 + Tenacidade && TesteAtordoamento <= 19 + Tenacidade){

Defensor.PA -= rollDice1d2()

msg.channel.send(`**${Defensor.Nome}** tomou **Atordoamento Leve**.

Pontos de Ação de **${Defensor.Nome}**: ${Defensor.PA}.`)

}

if(TipoDano == "Concussao" && TesteAtordoamento >= 20 + Tenacidade){

Defensor.PA -= rollDice2d2()

msg.channel.send(`**${Defensor.Nome}** tomou **Atordoamento Grave**.

Pontos de Ação de **${Defensor.Nome}**: ${Defensor.PA}.`)

}

if(tecAtk.Efeitos.includes("Palavra: Não se Mova")){

if(TesteDano <= 0){

msg.channel.send(`**Palavra: Não se Mova** não surtiu efeito.`)

}

if(TesteDano >= 1 && TesteDano <= 9){

Defensor.Efeitos += "Breve Pausa [1]. "

msg.channel.send(`**Palavra: Não se Mova** causou **Breve Pausa [1]**.`)

}

if(TesteDano >= 10 && TesteDano <= 19){

Defensor.Efeitos += "Parado [1]. "

msg.channel.send(`**Palavra: Não se Mova** causou **Parado**.`)

}

if(TesteDano >= 20 && TesteDano <= 49){

Defensor.Efeitos += "Imovel [1]. "

msg.channel.send(`**Palavra: Não se Mova** causou **Imovel [1]**.`)

}

if(TesteDano >= 20 && TesteDano <= 49){

Defensor.Efeitos += "Imovel [2]. "

msg.channel.send(`**Palavra: Não se Mova** causou **Imovel [2]**.`)

}

}

}

// Late Reads
if(Defensor.FA >= 0){

let Alcance = tecAtk.Alcance

if(tecAtk.Efeitos.includes("Dois Lados") && tecDef.Cmd == "Mugen"){

TesteDano *= 0.5
TesteDano = Math.floor(TesteDano)

}

if(tecAtk.Efeitos.includes("Todos os Lados") && tecDef.Cmd == "Mugen"){

TesteDano *= 0.75
TesteDano = Math.floor(TesteDano)

}

if(tecAtk.Efeitos.includes("Inofensivo")){

TesteDano = 0

}

if(tecAtk.AlcanceProf){

Alcance += tecAtk.AlcanceProf*Atacante.Prof

}

if(Alcance > Math.abs(Atacante.NS - Defensor.NS)){

// TesteDano = 0

// msg.channel.send(`**${Atacante.Nome}** não alcançou **${Defensor.Nome}**.`)

}

if(Defensor.Nomeread == "Mahito" && Atacante.Nomeread !== "Kenzo" && Atacante.Arma !== "Desarmado"){

TesteDano = 0

}

}

// Fotos e Gifs
if(Defensor.FA >= 0){

if(tecAtk.Cmd == "Bluelapse" && tecAtk.Fortalecer >= 4){

msg.channel.send({
files: [
'./pics/blue2.gif'
]
})
}

if(tecAtk.Cmd == "Canhaorika" && tecAtk.Fortalecer >= 10){

msg.channel.send({
files: [
'./pics/yutafinal.png'
]
})
}

}

if(TesteAcerto > 0 && tecAtk.Tipo.includes("Utilidade")){

msg.channel.send(`**${Atacante.Nome}** usou **${NomeAtual}** em **${Defensor.Nome}**.`)

}

// Acertou
if(TesteAcerto >= 0 && tecAtk.Tipo.includes("Ofensivo")){

Defensor.HP -= TesteDano

Defensor.HP -= DanoLetalidade

let DanoTotal = TesteDano + DanoLetalidade

msg.channel.send(`${Atacante.Nomeread} acertou **${Atacante.Mira}** de ${Defensor.Nomeread} com **${NomeAtual}**. ${Defensor.Sobrenome} ${Defensor.Nomeread} reagiu com **${Defensor.Reacao}** e foi atingido por um **Acerto ${TabelaAcerto}**.

**${Atacante.Sobrenome} ${Atacante.Nomeread}** causou **${DanoTotal}** de Dano. **${Defensor.Sobrenome} ${Defensor.Nomeread}** ficou com **${Defensor.HP}** de HP.

Acerto: ${Acerto} + **${DadoAC}** x. **${DadoES}** + ${Esquiva}.

Ataque: ${Dano} + **${DadoFE}** x. **${DadoRes}** + ${Defesa}.

> ${Atacante.Nomeread}, Pts. de Ação: **${Atacante.PA}**. Hp: **${Atacante.HP}**. Mp: **${Atacante.MP}**. Sp: **${Atacante.SP}**.

> ${Defensor.Nomeread}, Pts. de Ação: **${Defensor.PA}**. Hp: **${Defensor.HP}**. Mp: **${Defensor.MP}**. Sp: **${Defensor.SP}**.

> Iniciativa de ${Atacante.Nomeread}: **${IniciativaAtk}**. Iniciativa de ${Defensor.Nomeread}: **${IniciativaDef}**. Vantagem: **${VantIn}**.

> Dano Pré-Vantagem: **${DanoCausado}**. Dano Letal: **${DanoLetalidade}**.

> Vtg. de Acerto: **${TesteAcerto}**. Multiplicador de Acerto: **${MultiplAcerto}**. Iniciação: **${Atacante.Iniciacao}**.`)
} // Errou

if(TesteAcerto < 0 && tecAtk.Tipo.includes("Ofensivo")){

let Frase = ""

FACrit = -1

if(Defensor.Reacao == "Esquiva"){
Frase = `**${Defensor.Nome}** esquivou com sucesso.`
}

if(Defensor.Reacao == "Bloqueio" && TesteAcerto < 0){
Frase = `**${Defensor.Nome}** falhou em bloquear, mas evitou o ataque com sucesso.`
}

if(Defensor.Reacao == "Esquiva" && TesteCA < 0){
Frase = `**${Defensor.Nome}** esquivou com sucesso.`
}

if(Defensor.Reacao == "Contra Ataque" && TesteCA <= 0){
Frase = `**${Defensor.Nome}** falhou em contra-atacar, mas esquivou com sucesso.`
}

if(Defensor.Reacao == "Contra Ataque" && TesteCA > 0){
Frase = `**${Defensor.Nome}** contra atacou com sucesso.`
}

if(Defensor.Reacao == "Recuo"){
Frase = `**${Defensor.Nome}** recuou com sucesso.`
}

if(Defensor.Reacao == "Aparar"){
Frase = `**${Defensor.Nome}** aparou com sucesso.`
}

if(tecDef.Cmd == "Mugen"){

Frase = `**${Defensor.Nome}** parou o ataque no **Ilimitado**.`

let SortPic = rollDice1d2()

if(SortPic == 1){
msg.channel.send({
files: [
'./pics/limitless4.png'
]
})}

if(SortPic == 2){
msg.channel.send({
files: [
'./pics/limitless7.png'
]
})}

}

msg.channel.send(`
${Frase}

Esquiva: ${Esquiva} + **${DadoES}** x. **${DadoAC}** + ${Acerto}.

Vtg. Iniciativa: ${IniciativaAtk} x. ${IniciativaDef}**. +${VantIn}** de ${VitoriosoIn}.`)

}

// Reset de Miras

Atacante.Mira = Mirahold

if(IniciacaoStart > 0){

Atacante.Iniciacao = 0

Defensor.Iniciacao = 0

}

// Pós-Resets
if(Defensor.FA >= 0){
}

let Kenzo = db.get("usuarios").find({Nomeread : "Kenzo"}).value()
let Ryoshi = db.get("usuarios").find({Nomeread : "Ryoshi"}).value()
let Kazuki = db.get("usuarios").find({Nomeread : "Kazuki"}).value()
let Midori = db.get("usuarios").find({Nomeread : "Midori"}).value()
let Ryuji = db.get("usuarios").find({Nomeread : "Ryuji"}).value()
let Ryushiro = db.get("usuarios").find({Nomeread : "Ryushiro"}).value()

// Fim de Turno Forçado
if(Defensor.FA >= 0){

if(Atacante.PA <= 0 && AtkPA > 0){

let char = db.get("usuarios").find({Nome : nome_personagem}).value()

char.AtkMult = 0
db.write()

techs.write()

let MPAtiv = ``
let SPAtiv = ``
let HPAtiv = ``
let PAAtiv = ``

let RegenRead = ``

let HPRegen = 0

let MPRegen = 0

let SPRegen = 0

let MPReducao = char.MP_Ativacao
let SPReducao = char.SP_Ativacao
let HPReducao = char.HP_Ativacao
let PAReducao = char.PA_Ativacao

if(char.Efeitos.includes("Revestimento Comum")){

MPReducao += 1 + Math.floor(char.MP*0.02)

}

if(char.Efeitos.includes("Revestimento Avançado")){

MPReducao += 2 + Math.floor(char.MP*0.03)

}

if(char.Efeitos.includes("Revestimento Excessivo")){

MPReducao += 5 + Math.floor(char.MP*0.05)

}

let Reducao = 1 - (char.Prof*0.05 + char.PerCon*0.05)

if(Reducao <= 0.30){

Reducao = 0.30

}

MPReducao *= Reducao
MPReducao = Math.ceil(MPReducao)

if(char.Efeitos.includes("Cura Constante da Reversão")){

char.TRG += char.Prof*0.25

HPRegen += rollDice(1*char.FE, 4*char.FE)

}

if(char.Efeitos.includes("Sangramento")){

let CortarSangr = char.Efeitos.substring(char.Efeitos.indexOf("Sangramento"), 18)

let SliceSangramento = CortarSangr.slice(13, 15)

if(SliceSangramento.includes("]")){

SliceSangramento = CortarSangr.slice(13, 14)

}

parseInt(SliceSangramento)

HPRegen -= SliceSangramento

}

if(char.Efeitos.includes("Sangue se tornando Energia")){

char.TRM += char.Prof*0.25

MPRegen += rollDice(1*char.FE, 4*char.FE)

}

if(char.Efeitos.includes("Circular Sangue")){

char.TRG += char.Prof*0.25

char.TRC += char.Prof*0.25

SPRegen += rollDice(1*char.FE, 2*char.FE)

HPRegen += rollDice(1*char.FE, 4*char.FE)

}

if(char.Efeitos.includes("Loan Shark")){

MPReducao *= 3

}

if(char.Efeitos.includes("Sucção do Broto")){

MPReducao += 2
SPReducao += 1

}

let FraseReducaoHP = "gastou"

if(HPReducao <= 0){

FraseReducaoHP = "ganhou"

}

char.HP -= HPReducao
char.SP -= SPReducao
char.MP -= MPReducao
char.PA -= PAReducao

char.TRG += 1.5
char.TRC += 1.5
char.TRM += 1.5

if(char.HP < char.Max_HP*0.50 && char.Vtg.includes("Persistente (1)")){

HPRegen += 1

}

if(PAReducao > 0){

PAAtiv = `
**${char.Nomeread}** gastou **${PAReducao}** de PA com Ativações.
`

}

if(PAReducao < 0){

PAAtiv = `
**${char.Nomeread}** recuperou **${Math.abs(PAReducao)}** de PA com Ativações.
`

}

if(HPReducao > 0){

HPAtiv = `
**${char.Nomeread}** ${FraseReducaoHP} **${Math.abs(HPReducao)}** de HP com Ativações.
`

}

if(MPReducao > 0){

MPAtiv = `
**${char.Nomeread}** gastou **${MPReducao}** de MP com Ativações.
`

}

if(SPReducao > 0){

SPAtiv = `
**${char.Nomeread}** gastou **${SPReducao}** de SP com Ativações.
`

}

let RecuperarPA = 4

if(char.Efeitos.includes("Restricao Celestial")){

// RecuperarPA += 2

}

if(char.Nomeread == "Kenzo" && char.TRM >= 5){

let Rika = db.get("usuarios").find({Nomeread : "Rika"}).value()

if(Rika.MP > 0){

Rika.MP -= 80
Kenzo.HP += 20
Kenzo.MP += 80

msg.channel.send(msg.channel.send(`**Rika** entregou 80 de MP e 20 de HP pra **Kenzo**.

MP da Rika: **${Rika.MP}**.`))

}

if(Rika.MP <= 0){

msg.channel.send(`**Rika** ficou sem energia extra e se juntou á energia de Kenzo. Rika está inativa na luta.`)

}

}

if(char.TRG >= 5){

char.TRG -= 5

HPRegen += rollDice1d6() + char.RG

char.HP += HPRegen

RegenRead = `
**${char.Nome}** recuperou **${HPRegen}** de Vida, **${MPRegen}** de Mana e **${SPRegen}** de Stamina.
`

if(char.HP > char.Max_HP){

char.HP = char.Max_HP

}

}

if(char.TRC >= 5){

char.TRC -= 5

SPRegen += rollDice1d4() + Math.floor(char.RC*0.5)

char.SP += SPRegen

RegenRead = `
**${char.Nome}** recuperou **${HPRegen}** de Vida, **${MPRegen}** de Mana e **${SPRegen}** de Stamina.
`

if(char.SP > char.Max_SP){

char.SP = char.Max_SP

}

}

if(char.TRM >= 5){

char.TRM -= 5

MPRegen += rollDice1d6()

char.MP += MPRegen

RegenRead = `
**${char.Nome}** recuperou **${HPRegen}** de Vida, **${MPRegen}** de Mana e **${SPRegen}** de Stamina.
`

if(char.MP > char.Max_MP){

char.MP = char.Max_MP

}

}

let ParalisiaPorVez = "N"

if(char.Efeitos.includes("Paralisia [3]" && ParalisiaPorVez == "N")){

const ParalisiaReplace = char.Efeitos.replace("Paralisia [3] - ", "Paralisia [2] - ")
char.Efeitos = ParalisiaReplace

ParalisiaPorVez = "S"

char.PA -= 1

db.write()

}

if(char.Efeitos.includes("Paralisia [2]" && ParalisiaPorVez == "N")){

const ParalisiaReplace = char.Efeitos.replace("Paralisia [2] - ", "Paralisia [1] - ")
char.Efeitos = ParalisiaReplace

ParalisiaPorVez = "S"

char.PA -= 1

db.write()

}

if(char.Efeitos.includes("Paralisia [1]") && ParalisiaPorVez == "N"){

const ParalisiaReplace = char.Efeitos.replace("Paralisia [1] - ", "")
char.Efeitos = ParalisiaReplace

ParalisiaPorVez = "S"

char.PA -= 1

db.write()

}

if(RecuperarPA <= 0){

RecuperarPA = 1

}

char.PA += RecuperarPA

if(char.PA > char.MaxPA){

char.PA = char.MaxPA

db.write()

}

if(char.PA < char.MinPA) {

char.PA = char.MinPA

db.write()

}

msg.channel.send(`**${char.Nome}** teve seu turno encerrado por falta de Pontos de Ação.

**${char.Nome}** tem **${char.PA}** Pontos de Ação restando.
${HPAtiv}${SPAtiv}${MPAtiv}${RegenRead}`)


db.write()
techs.write()

}

}

//

// Classes
if(Defensor.FA >= 0){
if(Defensor.HP <= 0 && Defensor.Efeitos.includes("Evitar Desmaio")){

Defensor.HP = 1

let DanopraDesmaio = TesteDano - Defensor.Prof

if(DanopraDesmaio < 0){

DanopraDesmaio = 0

}

if(tecAtk.RedirecionarDano = "MP"){

Defensor.MP -= DanopraDesmaio

if(Defensor.MP == 0){

Defensor.HP = 0

}

}

msg.channel.send(`O **Bombeamento de Sangue** manteve **${Defensor.Nomeread}** acordado. O dano causado reduziu sua Mp em **${DanopraDesmaio}**.`)

}

if(Defensor.HP <= 0 && Defensor.Efeitos.includes("Fase 1: Boss")){

msg.channel.send(`**${Defensor.Nomeread}** elevou o Boss em mais uma Fase [2 / 2].`)

Defensor.PA = 4

Defensor.Max_HP *= 2

Defensor.HP = Defensor.Max_HP

}

if(Defensor.HP <= 0 && !Defensor.Efeitos.includes("Desmaio") && !Defensor.Efeitos.includes("Fase 1: Boss")){

Defensor.Efeitos += "Desmaio"

Defensor.PA = 0

if(Defensor.HP <= 0 && Defensor.Classe == "o Shikigami"){

msg.channel.send(`**${Defensor.Nomeread}** desmaiou.`)

}

if(Defensor.HP <= 0 && Defensor.Classe == "a Feiticeira"){

msg.channel.send(`**${Defensor.Nomeread}** desmaiou.`)

}

if(Defensor.HP <= 0 && Defensor.Classe == "o Feiticeiro"){

msg.channel.send(`**${Defensor.Nomeread}** desmaiou.`)

}

if(Defensor.HP <= 0 && Defensor.Classe == "a Maldição"){

msg.channel.send(`**${Defensor.Nomeread}** foi exorcizado.`)

}

if(Defensor.XP_Drop > 0){

Kenzo.XP += Defensor.XP_Drop
Ryoshi.XP += Defensor.XP_Drop
Kazuki.XP += Defensor.XP_Drop
Midori.XP += Defensor.XP_Drop
Ryuji.XP += Defensor.XP_Drop

msg.channel.send(`Todos os feiticeiros ganharam **${Defensor.XP_Drop}** de XP.`)

}

}
}

// Ups
if(Ryuji.Nivel > 1){

Randomgif = 0

if(Kenzo.Nivel < 12 && Ryuji.XP > 2500){

Randomgif = rollDice1d10()

Kenzo.Nivel = 12
Ryoshi.Nivel = 12
Kazuki.Nivel = 12
Midori.Nivel = 12
Ryuji.Nivel = 12

msg.channel.send(`> **Level Up!** Todos uparam pro nível **${Ryuji.Nivel}**!`)

}

if(Kenzo.Nivel < 13 && Ryuji.XP > 4000){

Randomgif = rollDice1d10()

Kenzo.Nivel = 13
Ryoshi.Nivel = 13
Kazuki.Nivel = 13
Midori.Nivel = 15
Ryuji.Nivel = 13

msg.channel.send(`> Level Up! **${Ryuji.Nivel}**`)

}

if(Kenzo.Nivel < 14 && Ryuji.XP > 6000){

Randomgif = rollDice1d10()

Kenzo.Nivel = 14
Ryoshi.Nivel = 14
Kazuki.Nivel = 14
Midori.Nivel = 14
Ryuji.Nivel = 14

msg.channel.send(`> Level Up! **${Ryuji.Nivel}**`)

}

if(Kenzo.Nivel < 15 && Ryuji.XP > 10000){

Randomgif = rollDice1d10()

Kenzo.Nivel = 15
Ryoshi.Nivel = 15
Kazuki.Nivel = 15
Midori.Nivel = 15
Ryuji.Nivel = 15

msg.channel.send(`> Level Up! **${Ryuji.Nivel}**`)

}

if(Kenzo.Nivel < 16 && Ryuji.XP > 12000){

Randomgif = rollDice1d10()

Kenzo.Nivel = 16
Ryoshi.Nivel = 16
Kazuki.Nivel = 16
Midori.Nivel = 16
Ryuji.Nivel = 16

msg.channel.send(`> Level Up! **${Ryuji.Nivel}**`)

}

if(Randomgif == 1){msg.channel.send({
files: [
'./pics/gif15.gif'
]
})}

if(Randomgif == 2){msg.channel.send({
files: [
'./pics/gif7.gif'
]
})}

if(Randomgif == 3){msg.channel.send({
files: [
'./pics/gif35.gif'
]
})}

if(Randomgif == 4){msg.channel.send({
files: [
'./pics/tojirabbit.gif'
]
})}

if(Randomgif == 5){msg.channel.send({
files: [
'./pics/Gif41.gif'
]
})}

if(Randomgif == 6){msg.channel.send({
files: [
'./pics/Gif43.gif'
]
})}

if(Randomgif == 7){msg.channel.send({
files: [
'./pics/Random9.png'
]
})}

if(Randomgif == 8){msg.channel.send({
files: [
'./pics/Random46.gif'
]
})}

if(Randomgif == 9){msg.channel.send({
files: [
'./pics/Random47.gif'
]
})}

if(Randomgif == 10){msg.channel.send({
files: [
'./pics/Random49.gif'
]
})}

}

db.write()

}
if(inicio_comando == "TECH"){

let id_member = msg.member.id
let char = personagem_logado(id_member)

let meiocomando = msg.content.split(" ")[1]

let meiocomando1st = meiocomando.charAt(0).toUpperCase() + meiocomando.toLowerCase().slice(1)

meiocomando = meiocomando1st

let palavradois = msg.content.split(" ")[2]

let palavraquatro = ""

let palavracinco = ""

/* let palavraquatro = msg.content.split(" ")[4]
palavraquatro = parseInt(palavraquatro) */

char.Tech = meiocomando

let Tecnica = techs.get("Techs").find({Cmd : char.Tech}).value()

// let AtivacaoTexto = Tecnica.AtivacaoEff

if(meiocomando == "Neuvoo"){msg.channel.send({
files: [
'./pics/gojofly.gif'
]
})
}

if(Tecnica.Tipo.includes("Ofensivo")){

msg.channel.send(`**${char.Nomeread}** preparou **${Tecnica.Nome}** pra atacar.`)

}

if(Tecnica.Tipo.includes("Utilidade")){

msg.channel.send(`**${char.Nomeread}** preparou **${Tecnica.Nome}**.`)

}

if(Tecnica.Tipo.includes("Defensivo")){

msg.channel.send(`**${char.Nomeread}** preparou **${Tecnica.Nome}** pra defender.`)

}

if(Tecnica.Tipo.includes("Melhoramento")){

char.PA -= Tecnica.PA

char.MP -= Tecnica.Custo

char.Efeitos += Tecnica.MelhoramentoEff

msg.channel.send(`**${char.Nomeread}** preparou **${Tecnica.Nome}** pra incrementar sua próxima ação / reação.`)

}

if(Tecnica.Efeitos.includes("Energia da Rika") && !char.Efeitos.includes(Tecnica.AtivacaoEff)){

char.HP += 200
char.Max_HP += 200
char.MP += 400
char.Max_MP += 400

} else if (Tecnica.Efeitos.includes("Energia da Rika") && char.Efeitos.includes(Tecnica.AtivacaoEff)){

char.HP -= 200
char.Max_HP -= 200
char.MP -= 400
char.Max_MP -= 400

}

if(Tecnica.Tipo.includes("Ativacao") && !char.Efeitos.includes(Tecnica.AtivacaoEff)){

if(Tecnica.Efeitos.includes("Aumentar Peso")){

Tecnica.CustoSP += Math.floor(char.Vig * Tecnica.PesoRate)

}

char.Efeitos += Tecnica.AtivacaoEff

char.MP_Ativacao += Tecnica.Custo

char.SP_Ativacao += Tecnica.CustoSP

char.HP_Ativacao += Tecnica.CustoHP

char.PA_Ativacao += Tecnica.CustoPA

msg.channel.send(`**${char.Nomeread}** ativou **${Tecnica.Nome}**.`)

} else if (char.Efeitos.includes(Tecnica.AtivacaoEff)){

const Effreplace = char.Efeitos.replace(Tecnica.AtivacaoEff, "")
char.Efeitos = Effreplace

char.MP_Ativacao -= Tecnica.Custo

char.SP_Ativacao -= Tecnica.CustoSP

char.HP_Ativacao -= Tecnica.CustoHP

char.PA_Ativacao -= Tecnica.CustoPA

char.Tech = "N"

msg.channel.send(`**${char.Nomeread}** desativou **${Tecnica.Nome}**.`)

if(Tecnica.Efeitos.includes("Aumentar Peso")){

Tecnica.CustoSP -= Math.floor(char.Vig * Tecnica.PesoRate)

}

}

if(meiocomando == "Neuvoo"){

msg.channel.send(`**${char.Nomeread}** está Voando.

Personagens em Vôo não podem ser atacados por ações de curta distância enquanto estiverem no ar.

Se estiver voando enquanto usar uma ação de curta distância, o oponente pode te contra-atacar e te acertar.`)

// msg.channel.send({
// files: [
// './pics/whitewolf.png'
// ]
// })
}

if(meiocomando == "Torca"){

let InumakiRoll = rollDice1d2()

if(InumakiRoll == 1){

msg.channel.send({
files: [
'./pics/inumaki.gif'
]
})
}

if(InumakiRoll == 5){

msg.channel.send({
files: [
'./pics/inumaki2.gif'
]
})
}

}

if(meiocomando == "Whitedog"){

msg.channel.send({
files: [
'./pics/whitewolf.png'
]
})}

if(meiocomando == "Blackdog"){

msg.channel.send({
files: [
'./pics/blackwolf.png'
]
})}

if(meiocomando == "Nue"){

msg.channel.send({
files: [
'./pics/nue.png'
]
})}

if(meiocomando == "Serpent"){

msg.channel.send({
files: [
'./pics/serpent.png'
]
})}

if(meiocomando == "Elephant"){

msg.channel.send({
files: [
'./pics/maxelephantseal.png'
]
})}

if(meiocomando == "Deztotality"){

msg.channel.send({
files: [
'./pics/totality3.png'
]
})}

if(meiocomando == "Librika"){

msg.channel.send({
files: [
'./pics/rikalivre.png'
]
})}

if(meiocomando == "Compsangue"){

msg.channel.send({
files: [
'./pics/Piercingblood1.png'
]
})}

if(meiocomando == "Redlapse"){

msg.channel.send({
files: [
'./pics/Red.gif'
]
})}

if(meiocomando == "Deamor"){

msg.channel.send({
files: [
'./pics/Deamor.png'
]
})}

// um mod especifico de encerrar turno nas tecnicas, atribui o fim de turno em um cmd e sempre q a tecnica ler, ativa o fim de turno e perca de pa

techs.write()
db.write()

}
if(inicio_comando == "TECHO"){

let nome_personagem = msg.content.split(" ")[1]
let nomepersonagem1st = nome_personagem.charAt(0).toUpperCase() + nome_personagem.toLowerCase().slice(1)
nome_personagem = nomepersonagem1st

let id_member = msg.member.id
let char = db.get("usuarios").find({Nome : nome_personagem}).value()

let meiocomando = msg.content.split(" ")[2]
let meiocomando1st = meiocomando.charAt(0).toUpperCase() + meiocomando.toLowerCase().slice(1)
meiocomando = meiocomando1st

let palavradois = msg.content.split(" ")[3]

let palavraquatro = ""

let palavracinco = ""

/* let palavraquatro = msg.content.split(" ")[4]
palavraquatro = parseInt(palavraquatro) */

char.Tech = meiocomando

let Tecnica = techs.get("Techs").find({Cmd : char.Tech}).value()

// let AtivacaoTexto = Tecnica.AtivacaoEff

if(meiocomando == "Neuvoo"){msg.channel.send({
files: [
'./pics/gojofly.gif'
]
})
}

if(Tecnica.Tipo.includes("Ofensivo")){

msg.channel.send(`**${char.Nomeread}** preparou **${Tecnica.Nome}** pra atacar.`)

}

if(Tecnica.Tipo.includes("Utilidade")){

msg.channel.send(`**${char.Nomeread}** preparou **${Tecnica.Nome}**.`)

}

if(Tecnica.Tipo.includes("Defensivo")){

msg.channel.send(`**${char.Nomeread}** preparou **${Tecnica.Nome}** pra defender.`)

}

if(Tecnica.Tipo.includes("Melhoramento")){

char.PA -= Tecnica.PA

char.MP -= Tecnica.Custo

char.Efeitos += Tecnica.MelhoramentoEff

msg.channel.send(`**${char.Nomeread}** preparou **${Tecnica.Nome}** pra incrementar sua próxima ação / reação.`)

}

if(Tecnica.Efeitos.includes("Energia da Rika") && !char.Efeitos.includes(Tecnica.AtivacaoEff)){

char.HP += 200
char.Max_HP += 200
char.MP += 400
char.Max_MP += 400

} else if (Tecnica.Efeitos.includes("Energia da Rika") && char.Efeitos.includes(Tecnica.AtivacaoEff)){

char.HP -= 200
char.Max_HP -= 200
char.MP -= 400
char.Max_MP -= 400

}

if(Tecnica.Tipo.includes("Ativacao") && !char.Efeitos.includes(Tecnica.AtivacaoEff)){

if(Tecnica.Efeitos.includes("Aumentar Peso")){

Tecnica.CustoSP += Math.floor(char.Vig * Tecnica.PesoRate)

}

char.Efeitos += Tecnica.AtivacaoEff

char.MP_Ativacao += Tecnica.Custo

char.SP_Ativacao += Tecnica.CustoSP

char.HP_Ativacao += Tecnica.CustoHP

msg.channel.send(`**${char.Nomeread}** ativou **${Tecnica.Nome}**.`)

} else if (char.Efeitos.includes(Tecnica.AtivacaoEff)){

const Effreplace = char.Efeitos.replace(Tecnica.AtivacaoEff, "")
char.Efeitos = Effreplace

char.MP_Ativacao -= Tecnica.Custo

char.SP_Ativacao -= Tecnica.CustoSP

char.HP_Ativacao -= Tecnica.CustoHP

char.Tech = "N"

msg.channel.send(`**${char.Nomeread}** desativou **${Tecnica.Nome}**.`)

if(Tecnica.Efeitos.includes("Aumentar Peso")){

Tecnica.CustoSP -= Math.floor(char.Vig * Tecnica.PesoRate)

}

}

if(meiocomando == "Neuvoo"){

msg.channel.send(`**${char.Nomeread}** está Voando.

Personagens em Vôo não podem ser atacados por ações de curta distância enquanto estiverem no ar.

Se estiver voando enquanto usar uma ação de curta distância, o oponente pode te contra-atacar e te acertar.`)

// msg.channel.send({
// files: [
// './pics/whitewolf.png'
// ]
// })
}

if(meiocomando == "Torca"){

let InumakiRoll = rollDice1d2()

if(InumakiRoll == 1){

msg.channel.send({
files: [
'./pics/inumaki.gif'
]
})
}

if(InumakiRoll == 5){

msg.channel.send({
files: [
'./pics/inumaki2.gif'
]
})
}

}

if(meiocomando == "Whitedog"){

msg.channel.send({
files: [
'./pics/whitewolf.png'
]
})}

if(meiocomando == "Blackdog"){

msg.channel.send({
files: [
'./pics/blackwolf.png'
]
})}

if(meiocomando == "Nue"){

msg.channel.send({
files: [
'./pics/nue.png'
]
})}

if(meiocomando == "Serpent"){

msg.channel.send({
files: [
'./pics/serpent.png'
]
})}

if(meiocomando == "Elephant"){

msg.channel.send({
files: [
'./pics/maxelephantseal.png'
]
})}

if(meiocomando == "Deztotality"){

msg.channel.send({
files: [
'./pics/totality3.png'
]
})}

if(meiocomando == "Librika"){

msg.channel.send({
files: [
'./pics/rikalivre.png'
]
})}

if(meiocomando == "Piercingblood"){

msg.channel.send({
files: [
'./pics/Piercingblood1.png'
]
})}

if(meiocomando == "Redlapse"){

msg.channel.send({
files: [
'./pics/Red.gif'
]
})}

// um mod especifico de encerrar turno nas tecnicas, atribui o fim de turno em um cmd e sempre q a tecnica ler, ativa o fim de turno e perca de pa

techs.write()
db.write()

}
if(inicio_comando == "EFF"){

  // muda sua dist na hr

let id_member = msg.member.id
let char = personagem_logado(id_member)

let Tecnica = techs.get("Techs").find({Cmd : char.Tech}).value()

let meiocomando = msg.content.split(" ")[1]

let meiocomando1st = meiocomando.charAt(0).toUpperCase() + meiocomando.toLowerCase().slice(1)

meiocomando = meiocomando1st

let palavradois = msg.content.split(" ")[2]
palavradois = parseInt(palavradois)

/* let palavraquatro = msg.content.split(" ")[4]
palavraquatro = parseInt(palavraquatro) */

if(meiocomando == "Fortal"){

Tecnica.Fortalecer = palavradois

msg.channel.send(`**${char.Nome}** fortaleceu a técnica em **${Tecnica.Fortalecer}**.`)

techs.write()
}

if(meiocomando == "Impac"){

Tecnica.Impactante = palavradois

msg.channel.send(`**${char.Nome}** melhorou o efeito Impactante em **${Tecnica.Impactante}**.`)

techs.write()
}

if(meiocomando == "Magnetismo"){

Tecnica.Magnetismo = palavradois

}

if(meiocomando == "Telet"){

// a

}

if(meiocomando == "Esten"){

Tecnica.Estender = palavradois

msg.channel.send(`**${char.Nome}** estendeu a técnica em **${Tecnica.Estender}**.`)

}

if(meiocomando == "Impacto" && Tecnica.Impacto == "N"){

Tecnica.Impacto = "S"

msg.channel.send(`impacto S`)

} else if (meiocomando == "Impacto" && Tecnica.Impacto == "S"){

Tecnica.Impacto = "N"

msg.channel.send(`impacto N`)

}

if(Tecnica.Efeitos.includes("Fortalecer") && Tecnica.Fortalecer*Tecnica.MPFortalecer >= Tecnica.CustoTransform && !Tecnica.Efeitos.includes(Tecnica.EffTransform)){

Tecnica.Efeitos += Tecnica.EffTransform

msg.channel.send(`**${Tecnica.Nome}** foi fortalecida ao ponto de receber o Efeito: **${Tecnica.EffTransform}**`)

}

if(Tecnica.Efeitos.includes("Fortalecer") && Tecnica.Fortalecer*Tecnica.MPFortalecer < Tecnica.CustoTransform && Tecnica.Efeitos.includes(Tecnica.EffTransform)){

const Effreplace = Tecnica.Efeitos.replace(Tecnica.EffTransform, "")
Tecnica.Efeitos = Effreplace

msg.channel.send(`**${Tecnica.Nome}** perdeu o Efeito: **${Tecnica.EffTransform}**`)

}


/* if(Tecnica.Keywords.includes("Gasto")){
char.Gasto = 0
} */

techs.write()
db.write()

}

})

function personagem_existe(nome_personagem){
  let usuario_existente = db.get("usuarios").find({ Nome: nome_personagem }).value()
  return usuario_existente ? true : false
  }

function personagem_logado(id_member){
  let personagem = db.get("usuarios").find({id_membro: id_member}).value()
  return personagem ? personagem : false
  }

function percentage(partialValue, totalValue) {
   return (100 * partialValue) / totalValue;
}

function rollDice(min, max) {
return min + Math.floor(Math.random() * (max-min + 1))
}

let OportDesseTurno = "N"

const rollDice1d2 = () => rollDice(1, 2)
const rollDice1d4 = () => rollDice(1, 4)
const rollDice1d6 = () => rollDice(1, 6)
const rollDice1d7 = () => rollDice(1, 7)
const rollDice1d8 = () => rollDice(1, 8)

const rollDice2d2 = () => rollDice(2, 2)
const rollDice2d4 = () => rollDice(2, 8)
const rollDice3d4 = () => rollDice(3, 12)

const rollDice2d6 = () => rollDice(2, 12)

const rollDice1d10 = () => rollDice(1, 10)
const rollDice3d10 = () => rollDice(3, 30)
const rollDice4d10 = () => rollDice(4, 40)
const rollDice5d10 = () => rollDice(5, 50)
const rollDice6d10 = () => rollDice(6, 60)

const rollDice1d12 = () => rollDice(1, 12)
const rollDice2d12 = () => rollDice(2, 24)

const rollDice1d20 = () => rollDice(1, 20)
const rollDice2d20 = () => rollDice(2, 40)
const rollDice3d20 = () => rollDice(3, 60)

const rollDice7d10 = () => rollDice(7, 70)

const rollDice1d100 = () => rollDice(1, 100)

 }
}