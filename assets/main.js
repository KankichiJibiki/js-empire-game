const config = {
    loginPage: document.getElementById('login_page'),
    gamePage: document.getElementById('game_page'),
}

class GameStatus
{
    constructor(dataName){
        this.dataName = dataName;
        this.age = 0;
        this.days = 0;
        this.money = 50000;
        this.clickCount = 0;
        this.incomePerClick = 25;
        this.incomePerSec = 0;
        this.purchase = {};
    }
}


class ItemCard
{
    constructor(name, price, proceeds, image, maxAmount, proceedType){
        this.name = name;
        this.price = price;
        this.proceeds = proceeds;
        this.proceedType = proceedType;
        this.image = image;
        this.maxAmount = maxAmount;
    }
}

let cardObjects = [
    new ItemCard("Flip machine", 15000, 25, "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png", null, "click"),
    new ItemCard("ETF Stock", 300000, 0.1, "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png", null, "sec"),
    new ItemCard("ETF Bonds", 300000, 0.07, "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png", null, "sec"),
    new ItemCard("Lemonade Stand", 30000, 30, "https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png", null, "click"),
    new ItemCard("House", 20000000, 32000, "https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png", null, "click"),
];

class View{
    static displayNone(ele){
        ele.classList.remove('d-block');
        ele.classList.add('d-none');
    }
    
    static displayBlock(ele){
        ele.classList.remove('d-none');
        ele.classList.add('d-block');
    }

    static backToLogin(){
        this.displayBlock(config.loginPage);
        this.displayNone(config.gamePage);
        config.gamePage.innerHTML = '';
    }

    static toGamePage(dataName){
        let user = JSON.parse(localStorage.getItem(dataName));
        let startGame = Controller.startGame(user);

        let container = document.createElement('div');
        container.classList.add('gameBg', 'p-3', 'col-10', 'd-flex', 'flex-wrap', 'justify-content-around');
    
        //burgerCon
        let burgerCon = document.createElement('div');
        burgerCon.classList.add('col-4', 'mainBg', 'p-1', 'text-light');
        burgerCon.id = "burger";
        burgerCon.append(this.createBurger(user));
    
        // status purchase
        let stPurchaseCon = document.createElement('div');
        stPurchaseCon.classList.add('col-7', 'p-1', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');
        stPurchaseCon.id = "stPurchaseCon";
        //statusCon
        let statusCon = this.createStatus(user);
        // purchaseCon
        let purchaseCon = document.createElement('div');
        purchaseCon.id = "purchase_page";
        purchaseCon.classList.add('overflowCon', 'col-12', 'p-1', 'border-grey', 'mainBg');
        purchaseCon.append(this.createItemCards(user));
        // savesection
        let btnData = document.createElement('div');
        btnData.id = "btnData";
        btnData.classList.add('col-12', 'row', 'text-white');
        btnData.append(this.createSaveBtn(user, startGame));

        stPurchaseCon.append(statusCon, purchaseCon, btnData);
    
        container.append(burgerCon, stPurchaseCon);
        this.displayNone(config.loginPage);
        this.displayBlock(config.gamePage);
        config.gamePage.append(container);
    }

    static createSaveBtn(user, startGame){
        let container = document.createElement('div');
        container.classList.add('col');
        container.innerHTML = `
            <button type="button" class="resetBtn btn fs-4">
                <i class="fa-solid fa-rotate-right"></i>
            </button>
            <button type="button" class="saveBtn btn">
                <i class="fa-solid fa-floppy-disk fs-4"></i>
            </button>
        `;

        let reset = container.querySelectorAll('.resetBtn')[0];
        reset.addEventListener('click', function(){
            let approveal = confirm("Are you sure you want to Reset??");
            if(!approveal) return false;
            Controller.stopGame();
            Controller.resetGame(user);
        })

        let save = container.querySelectorAll('.saveBtn')[0];
        save.addEventListener('click', function(){
            alert("Save your data successfully.");
            Controller.stopGame();
            Controller.saveGame(user);
        })

        return container;
    }

    static createBurger(user){
        let container = document.createElement('div');
        container.innerHTML = 
        `
            <!-- descri -->
            <div class="gameBg text-center">
                <h5>${user.clickCount} Burgers</h5>
                <p>one click $${user.incomePerClick}</p>
            </div>

            <!-- burger_clicker -->
            <div class="d-flex justify-content-center align-items-center p-2 pt-5">
                <img src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" alt="burgerClicker" class="img-responsive py-2 hover burger_img" width="80%" id="burger_clicker">
            </div>
        `;

        // burger_clicker
        let burger_clicker = container.querySelectorAll("#burger_clicker").item(0);
        burger_clicker.onclick = function(){
            Controller.updateByClickBurger(user);
        };

        return container;
    }

    static createStatus(user){
        let status = document.createElement('div');
        status.id = "status";
        status.classList.add('col-12', 'p-1', 'd-flex', 'text-light', 'text-center', 'flex-wrap');
        status.innerHTML = 
        `
            <div class="p-2 col-6 border-grey" id="username">${user.dataName}</div>
            <div class="p-2 col-6 border-grey" id="age">${Math.floor(user.age/365)} years old</div>
            <div class="p-2 col-6 border-grey" id="days">${user.days} days</div>
            <div class="p-2 col-6 border-grey" id="asset">$${Math.floor(user.money)}</div>
        `;
        return status;
    }
    
    static createItemCards(user){
        let container = document.createElement('div');
        container.classList.add('d-flex', 'flex-column', 'mb-2');
        container.id = "select";
        container.innerHTML = "";

    
        for(let i = 0; i < cardObjects.length; i++){
            let name = cardObjects[i].name;
            let posAmount = user.purchase[name] == null ? 0 : user.purchase[name];
            let price = cardObjects[i].price;
            let proceeds = cardObjects[i].proceeds;
            let proceedType = cardObjects[i].proceedType;
            let image = cardObjects[i].image;
            container.innerHTML += 
            `
                <button type="button" class="selectBtn col-12 p-3 d-flex justify-content-between gameBg text-light" id="select_item">
                    <div class="col-md-3">
                        <img src="${image}" alt="" class="pro_icon img-responsive p-2" id="item_image">
                    </div>
                    <!-- descri -->
                    <div class="col-12 col-md-8 p-2 d-flex flex-wrap ">
                        <div class="col-6 mb-3">${name}</div id="item_name">
                        <div class="col-6 mb-3" id="posAmount" id="posAmount">${posAmount}</div>
                        <div class="col-6 mb-3" id="item_price">$${price}</div>
                        <div class="col-6 mb-3" id="item_proceeds">$${proceeds}/${proceedType}</div>
                    </div>
                </button>
            `;
        }
        console.log(container.querySelectorAll('#item_image')[0]);


        let select_items = container.querySelectorAll('#select_item');
        for(let i = 0; i < select_items.length; i++){
            select_items[i].addEventListener('click', function(){
                container.innerHTML = '';
                container = View.createItemDetails(cardObjects[i], user);
            })
        }
    
        return container;
    }

    static createItemDetails(cardObject, user){
        let purchaseCon = document.getElementById('purchase_page');
        purchaseCon.innerHTML = '';

        let detailCon = document.createElement('detailCon');
        detailCon.classList.add('d-flex', 'flex-column');
        detailCon.id = "detailCon";

        let purchaseInfo = document.createElement('purchaseInfo');
        let purchaseInput = purchaseInfo.cloneNode(true);
        let purchaseBtn = purchaseInfo.cloneNode(true);
        detailCon.append(purchaseInfo, purchaseInput, purchaseBtn);

        purchaseInfo.classList.add('col-12', 'p-3', 'd-flex', 'justify-content-between', 'gameBg', 'text-light', 'border', 'mb-3');
        purchaseInput.classList.add('col-12', 'mb-3', 'text-light');
        purchaseBtn.classList.add('col-12', 'mb-3', 'd-flex', 'flex-row', 'justify-content-between');

        purchaseInfo.innerHTML = 
        `
            <div class="col-12 col-md-5">
                <h5>${cardObject.name}</h5>
                <p>Max purchases: ${cardObject.maxAmount}</p>
                <p>Price: $${cardObject.price}</p>
                <p>Get: $${cardObject.proceeds}/${cardObject.proceedType}</p>
            </div>
            <div class="col-md-6">
                <img src="${cardObject.name}" alt="" class="pro_icon img-responsive p-2">
            </div>
        `;

        purchaseInput.innerHTML =
        `
            <label for="" class="form-label mb-2">How may would you like to buy</label>
            <input type="number" name="purchase_number" id="purchase_number" class="form-control" placeholder="0">
            <p class="total text-muted text-end">total: $0</p>
        `; 

        purchaseBtn.innerHTML = 
        `
            <button type="button" class="detailBtn btn btn-outline-primary col-5" id="backBtn">Go Back</button>
            <button type="button" class="detailBtn btn btn-success col-5" id="proceedBtn">Purchase</button>
        `;

        purchaseCon.append(detailCon);

        // input
        let inputPur = purchaseInput.querySelectorAll('input[name="purchase_number"]')[0];
        inputPur.addEventListener('change', function(){
            let totalP = purchaseInput.querySelectorAll(".total")[0];
            let total = inputPur.value * parseInt(cardObject.price);
            totalP.innerHTML = `total: $${total}`;
        })

        // backbtn
        document.getElementById('backBtn').onclick = function(){
            purchaseCon.innerHTML = '';
            purchaseCon.append(View.createItemCards(user));
        };

        // purchasebtn
        document.getElementById('proceedBtn').onclick = function(){
            let totalPurchase = cardObject.price * inputPur.value;
            // console.log(typeof totalPurchase);
            // console.log(typeof user.money);

            if(user.money < totalPurchase){
                alert("You don't have enough money");
                return false;
            }

            purchaseCon.innerHTML = '';
            user.money -= totalPurchase;
            if(cardObject.proceedType == "click") user.incomePerClick += (cardObject.proceeds * inputPur.value);
            else user.incomePerSec += cardObject.proceeds;
            purchaseCon.append(View.createItemCards(user));

            console.log(user.incomePerClick);
            console.log(user.purchase);
            if(user.purchase[cardObject.name] == null) user.purchase[cardObject.name] = parseInt(inputPur.value);
            else user.purchase[cardObject.name] += parseInt(inputPur.value);
            console.log(user.purchase);

            View.updateBurgerCon(user);
            View.updateUserStatus(user);
            View.updateItemCards(user);
        };

        return purchaseCon;
    }

    static updateBurgerCon(user){
        let burger = document.getElementById('burger');
        burger.innerHTML = '';
        burger.append(this.createBurger(user));
    }

    static updateUserStatus(user){
        let status = document.getElementById('status');
        status.innerHTML = '';
        status.append(this.createStatus(user));
    }

    static updateItemCards(user){
        let purchase_page = document.getElementById('purchase_page');
        purchase_page.innerHTML = '';
        purchase_page.append(View.createItemCards(user));
    }
}

class Controller{
    startTimer;

    static startGame(user){
        this.startTimer = setInterval(function(){
            user.money += user.incomePerSec;
            user.age += 1;
            user.days += 1;
            View.updateUserStatus(user);
        },1000);
    }

    static stopGame(){
        clearInterval(this.startTimer);
    }

    static resetGame(user){
        localStorage.removeItem(user.name);
        // localStorage.clear();
        View.backToLogin();
    }

    static saveGame(user){
        console.log(user.dataName);
        console.log(typeof user.dataName);
        localStorage.removeItem(user.dataName);
        let objEncoded = JSON.stringify(user);
        localStorage.setItem(user.dataName, objEncoded);
        console.log(localStorage.getItem(user.dataName));
        View.backToLogin();
    }
    
    static dataController(action){
        let dataName = config.loginPage.querySelectorAll('input[name="username"]').item(0);
        console.log("InputName: " + dataName.value);

        switch(action){
            case 'new':
                if(!dataName.value) {
                    alert("please enter your name");
                    return false;
                }
        
                let gamePlayer = new GameStatus(dataName.value);
                console.log('New!');
                let playerjsonEncoded = JSON.stringify(gamePlayer);

                localStorage.setItem(dataName.value, playerjsonEncoded);
                View.toGamePage(dataName.value);
                dataName.value = "";
                break;  
            case 'login':
                let result = localStorage.getItem(dataName.value);
                if(result === null){
                    alert("Your does not exist");
                    return false;
                }
                console.log('Login!!');
                let decoded = JSON.parse(localStorage.getItem(dataName.value));
                console.log("Login data " + decoded.days);
                View.toGamePage(dataName.value);
                dataName.value = "";
                break;
        }
    }

    static updateByClickBurger(user){
        user.clickCount +=1;
        user.money += user.incomePerClick;
        View.updateBurgerCon(user);
        View.updateUserStatus(user);
    }



}

