const CACHE_KEY = "calculation_history";

// function for check storage
function checkForStorage() {
    return typeof(Storage) !== "undefined";
}

// function to save the data history
function putHistory(data) {
    if (checkForStorage()) {
        let historyData = null;

        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }

        historyData.unshift(data);

        if (historyData.length > 5) {
            historyData.pop();
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
}

// function get the data from local storage
function showHistory() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}

// function to render history data
function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historylist");

    historyList.innerHTML = "";

    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>"
        row.innerHTML += "<td>" + history.operator + "</td>"
        row.innerHTML += "<td>" + history.secondNumber + "</td>"
        row.innerHTML += "<td>" + history.result + "</td>"

        historyList.appendChild(row);
    }
}

renderHistory();