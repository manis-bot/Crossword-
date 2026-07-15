const crossword = document.getElementById("crossword");

const layout = [
0,0,1,0,0,0,0,0,0,
0,1,0,0,0,1,0,1,0,
0,0,0,1,0,0,0,0,0,
1,0,1,0,0,0,1,0,1,
0,0,0,0,1,0,0,0,0,
1,0,1,0,0,0,1,0,1,
0,0,0,1,0,0,0,0,0,
0,1,0,0,0,1,0,1,0,
0,0,0,1,0,0,0,0,0
];

layout.forEach(cell=>{
    if(cell===1){
        const div=document.createElement("div");
        div.className="cell black";
        crossword.appendChild(div);
    }else{
        const input=document.createElement("input");
        input.className="cell";
        input.maxLength=1;
        crossword.appendChild(input);
    }
});
