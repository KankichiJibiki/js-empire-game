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
        this.money = 0;
        this.clickCount = 0;
        this.incomePerClick = 25;
        this.incomePerSec = 0;
        this.purchase = {};
    }
}


class ItemCard
{
    constructor(name, posAmount, price, proceeds, image, maxAmount, proceedType){
        this.name = name;
        this.posAmount = posAmount;
        this.price = price;
        this.proceeds = proceeds;
        this.proceedType = proceedType;
        this.image = image;
        this.maxAmount = maxAmount;
    }
}

let cardObjects = [
    new ItemCard("Flip machine", 0, 15000, 25, "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png", null, "click"),
    new ItemCard("ETF Stock", 0, 300000, 0.1, "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png", null, "sec"),
    new ItemCard("ETF Bonds", 0, 300000, 0.07, "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png", null, "sec"),
    new ItemCard("Lemonade Stand", 0, 30000, 30, "https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png", null, "click"),
    new ItemCard("House", 0, 20000000, 32000, "https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png", null, "click"),
];

class View{
    static displayNone(ele){
        ele.classList.remove('d-block');
        ele.classList.add('d-none');
    }
    
    static displayBlock(ele){
        ele.classList.add('d-none');
        ele.classList.add('d-block');
    }

    static toGamePage(dataName){
        let container = document.createElement('div');
        container.classList.add('gameBg', 'p-3', 'col-10', 'd-flex', 'flex-wrap', 'justify-content-around');
        let playerData = localStorage.getItem(dataName);
        let user = JSON.parse(playerData);
    
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
        let purchaseCon = this.createItemCards(user);

        stPurchaseCon.append(statusCon, purchaseCon);
    
        container.append(burgerCon, stPurchaseCon);
        this.displayNone(config.loginPage);
        config.gamePage.append(container);
    }

    static createBurger(user){
        let container = document.createElement('div');
        container.innerHTML = 
        `
            <!-- descri -->
            <div class="gameBg text-center">
                <h5>${user.clickCount} Burgers</h5>
                <p>one click ${user.incomePerClick}</p>
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
            <div class="p-2 col-6 border-grey" id="age">${user.age} years old</div>
            <div class="p-2 col-6 border-grey" id="days">${user.days} days</div>
            <div class="p-2 col-6 border-grey" id="asset">$${user.money}</div>
        `;
        return status;
    }
    
    static createItemCards(user){
        let container = document.createElement('div');
        container.id = "purchase_page";
        container.classList.add('overflowCon', 'col-12', 'p-1', 'border-grey', 'mainBg');
        container.innerHTML = "";

    
        for(let i = 0; i < cardObjects.length; i++){
            let name = cardObjects[i].name;
            let posAmount = user.purchase[name] == null ? 0 : user.purchase[name];
            let price = cardObjects[i].price;
            let proceeds = cardObjects[i].proceeds;
            let image = cardObjects[i].image;
            console.log(image);
            container.innerHTML += 
            `
                <div class="d-flex flex-column mb-2" id="select">
                    <button type="button" class="selectBtn col-12 p-3 d-flex justify-content-between gameBg text-light" id="select_item">
                        <div class="col-md-3">
                            <img src="${image}" alt="" class="pro_icon img-responsive p-2" id="item_image">
                        </div>
                        <!-- descri -->
                        <div class="col-12 col-md-8 p-2 d-flex flex-wrap ">
                            <div class="col-6 mb-3">${name}</div id="item_name">
                            <div class="col-6 mb-3" id="posAmount" id="posAmount">${posAmount}</div>
                            <div class="col-6 mb-3" id="item_price">$${price}</div>
                            <div class="col-6 mb-3" id="item_proceeds">$${proceeds}/click</div>
                        </div>
                    </button>
                </div>
            `;
        }
        console.log(container.querySelectorAll('#item_image')[0]);


        let select_items = container.querySelectorAll('#select_item');
        for(let i = 0; i < select_items.length; i++){
            select_items[i].addEventListener('click', function(){
                container.innerHTML = '';
                container = View.createItemDetails(cardObjects[i], user);
                // console.log("worked! " + i);
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
        // this.name = name;
        // this.posAmount = posAmount;
        // this.price = price;
        // this.proceeds = proceeds;
        // this.image = image;
        // this.maxAmount = maxAmount;
        // purchaseInfo.innerHTML

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
            <p class="text-muted text-end">total: $0</p>
        `; 

        purchaseBtn.innerHTML = 
        `
            <button type="button" class="detailBtn btn btn-outline-primary col-5" id="backBtn">Go Back</button>
            <button type="button" class="detailBtn btn btn-success col-5" id="proceedBtn">Purchase</button>
        `;

        purchaseCon.append(detailCon);

        document.getElementById('backBtn').onclick = function(){
            purchaseCon.innerHTML = '';
            purchaseCon.append(View.createItemCards(user));
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
}

class Controller{
    
    static dataController(action){
        let dataName = config.loginPage.querySelectorAll('input[name="username"]').item(0);
        console.log("Input data-" + dataName.value);

        switch(action){
            case 'new':
                if(!dataName.value) {
                    alert("please enter your name");
                    return false;
                }
        
                let gamePlayer = new GameStatus(dataName.value);
                console.log(gamePlayer);
                console.log(gamePlayer.dataName);
                // console.log(gamePlayer.increaseMoneyEvent(50));
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
                let decoded = JSON.parse(result);
                console.log(decoded);
                console.log(decoded["dataName"]);
                View.toGamePage(dataName.value);
                dataName.value = "";
                break;
        }
    }

    static updateByClickBurger(user){
        user.clickCount +=1;
        user.money += 25;
        View.updateBurgerCon(user);
        View.updateUserStatus(user);
    }



}

