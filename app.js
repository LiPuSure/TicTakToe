const gameBoxesDivs = document.querySelectorAll(".box")
const topImgs = document.querySelectorAll(".top-img")
const bottomImgs = document.querySelectorAll(".bottom-img")
const btnNewDestination = document.querySelector(".reset-new-destination")
const gameDiv = document.querySelector('.game-wrapper')
const characterSwordImg = document.querySelector(".sword-character")
const characterShieldImg = document.querySelector(".shield-character")
const winnerImgs = document.querySelectorAll(".winner-img img")
const musicBtn = document.querySelector(".background-music-btn")
const music = document.querySelectorAll("audio")
let gameRoundCount = 0
let clickId = 0
let swordArr = []
let shieldArr = []
let destinationCount = -1
let currentStop = "loginin"
let destinationObject = {herta: 'images/herta.png', jarilo: 'images/Jarilo-VI.png', luofu: 'images/luofu.png'}
let destinationArr = Object.keys(destinationObject)


for (let gameBox of gameBoxesDivs) {
    gameBox.addEventListener("click", gameClickHandler)
}
btnNewDestination.addEventListener("click", btnClickHander)
musicBtn.addEventListener("click", playMusic)

function gameClickHandler(event) {
    clickId ++
    const boxChosen = event.target
    const boxChosenId = Number(boxChosen.dataset.boxid)
    const swordImg = topImgs[boxChosenId-1]
    const shieldImg = bottomImgs[boxChosenId-1]
    if (clickId%2 === 1) {
        swordImg.style.visibility = "visible"
        boxChosen.classList.add("unclickable")
        swordArr.push(boxChosenId)
    } else {
        shieldImg.style.visibility = "visible"
        boxChosen.classList.add("unclickable")
        shieldArr.push(boxChosenId)
    }
    checkWin()
}

function btnClickHander(event) {
    clickId = 0
    swordArr = []
    shieldArr = []
    const disabledBoxes = document.querySelectorAll(".unclickable")
    for (let elem of disabledBoxes) {
        elem.classList.remove("unclickable")
    }
    for (let elem of topImgs) {
        elem.style.visibility = "hidden"
    }
    for (let elem of bottomImgs) {
        elem.style.visibility = "hidden"
    }
    for (let elem of winnerImgs) {
        elem.style.display = "none"
    }
   gameDiv.style.visibility = "visible"
   characterShieldImg.style.visibility = "visible"
   characterSwordImg.style.visibility = "visible"
   btnNewDestination.textContent = "Next Destination🚀"
   document.querySelector(".winner-msg").textContent = ""
   stopMusic()
   changeDestination()
   playMusic()
}

function checkWin() {
    let leftDiagonalSwordCount = 0
    let rightDiagonalSwordCount = 0
    let leftDiagonalShieldCount = 0
    let rightDiagonalShieldCount = 0
    let rowSwordArr = []
    let columnSwordArr = []
    let rowShieldArr = []
    let columnShieldArr = []
    let hasSwordWin = false
    let hasShieldWin = false
    let repeatedrowSwordArr = []
    let repeatedrowShieldArr = []
    let repeatedcolumnShieldArr = []
    let repeatedcolumnSwordArr = []
    for (let sword of swordArr) {
        let row = Number(gameBoxesDivs[sword-1].dataset.row)
        let column = Number(gameBoxesDivs[sword-1].dataset.column)
        if (!rowSwordArr.includes(row)) {
            rowSwordArr.push(row)
            console.log(`#${row}`);
        } else {
            repeatedrowSwordArr.push(row)
        }
        if (!columnSwordArr.includes(column)) {
            columnSwordArr.push(column)
            console.log(`*${column}`);
        } else {
            repeatedcolumnSwordArr.push(column)
        }
        if (row === column) {
            leftDiagonalSwordCount ++
        }  
        if (row + column === 4) {
            rightDiagonalSwordCount ++
        }
    }   
    for (let shield of shieldArr) {
        let row = Number(gameBoxesDivs[shield-1].dataset.row)
        let column = Number(gameBoxesDivs[shield-1].dataset.column)
        if (!rowShieldArr.includes(row)) {
            rowShieldArr.push(row)
        } else {
            repeatedrowShieldArr.push(row)
        }
        if (!columnShieldArr.includes(column)) {
            columnShieldArr.push(column)
        } else {
            repeatedcolumnShieldArr.push(column)
        }
        if (row === column) {
            leftDiagonalShieldCount ++
        }
        if (row + column === 4) {
            rightDiagonalShieldCount ++
        }
    }
    console.log(repeatedcolumnShieldArr);
    if ((repeatedrowSwordArr.length===2&&repeatedrowSwordArr[0]===repeatedrowSwordArr[1]) || (repeatedcolumnSwordArr.length===2&&repeatedcolumnSwordArr[0]===repeatedcolumnSwordArr[1]) || leftDiagonalSwordCount === 3 || rightDiagonalSwordCount ===3)  {
        console.log("sword win");
        hasSwordWin = true
        gameRoundCount +=1
        gameDiv.style.visibility = "hidden"
        document.querySelector(".sword-win").style.display = "initial"
        document.querySelector(".winner-msg").textContent = `Round ${gameRoundCount}: Justice Win!!!`
        document.querySelector(".winner-msg").style.color = "lightblue"
        let winSwordAudio = new Audio("video/VO_Archive_Caelus_Max_Level_Reached.ogg")
        winSwordAudio.play()
        gameDiv.classList.add("unclickable")
        document.querySelector(".message").style.textAlign = "right"
    } 
    if ((repeatedrowShieldArr.length===2&&repeatedrowShieldArr[0]===repeatedrowShieldArr[1]) || (repeatedcolumnShieldArr.length===2&&repeatedcolumnShieldArr[0]===repeatedcolumnShieldArr[1]) || leftDiagonalShieldCount === 3 || rightDiagonalShieldCount ===3) {
        console.log("shield win");
        hasShieldWin = true
        gameRoundCount +=1
        gameDiv.style.visibility = "hidden"
        document.querySelector(".shield-win").style.display = "initial"
        document.querySelector(".winner-msg").textContent = `Round ${gameRoundCount}: Evil Win!!!`
        document.querySelector(".winner-msg").style.color = "purple"
        let winShieldAudio = new Audio("video/VO_Archive_Kafka_3.ogg")
        winShieldAudio.play()
        gameDiv.classList.add("unclickable")
        document.querySelector(".message").style.textAlign = "right"
    } 
    if (swordArr.length === 5 && !hasShieldWin && !hasSwordWin) {
        console.log("draw")
        gameRoundCount +=1
        gameDiv.style.visibility = "hidden"
        document.querySelector(".draw-img").style.display = "initial"
        document.querySelector(".winner-msg").textContent = `Round ${gameRoundCount}: Peace!!!`
        document.querySelector(".winner-msg").style.color = "red"
        gameDiv.classList.add("unclickable")
        document.querySelector(".message").style.textAlign = "right"
    }

}
function changeDestination() {
    if (destinationCount === 2) {
        destinationCount = -1
    }
    destinationCount ++
    currentStop = destinationArr[destinationCount]
    document.querySelector('body').style.backgroundImage = `url(${destinationObject[currentStop]})`
    if (currentStop === "herta") {
        document.querySelector("section h1").style.color = "black"
        document.querySelector(".info-text-box").style.color = "black"
        btnNewDestination.style.backgroundColor = "grey"
    } else {
        document.querySelector("section h1").style.color = "mistyrose"
        document.querySelector(".info-text-box").style.color = "mistyrose"
        btnNewDestination.style.backgroundColor = "transparent"
    }
}

function playMusic(){
    let allStops = destinationArr.slice()
    allStops.unshift("loginin")
    currentMusic = music[allStops.indexOf(currentStop)]
    console.log(currentStop);
    if (currentMusic.paused) {
        currentMusic.play()
    } else {
        currentMusic.pause()
    }
}

function stopMusic() {
    for (let elem of music) {
        elem.pause()
    }
}