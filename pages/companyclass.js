

class Company {
    constructor(container, symbol) {
        this.container = container
        this.symbol = symbol

    }


    makeCard() {



        this.container.innerHTML = `

     <div id="spinner" class="spinner-border me-5" role="status">
    <span class="visually-hidden">Loading...</span>
</div> 
    <div class="card" style="width: 60rem;">
    <div id="cardHead" class="d-flex p-3 mt-3 ms-2 border-bottom">
        <img id="company-img" src="" alt="" width="40px">
        <h5 id="cardTitle" class="card-title ms-2 mt-2"></h5>

        <div id="priceDiv" class="ms-5 mt-2 justify-self-end">Stock Price
            <span id="stock-price"></span>
        </div>
        <div class="ms-4 mt-2" id="stock-state">+232</div>

    </div>

    <div class="card-body">
        <p id="cardText" class="card-text p-2 lh-lg "></p>
    </div>




    <canvas class="ms-2" id="myChart"></canvas>


    <div class="card-body">
        <a id="companyLink" target="_blank" href="#" class="card-link mt-3 ">Website</a>
    </div>
</div>`





        // / UI Elements for Card
        const imgElement = document.getElementById('company-img')
        const cardTitle = document.getElementById('cardTitle')
        const cardText = document.getElementById('cardText')
        const companyLink = document.getElementById('companyLink')
        const stockPrice = document.getElementById('stock-price')
        const stockState = document.getElementById('stock-state')
        const spinner = document.getElementById('spinner')





        fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${this.symbol}`)
            .then(res => res.json())
            .then(data => {

                // spinner 
                spinner.classList.toggle('d-none')


                // Typography Changes for each card
                imgElement.src = data.profile.image
                cardTitle.innerText = data.profile.companyName
                cardText.innerText = data.profile.description
                companyLink.href = data.profile.website
                stockPrice.innerText = ` : $${data.profile.price}`

                // if stock price change is negative make red 
                if (Math.sign(data.profile.changesPercentage) === -1) {
                    stockState.classList.remove('text-success')
                    stockState.classList.add('text-danger')
                    stockState.innerHTML = `(${data.profile.changesPercentage} %)`

                }

                // else positive green
                else {
                    stockState.classList.remove('text-danger')
                    stockState.classList.add('text-success')
                    stockState.innerHTML = `+(${data.profile.changesPercentage} %)`

                }







            })


    }

    addChart() {

        // Get chart data 
        const url = fetch('https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}')
        const historyURL = fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${this.symbol}?serietype=line`)
        const datesArr = []
        const closesArr = []


        async function getData() {
            const data2 = await historyURL
            const res = await data2.json()


            for (let i = 0; i < res.historical.length; i += 65) {
                datesArr.push(res.historical[i].date)
                closesArr.push(res.historical[i].close)
            }


            const data = {
                labels: datesArr.reverse(),
                datasets: [{
                    label: `Stock Price`,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: closesArr.reverse()
                }]
            };

            const config = {
                type: 'line',
                data: data,
                options: {}
            };


            const myChart = new Chart(
                document.getElementById('myChart'),
                config
            );


        }


        getData()


    }



}





































