console.log('Script loading')

//Defining ClickPosition Array
let clickPointsX = []
let clickPointsY = []

function startup() {
  
  const totalscreen = document.getElementById('screen');
  
  //Touch listening 
  
  
  
  //TouchStart
  totalscreen.addEventListener('touchstart', e => {
    [...e.changedTouches].forEach(touch => {
      
      let XCordStart = touch.pageX;
      
      let YCordStart = touch.pageY;

     let nextX1 = XCordStart;
     let nextY1 = YCordStart;
     
     let x2 = sessionStorage.getItem('x1')
     let y2 = sessionStorage.getItem('xy')
      
      console.log('Started at ' + XCordStart, YCordStart)
      
      //Check if user is clicking on button and redirect
      
      checkPoint = localStorage.getItem('samepoint')
      
      if (checkPoint == 1 && nextX1 === x2 && nextY1 === y2 ){
      console.log('Same point')
        btnClicked()
        console.log('fn from click')
    } else {
       console.log('nothing')
    }
    
      
      
      
      
      var x1 = XCordStart;
      sessionStorage.setItem('x1', XCordStart)
      var y1 = YCordStart;
      sessionStorage.setItem('y1', YCordStart)
      
      //Hide btn when scroll starts
      
      const btnBunch = document.getElementById('lazyFinger')
      btnBunch.style.display = "none";
      
      
    })
  } )
  
  
  //Handle End
  totalscreen.addEventListener('touchend',  e => {
      [...e.changedTouches].forEach(touch => {
  
            let XCordEnd = touch.pageX;
            let YCordEnd = touch.pageY;
            
            console.log('Ended at ' + XCordEnd, YCordEnd)
            
            var x2 = XCordEnd;
            sessionStorage.setItem('x2', XCordEnd)
            var y2 = YCordEnd;
            sessionStorage.setItem('y2', YCordEnd)
            
            
            
            getAvgPoint();
            
            /*var startTime = performance.now()
            sessionStorage.setItem('startTime', startTime)
            */
            

          /*var interval = setInterval(function() {
          var elapsedTime = Date.now() - startTime;
          CurrentTime = (elapsedTime / 1000).toFixed(3);
          sessionStorage.setItem('CurrentTime', CurrentTime)
          }, 100);
          */
          
  
      })
  
          });
  
  
  //Handle Cancel 
  totalscreen.addEventListener('touchcancel', handleCancel);
  
  
  //Handle Move
  totalscreen.addEventListener('touchmove', e => {
    [...e.changedTouches].forEach(touch => {
      console.log('Moving')
      
      let XCord = touch.pageX;
      let YCord = touch.pageY;
      
      
      //Adding this (x,y) to Clickpoints Array
      clickPointsX.push(XCord)
      clickPointsY.push(YCord)
      
      //console.log("X" + clickPointsX)
      //console.log("Y" + clickPointsY)
      
      
     let AvgX = sessionStorage.getItem('AvgX')
     let AvgY = sessionStorage.getItem('AvgY')
      
      sessionStorage.setItem('samepoint', AvgY)
      
      //Average point
      //console.log(sumX , sumY)
      

      
      
      //Hide btn when finger moves
      const btnBunch = document.getElementById('lazyFinger')
      btnBunch.style.display = "none";
      
      
     //Touch time with force
     var force
     sessionStorage.setItem('force', force )
     
       force =+ touch.force;
     sessionStorage.setItem('force', force )
     
     console.log(force + " force")
    })
  });
  
  
  console.log('Initialized.');
}

document.addEventListener("DOMContentLoaded", startup);



function handleCancel(){
  console.log('Cancel listener Working')
}


function getAvgPoint(){
  var x1 = sessionStorage.getItem('x1')
  var x2 = sessionStorage.getItem('x2')
  var y1 = sessionStorage.getItem('y1')
  var y2 = sessionStorage.getItem('y2')
  
  averagePointX = (x1*1 + x2*1) / 2
  averagePointY = (y1*1 + y2*1) / 2
  
  var averagePoint = averagePointX +','+ averagePointY
  
  sessionStorage.setItem('AvgX',averagePointX )
  
  sessionStorage.setItem('AvgY',averagePointY )
  
  
  
  console.log("Average Point " + averagePointX , averagePointY)
  
  /*
  if(x1==x2 && y1==y2){
    console.log("Same point before relocation")
      //btnClicked()
  } 
  else{
    btnRelocate()
  }
  */
  
  if (averagePointX==x1==x2 && averagePointY==y1==y2) {
    console.log("Same point before clicked")
    console.log('btn clicked')
      //btnClicked()
  } else {
    btnRelocate()
    //console.log('Codition n satisfy')
  }
  
  
}

function btnRelocate(){
  //Button relocate
  const btnBunch = document.getElementById('lazyFinger')
  
  
  //Align center of button with x,y cords
  /*let centerX = btnBunch.offsetLeft + btnBunch.offsetWidth / 2;
  let centerY = btnBunch.offsetTop + btnBunch.offsetHeight / 2;
  */
  
  let AvgX = sessionStorage.getItem('AvgX')
  let AvgY = sessionStorage.getItem('AvgY')
  let x1 = sessionStorage.getItem('x1')
  let x2 = sessionStorage.getItem('x2')
  let y1 = sessionStorage.getItem('y1')
  let y2 = sessionStorage.getItem('y2')
  
  if (AvgX*2 == x1*1 && AvgY*1 == y1*1) {
    sessionStorage.setItem('samepoint', AvgX)
  } else {
    
  
    btnBunch.style.position = "absolute";
    btnBunch.style.alignItems = "center";
    btnBunch.style.left = sessionStorage.getItem('AvgX')- 75+ 'px';
    btnBunch.style.top = sessionStorage.getItem('AvgY') -30+ 'px';
    
    
    let x1 = sessionStorage.getItem('x1')
    let x2 = sessionStorage.getItem('x2')
    let y1 = sessionStorage.getItem('y1')
    let y2 = sessionStorage.getItem('y2')
    
    //if initial and final points are same, dont show btn
    if (x1 === x2 && y1 === y2 ){
      console.log('Same point')
        btnBunch.style.display = "none";
        btnClicked()
    } else {
        btnBunch.style.display = "initial";
    }
    
  }
    
    
    //Show btn when finger lifts
      /*btnBunch.style.display = "initial";*/
     
    
    
}


function btnHide(){
  const btnBunch = document.getElementById('lazyFinger');
  btnBunch.style.display="none";
}

var lazyBtn = document.getElementById('lazyFinger');


/*
document.getElementById('lazyFinger').onclick = function () {
  
}
*/


function btnClicked(){
  lazyBtn.style.display='inherit'
  lazyBtn.classList.toggle('fade');
  let checkPoint = sessionStorage.getItem('samepoint')
  
  let AvgX = sessionStorage.getItem('AvgX')
  let AvgY = sessionStorage.getItem('AvgY')
  
  
  if (checkPoint == AvgX) {
    console.log('Same point detect, no redirect')
  } else {
    window.location.replace('signup.html')
  }
  
}


//Cant figure out whats wrong the single click is turning into button click and btnclick function is executing 2 times

