console.log("Hello World");

//Attachement of info in the screen
const screen=document.querySelector("#screen");
const screenInfo=document.createElement("p");
screenInfo.innerText="0";
screen.appendChild(screenInfo);

//Object for the mathematical operations
const sv={
    nRes:0,
    res:0, n1:0, n2:0, o:''
}

//Object for the string variables
const index={
    current:'',
    str1:'0', str2:'0', aux:'',
}

//Variables for long conditionals
const catchableKeys=["1","2","3","4","5","6","7","8","9","0",".","+","-","x","÷","="];
const operatorsToCheck=["+","-","x","÷"];

//Function to make the keyboard useful
document.addEventListener("keydown", (event)=>{
    index.current=event.key;
    switch(index.current){
        case 'Backspace':
            index.current="DEL"; break;
        case '*':
            index.current="x"; break;
        case '/':
            index.current="÷"; break;
        case 'Enter':
            index.current="="; break;
    }
    if(index.current==="DEL"){
        obliterateIndex();
    }else if(catchableKeys.includes(index.current)){
        catchIndex();
    }
});

const buttons = document.querySelectorAll("button");
//Function for when the user uses the buttons
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        index.current=button.id;
        if((index.current==="DEL")||(index.current==="AC")){
            obliterateIndex();
        }else{
            catchIndex();
        }
    });
});

//Functions for the mathematical operations
function add(){
    sv.res=sv.n1+sv.n2;
}
function substract(){
    sv.res=sv.n1-sv.n2;
}
function multiply(){
    sv.res=sv.n1*sv.n2;
}
function divide(){
    sv.res=sv.n1/sv.n2;
}
function calculation(){
    sv.n1=Number(index.str1);
    sv.n2=Number(index.str2);
    switch(sv.o){
        case "+":
            add(); break;
        case "-":
            substract(); break;
        case "x":
            multiply(); break;
        case "÷":
            if(index.str2==='0'){
                index.str1="0";
                index.str2="0";
                index.current="0";
                screenInfo.innerText="0";
                alert("Math Error. Try again with a valid operation");
                sv.n1=0;
                sv.n2=0;
                sv.res=0;
                sv.o='';
            }else{
                divide();
            }
            break;
    }
    if(sv.res%2!==0){
        sv.nRes=sv.res.toFixed(3);
        sv.res=+sv.nRes;
    }
}

//Function to represent the elements on the calculator's screen
function catchIndex(){
    if((index.current===".")&&(screenInfo.innerText.includes("."))){
        screenInfo.innerText=index.str1;
    }else if(index.current==="="){
        if(sv.o!==''){
            showResults();
        }
    }else if(operatorsToCheck.includes(index.current)){
        if(((index.str1==="")||(index.str1==="0"))&&(screenInfo.innerText!=="0")){
            index.str1=sv.res;
            sv.o=index.current;
            screenInfo.innerText=index.current;
        }else if((index.str1!=="")&&(index.str1!=="0")){
            screenInfo.innerText=index.current;
            if((index.str2!=="")&&(index.str2!=="0")){
                showResults();
            }else{
                sv.o=index.current;
            }
        }
    }else if((screenInfo.innerText==="0")||(screenInfo.innerText===sv.o)){
        if(sv.o===''){
            if(index.current==="."){
                index.str1='0'+index.current;
            }else{
                index.str1=index.current;
            }
            screenInfo.innerText=index.str1;
        }else{
            if(index.current==="."){
                index.str2='0'+index.current;
            }else{
                index.str2=index.current;
            }
            screenInfo.innerText=index.str2;
        }
    }else{
        if(screenInfo.innerText.length<37){
            if(sv.o===''){
                index.str1+=index.current;
                screenInfo.innerText=index.str1;
            }else{
                index.str2+=index.current;
                screenInfo.innerText=index.str2;
            }
        }
    }
}

//Function to delete elements in the calculator's screen
function obliterateIndex(){
    if(index.current==="DEL"){
        if(screenInfo.innerText===index.str1){
            index.aux=index.str1.slice(0,-1);
            index.str1=index.aux;
        }else if(screenInfo.innerText===index.str2){
            index.aux=index.str2.slice(0,-1);
            index.str2=index.aux;
        }else if(screenInfo.innerText===sv.o){
            index.aux=''
        }
        if(index.aux===''){
            screenInfo.innerText='0';
        }else{
            screenInfo.innerText=index.aux;
        }
    }
    if(index.current==="AC"){
        screenInfo.innerText="0";
        index.str1=''; index.str2=''; sv.res=0; sv.n1=0; sv.n2=0; sv.o='';
    }
}

//Function to show the results in the calculator's screen
function showResults(){
    calculation();
    index.str1=sv.res.toString();
    index.str2="0"; sv.o="";
    screenInfo.innerText=index.str1;
    index.str1="";
}