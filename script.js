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

// Manual Numbering
const numbers = {
0:1,
4:2,
8:3,
11:4,
20:5,
28:6,
36:7,
44:8,
54:9,
63:10,
72:11
};

layout.forEach((cell,index)=>{

    const wrapper=document.createElement("div");
    wrapper.className="wrapper";

    if(cell===1){

        const black=document.createElement("div");
        black.className="cell black";
        wrapper.appendChild(black);

    }else{

        const input=document.createElement("input");
        input.className="cell";
        input.maxLength=1;
        wrapper.appendChild(input);

    }

    if(numbers[index]!=undefined){

        const num=document.createElement("span");
        num.className="number";
        num.innerText=numbers[index];
        wrapper.appendChild(num);

    }

    crossword.appendChild(wrapper);

});
