const crossword = document.getElementById("crossword");

const layout = [
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

function toggleBlack(cell){
    let timer;

    cell.addEventListener("touchstart",()=>{
        timer=setTimeout(()=>{
            cell.classList.toggle("black");

            if(cell.classList.contains("black")){
                cell.disabled=true;
                cell.value="";
            }else{
                cell.disabled=false;
            }
        },600);
    });

    cell.addEventListener("touchend",()=>{
        clearTimeout(timer);
    });

    cell.addEventListener("touchmove",()=>{
        clearTimeout(timer);
    });
}

layout.forEach(cell=>{

    if(cell===1){

        const input=document.createElement("input");
        input.className="cell black";
        input.disabled=true;
        toggleBlack(input);
        crossword.appendChild(input);

    }else{

        const input=document.createElement("input");
        input.className="cell";
        input.maxLength=1;
        toggleBlack(input);
        crossword.appendChild(input);

    }

});
