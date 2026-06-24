const passwordField = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const themeBtn = document.getElementById("themeBtn");
const downloadBtn = document.getElementById("downloadBtn");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

const historyList = document.getElementById("historyList");
const clearHistory = document.getElementById("clearHistory");

const upperChars =
"ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const lowerChars =
"abcdefghijklmnopqrstuvwxyz";

const numberChars =
"0123456789";

const symbolChars =
"!@#$%^&*()_+{}[]<>?/";

lengthSlider.addEventListener("input", () => {

    lengthValue.innerText =
    lengthSlider.value;

});

generateBtn.addEventListener(
    "click",
    generatePassword
);

copyBtn.addEventListener(
    "click",
    copyPassword
);

themeBtn.addEventListener(
    "click",
    toggleTheme
);

downloadBtn.addEventListener(
    "click",
    downloadPassword
);

clearHistory.addEventListener(
    "click",
    clearPasswordHistory
);

window.onload = loadHistory;

function generatePassword(){

    let chars = "";

    if(uppercase.checked)
        chars += upperChars;

    if(lowercase.checked)
        chars += lowerChars;

    if(numbers.checked)
        chars += numberChars;

    if(symbols.checked)
        chars += symbolChars;

    if(chars === ""){

        alert(
        "Select at least one option"
        );

        return;
    }

    let password = "";

    for(
        let i=0;
        i<lengthSlider.value;
        i++
    ){

        let randomIndex =
        Math.floor(
            Math.random() *
            chars.length
        );

        password +=
        chars[randomIndex];
    }

    passwordField.value =
    password;

    checkStrength(password);

    generateQRCode(password);

    saveHistory(password);
}

function copyPassword(){

    navigator.clipboard.writeText(
        passwordField.value
    );

    copyBtn.innerText =
    "Copied!";

    setTimeout(()=>{

        copyBtn.innerText =
        "Copy";

    },2000);
}

function checkStrength(password){

    if(password.length < 8){

        strengthText.innerText =
        "Weak";

        strengthBar.style.width =
        "33%";

        strengthBar.style.background =
        "red";
    }

    else if(password.length < 15){

        strengthText.innerText =
        "Medium";

        strengthBar.style.width =
        "66%";

        strengthBar.style.background =
        "orange";
    }

    else{

        strengthText.innerText =
        "Strong";

        strengthBar.style.width =
        "100%";

        strengthBar.style.background =
        "green";
    }
}

function toggleTheme(){

    document.body.classList.toggle(
        "dark"
    );

    if(
        document.body.classList.contains(
            "dark"
        )
    ){

        themeBtn.innerText =
        "☀️";
    }

    else{

        themeBtn.innerText =
        "🌙";
    }
}

function generateQRCode(password){

    document.getElementById(
        "qrcode"
    ).innerHTML = "";

    new QRCode(
        document.getElementById(
            "qrcode"
        ),
        password
    );
}

function downloadPassword(){

    const blob =
    new Blob(
        [passwordField.value],
        {type:"text/plain"}
    );

    const link =
    document.createElement("a");

    link.href =
    URL.createObjectURL(blob);

    link.download =
    "password.txt";

    link.click();
}

function saveHistory(password){

    let history =
    JSON.parse(
        localStorage.getItem(
            "passwordHistory"
        )
    ) || [];

    history.unshift(password);

    if(history.length > 10){

        history.pop();
    }

    localStorage.setItem(
        "passwordHistory",
        JSON.stringify(history)
    );

    displayHistory(history);
}

function loadHistory(){

    let history =
    JSON.parse(
        localStorage.getItem(
            "passwordHistory"
        )
    ) || [];

    displayHistory(history);
}

function displayHistory(history){

    historyList.innerHTML = "";

    history.forEach(password=>{

        let li =
        document.createElement("li");

        li.textContent =
        password;

        historyList.appendChild(li);
    });
}

function clearPasswordHistory(){

    localStorage.removeItem(
        "passwordHistory"
    );

    historyList.innerHTML = "";
}