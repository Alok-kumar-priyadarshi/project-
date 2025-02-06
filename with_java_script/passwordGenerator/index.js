const slider = document.querySelector("#slider");
const length = document.querySelector(".length");
const password = document.querySelector(".inp-pass");
const copy = document.querySelector(".copy");
const copyMsg = document.querySelector(".copy-msg");
const upper = document.querySelector("#upper");
const lower = document.querySelector("#lower");
const number = document.querySelector("#number");
const symbol = document.querySelector("#symbol");
const torch = document.querySelector(".torch");
const generate = document.querySelector(".generate");
const checkbox = document.querySelectorAll("input[type=checkbox]");
const sym = "!@#$%^&*()_+-=[]{}|.<>/?";

let passlen =10;
let checkcount;
let newPassword = "";

function handleslider(){
    slider.value = passlen;
    length.innerHTML = passlen;
}


function torchColor(color){
    torch.style.cssText = `background-color: ${color};box-shadow: 0px 0px 10px  ${color};`;
}
// torchColor("yellow");

function getRndInt(min , max){

    return Math.floor(Math.random() * (max - min)) + min;

}
function rndNum(){
    return getRndInt(-1 ,10);
}
function rndsmall(){
    return String.fromCharCode(getRndInt(97,123))
}
function rndcap(){
    return String.fromCharCode(getRndInt(65,91))
}
function rndsymbol(){
    const randomNumber = getRndInt(0,sym.length);
    return sym[randomNumber];
}

function calstr(){

    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if(upper.checked) hasUpper = true;
    if(lower.checked) hasLower = true;
    if(number.checked) hasNum = true;
    if(symbol.checked) hasSym = true;

    if(hasUpper && hasLower && hasNum &&hasSym && passlen>=10 ) {
        torchColor("green");
    } else if (hasUpper && hasLower && hasNum &&hasSym) {
        torchColor("orange");
    } else if (hasUpper && hasLower && hasNum ) {
        torchColor("yellow");
    }else {
        torchColor("red");
    }
}

slider.addEventListener('input',(e) => {
    passlen = e.target.value;
    handleslider();
})


async function copyContent(){
    console.log(password.value)
    try{
        await navigator.clipboard.writeText(password.value);
        copyMsg.innerHTML = "Copied";
        copyMsg.classList.add("active");
        setTimeout(() => {
            copyMsg.classList.remove("active");
        }, 2000);
    }catch {
        copyMsg.innerHTML = "Failed";
    }    
}

copy.addEventListener('click', (e) => {
    if (password.value) {
        password.select(); // Highlight the input text
        password.setSelectionRange(0, password.value.length); // For mobile devices
        copyContent();

    }
})
function handlecheckbox(){
    checkcount = 0;
    checkbox.forEach((e) => {
        if(e.checked) {
            checkcount++;
        }
    })
}

checkbox.forEach( (e) => {
    e.addEventListener('change', handlecheckbox())

})

function shuffle(array) {
    // Fisher-Yates shuffle
    for (let i = array.length - 1; i > 0; i--) {
        // Pick a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));

        // Swap the characters at positions i and j
        [array[i], array[j]] = [array[j], array[i]];
    }

    // Convert the array back into a string
    const shuffledPassword = array.join('');
    return shuffledPassword;
}

generate.addEventListener('click' , () => {


    newPassword = "";
    let funcArray = [];

    if (upper.checked) {
        funcArray.push(rndcap)
    }
    if (lower.checked) {
        funcArray.push(rndsmall)
    }
    if (number.checked) {
        funcArray.push(rndNum)
    }
    if (symbol.checked) {
        funcArray.push(rndsymbol)
    }

    for(let i=0; i<funcArray.length;i++) {
        newPassword += funcArray[i]();
    }

    for(let i=0;i<passlen-funcArray.length;i++){
        let rndindex = getRndInt(0 ,funcArray.length);
        newPassword += funcArray[rndindex]();
    }

    newPassword = shuffle(Array.from(newPassword));
    password.value = newPassword;
    calstr();
})
