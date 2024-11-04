setTimeout(()=>{document.getElementById('pull').addEventListener('click', pull);}, 5500);

let container = document.getElementById('container');
let pullcontainer = document.getElementById('pullcontainer');
let debounce = false;
let pyroxdisp = document.getElementById('pyroxdisp');

let val = parseInt(localStorage.getItem('pyroxspent'));
if(val === null){
    localStorage.setItem('pyroxspent', 1200);
    val = 0
}
let pyroxspent = val;
document.getElementById('pyroxres').addEventListener('click', ()=>{
    localStorage.setItem('pyroxspent', 0);
    pyroxspent = 0;
    pyroxdisp.innerText = '0';
});

let students;
fetch("data.json").then(response => response.json()).then(data => {
    students = data;
    pull();
});

function select(){
    let number = Math.random() * 100;
    console.log(number);
    if(number < 3){
        return students["3star"][Math.floor(Math.random() * students["3star"].length)];
    }else if(number < 21.5){
        return students["2star"][Math.floor(Math.random() * students["2star"].length)];
    }else{
        return students["1star"][Math.floor(Math.random() * students["1star"].length)];
    }
}

function selectguarantee2(){
    let number = Math.random() * 100;
    console.log(number)
    if(number < 3){
        return students["3star"][Math.floor(Math.random() * students["3star"].length)];
    }else{
        return students["2star"][Math.floor(Math.random() * students["2star"].length)];
    }
}


function pull() {
    if (debounce){
        return;
    }
    pyroxspent += 1200;
    localStorage.setItem('pyroxspent', pyroxspent);
    pyroxdisp.innerText = pyroxspent;
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
            student = selectguarantee2();
        }else{
            student = select();
        }
        console.log(student);
        const studentname = Object.keys(student)[0];
        const anc = document.createElement('a');
        img.src = student[studentname];
        img.classList.add('animated-image');
        img.style.animationDelay = `${(0.5 * i)}s`;
        anc.href = "https://bluearchive.wiki/wiki/" + studentname.replace(" ", "_");
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
