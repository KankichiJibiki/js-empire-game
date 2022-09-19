function displayNone(ele){
    ele.classList.remove('d-block');
    ele.classList.add('d-none');
}

function displayBlock(ele){
    ele.classList.add('d-none');
    ele.classList.add('d-block');
}

const config = {
    loginPage: document.getElementById('login_page'),
    gamePage: document.getElementById('game_page'),
    purchasePage: document.getElementById('purchase_page'),
    sidePage: document.getElementById('side_page'),
}

class GameStatus
{
    constructor(dataName){
        this.dataName = dataName;
        this.age = 0;
        this.days = 0;
        this.money = 0;
        this.purchase = [];
    }

}

function dataController(action){
    dataName = config.loginPage.querySelectorAll('input[name="username"]').item(0);
    console.log("Input data-" + dataName.value);

    switch(action){
        case 'new':
            if(!dataName.value) {
                alert("please enter your name");
                return false;
            }
    
            let gamePlayer = new GameStatus(dataName.value);
            let playerjsonEncoded = JSON.stringify(gamePlayer);
            // console.log(playerjsonEncoded);
            // console.log(typeof playerjsonEncoded);

            localStorage.setItem(dataName.value, playerjsonEncoded);
            dataName.value = "";
            break;
        case 'login':
            let result = localStorage.getItem(dataName.value);
            if(result === null){
                alert("Your does not exist");
                return false;
            }
            let decoded = JSON.parse(result);
            // console.log(result);
            // console.log(typeof result);
            // console.log(decoded);
            // console.log(typeof decoded);
            // console.log(decoded["dataName"]);
            dataName.value = "";
            break;
    }
}