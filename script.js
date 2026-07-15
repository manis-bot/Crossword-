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
