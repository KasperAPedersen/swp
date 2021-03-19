document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener("resize", resizeStatus); resizeStatus();

    setInterval(updateDb, 15000); updateDb();
});

function resizeStatus() {
    if(window.innerWidth >= 650) {
        let statusHeight = document.getElementById('status').offsetHeight;
        document.getElementById('statusTitle').style.paddingTop = ((statusHeight - 46) / 2) + "px";
    } else {
        document.getElementById('statusTitle').style.paddingTop = "0px";
    }
};

function updateDb(){
    fetch("/db/testConnection")
    .then((res) => {
        if(res.status !== 200) {
            throw new Error(`Something went wrong ~ Status code: ${res.status}`);
        } else {
            return res.json();
        }
    })
    .then((json) => {
        document.getElementById('statusDb').classList = (json == 1 ? "fas fa-check" : "fas fa-times");
    })
}

function addPackage() {
    let palletId = document.getElementById('palletSelect').value;
    let barcode = document.getElementById('barcode').value;
    if(palletId != undefined && barcode != undefined && palletId != -1) {
        fetch(`/db/addPackage?pId=${palletId}&bCode=${barcode}`)
        .then((res) => {
            if(res.status !== 200) {
                throw new Error(`Something went wrong ~ Status code: ${res.status}`);
            } else {
                return res.json();
            }
        })
        .then((json) => {
            // If success, delete barcode value
            console.log(json);
        })
    }
}

function updatePallets() {
    fetch(`/db/getPallets`)
        .then((res) => {
            if(res.status !== 200) {
                throw new Error(`Something went wrong ~ Status code: ${res.status}`);
            } else {
                return res.json();
            }
        })
        .then((json) => {
            document.getElementById('palletSelect').innerHTML = `<option value="-1">Couldn't find any pallets</option>`;
            let values = "";
            for(const [index, val] of json.entries()) {
                values += `<option value="${val.id}">${val.name} - ${val.date}</option>`;
            }
            document.getElementById('palletSelect').innerHTML = values;
        })
}