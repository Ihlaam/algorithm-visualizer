let randomize_array = document.getElementById("randomize_array_btn");
let submit_array_btn = document.getElementById("submit_array_btn");
let input_array = document.getElementById("input_array");
let sort_btn = document.getElementById("sort_btn");
let restart_btn = document.getElementById("restart_btn");
let bars_container = document.getElementById("bars_container");
let speed = document.getElementById("speed");
//let noBars = maxRange;
let heightVal = 4;
let speedVal = 100;
let sorting = false;
let unsorted_array = [];


// slider.addEventListener("input", function () {
//     noBars = slider.value;
//     maxRange = noBars;
//     bars_container.innerHTML = "";
//     unsorted_array = createRandomArray();
//     renderBars(unsorted_array);
//   });
  
speed.addEventListener("change", (e) => {
    speedVal = parseInt(e.target.value);
  });


function createRandomNum(min, max) {
     return Math.floor(Math.random() * (max - min + 1)) + min;
}

//customizable array
function createRandomArray(){
    let array = new Array(20)
    for (let i = 0; i < array.length; i++){
        array[i] = createRandomNum(1, 100)
    }
    return array;
}

document.addEventListener("DOMContentLoaded", function () {
    unsorted_array = createRandomArray();
    renderBars(unsorted_array);
});

function renderBars(array){
    bars_container.innerHTML = ""   //clear existing bars before rendering new
    for (let i = 0; i < array.length; i++){
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[i] * heightVal + "px";
        bars_container.appendChild(bar);
    }
}

randomize_array.addEventListener("click", function () {
    unsorted_array = createRandomArray();
    //bars_container.innerHTML = "";
    renderBars(unsorted_array);
});

//customizable speed
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


async function bubbleSort(array) {
    sorting = true;
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++){
        for (let j = 0; j < array.length - i - 1; j++){
            if (!sorting) return;
            if (array[j] > array [j+1]) {
                for (let k = 0; k < bars.length; k++){
                    if (k!==j && k!==j+1){
                        bars[k].style.backgroundColor = "#5838c2";
                    }
                }
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
                bars[j].style.height = array[j] * heightVal + "px";
                bars[j].style.backgroundColor = "green";
                //bars[j].innerText = array[j];
                bars[j+1].style.height = array[j+1] * heightVal + "px";
                bars[j+1].style.backgroundColor = "green";
                //bars[j+1].innerText = array[j+1];
                await sleep(speedVal);
            }
        }
        await sleep(speedVal);
    }
    sorting = false;
    return array;
}

submit_array_btn.addEventListener("click", function () {
    let user_input = input_array.value;
    unsorted_array = user_input.split(',').map(Number);
    renderBars(unsorted_array);
});

if (restart_btn) {
    restart_btn.addEventListener("click", function() {
       sorting = false; 
       resetBars();
    });
}

function resetBars() {
    let bars = document.getElementsByClassName("bar");
    for (let bar of bars) {
     bar.style.backgroundColor = "#5838c2";
    }
}

sort_btn.addEventListener("click", function () {
//    sorting = false;
//    resetBars();
//    let sorted_array = bubbleSort(unsorted_array);
//    console.log(sorted_array);
      if (!sorting)  {
        bubbleSort(unsorted_array);
      } 
});