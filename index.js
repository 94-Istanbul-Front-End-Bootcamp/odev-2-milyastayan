let data = [];

const fetchData = () => {
    //verinin çekildiği yer
    fetch("data.json")
        .then(response => {
            return response.json();
        })
        .then(responseData => {
            //json'dan okunan verinin data array'ine atanması
            data = responseData;

            //veri geldikten sonra filtreleme butonu görünür olsun
            let filterButton = document.querySelector("#filterButton");
            filterButton.setAttribute("style", "");

            let activeList = document.querySelector(".hideActiveList");
            activeList.setAttribute("style", "");

            let adultList = document.querySelector(".hideAdultList");
            adultList.setAttribute("style", "");

            let fLetterList = document.querySelector(".hidefirstLetter");
            fLetterList.setAttribute("style", "");


            //verinin html içerisinde listelendiği fonksiyon
            listData(responseData);
        })
        .catch(err => {
            //hata yönetimi
            console.log(err)
        })
}

//verinin table tag'i içerisinde listelenmesini sağlayan fonksiyon
const listData = (data) => {
    let table = document.querySelector("#people");

    table.innerHTML =
        `<tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Active</th>
            </tr>`
        + data.map(element => {

            return `
        
                <tr>
                    <td>${element.name}</td>
                    <td>${element.email}</td>
                    <td>${element.age}</td>
                    <td>${element.isActive}</td>
                </tr>
                `;
        })
}

const activePeopleCheck = document.querySelector('#ActiveList');
const adultPeopleCheck = document.querySelector('#AdultList');
const firstLetterFetch = document.querySelector('#firstLetter');



//verinin filtrelenmesini sağlayan fonksiyon
const filterData = () => {

    try {
        if (activePeopleCheck.checked && adultPeopleCheck.checked && firstLetterFetch.value) {
            let filteredData = data.filter(element => element.isActive === true && element.age >= 18 && element.name[0].toLowerCase() === firstLetterFetch.value.toLowerCase());
            listData(filteredData);
        }

        else if (activePeopleCheck.checked && firstLetterFetch.value) {
            let filteredData = data.filter(element => element.isActive === true && element.name[0].toLowerCase() === firstLetterFetch.value.toLowerCase());
            listData(filteredData);
        }

        else if (firstLetterFetch.value && adultPeopleCheck.checked) {
            let filteredData = data.filter(element => element.name[0].toLowerCase() === firstLetterFetch.value.toLowerCase() && element.age >= 18);
            listData(filteredData);
        }

        else if (activePeopleCheck.checked && adultPeopleCheck.checked) {
            let filteredData = data.filter(element => element.isActive === true && element.age >= 18);
            listData(filteredData);
        }

        else if (activePeopleCheck.checked) {
            let filteredData = data.filter(element => element.isActive === true);
            listData(filteredData);
        }

        else if (adultPeopleCheck.checked) {
            let filteredData = data.filter(element => element.age >= 18);
            listData(filteredData);
        }

        else if (firstLetterFetch.value) {
            let filteredData = data.filter(element => element.name[0].toLowerCase() === firstLetterFetch.value.toLowerCase());
            listData(filteredData);
        }
    }
    catch (err) {

        alert('Bir hata oluştu!');

    }


}