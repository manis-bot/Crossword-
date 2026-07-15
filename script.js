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
