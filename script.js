const board=document.getElementById("crossword");

const puzzle=[
0,0,0,1,0,0,0,0,0,
0,1,0,0,0,1,0,1,0,
0,0,0,1,0,0,0,0,0,
1,0,1,0,0,0,1,0,1,
0,0,0,0,1,0,0,0,0,
1,0,1,0,0,0,1,0,1,
0,0,0,1,0,0,0,0,0,
0,1,0,0,0,1,0,1,0,
0,0,0,1,0,0,0,0,0
];

puzzle.forEach(v=>{
if(v==1){
const d=document.createElement("div");
d.className="cell black";
board.appendChild(d);
}else{
const i=document.createElement("input");
i.maxLength=1;
i.className="cell";
board.appendChild(i);
}
});
