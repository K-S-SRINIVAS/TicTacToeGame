// console.log("jk");
// x="jhg";
// {
//     let x="h";
// }
// x=5;
// console.log(++x);
// console.log(4!==5);
// console.log((x>18)?"vote":"no");

// console.log(false||"l");

// let s=`hi!
// Y name
// Is`;
// console.log(s);

// let s=new String("hi k");
// console.log(s);

// function tryal(v1,v2) {
//     console.log("fg");  
//     return v1+v2;
// }

// console.log( tryal(5,6) );

// let arr=[5,77,6,7,9];
// let b=new Array('tom',5,'jerry');
// console.log("k"+arr[1]+typeof(b));
// console.log(b);
// let m=(num)=>{
//     return num*num;
// }
// let sq=arr.map(m);
// console.log(arr,sq);

// arr.sort((a,b)=>{return b-a;
// });
// arr.reverse();
// console.log(arr.shift(45),arr);

// console.log(Math.ceil(45));
// let i=6;
// while(i>0) {i-=1;
//     console.log("hi");
// let curr=new Date;
// console.log(curr.getHours(),curr.getMinutes(),curr.getSeconds());
// }
// console.log("kl");

// let a={
//     ht:50,
//     wt:40,
//     color:"b"
// }
// let c={
//     ht:90,
//     wt:40,
//     color:"b",
//     mark:80
// }

// let b=Object.assign({},c,a);a.ht=55;
// console.log(b,a);

// let e=document.getElementsByClassName('name');
// let a=document.createElement('a');
// a.setAttribute('href','index.html');
// a.setAttribute('target','blank');
// a.textContent="nextGame";
// e[0].appendChild(a);
// a.addEventListener('click',function(eve){
//     eve.preventDefault();
//     a.innerText="prevGame";

// })

let boxes=document.getElementsByClassName('box');
let names=document.getElementsByClassName('turn');
let round=document.getElementById("rounds");
let player1=document.querySelector(".player1 .player");
let player2=document.querySelector(".player2 .player");
let setName=document.querySelector('#setNameButon');
let roundLeft=document.querySelector('.round');
let scores=document.getElementsByClassName("score");
let deselect=document.querySelector('.container');
let restart=document.querySelector('.control button');

let turn=0,score1=0,score2=0;
let mat=[[1,2,3],[4,5,6],[7,8,9]];

names[0].style.backgroundColor="yellow";
function checkWin() {
         let win=false;
         for(let i=0;i<3 ;i++) {
            if( mat[i][0]==mat[i][1] && mat[i][1]==mat[i][2] ) {win=true;return win;}
         }
         
         for(let j=0;j<3 ;j++) {
            if( mat[0][j]==mat[1][j] && mat[1][j]==mat[2][j] ) {win=true;return win;}
         }

         if(mat[0][0]==mat[1][1] && mat[1][1]==mat[2][2]) win=true;
         if(mat[0][2]==mat[1][1] && mat[1][1]==mat[2][0]) win=true;
         return win;
}

function reset() {
    mat=[[1,2,3],[4,5,6],[7,8,9]];
    for(let i=0;i<9;i++) {
        boxes[i].textContent="";
      }
    turn=0;  
}

function seriesWinCheck() {console.log(score1," ",score2);
    round.setAttribute("value",--round.value);
    if(round.value==0) {
        if(score1>score2) alert(player1.textContent+" won the series");
        else if(score1<score2) alert(player2.textContent+" won the series");
        else alert("Game Tie");
    }
}

function takeInput(event) {
    if(round.value==0) { alert("set value of round to atleast 1");return;}
    if(turn%2==0) {
        let para=event.target;
        names[0].style.backgroundColor="#6ca366";
        names[1].style.backgroundColor="yellow";
        if(para.textContent=="") {
            para.textContent="◯";
            for(let k=0;k<9;k++) {
                if(boxes[k]==para) {
                    if(k<=2) mat[0][k%3]=".";
                    else if(k<=5) mat[1][k%3]=".";
                    else mat[2][k%3]=".";
                    break;
                }
            }
            if(checkWin()) {
                turn=9;
                score1++;
                scores[0].textContent=score1;
                seriesWinCheck();
             }
            else if(turn==8) {
                turn=9;
                score1++;score2++;
                scores[0].textContent=score1;
                scores[1].textContent=score2;
                seriesWinCheck();
            }  
            else turn+=1;
        }
    }
    else if(turn%2==1 && turn<9) {
        let para=event.target;
        names[1].style.backgroundColor="#6ca366";
        names[0].style.backgroundColor="yellow";
        if(para.textContent=="") {
            para.textContent="✔";
            for(let k=0;k<9;k++) {
                if(boxes[k]==para) {
                    if(k<=2) mat[0][k%3]="*";
                    else if(k<=5) mat[1][k%3]="*";
                    else mat[2][k%3]="*";
                    break;
                }
            }
            if(checkWin()) {
                turn=9;
                score2++;
                scores[1].textContent=score2;
                seriesWinCheck();
            }       
            else turn+=1;
        }
    }

    else {
        if(round.value>0) reset();
    }
}

for(let i=0;i<9;i++) {
    boxes[i].addEventListener('click', takeInput );
}

names[0].disabled=true;
names[1].disabled=true;
round.disabled=true;
roundLeft.disabled=true;

setName.addEventListener('click',function() {
       if(round.value==0) {
        names[0].disabled=false;
        names[1].disabled=false;
        names[0].focus();  
       }     
})

roundLeft.addEventListener('click',function() {
    if(round.getAttribute("value")<1) round.disabled=false;
});

deselect.addEventListener('click',function(event) {
    names[0].disabled=true;
    names[1].disabled=true;
    round.disabled=true;
    names[0].setAttribute("value",names[0].value);
    names[1].setAttribute("value",names[1].value);
    player1.textContent=names[0].getAttribute("value");
    player2.textContent=names[1].getAttribute("value");
    round.setAttribute("value",round.value);
})

restart.addEventListener('click',()=>{
    reset();
    round.value=0;
    round.setAttribute("value",round.value);
    score1=0;score2=0;
    scores[0].textContent=0;
    scores[1].textContent=0;
    names[0].style.backgroundColor="yellow";
});