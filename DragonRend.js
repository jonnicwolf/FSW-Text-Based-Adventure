const {question, keyInYN}=require('readline-sync')
let nameInput = question("Enter your name: ")
console.log(`Hello ${nameInput}!  Welcome to my game.`)

function quitGame() {
   let restart = keyInYN('To the well-organised mind, death is but the next great adventure. Restart?')
   console.log('Til next time '+ nameInput)
   if (restart === true) {
        start()

   } else if (restart === false) {
    console.log('Til next time '+ nameInput)
    return
   }
}

function dice(nat,min){
    return Math.floor((Math.random()* min)+nat)//nest this globally
}

function heroStat(health,atk,def,lvl,exp){
    this.health = health
    this.atk = atk
    this.def = def
    this.lvl = lvl
    this.exp = exp
}

let heroStat = new heroStat(10,10,5,1,0) 

function oppStat(enHealth, enAtk,enDef,enLvl, expGain){
    this.enHealth = enHealth
    this.enAtk = enAtk
    this.enDef = enDef
    this.enLvl = enLvl
    this.expGain = expGain
}
let oppStatTroll = new oppStat(10,5,2,1,3)

function addHealth(value, reward, risk){
   console.log('+--------------------------------------------------------------------------------------+')
   console.log('+ You rolled '+(d6 = dice(6,1))+' !                                                             +')
   if (d6 >= value){
        heroStat.health = heroStat.health+reward
        console.log('+--------------------------------------------------------------------------------------+')

        console.log('+ You gain '+reward+' health!                                                                   +')
        console.log('+ Your health is now '+heroStat.health+'!                                                            +')
    }
    else if (d6 < value){
        heroStat.health = heroStat.health-risk
        console.log('+--------------------------------------------------------------------------------------+')

        console.log('+ You take '+risk+' damage!                                                                 +')
        console.log('+ Your health is now '+heroStat.health+'!                                                   +')
    } else {
        console.log('+--------------------------------------------------------------------------------------+')

        console.log('+ Whoa someting went really wrong here!!!!!!!                                       +')
    }
}

function minusHealth(value, risk){
    d6 = dice(6,1)
    if (d6 < value){
        heroStat.health= heroStat.health-risk
    }
    console.log('+--------------------------------------------------------------------------------------+')
    console.log('+ You take '+heroStat.health-risk+' damage!                                                    +')
    console.log('+ Your health is now '+heroStat.health+'.                                                      +')
}

function dmg(atk, enDef,level){//these stats are hosted in heroStat/oppStat respectively
//define oppStat here by filling in the enemy values --> oppStat[enHealth, enAtk, enDef, enlvl, expgain]
//calc atk v resistance x level and return a number
    d6 = dice(6,1)
    crit = dice(3,1)
    let damage = Math.ceil( ( ( (2*level+10) /150) * (atk/enDef) +2) *d6)
    let critical = Math.ceil( ( ( (2*level+10) /150) * (atk/enDef) +2) *crit)

    if (d6 !== 1 && d6 !== 6){
        // console.log('+--------------------------------------------------------------------------------------+')

        // console.log('+ You did '+heroStat.health-damage+' damage to the  enemy!                                     +')
        return heroStat.health-damage

    } else if (d6 === 6){

        critHit  = damage + critical
        // console.log('+--------------------------------------------------------------------------------------+')
        return critHit
    } else if (d6 === 1){
        // console.log('+--------------------------------------------------------------------------------------+')
        // console.log('+ Your attack missed!                                                                  +')
        return heroStat.health-0
    }
}

function enDmg(enAtk,def,enLvl){//enemyArr stat are held in oppStat
    
    d6 = dice (6,1)
    d2 = dice (2,1)
    let damage = Math.ceil( ( ( (2*enLvl+10) / 150) * (enAtk/def) +2) *d6)
    if (d2 === 2){
        console.log('+ You took '+heroStat.health-damage+' damage from the enemy!')
        console.log('+ Your health is now '+heroStat.health+'!')
    } else if (d2 === 1) {
        console.log('+ The enemy missed! You take no damage.              +')
    }
}


function dodge(risk){//if dodge roll is > 3, nullify damage
    d6 = dice(6,1)
    if (d6 > 3){
       console.log('+ Succesful dodge!                                              +')
       enDmg(enAtk,def,enlvl)
    } else if (d6 < 4) {
       heroStat.health-risk
       console.log('+ You tripped during your dodge and took '+risk+' damage!       +')
       console.log('+ Your health is now '+heroStat.health+'!                                +')
    }
}


function fightOne(health,atk,lvl,enHealth,enDef,enLvl,dodgeRisk){
       while (health > 0 || enHealth > 0){
        const rls1 = require('readline-sync')
        options  = ['Attack', 'Dodge', 'Sp. Attack', 'Run']
        index = rls1.keyInSelect(options, 'What do you do?') 

        if (options[index] === options[0]){
            damage = dmg(lvl,atk,enDef)
            finalDmg = enHealth - damage
            enDmg(enAtk,def,enLvl)

        } else if (options[index] === options[1]) {
           dodge(dodgeRisk)


        } else if (options[index] === options[2]) {
            spAtk()

        } else if (options[index] === options[3]) {

            d6 = dmg(6,1)
            d6two = dmg(6,1)

            if (d6 !== d6two){ stageTwo()
            }
            else { console.log('fill this')
            }

        } else if (options[index] === options[4]){
            stageOneThree()

        } else {
            quitGame()
        }
    }//while close
}

function spAtk(){
    console.log('+ Qaspiel =>  No Special Attacks until you\'re level 3 ya lout!       +')
}



function start() {
   console.log('+=======================================================================================+')   
   console.log('+---------------------------------------------------------------------------------------+')
   console.log('+ ============//                                     ========/                     __   +')
   console.log('+ |    _      //.———----.—---—.—.———.———.———--.-----||.       /  ______.______.____| /  +')
   console.log('+ |.   |      ||   ____|   _   |    _  |  _  |      ||.   00  /_|  -___|       | _ | |  +')
   console.log('+ |.   |      ||___|   |_____._|____|  |_____|___|__||.     _   |______|___|___|_____/  +')
   console.log('+ |:   1     //                _____|  |            ||:    | |  |                       +')
   console.log('+ |: : . .  ./                 |_______|            ||: :. | :  |                       +')
   console.log('+ `---------’                                       `----\' `--‘                        +')
   console.log('+---------------------------------------------------------------------------------------+')
   console.log('+---------------------------------------------------------------------------------------+')
   console.log('+ In the land of Phimiba on the black sand coast of the Banar provinces, there lives    +')
   console.log('+ the small village of Strinostra. A valley untouched by the wars of yore for an eon.   +')
   console.log('+ Great heroes and villians alike have wrecked and gone asunder in the bony beaches of  +')
   console.log('+ Strinostra and ten thousand fold more in the windblown summit alps to the moutainous  +')
   console.log('+ east. Here in Strinostra grows then mystic Ironbark tree. The last in fact. It\'s sap +')
   console.log('+ gave the first dragons their fire and their barks gave men their first swords, whose  +') 
   console.log('+ branches were cut and bent into wands and whose fruit seeds now make load for rifles. +')
   console.log('+ We find you, dear adventurer in your forest garden, where a strange wilting flower of +')
   console.log('+ #00ffa2 glows faintly.                                                                +')

    let start = keyInYN('+ Do you pick the flower?                                                     +')
    if (start === false){
        console.log('+======================================================================================+')
        console.log('+ You choose not to pick the beautiful dying flower but nuturture it instead!          +\n\n')
        console.log('+ Until one day...                                                                     +')
        levelOne()
    } else {
        console.log('+======================================================================================+')
        console.log('+ Thy name is MUD. Prithee maketh haste hence and returneth to thy hutch.              +')
        quitGame()
    }
}

start()
console.log(dmg(10,2,1))

function levelOne(){

    console.log('+ Winged Light => Hero! Qeldrin, Eater Of All has taken nest in the great bastion of   +')
    console.log('+                 Heldana VII Crown, Castle Ironbark. Fight your way to Ironbark and   +')
    console.log('+                 slay the beast!                                                      +')    
    console.log('+                 By what name shall I address thee?                                => +\n')
    console.log('+--------------------------------------------------------------------------------------+')
    console.log('+ <= My name is '+nameInput+'                                                            <= +\n')        
    console.log('+ The light brightens to a dazzling glare, then vanishes.                              +')
    console.log('+ A small owl like any but somehow none other comes to rest on a nearby branch.        +\n')
    console.log('+ Qaspiel => I wilt beest thy companion then. I cannot assist thee on thy journey yet  +')
    console.log('+            I shall keep thee privy to all things proper and true. Qaspiel is mine    +')    
    console.log('+            name, PUKUKUKUKUKUKUKUKUKUKUKUU!                                       => +\n')

    const rls1 = require('readline-sync')
        classPick = ['Sword', 'Wand', 'Rifle']
        index = rls1.keyInSelect(classPick, 'What weapon should I take?')
        if (classPick[index] === classPick[0])
            {
            console.log('+ You grab your sword!                                                                 +')
            console.log('+ Qaspiel => How nice another warrior (>_>), can I drop the mystic accent noweth?   => +\n')
            console.log('+ You gawk at the insolent bird with annoyance and slight contempt.                    +')   
            console.log('+ => Awesome, it was annoying to talk like that but the job (~REDACTED~)damn job       +')
            console.log('+  description says "bE mYsTiCaLlllLLlL qASpiEllLL\" as if "Be Not Afraid" isn\'t      +')
            console.log('+  soooooo overdone. Blame Gabriel. Don\'t even get me started on that guy. 200% a tool.+')
            stageOne()}
        
        else if (classPick[index] === classPick[1]) {

            console.log('+ You grab your wand!                                                                  +')
            console.log('+--------------------------------------------------------------------------------------+')
            console.log('+ You gawk at the insolent bird with annoyance and slight contempt.                    +\n')   
            console.log('+ => Awesome, it was annoying to talk like that but the job (~REDACTED~)damn job       +')
            console.log('+    description says "bE mYsTiCaLlllLLlL qASpiEllLL\" as if "Be Not Afraid" isn\'t        +')
            console.log('+    soooooo overdone. Blame Gabriel. Don\'t even get me started on that guy. 200% total +')
            console.log('+    toolbag. Remember you didn\'t hear that from me!                               => +\n')
            stageOne()
        }
        
        else if (classPick[index] === classPick[2]) {
            console.log('+ You grab your rifle!                                                              \n +')
            console.log('+ Qaspiel => A mage?? In these parts? I thought only the university could train mages! +')
            console.log('+            Watch where you point those Fireballs!                                 => +\n')
            console.log('+ You gawk at the insolent bird with annoyance and slight contempt.                    +\n')   
            console.log('+ Qaspiel => Awesome, it was annoying to talk like that but the job (~REDACTED~)damn   +')
            console.log('+            job description says "bE mYsTiCaLlllLLlL qASpiEllLL\" as if "Be Not Afraid"+')
            console.log('+            isn\'t soooooo overdone. Blame Gabriel. Don\'t even get me started on that +')
            console.log('+            guy. 200% total toolbag. Remember you didn\'t hear that from me!       => +\n')
            stageOne()
        }
            
        else {
            quitGame()
        }

        function stageOne(){
            console.log('+--------------------------------------------------------------------------------------+')
            console.log('+ '+nameInput+' => Shut up bird brain, lets kick some lizard booty!                     +')
            console.log('+ '+nameInput+' darts down the dirt path of the front garden and through the village to +') 
            console.log('+ the village center where a gaping pit wide enough to host four wagon abreast at its  +') 
            console.log('+ diameter. '+nameInput+' the hero stops right at its edge and Qaspien perches on your  +') 
            console.log('+ shoulder.                                                                            +') 
            let help = keyInYN('+ Qaspiel => ~Psssssssst pssst pssssssst~                                     <=+\n')
            if (help === true){
                console.log('+--------------------------------------------------------------------------------------+')
                console.log('+ Qaspiel => If you let me help you down into the tunnel you could gain some wisdown & +') 
                console.log('+            wisdom is healthy for the body!                                           +') 
                console.log('+--------------------------------------------------------------------------------------+')
                let lift = keyInYN('+ Do you let Qaspiel assist you down, '+nameInput+'?                                     +\n')           
                if (lift === true){
                    console.log('+ Qaspiel hops on your shoulders and flaps their little wings as you decend.           +')
                    addHealth(3,10,2)
                    stageOneTwo()}
                 else {
                    console.log('+--------------------------------------------------------------------------------------+')
                    console.log('+ Qaspiel => Ahh tough luck buddy...                                                   +')
                    minusHealth(2,2)
                    console.log('+ Your health is now '+heroStat.health+'!         + ')                        
                    stageOneTwo()
                }
            }

            else {
                console.log('+--------------------------------------------------------------------------------------+')
                console.log('+ Qaspiel => (<_<) (>_>) (;_;) k then...                                               +')
                console.log('+ You fall down the hole and take some damage +')
                console.log('+ Your health is now '+heroStat.health+'!         + ')
                stageOneTwo()
            }    
        }

        function stageOneTwo(){
                console.log('+--------------------------------------------------------------------------------------+')
                console.log('+ You find yourself in a dark tunnel. A faint glint pierces the darkness to your left. +')
                const rls2 = require('readline-sync')
                investigate = ['Go left!', 'Go right!']
                index = rls2.keyInSelect(investigate, 'Left or Right?')
                
                if (investigate[index] === investigate[0]){
                    console.log('+--------------------------------------------------------------------------------------+')
                    console.log("+ You went left!                                                                       +")
                    console.log('+ Upon closer inspection, you find that the glint is reflecting off a metal surface as +')
                    console.log('+ Qaspiel\'s light dimly illuminates the tunnel.                                       +') 
                    console.log('+ '+nameInput+' => Aha! A mining cart! Its in great condition!                       <=+')
                    console.log('+ Qaspiel => I don\'t trust this rust bucket not one bit but hey I can fly so suit     +')
                    console.log('+            yourself! PUKUKUKUKUKUUU!                                               <=+')
                    stageOneThree()
                }
                else if (investigate[index] === investigate[1]){
                    console.log('+--------------------------------------------------------------------------------------+')
                    console.log("+ You went right!                                                                       +")
                    console.log('+ As you approach the dripping, the air thickens with malice and the smell of iron      +')
                    console.log('+ permeates the darkness and dread.                                                     +') 
                    console.log('+ ?????????  => Feed? Feed! CATCH AND FEED!!!!!                                       <=+')
                    console.log('+ Qaspiel => Watch it kid! Close your eyeballs!                                       <=+\n')
                    console.log('+ The angel to takes to wing and air, their small but mighty wings growing brighter with+')
                    console.log('+ each wingbeat.                                                                        +')
                    console.log('+ The sconces of the tunnel wall blaze to life and cast an ugly orange aura on a bloody +')
                    console.log('+ mouthed Troll and the few remains of a villager that hung from the ceiling. How could +')
                    console.log('+ one have gotten this far to the surface? No matter, let\'s RUMBLE!!                    +')
                }
            }  
fightOne(heroStat.health,heroStat[1],oppStat[0][2])

}
        function stageOneThree(){
            console.log('you made it!')
            quitGame()
        }
             

    
























        
        
    



 


