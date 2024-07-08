

function closeControlsMenu() {
    let controlsMenu = document.getElementById("controls-menu");
    if (controlsMenu) {
        controlsMenu.classList.add("none");
    }

    let canvas=document.getElementsByTagName("canvas");
    if (canvas.length>0) {
        canvas[0].style.display = "block";
    }
    let ic=document.getElementsByTagName("i");
        for(let i=0; i<ic.length; i++){
            ic[i].style.display="inline";
        }

    let div2048=document.querySelector(".d2048");
    if (div2048) {
        div2048.classList.remove("none");
    }

    let score=document.querySelector(".score");
    if (score) {
        score.classList.remove("none");
    }


}


    let okupirane_celice=[];
    let koliko_okupiranih_celic=0;
    let koorx=[];
    let koory=[];
    let n=0;
    let canvasSize=600;
    let padding=5;
    let tileSize=0;
    let animacija=0;
    let lastKeyPressTime=0;
    let keyPressDelay=200;
    let sc=0;
    let esc=0;


    function PredNastavitve(){
        document.getElementById("Gumb").classList.add("none");
        let button=document.createElement("button");
        let div=document.createElement("div");
        let qdiv=document.createElement("div");
        div.classList.add("container");
        let slid=document.getElementById("myRange");
        slid.classList.remove("none");
        slid.classList.add("slider");
        qdiv.innerText="Izberite velikost tabele: ";
        document.body.appendChild(div);
        let output=document.createElement("div");
        button.innerText="Začni";
        output.id="under";
        output.innerHTML=slid.value;
        n=parseInt(slid.value);
        button.classList.add("gumb");
        div.appendChild(qdiv);
        div.appendChild(slid);
        div.appendChild(output);
        div.appendChild(button);
        document.body.appendChild(div);
        slid.addEventListener("input", function () {
            output.innerHTML = this.value;
            n=parseInt(this.value);
        });
        button.onclick=NarediTabelo;
        
        }


        function saveControls() {
            localStorage.setItem("up-key", document.getElementById("up-key").value);
            localStorage.setItem("down-key", document.getElementById("down-key").value);
            localStorage.setItem("right-key", document.getElementById("right-key").value);
            localStorage.setItem("left-key", document.getElementById("left-key").value);
            closeControlsMenu();
            }



    function Barva(x){
        if(x==2) return '#f2e5e5'; 
        else if (x==4) return '#ece0c8'; 
        else if (x==8) return '#f2b179'; 
        else if (x==16) return '#f59563';
        else if (x==32) return '#f67c5f'; 
        else if (x==64) return '#f65e3b'; 
        else if (x==128) return '#edcf72';
        else if (x==256) return '#edcc61';
        else if (x==512) return '#edc850'; 
        else if (x==1024) return '#edc53f';
        else if (x==2048) return '#edc22e'; 
        else if (x==0) return 'lightgray';
    }

    function NarediTabelo() {
        tileSize=(canvasSize-n*padding*2)/n; 
        let div=document.getElementsByTagName("div");
        for(let i=0; i<div.length; i++){
            div[i].style.display="none";
        }
        document.getElementsByTagName("button")[0].style.display="none";
        

        let canvas=document.createElement("canvas");
        let ctx=canvas.getContext("2d");

        canvas.width=canvas.height=canvasSize;
    

        let prva=Math.floor(Math.random()*(n*n)) +1;
        let druga=Math.floor(Math.random()*(n*n)) +1;

         while (prva==druga) druga=Math.floor(Math.random()*(n*n)) + 1;

        let prava = 1;
        for (let i=0; i<n; i++){
            let tab=[];
            let pomx=[];
            let pomy=[];
            for (let j=0; j<n; j++){
                let x=j*(tileSize+padding)+padding;
                let y=i*(tileSize+padding)+padding;
                ctx.strokeStyle = "darkgray";
                ctx.lineWidth = 5;
                ctx.strokeRect(x, y, tileSize, tileSize);
                if (prva==prava || druga==prava) {
                    ctx.fillStyle = '#f2e5e5';
                    ctx.fillRect(x, y, tileSize, tileSize);
                    ctx.font = Font();
                    ctx.fillStyle = "black";
                    ctx.textAlign = "center";
                    ctx.fillText("2", x+tileSize/2, y+Math.floor(tileSize/1.66));
                    tab[j+1]=2;
               } else {
                    ctx.fillStyle = "lightgray";
                    tab[j+1]=0;
                    ctx.fillRect(x, y, tileSize, tileSize);
                }
                pomx[j+1]=x;
                pomy[j+1]=y;
                prava++;
            }
        koorx[i+1]=pomx;
        koory[i+1]=pomy;
        okupirane_celice[i+1]=tab;
    }
    koliko_okupiranih_celic=2;

    let div2048=document.createElement("div");
    div2048.classList.add("d2048");
    div2048.innerText="2048";

    let score=document.createElement("div");
    score.classList.add("score");
    score.innerText="Score: " + sc;
    canvas.style.margin="auto";
    canvas.style.display="block";

    document.body.appendChild(div2048);
    document.body.appendChild(score);
    let icon1=document.createElement("i");
    icon1.classList.add("material-icons");
    icon1.classList.add("ic");
    icon1.id="renew";
    icon1.innerHTML="autorenew";
    let icon2=document.createElement("i");
    icon2.classList.add("material-icons");
    icon2.classList.add("ic");
    icon2.innerHTML="settings";
    icon2.id="settings";
    document.body.appendChild(icon1);
    document.body.appendChild(icon2);
    document.body.appendChild(canvas);
    icon1.addEventListener('click', function(){
        NovaTabela();
    });
    icon2.addEventListener('click', function(){
        let div=document.getElementsByTagName("div");
        for(let i=0; i<div.length; i++){
            div[i].classList.add("none");
        }
        document.getElementsByTagName("canvas")[0].style.display="none";
        let ic=document.getElementsByTagName("i");
        for(let i=0; i<ic.length; i++){
            ic[i].style.display="none";
        }

        let up=document.getElementById("up-key");
        up.value=localStorage.getItem("up-key");
        let down=document.getElementById("down-key");
        down.value=localStorage.getItem("down-key");
        let right=document.getElementById("right-key");
        right.value=localStorage.getItem("right-key");
        let left=document.getElementById("left-key");
        left.value=localStorage.getItem("left-key");
    document.getElementById("controls-menu").classList.remove("none");
    });
}



    function NovaTabela(){
        sc=0;
        let canvas=document.getElementsByTagName("canvas");
        let ctx=canvas[0].getContext("2d");

        let prva=Math.floor(Math.random()*(n*n)) +1;
        let druga=Math.floor(Math.random()*(n*n)) +1;

        while (prva==druga) druga=Math.floor(Math.random()*(n*n)) + 1;

        let prava=1;
        for(let i=1;i<=n;i++){
            for(let j=1;j<=n;j++){
                let x=(j-1)*(tileSize+padding)+padding;
                let y=(i-1)*(tileSize+padding)+padding;
                ctx.strokeStyle = "darkgray";
                ctx.lineWidth = 5;
                ctx.strokeRect(x, y, tileSize, tileSize);
                if (prva==prava || druga==prava) {
                    ctx.fillStyle='#f2e5e5';
                    ctx.fillRect(x, y, tileSize, tileSize);
                    ctx.font = Font();
                    ctx.fillStyle = "black";
                    ctx.textAlign = "center";
                    ctx.fillText("2", x+tileSize/2, y+Math.floor(tileSize/1.66));
                    okupirane_celice[i][j]=2;
               } else {
                    ctx.fillStyle = "lightgray";
                    okupirane_celice[i][j]=0;
                    ctx.fillRect(x, y, tileSize, tileSize);
                }
                prava++;
                }
            }
            UpdateScore();
        }


    function Font(){
        if(n==3) return "64px Arial";
        else if(n==4) return "48px Arial";
        else if(n==5) return "36px Arial";
        else if(n==6) return "30px Arial";
        else if(n==7) return "24px Arial";
        else if(n==8) return "18px Arial";
    }
    



    
    
    function ObnoviTabelo(){
        let canvas=document.getElementsByTagName("canvas");
        let ctx=canvas[0].getContext("2d");
        for(let i=1;i<=n;i++){
            for(let j=1;j<=n;j++){
                let x=(j-1)*(tileSize + padding) + padding;
                let y=(i-1)*(tileSize + padding) + padding;
                ctx.strokeStyle = "darkgray";
                ctx.lineWidth = 5;
                ctx.strokeRect(x, y, tileSize, tileSize);
                if(okupirane_celice[i][j]>0){
                    ctx.fillStyle = Barva(okupirane_celice[i][j]); 
                    ctx.fillRect(x, y, tileSize, tileSize);
                    ctx.font = Font();
                    ctx.fillStyle = "black";
                    ctx.textAlign = "center";
                    ctx.fillText(okupirane_celice[i][j], x+tileSize/2, y+Math.floor(tileSize/1.66));
                }
                else if(okupirane_celice[i][j]==0){
                    ctx.fillStyle = "lightgray";
                    ctx.fillRect(x, y, tileSize, tileSize);
                }
            }
        }
    }

        function JeOkupirana(prava, n){
            for(let i=1;i<=n;i++){
                for(let j=1;j<=n;j++){
                    if(okupirane_celice[i][j]%2==0 && okupirane_celice[i][j]>0 && ((i-1)*n+j)==prava) return 1;
                }
            }
            return 0;
        }

        function UpdateScore(){
            let scor=document.getElementsByClassName("score");
            scor[0].innerText="Score: " + sc;
        }

        function dodajCelicoManually(x, celica){
            if(celica%n!=0){
            okupirane_celice[Math.floor(celica/n)+1][(celica%n)]=x;
            }
            else okupirane_celice[celica/n][n]=x;
            koliko_okupiranih_celic+=1;
            ObnoviTabelo();
        }


        function dodajCelico(){
            if(koliko_okupiranih_celic==n*n) return 0;
            let x=Math.floor(Math.random()*4)+1;
            let vr=2;
            if(x==4) vr=4;
            let celica=0;
            while(celica==0 || JeOkupirana(celica, n)==1){
                celica=Math.floor(Math.random()*(n*n))+1;
            }
            if(celica%n!=0){
            okupirane_celice[Math.floor(celica/n)+1][(celica%n)]=vr;
            }
            else okupirane_celice[celica/n][n]=vr;
            koliko_okupiranih_celic++;
            let i=Math.floor((celica-1)/n)+1;
            let j=(celica-1)%n+1;
            let canvas=document.getElementsByTagName("canvas");
            let ctx=canvas[0].getContext("2d");
            let opacity=0;

        function animate(){
            if(animacija==1) return;
            document.addEventListener('keypress', function(){
                animacija=1;
        })
            if(animacija==1) return;
            ctx.clearRect(koorx[i][j], koory[i][j], tileSize, tileSize);
            ctx.fillStyle=Barva(vr);
            ctx.globalAlpha=opacity;
            ctx.fillRect(koorx[i][j], koory[i][j], tileSize, tileSize);
            ctx.font=Font();
            ctx.fillStyle="black";
            ctx.textAlign="center";
            ctx.globalAlpha=1;
            ctx.fillText(vr, koorx[i][j]+tileSize/2, koory[i][j]+Math.floor(tileSize/1.66));

        opacity+=0.08;
        

        if (opacity<1) {
            requestAnimationFrame(animate);
        } 
        
    }
    animate();
    ObnoviTabelo();
    animacija=0;
}
            
        





        

function Condition(i, j){
            let moz=0;
            if(i==1){

                if(j==1){
                if(okupirane_celice[i][j]==okupirane_celice[i+1][j] ||
                   okupirane_celice[i][j]==okupirane_celice[i][j+1])
                   {moz++;}
                }

                else if(j==n){
                if(okupirane_celice[i][j]==okupirane_celice[i+1][j] ||
                   okupirane_celice[i][j]==okupirane_celice[i][j-1])
                   {moz++;}
                }
        
                else if(j!=1 && j!=n)
                if (okupirane_celice[i][j]==okupirane_celice[i+1][j] ||
                   okupirane_celice[i][j]==okupirane_celice[i][j+1] ||
                   okupirane_celice[i][j]==okupirane_celice[i][j-1])
                   {moz++;}

                
            }

            if(i==n){

                if(j==1){
                if(okupirane_celice[i][j]==okupirane_celice[i-1][j] ||
                   okupirane_celice[i][j]==okupirane_celice[i][j+1])
                   {moz++;}
                }

                else if(j==n){
                if(okupirane_celice[i][j]==okupirane_celice[i-1][j] ||
                   okupirane_celice[i][j]==okupirane_celice[i][j-1])
                   {moz++;}
                }
        
                else if(j!=1 && j!=n)
                if(okupirane_celice[i][j]==okupirane_celice[i-1][j] ||
                   okupirane_celice[i][j]==okupirane_celice[i][j+1] ||
                   okupirane_celice[i][j]==okupirane_celice[i][j-1])
                   {moz++;}
                
            }


            if(j==1 && i!=1 && i!=n){
                if(okupirane_celice[i][j]==okupirane_celice[i-1][j] ||
                   okupirane_celice[i][j]==okupirane_celice[i][j+1] ||
                   okupirane_celice[i][j]==okupirane_celice[i+1][j])
                   {moz++;}

            }

            if(j==n && i!=1 && i!=n){
                if(okupirane_celice[i][j]==okupirane_celice[i+1][j] ||
                   okupirane_celice[i][j]==okupirane_celice[i][j-1] ||
                   okupirane_celice[i][j]==okupirane_celice[i-1][j])
                   {moz++;}

            }

            if(j!=1 && j!=n && i!=1 && i!=n){
                if(okupirane_celice[i][j]==okupirane_celice[i+1][j] ||
                       okupirane_celice[i][j]==okupirane_celice[i][j+1] ||
                       okupirane_celice[i][j]==okupirane_celice[i][j-1] ||
                       okupirane_celice[i][j]==okupirane_celice[i-1][j]) {moz++;}
            }

            return moz;

        }

        function EndGameCondition(){
            let moz=0;
            for(let i=1;i<=n;i++){
                for(let j=1;j<=n;j++){
                    moz+=Condition(i, j);
                }
            }
            return moz;
        }

         

        

        function TerminateGame(){
                setTimeout(function(){
                let div1=document.createElement("div");
                div1.classList.add('gameOverscreenLose');
                document.body.appendChild(div1);
                div1.style.opacity=1;
                document.body.innerHTML = "";
                let div2=document.createElement("div");
                div2.classList.add("gameOver");
                div2.innerText="Zgubil si!";
                div1.appendChild(div2);
                document.body.appendChild(div1);
                }, 1000);

        }

        function WinGame(){
            for(let i=1;i<=n;i++){
                for(let j=1; j<=n; j++){
                    if(okupirane_celice[i][j]==2048) WinScreen();
                }
            }
        }

        function WinScreen(){

                setTimeout(function(){
                let div1=document.createElement("div");
                div1.classList.add('gameOverscreenWin');
                document.body.appendChild(div1);
                div1.style.opacity=1;
                document.body.innerHTML = "";
                let div2=document.createElement("div");
                div2.classList.add("gameOver");
                div2.innerText="Zmagal si!";
                div1.appendChild(div2);
                document.body.appendChild(div1);
                }, 1000);

        }


        document.addEventListener('keydown', function(event){
            
            if(event.key==='Escape'){
                console.log('81');
                TerminateGame();
            }
            ObnoviTabelo();
            let currentTime=new Date().getTime();
            if (currentTime-lastKeyPressTime < keyPressDelay){
                 return;
            }   
            lastKeyPressTime = currentTime;
            let tab=[];
            let tabd=[];
            let tabr=[];
            if(event.key===localStorage.getItem("up-key")){
                tab=Array(n).fill(0);
                for(let i=n;i>=2;i--){
                    for(let j=1;j<=n;j++){
                        if(okupirane_celice[i][j]==okupirane_celice[i-1][j] && okupirane_celice[i][j]>0 && tab[j-1]==0){
                            okupirane_celice[i-1][j]=okupirane_celice[i-1][j]*2;
                            okupirane_celice[i][j]=0;
                            tab[j-1]=1;
                            koliko_okupiranih_celic--;
                            sc+=okupirane_celice[i-1][j];
                            }
                        else if(tab[j-1]>0) tab[j-1]=0;
                        if(okupirane_celice[i-1][j]==0 && okupirane_celice[i][j]>0){
                            okupirane_celice[i-1][j]=okupirane_celice[i][j];
                            okupirane_celice[i][j]=0;
                    }
                    for(let ii=i;ii<n;ii++){
                                if(okupirane_celice[ii+1][j]>0 && okupirane_celice[ii][j]==0){
                                    okupirane_celice[ii][j]=okupirane_celice[ii+1][j];
                                    okupirane_celice[ii+1][j]=0;
                                }
                        }

                    }
                    
                }
                setTimeout(function(){
                        dodajCelico();
                    }, 20);
            }
            else if(event.key===localStorage.getItem("down-key")){
                tabd=Array(n).fill(0);
                for(let i=1;i<n;i++){
                    for(let j=1;j<=n;j++){
                        if(okupirane_celice[i][j]==okupirane_celice[i+1][j] && okupirane_celice[i][j]>0 && tabd[j-1]==0){
                            okupirane_celice[i+1][j]=okupirane_celice[i+1][j]*2;
                            okupirane_celice[i][j]=0;
                            tabd[j-1]=1;
                            koliko_okupiranih_celic--;
                            sc+=okupirane_celice[i+1][j];
                            }
                        else if(tabd[j-1]>0) tabd[j-1]=0;
                        if(okupirane_celice[i+1][j]==0 && okupirane_celice[i][j]>0){
                            okupirane_celice[i+1][j]=okupirane_celice[i][j];
                            okupirane_celice[i][j]=0;
                        }
                        for(let ii=i;ii>1;ii--){
                                if(okupirane_celice[ii-1][j]>0 && okupirane_celice[ii][j]==0){
                                    okupirane_celice[ii][j]=okupirane_celice[ii-1][j];
                                    okupirane_celice[ii-1][j]=0;
                                }
                            }

                    }
                    
                }
                setTimeout(function(){
                        dodajCelico();
                    }, 20);
            }
            else if(event.key===localStorage.getItem("left-key")){
                tabl=Array(n).fill(0);
                for(let j=n;j>=2;j--){
                    for(let i=1;i<=n;i++){
                        if(okupirane_celice[i][j]==okupirane_celice[i][j-1] && okupirane_celice[i][j]>0 && tabl[i-1]==0){
                            okupirane_celice[i][j-1]=okupirane_celice[i][j-1]*2;
                            okupirane_celice[i][j]=0;
                            tabl[i-1]=1;
                            koliko_okupiranih_celic--;
                            sc+=okupirane_celice[i][j-1];
                            }
                        else if(tabl[i-1]>0) tabl[i-1]=0;
                        if(okupirane_celice[i][j-1]==0 && okupirane_celice[i][j]>0){
                            okupirane_celice[i][j-1]=okupirane_celice[i][j];
                            okupirane_celice[i][j]=0;
                    }
                    for(let jj=j;jj<n;jj++){
                                if(okupirane_celice[i][jj+1]>0 && okupirane_celice[i][jj]==0){
                                    okupirane_celice[i][jj]=okupirane_celice[i][jj+1];
                                    okupirane_celice[i][jj+1]=0;
                                }
                            }

                    }
                    
                }
                setTimeout(function(){
                        dodajCelico();
                    }, 20);
            }
            else if(event.key===localStorage.getItem("right-key")){
                tabr=Array(n).fill(0);
                for(let j=1;j<n;j++){
                    for(let i=1;i<=n;i++){
                        if(okupirane_celice[i][j]==okupirane_celice[i][j+1] && okupirane_celice[i][j]>0 && tabr[i-1]==0){
                            okupirane_celice[i][j+1]=okupirane_celice[i][j+1]*2;
                            okupirane_celice[i][j]=0;
                            tabr[i-1]=1;
                            koliko_okupiranih_celic--;
                            sc+=okupirane_celice[i][j+1];
                            }
                        else if(tabr[i-1]>0) tabr[i-1]=0;
                        if(okupirane_celice[i][j+1]==0 && okupirane_celice[i][j]>0){
                            okupirane_celice[i][j+1]=okupirane_celice[i][j];
                            okupirane_celice[i][j]=0;
                    }
                    for(let jj=j;jj>1;jj--){
                                if(okupirane_celice[i][jj-1]>0 && okupirane_celice[i][jj]==0){
                                    okupirane_celice[i][jj]=okupirane_celice[i][jj-1];
                                    okupirane_celice[i][jj-1]=0;
                                }
                            }}

                    }
                    setTimeout(function(){
                        dodajCelico();
                    }, 20);
                
            }
            ObnoviTabelo();
        
            


            UpdateScore();
            if(EndGameCondition()==0)setTimeout( TerminateGame(), 800);
            setTimeout(
            WinGame(), 800);
         } );


    