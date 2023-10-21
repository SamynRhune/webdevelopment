const setup = () => {
    let GLOBAL = {
        doolhof:[   ["l","l","l","l","l","l","l","l","l","l"],
                    ["l","l","l","l","l","l","l","l","l","g"],
                    ["l","l","l","l","l","l","l","l","l","l"],
                    ["l","l","l","l","l","l","l","l","l","l"],
                    ["l","l","l","l","l","m","l","l","l","l"],
                    ["l","l","l","l","l","l","l","l","l","l"],
                    ["l","l","l","l","l","l","l","l","l","l"],
                    ["l","l","l","l","l","l","l","l","l","l"],
                    ["l","l","l","l","l","l","l","l","l","l"],
                    ["s","l","l","l","l","l","l","l","l","l"]],
        queue:[]
    }

    const creerDoolhof = () =>{
        let doolhof = document.getElementById("speelveld");
        doolhof.style.width = "520px";
        doolhof.style.height = "500px";


        for(let i = 0 ; i < GLOBAL.doolhof.length ; i++){
            for(let ivak = 0 ; ivak < GLOBAL.doolhof[i].length ; ivak++){
                let vak = document.createElement("div");
                vak.style.width = "50px";
                vak.style.height = "50px";

                vak.style.border = "solid black 1px";
                if(GLOBAL.doolhof[i][ivak]==="l"){
                    vak.style.backgroundColor = "yellow";
                    vak.setAttribute("id",i+ "/"+ivak+"l");
                }
                if(GLOBAL.doolhof[i][ivak]==="m"){
                    vak.style.backgroundColor = "purple";
                    vak.setAttribute("id",i+ "/"+ivak+"m");
                }
                if(GLOBAL.doolhof[i][ivak]==="s"){
                    vak.style.backgroundColor = "blue";
                    vak.setAttribute("id",i+ "/"+ivak+"s");
                }
                if(GLOBAL.doolhof[i][ivak]==="g"){
                    vak.style.backgroundColor = "green";
                    vak.setAttribute("id",i+ "/"+ivak+"g");
                }


                doolhof.appendChild(vak);


            }
        }
    }

    const checkStart = () =>{
        //controleren op meer dan 1 start!! NOG DOEN
        let found = false;
        for(let i = 0 ; i < GLOBAL.doolhof.length ; i++){
            if(GLOBAL.doolhof[i].includes("s")){
                found = true;
            }
        }
        return found;

    }

    const checkGoal = () =>{
        let found = false;
        for(let i = 0 ; i < GLOBAL.doolhof.length ; i++){
            if(GLOBAL.doolhof[i].includes("g")){
                found = true;
            }
        }
        return found;

    }

    const startAlgoritm = () =>{
        if(checkGoal()&&checkStart()){
            console.log("Noice");
            startDeQueue();

            while(GLOBAL.queue.length !==0 && !isGoalReached()){
                getMoves(GLOBAL.queue[0]);
                GLOBAL.queue.pop();
            }
        }else{
            console.log("Er is geen start en/of doel");
        }

    }

    const getMoves = (path) =>{
        let paths = [];

        let row = path.slice(0,path.indexOf("/"));
        let column = path.slice(path.indexOf("/")+1,-1);

        if(row-1 >=0 && !isWall(row-1,column)){
            paths.unshift(row-1 + "/" + column)
            //fuck hoe weet je nu wat je erin moet steken van smgl
        }

    }

    const isWall = (row,column) =>{
        let node = document.getElementById(row + "/" + column + "m");
        if(node == null){
            return false
        }else{
            return true;
        }
    }

    const isGoalReached = () =>{
        let goal = document.getElementById(getIdGoal())
        if(goal.innerText===""){
            return false;
        }else{
            return true;
        }
    }



    const startDeQueue = () =>{
        GLOBAL.queue.push(getIdStart());
        let eerste = document.getElementById(getIdStart());
        eerste.textContent = "1";
        console.log(GLOBAL.queue)
    }

    const getIdStart = () =>{

        for(let i = 0 ; i < GLOBAL.doolhof.length ; i++){
            for(let ivak = 0 ; ivak < GLOBAL.doolhof[i].length ; ivak++){
                if(GLOBAL.doolhof[i][ivak]==="s"){
                    return i+"/"+ivak+"s";
                }

            }
        }
    }

    const getIdGoal = () =>{

        for(let i = 0 ; i < GLOBAL.doolhof.length ; i++){
            for(let ivak = 0 ; ivak < GLOBAL.doolhof[i].length ; ivak++){
                if(GLOBAL.doolhof[i][ivak]==="g"){
                    return i+"/"+ivak+"g";
                }

            }
        }
    }




    creerDoolhof();
    //startAlgoritm();



}
window.addEventListener("load", setup);