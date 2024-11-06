setTimeout(()=>{document.getElementById('pull').addEventListener('click', pull);}, 5500);
let luck = 1;
let container = document.getElementById('container');
let pullcontainer = document.getElementById('pullcontainer');
let debounce = false;
let pyroxdisp = document.getElementById('pyroxdisp');
let pyroxresdiv = document.getElementById('pyroxres');
let specialcheck = document.getElementById("special")

let val = parseInt(localStorage.getItem('pyroxspent'));
if(val === null || isNaN(val)){
    localStorage.setItem('pyroxspent', 1200);
    val = 0;
}
let pyroxspent = val;
document.getElementById('pyroxres').addEventListener('click', ()=>{
    localStorage.setItem('pyroxspent', 0);
    pyroxresdiv.classList.remove("notz");
    pyroxspent = 0;
    pyroxdisp.innerText = '0';
});

let students;
fetch("students.json").then(response => response.json()).then(data => {
    students = data;
    pull();
});

function select(){
    if(luck <= 0){
        return [students["1star"][Math.floor(Math.random() * students["1star"].length)], 1];
    }
    let number = (Math.random() * 100) / luck;
    console.log(number);
    if(number < 0.01 && specialcheck.checked){
        return [students["Special"][Math.floor(Math.random() * students["Special"].length)], 4];
    }
    if(number < 3){
        return [students["3star"][Math.floor(Math.random() * students["3star"].length)], 3];
    }else if(number < 21.5){
        return [students["2star"][Math.floor(Math.random() * students["2star"].length)], 2];
    }else{
        return [students["1star"][Math.floor(Math.random() * students["1star"].length)], 1];
    }
}

function selectguarantee2(){
    if(luck === 0){
        return [students["2star"][Math.floor(Math.random() * students["2star"].length)], 2];
    }
    if(luck < 0){
        return [students["1star"][Math.floor(Math.random() * students["1star"].length)], 1];
    }
    number = (Math.random() * 100) / luck;
    console.log(number)
    if(number < 0.01 && specialcheck.checked){
        return [students["Special"][Math.floor(Math.random() * students["Special"].length)], 4];
    }
    if(number < 3){
        return [students["3star"][Math.floor(Math.random() * students["3star"].length)], 3];
    }else{
        return [students["2star"][Math.floor(Math.random() * students["2star"].length)], 2];
    }
}


function pull() {
    if (debounce){
        return;
    }
    pyroxspent += 1200;
    localStorage.setItem('pyroxspent', pyroxspent);
    pyroxdisp.innerText = pyroxspent;
    pyroxresdiv.classList.add("notz");
    debounce = true;
    let imgcontainer;
    let button;
    try{
        imgcontainer = document.getElementById('imgcontainer');
        button = document.getElementById('pull');
        button.classList.add('fadeout');
    }catch(e){

    }
    const newimgcontainer = document.createElement('div');
    newimgcontainer.id = "imgcontainer";
    
    try{
        let images = imgcontainer.children;
        for(let i = 0; i < images.length; i++){
            images[i].children[0].classList.add('fadeoutimg');
        }
    }catch(e){}
    
    for(let i = 0; i < 10; i++){
        const img = document.createElement('img');
        let student;
        if(i == 9){
            let result = selectguarantee2();
            student = result[0];
            stars = result[1];
        }else{
            let result = select();
            student = result[0];
            stars = result[1];
        }
        console.log(student);
        const studentname = Object.keys(student)[0];
        const anc = document.createElement('a');
        img.src = student[studentname];
        img.classList.add('animated-image');
        if(stars === 1){
            img.style.backgroundColor = "rgba(0, 134, 230, 0.7)"
            img.style.boxShadow = "0px 5px 10px 5px rgba(0, 134, 230, 0.8)";
        }else if(stars === 2){
            img.style.backgroundColor = "rgba(255, 234, 0, 0.8)";
            img.style.boxShadow = "0px 5px 10px 5px rgba(255, 234, 0, 0.8)";
        }else if(stars === 3){
            img.style.background = "linear-gradient(0deg, rgba(255, 0, 230, 0.8), rgba(255, 0, 119, 0.8))";
            img.style.boxShadow = "0px 5px 10px 5px rgba(255, 0, 230, 0.8)";
        }else{
            img.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            img.style.boxShadow = "0px 5px 10px 5px rgba(0, 0, 0, 0.8)";
        }
        img.style.animationDelay = `${(0.5 * i)}s`;
        anc.href = "https://bluearchive.wiki/wiki/" + studentname.replace(" ", "_");
        if(stars === 4){
            anc.href = student["Redirect"];
        }
        anc.classList.add('delay');
        anc.appendChild(img);
        
        newimgcontainer.appendChild(anc);
    }
    const newbutton = document.createElement("div");
    newbutton.id = "pull";
    newbutton.textContent = "Recruit";
    newbutton.style.fontWeight = "bold"
    setTimeout(()=>{
        try{
            pullcontainer.replaceChildren();
            pullcontainer.appendChild(newbutton);
            container.appendChild(newimgcontainer);
            imgcontainer.remove();
        }catch(e){
    
        }
    }, 500);   
    setTimeout(()=>{
        newbutton.addEventListener('click', pull);
        debounce = false;
    }, 6000);
}