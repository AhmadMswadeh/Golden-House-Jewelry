document.addEventListener('DOMContentLoaded', function () {
    // Add smooth scrolling to all links
    var links = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function (event) {
            event.preventDefault();
            var targetId = this.getAttribute('href').substring(1);
            var targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed navbar height
                    behavior: 'smooth'
                });
            }
        });
    }

    // Initialize tooltips (if any)
    $('[data-toggle="tooltip"]').tooltip();
});

// Chart.js initialization for gold price chart
fetch('https://mercados.ambito.com/metales/oro-nueva-york/grafico/semanal')
.then(response => response.json())
.then(data => {
    console.log(data)
    data.shift()
    let tableBody = document.querySelector('.table tbody');
    data.forEach((entry, index) => {

        let row = document.createElement('tr');
        let dateCell = document.createElement('td');
        let priceCell = document.createElement('td');
        dateCell.textContent = entry[0];
        priceCell.textContent = `$${parseFloat(entry[1]).toFixed(2)}`;
        row.appendChild(dateCell);
        row.appendChild(priceCell);
        tableBody.appendChild(row);

    });
    const dates = data.map(item => item[0]);
    const prices = data.map(item => item[1]);

    var ctx = document.getElementById('goldPriceChart').getContext('2d');
    var goldPriceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Gold Price (USD per ounce)',
                data: prices,
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
})
.catch(error => console.error('Error fetching gold prices:', error));
