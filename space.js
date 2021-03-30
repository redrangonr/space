const grid=document.querySelector('.grid')
//chia luoi man hinh
for(let i =0;i<225;i++){
  const square =document.createElement('div')
  grid.appendChild(square)
}
let currentShooter =202// phi thuyen o vi tri 202
let width =15           //  chieu dai 15 khối
let moveAlienId
let direction =1
let goingRight = true
let removeAlien = []
let result = 0
var soundBoom= new Audio("boom.mp3")
var soundLaser= new Audio("laser.mp3")
var sounDie = new Audio("preview.mp3")
//tao mang tu chuoi, tat ca cac o div trong 1 mang
const squares = Array.from(document.querySelectorAll('.grid div'))
const currenAlien = [
  0,1,2,3,4,5,6,7,8,9,10,
  15,16,17,18,19,20,21,22,23,24,25,
  30,31,32,33,34,35,36,37,38,39,40
]
// vẽ ảnh
function draw() {
  for (let i = 0; i < currenAlien.length; i++) {
    if(!removeAlien.includes(i)){  // dieu kien khi ban trung se xoa muc tieu
      squares[currenAlien[i]].classList.add('invader')
      soundBoom.play()
    }
  }
}
//xóa ảnh
function remove() {
  for(let i=0;i<currenAlien.length;i++){
    squares[currenAlien[i]].classList.remove('invader')

  }
}
draw()
//ve phi thuyền ở ô thứ n
squares[currentShooter].classList.add('shooter')

function moveShooter(e){
  squares[currentShooter].classList.remove('shooter') // xóa ảnh
  switch (e.key){
    case 'ArrowLeft':
      if (currentShooter % width !== 0) currentShooter -=1
      break
    case 'ArrowRight' :
      if (currentShooter % width < width -1) currentShooter +=1
      break
  }
  squares[currentShooter].classList.add('shooter')
}
document.addEventListener('keydown',moveShooter)

function moveAlien(){
  const leftEdge = currenAlien[0] % width ===0
  const rightEdge =currenAlien[currenAlien.length-1] % width === width-1
  remove()
// di chuyen di xuong
  if(rightEdge && goingRight){
    for(let i=0;i<currenAlien.length;i++){
      currenAlien[i] += width +1
      direction=-1
      goingRight =false
    }
  }
// di chuyen di xuong
  if(leftEdge && !goingRight){
    for (let i=0;i<currenAlien.length;i++){
      currenAlien[i] += width -1
      direction = 1
      goingRight =true
    }
  }
  for(let i=0;i<currenAlien.length;i++){
    currenAlien[i] += direction
  }
  draw()
  // dieu kien thua khi va cham
  if(squares[currentShooter].classList.contains('invader', 'shooter')){ // va cjham
    document.querySelector('.result').innerHTML = 'Game Over'
    clearInterval(moveAlienId)
  }
  // thua khi cahn het man hinh
  for (let i = 0; i < currenAlien.length; i++) {
    if(currenAlien[i] > (squares.length)) {
      document.querySelector('.result').innerHTML = 'GAME OVER'
      clearInterval(invadersId)
    }
  }
  if(removeAlien.length===currenAlien.length ){
    document.querySelector('.result').innerHTML = 'You win'// thang khi tieu diet het alien
  }
}
moveAlienId=setInterval(moveAlien,300)
// ban dan
function shoot(e){
  let laser
  let currentLaser = currentShooter
  function moveLaser(){
    squares[currentLaser].classList.remove('laser')
    currentLaser -= width
    squares[currentLaser].classList.add('laser')

    if(squares[currentLaser].classList.contains('invader')){
      squares[currentLaser].classList.remove('laser')
      squares[currentLaser].classList.remove('invader')
      squares[currentLaser].classList.add('boom')

      setTimeout(()=>squares[currentLaser].classList.remove('boom'),300)
      clearInterval(laser)

      const destroyAlien =currenAlien.indexOf(currentLaser)
      removeAlien.push(destroyAlien)
      result ++
      document.querySelector('.result').innerHTML = result
    }
  }
  switch (e.key){
    case 'ArrowUp':
      laser = setInterval(moveLaser,100)
          soundLaser.play()

  }
}
document.addEventListener('keydown',shoot)