document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.getElementById("menu-icon");
    const sidebar = document.querySelector(".sidebar");

    menuIcon.addEventListener("click", function() {
        sidebar.classList.toggle("hidden");
    });

    const itemss = document.querySelectorAll('.itemss');
    const items = document.querySelectorAll('.item');

    itemss.forEach((item, index) => {
        item.addEventListener('click', () => {
            itemss.forEach((el) => el.classList.remove('clicked'));
            item.classList.add('clicked');
            items.forEach((element, j) => {
                if (index === j) {
                    element.classList.add('display');
                    element.classList.remove('hidden');
                } else {
                    element.classList.remove('display');
                    element.classList.add('hidden');
                }
            });
        });
    });

    function fetchData(url, targetElement, dataKey, renderItem) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data[dataKey]) {
                    const dataList = data[dataKey];
                    dataList.forEach((item, index) => {
                        const div = document.createElement("div");
                        div.textContent = renderItem(item, index);
                        div.classList.add(index % 2 === 0 ? "even" : "odd");
                        targetElement.appendChild(div);
                    });
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    const spacecrafts = document.querySelector(".spacecrafts");
    fetchData('https://isro.vercel.app/api/spacecrafts', spacecrafts, 'spacecrafts', (item, index) => `${item.id}. ${item.name}`);

    const launchers = document.querySelector(".launchers");
    fetchData('https://isro.vercel.app/api/launchers', launchers, 'launchers', item => `${item.id}`);

    const csItems = document.querySelector(".csItems");
    const search = document.querySelector('.search');
    let customerSatellites = [];

    fetchData('https://isro.vercel.app/api/customer_satellites', csItems, 'customer_satellites', (item, index) => {
        customerSatellites.push(item);
        return `${item.id}  ${item.country}  ${item.launch_date}  ${item.mass}  ${item.launcher} `;
    });

    search.addEventListener('input', () => {
        const filteredInfo = customerSatellites.filter(item => item.country.toLowerCase().includes(search.value.toLowerCase()));
        renderTable(csItems, filteredInfo, index => {
            return `<td>${filteredInfo[index].id }</td>   <td>${filteredInfo[index].country  }</td>  <td>${filteredInfo[index].launch_date  }</td>  <td>${filteredInfo[index].mass  }</td>  <td>${filteredInfo[index].launcher  }</td>`;
        });
    });

    const centers = document.querySelector(".centers");
    let centreInfo = [];

    fetchData('https://isro.vercel.app/api/centres', centers, 'centres', (item, index) => {
        centreInfo.push(item);
        return `${item.id} ${item.name}  ${item.Place} ${item.State} `;
    });


    const amazingFacts = [
        "The International Space Station travels at a speed of approximately 28,000 kilometers (17,500 miles) per hour.",
        "A day on Venus is longer than its year. It takes Venus about 243 Earth days to complete one rotation on its axis.",
        "The largest volcano in the solar system is Olympus Mons on Mars. It stands about 13.6 miles (22 kilometers) high.",
        // Add more facts here
    ];

    function displayRandomFact() {
        const factText = document.getElementById("random-fact");
        const randomIndex = Math.floor(Math.random() * amazingFacts.length);
        factText.textContent = amazingFacts[randomIndex];
    }
    document.addEventListener("DOMContentLoaded", function() {
        // Other code...

        const didYouKnowBox = document.querySelector(".did-you-know");

        menuIcon.addEventListener("click", function() {
            sidebar.classList.toggle("hidden");
            if (sidebar.classList.contains("hidden")) {
                // Sidebar is closed, display a random fact
                didYouKnowBox.style.display = "block";
                displayRandomFact();
            } else {
                // Sidebar is open, hide the fact
                didYouKnowBox.style.display = "none";
            }
        });
    });
})