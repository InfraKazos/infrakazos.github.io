setTimeout(()=>{document.getElementById('pull').addEventListener('click', pull);}, 5500);
let container = document.getElementById('container');
let pullcontainer = document.getElementById('pullcontainer');
let debounce = false;

let students;
fetch("data.json").then(response => response.json()).then(data => students = data);

/*
def yar(*things):
    number = random.uniform(0, 100)
    cumulative = 0
    sortedlists = sorted(things, key=lambda x: x[1])
    for i in sortedlists:
        if number < (i[1] + cumulative):
            return (random.choice(i[0]), i[2])
        cumulative += i[1]
*/
function select(){
    number = Math.random() * 100;
    if(number < 3){
        return students["3star"][Math.floor(Math.random() * students["3star"].length)];
    }else if(number < 21.5){
        return students["2star"][Math.floor(Math.random() * students["2star"].length)];
    }else{
        return students["1star"][Math.floor(Math.random() * students["1star"].length)];
    }
}

function selectguarantee2(){
    number = Math.random() * 100;
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
            images[i].classList.add('fadeoutimg');
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
        img.src = student[studentname];
        img.classList.add('animated-image');
        newimgcontainer.appendChild(img);
    }
    const newbutton = document.createElement("div");
    newbutton.id = "pull";
    newbutton.textContent = "Pull";
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
setTimeout(()=>{
    pull();
}, 100)