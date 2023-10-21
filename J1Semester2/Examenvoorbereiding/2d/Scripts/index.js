const setup = () => {

    let mouseX = event.clientX;
    let mouseY = event.clientY;

    // Log the coordinates to the console
    console.log("Mouse X:", mouseX, "Mouse Y:", mouseY);
    //VISUELE
    // Achtergrondafbeelding
    let backgroundImage = new Image();
    backgroundImage.src = "Images/background4.png";

    let bushImage = new Image();
    bushImage.src = "Images/bush.png";

    let rockImage = new Image();
    rockImage.src = "Images/rock.png";

    let airbubbleImage = new Image();
    airbubbleImage.src = "Images/airbubble.png";

    let beer = new Image();
    beer.src = "Images/bear.png";

    let invisibleWall = new Image();
    invisibleWall.src = "Images/invisibleWall.png";

    //maakt het canvas
    let canvas = document.createElement("canvas");
    canvas.width = backgroundImage.width;
    canvas.height = innerHeight;
    document.body.appendChild(canvas);



// Haal de 2D-context van het canvas op
    let context = canvas.getContext("2d");

// Spelerafbeelding
    let playerImage = new Image();
    playerImage.src = "Images/playerleft.png";

    let solidObjects = [];
    let interactiveObjects = [];


    //SPELER
// Speler object
    let player = {
            x: 400,
            y: 500,
            width: 70,
            height: 90,
            speed: 5,
            directionHorizontal: null,
            touchinground: true,
            falling:0,
            upkeypressed: false,
            jumping: 0,
            screenlocked: true,
            rightblocked: false,
            leftblocked: false,
            airnumber:10,
            airtimer: setInterval(() => player.verminderLucht(), 60000),
            showInventory: false,
            inventaris:[["vis",3],["twig",5]],
            interactable: false,
            interaction : null,
            interact: false,
            askedItems: [],

            jump: function () {
                if (this.touchinground) {
                    if (!this.upkeypressed) {
                        this.jumping += 1;
                    }
                }
            },

            verminderLucht: function (){

                this.airnumber--;

            },



            update: function () {
                //POSITIE

                scroll();

                playerScreenlocked();

                //Alles resetten
                if(this.jumping === 0 && this.y !== game.height){
                    this.touchinground = false;
                }else{
                    this.touchinground = true;
                    this.falling = 0;
                }
                this.rightblocked = false;
                this.leftblocked = false;
                player.interactable = false;
                player.interaction = null;



                //bekijk contact met objecten
                for(let i = 0 ; i < solidObjects.length ; i++) {
                    if (
                        this.x < solidObjects[i].x + solidObjects[i].width &&
                        this.x + this.width > solidObjects[i].x &&
                        this.y < solidObjects[i].y + solidObjects[i].height &&
                        this.y + this.height > solidObjects[i].y
                    ) {
                        // Player is colliding with the bush, adjust the position if needed
                        //als hij langs rechts botst
                        if (this.x + player.width >= solidObjects[i].x && this.x + player.width <= solidObjects[i].x + 10) {

                                this.rightblocked = true;

                        } else if (this.x >= solidObjects[i].x + solidObjects[i].width - 10 && this.x <= solidObjects[i].x + solidObjects[i].width) {
                            //als hij langs links botst

                                this.leftblocked = true;

                        } else if (this.y + this.height <= solidObjects[i].y + 10 && this.y + this.height >= solidObjects[i].y) {
                            //als hij langs onder botst
                            this.touchinground = true;

                        }else if(this.y <= solidObjects[i].y + solidObjects[i].height && this.y >= solidObjects[i].y + solidObjects[i].height -10){
                            this.jumping = 0;
                        }


                    }
                }

                //OVERLOOP DE INTERACTIEVE OBJECTEN
                for (let i = 0 ; i < interactiveObjects.length ; i++){
                    if (
                        this.x < interactiveObjects[i].x + interactiveObjects[i].width &&
                        this.x + this.width > interactiveObjects[i].x &&
                        this.y < interactiveObjects[i].y + interactiveObjects[i].height &&
                        this.y + this.height > interactiveObjects[i].y
                    ){
                        player.interactable = true;
                        player.interaction = interactiveObjects[i];
                    }
                }
                if(!player.interactable){
                    player.askedItems = [];
                }


                if (player.jumping !== 0) {
                    if (player.jumping < 3) {
                        player.y -= 6;
                        player.jumping++;
                    }else if(player.jumping < 6){
                        player.y -= 5;
                        player.jumping++;
                    }else if(player.jumping < 9){
                        player.y -= 4;
                        player.jumping++;
                    }else if(player.jumping < 12){
                        player.y -= 3;
                        player.jumping++;
                    }else if(player.jumping < 15){
                        player.y -= 2;
                        player.jumping++;
                    }else if(player.jumping < 18){
                        player.y -= 1;
                        player.jumping++;
                    }else  {
                        player.jumping = 0;
                    }
                }


                // zorgt ervoor dat je niet van het scherm gaat
                if (this.x < 0) {
                    this.x = 0;
                }
                if (this.x + this.width > canvas.width) {
                    this.x = canvas.width - this.width;
                }
                if (this.y < 0) {
                    this.y = 0;
                }
                if (this.y + this.height > canvas.height) {
                    this.y = canvas.height - this.height;
                }

                //zorgt voor realistischere sprong
                if(!this.touchinground){
                    if(this.falling<2){
                        this.y += 1;
                    }else if(this.falling<4){
                        this.y += 2;
                    }else if(this.falling<7){
                        this.y += 3;
                    }else if(this.falling<10){
                        this.y += 4;
                    }else if(this.falling<13){
                        this.y += 5;
                    }else if(this.falling<16){
                        this.y += 6;
                    }else if(this.falling<19){
                        this.y += 7;
                    }else if(this.falling<22){
                        this.y += 8;
                    }else{
                        this.y += 9;
                    }
                    this.falling++;
                }

                if(!this.rightblocked && !this.leftblocked){
                    if(this.directionHorizontal === "left"){
                        this.x -= this.speed;
                    }else if(this.directionHorizontal === "right"){
                        this.x += this.speed;
                    }
                }else if(this.rightblocked && this.directionHorizontal === "left"){
                    this.x -= this.speed;
                }else if(this.leftblocked && this.directionHorizontal === "right"){
                    this.x += this.speed;
                }

                //BARS






        },
        draw: function() {
            context.drawImage(playerImage, this.x, this.y, this.width, this.height);
            for(let i = 0 ; i < this.airnumber ; i++){
                context.drawImage(airbubbleImage,window.scrollX +20+ i*15 , 25 ,20 ,20);
            }

            // geef de inventaris weer
            if(player.showInventory){

                checkMuisOpItem();

                let lightscreen = new Image();
                lightscreen.src = "Images/lightdarkscreen.png";
                context.drawImage(lightscreen,window.scrollX,0,window.innerWidth,window.innerHeight);



                // Display the quantity of the item
                context.font = "40px Arial";
                context.fillStyle = "white";
                context.fillText("INVENTORY",  window.scrollX + window.innerWidth/5, 100);

                for(let i = 0 ; i < player.inventaris.length ; i++){
                    let item = player.inventaris[i][0]; // Item name (e.g., "vis")
                    let quantity = player.inventaris[i][1]; // Item quantity

                    let itemImage = new Image();
                    // Adjust the image source based on the item name (assuming image names match item names)
                    itemImage.src = "Images/" + item + ".png";

                    // Display the item image
                    context.drawImage(itemImage, window.scrollX +200 + i * 120, 150, 100, 100);

                    // Display the quantity of the item
                    context.font = "20px Arial";
                    context.fillStyle = "white";
                    context.fillText("  x " + quantity,  window.scrollX + 230 + i * 120, 140);


                }
                context.fillStyle = "red";
                context.fillRect(window.scrollX + ((window.innerWidth/5)*3), 0, 10, window.innerHeight);


                context.font = "40px Arial";
                context.fillStyle = "white";
                context.fillText("ASKED",  window.scrollX + (window.innerWidth/7)*5, 100);

                if(this.askedItems.length === 0){


                    context.font = "20px Arial";
                    context.fillStyle = "white";
                    context.fillText("There is nothing asked",  window.scrollX + (window.innerWidth/7)*5, 140);
                }else{
                    for(let i = 0 ; i < this.askedItems.length ; i++){
                        let item = player.askedItems[i][0]; // Item name (e.g., "vis")
                        let quantity = player.askedItems[i][1]; // Item quantity

                        let itemImage = new Image();
                        itemImage.src = "Images/" + item + ".png";

                        let askedImage = new Image();
                        askedImage.src = "Images/asked.png";

                        // Display the item image


                        context.drawImage(itemImage, window.scrollX + (window.innerWidth/8)*5 + i * 120, 150, 100, 100);
                        context.drawImage(askedImage, window.scrollX + (window.innerWidth/8)*5 + i * 120, 150, 100, 100);

                        // Display the quantity of the item
                        context.font = "20px Arial";
                        context.fillStyle = "white";
                        context.fillText("      x " + quantity,  window.scrollX + (window.innerWidth/8)*5 + i * 120, 140);
                    }
                }
            }
        }
    };


    //OBJECTEN
    //bars
    for(let i = 0 ; i < player.airnumber ; i++){
        let bubble = {
            x: 20, // Adjust the x and y coordinates to position the bush
            y: 20,
            width: 15, // Adjust the width and height to match the size of the bush image
            height: 15,
            draw: function() {
                context.drawImage(bushImage, this.x, this.y, this.width, this.height);
            }
        }
        bubble.draw();
    }
    //BUSHES
    //bush1
    let bush1 = {
        x: 600, // Adjust the x and y coordinates to position the bush
        y: 550,
        width: 50, // Adjust the width and height to match the size of the bush image
        height: 40,
        draw: function() {
            context.drawImage(bushImage, this.x, this.y, this.width, this.height);
        }
    };

    let bush2 = {
        x: 800, // Adjust the x and y coordinates to position the bush
        y: 550,
        width: 50, // Adjust the width and height to match the size of the bush image
        height: 40,
        draw: function() {
            context.drawImage(bushImage, this.x, this.y, this.width, this.height);
        }
    };

    let stone1 = {
        x:1100,
        y:550,
        width:50,
        height:34,
        draw: function (){
            context.drawImage(rockImage, this.x , this.y , this.width , this.height);
        }
    }
    let stone2 = {
        x:950,
        y:520,
        width:50,
        height:34,
        draw: function (){
            context.drawImage(rockImage, this.x , this.y , this.width , this.height);
        }
    }

    let invisiblewall1 = {
        x:2038,
        y:520,
        width:38,
        height:58,
        draw: function (){
            context.drawImage(invisibleWall, this.x , this.y , this.width , this.height);
        }
    }
    //ALLES IN OBJECTS STEKEN
    solidObjects.push(bush1);
    solidObjects.push(bush2);
    solidObjects.push(stone1);
    solidObjects.push(stone2);
    solidObjects.push(invisiblewall1);

//INTERACTIEVE OBJECTEN
    let visbeer = {
        x: 2000,
        y: 520,
        width:76,
        height:58,

        draw: function () {
            context.drawImage(beer,this.x , this.y , this.width ,this.height);
            if(player.interactable && player.interaction === this && player.interact){
                console.log("INTERACTIEEEEE");
                player.showInventory = true;
                player.askedItems = [["vis",2]]

            }
        }
    }

    interactiveObjects.push(visbeer);


    let game = {
        height: 500,

        update: function () {
            if(player.y> this.height){
                player.y = this.height;
            }
        }
    }

    function scroll() {
        if(!player.screenlocked) {
            window.scrollTo(player.x - (window.innerWidth/2),window.scrollY);
        }
    }


    function playerScreenlocked() {
        const scrollX = window.scrollX;
        const screenWidth = window.innerWidth;

        if(scrollX === 0) {
            if(player.x > screenWidth/2){
                player.screenlocked = false;
            }else{
                player.screenlocked = true;
            }
        }else if (scrollX === backgroundImage.width - screenWidth){
            if(player.x > scrollX + screenWidth/2){
                player.screenlocked = true;
            }else{
                player.screenlocked = false;
            }

        }else{
            player.screenlocked = false;
        }

    }

    // Luister naar toetsaanslagen
    document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowLeft") {
            player.directionHorizontal = "left";

            playerImage.src = "Images/playerleft.png";
        } else if (event.key === "ArrowRight") {
            player.directionHorizontal = "right";

            playerImage.src = "Images/playerright.png";
        }
        if (event.key === "ArrowUp"){
            player.jump();
        }
        player.showInventory = event.key === "F" || event.key === "f";

        if(event.key === "E" || event.key === "e"){
            if(player.interactable){
                player.interact = !player.interact;
            }
        }else{
            player.interact = false;
        }

    });
    document.addEventListener("mousedown", function(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });


    document.addEventListener("keyup", function(event) {
        if (event.key === "ArrowLeft" && player.directionHorizontal === "left") {
            player.directionHorizontal = null;
        } else if (event.key === "ArrowRight" && player.directionHorizontal === "right") {
            player.directionHorizontal = null;
        }
        if(event.key === "f" || event.key === "F"){
            player.showInventory = false;
        }
    });
    document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
        }
    });

// Luister naar muis
    let draggedItem = null;

// Function to check if the mouse position is within a given rectangle
    function isMouseInRect(mouseX, mouseY, rectX, rectY, rectWidth, rectHeight) {
        return mouseX >= rectX && mouseX <= rectX + rectWidth &&
            mouseY >= rectY && mouseY <= rectY + rectHeight;
    }


    function checkMuisOpItem(){

        // Log the coordinates to the console
        //console.log("Mouse X:", mouseX, "Mouse Y:", mouseY);
        let opItem = false
        for( let i = 0 ; i < player.inventaris.length ; i++){
            if(200 + i * 120 > mouseX && 200 + i * 120 + 150 < mouseX && mouseY > 150 && mouseY < 300){
                opItem = true;
            }else{
                console.log(mouseX + "x:y" + mouseY + " / " + (200 + i * 120) )
            }
        }
        if (opItem){
            console.log("OP ITEM")
        }else{
            console.log("NIET OP ITEM")
            console.log(mouseY + "x:y" + mouseY);
        }
    }


// Game loop
    function gameLoop() {
        //console.log(mouseX + " x:y" + mouseY);


        for(let air = 0 ; air < player.airnumber ; air++){
            context.drawImage(airbubbleImage, 20 + air * 15, 20, 15, 15);
        }

        // Wis het canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Update de speler
        player.update();



        game.update();

        // Teken de achtergrondafbeelding
        context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);





        for(let i = 0 ; i < solidObjects.length ; i++){
            solidObjects[i].draw();
        }




        for(let i = 0 ; i < interactiveObjects.length ; i++){
            interactiveObjects[i].draw();
        }

        player.draw();

        // Voer de game loop opnieuw uit
        requestAnimationFrame(gameLoop);
    }

// Start de game loop
    gameLoop();



    window.scrollTo(0,window.scrollY);
}
window.addEventListener("load", setup);


// VOLGENDE CHALLENGE:
