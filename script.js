const crossword = document.getElementById("crossword");

let editMode = true;
let selectedCell = null;
let holdTimer = null;

const layout = new Array(81).fill(0);
const numbers = {};

function renderGrid() {
    crossword.innerHTML = "";

    for (let i = 0; i < 81; i++) {

        const wrapper = document.createElement("div");
        wrapper.className = "wrapper";

        if (layout[i] === 1) {

            const black = document.createElement("div");
            black.className = "cell black";

            black.addEventListener("dblclick", () => {
                if (!editMode) return;
                layout[i] = 0;
                renderGrid();
            });

            wrapper.appendChild(black);

        } else {

            const input = document.createElement("input");
            input.className = "cell";
            input.type = "text";
            input.maxLength = 2;

            input.value = "";

            input.addEventListener("dblclick", () => {
                if (!editMode) return;
                layout[i] = 1;
                renderGrid();
            });

            input.addEventListener("touchstart", () => {

                if (!editMode) return;

                holdTimer = setTimeout(() => {

                    selectedCell = i;

                    document.getElementById("popup").style.display = "flex";

                    document.getElementById("numberInput").value =
                        numbers[i] || "";

                }, 600);

            });

            input.addEventListener("touchend", () => {
                clearTimeout(holdTimer);
            });

            wrapper.appendChild(input);

        }

        if (numbers[i] !== undefined) {

            const no = document.createElement("span");
            no.className = "number";
            no.textContent = numbers[i];

            wrapper.appendChild(no);

        }

        crossword.appendChild(wrapper);

    }

}

renderGrid();
// ===== Popup Buttons =====

const popup = document.getElementById("popup");
const numberInput = document.getElementById("numberInput");

document.getElementById("saveNumber").onclick = () => {

    if (selectedCell !== null) {

        const n = parseInt(numberInput.value);

        if (!isNaN(n)) {

            numbers[selectedCell] = n;

        }

        popup.style.display = "none";

        renderGrid();

    }

};

document.getElementById("removeNumber").onclick = () => {

    if (selectedCell !== null) {

        delete numbers[selectedCell];

    }

    popup.style.display = "none";

    renderGrid();

};

document.getElementById("closePopup").onclick = () => {

    popup.style.display = "none";

};


// ===== Edit / Play =====

document.getElementById("editBtn").onclick = () => {

    editMode = true;

    alert("Edit Mode ON");

};

document.getElementById("playBtn").onclick = () => {

    editMode = false;

    alert("Play Mode ON");

};


// ===== Clear =====

document.getElementById("clearBtn").onclick = () => {

    if(confirm("Grid clear karna hai?")){

        for(let i=0;i<81;i++){

            layout[i]=0;

        }

        for(let k in numbers){

            delete numbers[k];

        }

        renderGrid();

    }

};


// ===== Save Layout =====

document.getElementById("saveBtn").onclick = () => {

    const data = {

        layout,

        numbers

    };

    navigator.clipboard.writeText(JSON.stringify(data));

    alert("Layout Copy ho gaya.");

};


// ===== Mobile Double Tap =====

let lastTap = 0;

crossword.addEventListener("touchend",(e)=>{

    if(!editMode) return;

    const now = Date.now();

    if(now-lastTap<300){

        const target=e.target;

        const cells=[...crossword.querySelectorAll(".cell")];

        const index=cells.indexOf(target);

        if(index>-1){

            layout[index]=layout[index]?0:1;

            renderGrid();

        }

    }

    lastTap=now;

});
// ============================
// PART 5 - Save / Load / Hindi
// ============================

// हर सेल का डेटा
let letters = new Array(81).fill("");

// ग्रिड अपडेट करें
function updateLetters() {

    const inputs = document.querySelectorAll(".cell");

    inputs.forEach((cell,index)=>{

        if(cell.tagName==="INPUT"){

            letters[index]=cell.value;

        }

    });

}

// सेव
function savePuzzle(){

    updateLetters();

    const puzzle={

        layout:layout,

        numbers:numbers,

        letters:letters

    };

    localStorage.setItem(
        "crossword",
        JSON.stringify(puzzle)
    );

    alert("Puzzle Save Ho Gaya");

}

// लोड
function loadPuzzle(){

    const data=localStorage.getItem("crossword");

    if(!data){

        alert("Koi Save Puzzle Nahi Mila");

        return;

    }

    const puzzle=JSON.parse(data);

    layout.splice(0,81,...puzzle.layout);

    Object.keys(numbers).forEach(k=>delete numbers[k]);

    Object.assign(numbers,puzzle.numbers);

    letters.splice(0,81,...puzzle.letters);

    renderGrid();

    const inputs=document.querySelectorAll(".cell");

    inputs.forEach((cell,index)=>{

        if(cell.tagName==="INPUT"){

            cell.value=letters[index]||"";

        }

    });

}

// Ctrl+S जैसा Save Button
document.getElementById("saveBtn").onclick=savePuzzle;

// Load Button अगर बाद में जोड़ें
window.loadPuzzle=loadPuzzle;
// ============================
// PART 6 - Double Tap + Hold
// ============================

let lastTap = 0;

function attachEditorEvents() {

    document.querySelectorAll(".cell").forEach((cell,index)=>{

        if(cell.tagName!=="INPUT") return;

        // Double Tap = Black / White
        cell.addEventListener("touchend",(e)=>{

            const now=Date.now();

            if(now-lastTap<300){

                layout[index]=layout[index]?0:1;

                renderGrid();

                setTimeout(attachEditorEvents,50);

            }

            lastTap=now;

        });

        // Hold = Number Change
        let timer;

        cell.addEventListener("touchstart",()=>{

            timer=setTimeout(()=>{

                selectedCell=index;

                popup.style.display="flex";

                numberInput.value=numbers[index]||"";

            },700);

        });

        cell.addEventListener("touchend",()=>{

            clearTimeout(timer);

        });

        // Hindi Input
        cell.addEventListener("input",()=>{

            letters[index]=cell.value;

        });

    });

}

attachEditorEvents();

const oldRender=renderGrid;

renderGrid=function(){

    oldRender();

    attachEditorEvents();

};
// ============================
// PART 7 - Export / Import / Auto Save
// ============================

// Auto Save
setInterval(() => {
    try {
        updateLetters();

        localStorage.setItem("crossword-autosave",
            JSON.stringify({
                layout,
                numbers,
                letters
            })
        );
    } catch (e) {}
}, 5000);


// Export JSON
function exportPuzzle(){

    updateLetters();

    const data={
        layout,
        numbers,
        letters
    };

    const text=JSON.stringify(data,null,2);

    const blob=new Blob([text],{
        type:"application/json"
    });

    const a=document.createElement("a");

    a.href=URL.createObjectURL(blob);

    a.download="crossword.json";

    a.click();

}

window.exportPuzzle=exportPuzzle;


// Import JSON

function importPuzzle(file){

    const reader=new FileReader();

    reader.onload=function(){

        const data=JSON.parse(reader.result);

        layout.splice(0,81,...data.layout);

        Object.keys(numbers).forEach(k=>delete numbers[k]);

        Object.assign(numbers,data.numbers);

        letters.splice(0,81,...data.letters);

        renderGrid();

        document.querySelectorAll(".cell").forEach((cell,index)=>{

            if(cell.tagName==="INPUT"){

                cell.value=letters[index]||"";

            }

        });

    };

    reader.readAsText(file);

}

window.importPuzzle=importPuzzle;


// Auto Load

window.addEventListener("load",()=>{

    const data=localStorage.getItem("crossword-autosave");

    if(!data) return;

    const obj=JSON.parse(data);

    layout.splice(0,81,...obj.layout);

    Object.keys(numbers).forEach(k=>delete numbers[k]);

    Object.assign(numbers,obj.numbers);

    letters.splice(0,81,...obj.letters);

    renderGrid();

    document.querySelectorAll(".cell").forEach((cell,index)=>{

        if(cell.tagName==="INPUT"){

            cell.value=letters[index]||"";

        }

    });

});
