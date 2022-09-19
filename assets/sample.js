// setInterval
// let c = 1;
// setInterval(function(){
//     console.log(c + " seconds");
//     c++;
// }, 1000)

// Save data by JSON

const jsonString = `[{"age": 25, "money": 2000, "time": 50, "purchace": [
    "card",
    "pizza",
    "burger"
]}]`

// json文字列をオブジェクトに変換
let jsonDecoded = JSON.parse(jsonString);

console.log(jsonDecoded);
console.log(jsonDecoded[0]);


// ユーザーにjson文字列を要求し、それをデコードします。
// "[{"age":4,"money":40,"time":344,"purchases":["card","pizza","burger"]}]" を貼り付けてください。
let userJsonString = prompt("Please paste JSON");
let userJsonDecoded = JSON.parse(jsonString);

console.log("Logging user string parsed into JavaScript data.");
// console.log(jsonDecoded);
// console.log(jsonDecoded[0]);


// オブジェクトをjson文字列に変換することができます。これは保存されたデータを出力するのに便利です。
// json Object to Json string
let jsonEncoded = JSON.stringify(userJsonDecoded)

// Json.stringify()を使ってオブジェクトが文字列に変換されましたが、そのままではユーザーがゲームを再開したいとき、Json文字列を入力しなければいけません。
// そこでlocalStrageを使ってユーザーのブラウザ上にデータを保存してみましょう。



// LocalStorageにデータを保存する時は、setItem()メソッドを使用します。
// キーと値のセットの組み合わせで保存し、形式は文字列のみです。
localStorage.setItem("mytext", jsonEncoded);

// LocalStorageに保存したデータを取得したい場合は、getItem()を使用します。
let myLocalStorage = localStorage.getItem("mytext");
console.log(myLocalStorage);


// delete
localStorage.removeItem(myLocalStorage);


// // call
document.getElementById("sampleload").onclick = function(){
    if(localStorage.getItem("saveData") === null){
        alert("You don't have save data");
        return false;
    }

    let text = localStorage.getItem("saveData");
    document.getElementById("sampletext").value = text;
    alert("Bring you save data");

};


// // save
document.getElementById("samplesave").onclick = function(){
    let text = document.getElementById("sampletext");
    if(!text.value){
        alert("Any input not Found");
        return false;
    }

    localStorage.setItem("saveData", text.value);
    alert("save your data");
    text.value = "";
};

// // remove
document.getElementById("sampledelete").onclick = function(){
    let text = document.getElementById("sampletext");
    if(localStorage.getItem("saveData") === null){
        alert("Don't have suce data");
        return false;
    }

    localStorage.removeItem("saveData");
    alert("Delete save data");
    text.value = "";
}