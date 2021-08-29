const area = document.getElementById('area')
var box = document.getElementsByClassName('box')
const gameStyle= document.getElementById('game-style')
let move = 0
let result = ''
const contentWrapper = document.getElementById('content')
const modalResult = document.getElementById('modal-result-wrapper')
const btnClose = document.getElementById('btn-close')
const btnCloseBot = document.getElementById('btn-close-bot')
const btnCloseNoBot = document.getElementById('btn-close-no-bot')

for(i=0; i <16; i++){
    area.innerHTML += "<div class='box'></div>"
}

btnCloseBot.addEventListener('click', closeModal =>{
    gameStyle.innerHTML = "<h1>Чтобы походил бот нажмите пустую клетку</h1>"
    btnCloseBot.style.display ='none'
    btnCloseNoBot.style.display ='none'
    modalResult.style.display ='none'
    area.addEventListener('click', e => {
        if(e.target.className = 'box' ){
            if (e.target.innerHTML == ''){
                if (move % 2 == 0 ){
                    e.target.innerHTML = 'X'
                }else {
                    bot()
                }
                move++
                check()
            }
        }
    })
})

btnCloseNoBot.addEventListener('click', closeModal =>{
    btnCloseBot.style.display ='none'
    btnCloseNoBot.style.display ='none'
    modalResult.style.display ='none'
    area.addEventListener('click', e => {
        if(e.target.className = 'box' ){
            if (e.target.innerHTML == ''){
                if (move % 2 == 0 ){
                    e.target.innerHTML = 'X'
                }else {

                    e.target.innerHTML = 'O'
                }
                move++
                check()
            }
        }
    })
})

function bot(){
    let botArr= []
    for (i=0; i < box.length; i++){
        if (box[i].innerHTML==''){
            botArr.push(i)
            console.log(i)
        }
    }
    let random = botArr[Math.floor(Math.random() * botArr.length)]
    if (box[random].innerHTML ==''){
         box[random].innerHTML = 'O'
    }
}

const check = () => {
    const boxes = document.getElementsByClassName('box')
    console.log(boxes)
    const arr = [
        [0,1,2,3], [4,5,6,7], [8,9,10,11], [12,13,14,15],
        [0,4,8,12], [1,5,9,13], [2,6,10,14], [3,7,11,15],
        [0,5,10,15], [3,6,9,12]
    ]
    for (i=0; i <arr.length;i++){
        if (
            boxes[arr[i][0]].innerHTML == 'X' && boxes[arr[i][1]].innerHTML == 'X' && boxes[arr[i][2]].innerHTML == 'X' && boxes[arr[i][3]].innerHTML == 'X'
        ){
            result = 'крестики'
            prepResult(result)
        } else if (
            boxes[arr[i][0]].innerHTML == 'O' && boxes[arr[i][1]].innerHTML == 'O' && boxes[arr[i][2]].innerHTML == 'O' && boxes[arr[i][3]].innerHTML == 'O'
        ){
            result = 'нолики'
            prepResult(result)
        } else if (move==16){
            result = 'ничья'
            prepResult(result)
        }
    }

}

const prepResult = winner => {
    contentWrapper.innerHTML = `Победили ${winner}!`
    btnClose.innerHTML = `новая игр`
    modalResult.style.display ='block'
    btnClose.style.display ='block'
}

btnClose.addEventListener('click', closeModal =>{
    location.reload()
})