const gameBoxesDivs = document.querySelectorAll(".box")
const topImgs = document.querySelectorAll(".top-img")
const bottomImgs = document.querySelectorAll(".bottom-img")
const btnNewDestination = document.querySelector(".reset-new-destination")

for (let gameBox of gameBoxesDivs) {
    gameBox.addEventListener("click", gameClickHandler)
}
btnNewDestination.addEventListener("click", btnClickHander)

let clickId = 0
let swordArr = []
let shieldArr = []

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
    for (let sword of swordArr) {
        let row = Number(gameBoxesDivs[sword-1].dataset.row)
        let column = Number(gameBoxesDivs[sword-1].dataset.column)
        if (!rowSwordArr.includes(row)) {
            rowSwordArr.push(row)
            console.log(`#${row}`);
        }
        if (!columnSwordArr.includes(column)) {
            columnSwordArr.push(column)
            console.log(`*${column}`);
        }
        if (row === column) {
            leftDiagonalSwordCount ++
        } else if (row + column === 4) {
            rightDiagonalSwordCount ++
        }
    }   
    for (let shield of shieldArr) {
        let row = Number(gameBoxesDivs[shield-1].dataset.row)
        let column = Number(gameBoxesDivs[shield-1].dataset.column)
        if (!rowShieldArr.includes(row)) {
            rowShieldArr.push(row)
        }
        if (!columnShieldArr.includes(column)) {
            columnShieldArr.push(column)
        }
        if (row === column) {
            leftDiagonalShieldCount ++
        } else if (row + column === 4) {
            rightDiagonalShieldCount ++
        }
    }
    console.log(rowSwordArr);
    console.log();
    console.log(leftDiagonalShieldCount);
    if (rowSwordArr.length+2 === swordArr.length || columnSwordArr.length+2 === swordArr.length || leftDiagonalSwordCount === 3 || rightDiagonalSwordCount ===3) {
        console.log("sword win");
        document.querySelector(".game-wrapper").classList.add("unclickable")
    } else if (rowShieldArr.length+2 === shieldArr.length || columnShieldArr.length+2 === shieldArr.length || leftDiagonalShieldCount === 3 || rightDiagonalShieldCount ===3) {
        console.log("shield win");
        document.querySelector(".game-wrapper").classList.add("unclickable")
    } else if (swordArr.length === 5) {
        console.log("draw")
        document.querySelector(".game-wrapper").classList.add("unclickable")
    }

}
