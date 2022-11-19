
class searchResults {
    constructor(listContainer) {
        this.listContainer = listContainer     
    }

    getResults() {
        const searchInput = document.querySelector('#searchInput')
        const searchButton = document.querySelector('#searchButton')
        const spinner = document.getElementById('spinner')
        spinner.classList.add('d-none')


        // make enter same as click
        searchInput.addEventListener('change', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault()
                searchButton.click()
            }
            else {
                searchButton.click()
            }
        })

        searchButton.addEventListener('click', function () {
            spinner.classList.remove('d-none')
            listContainer.innerHTML = ''
            const symbol = searchInput.value
            const uniURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${symbol}&limit=10&exchange=NASDAQ`

            const dataArr = []
            fetch(uniURL)
                .then(res => res.json())
                .then(data => {

                    for (let i of data) {
                        dataArr.push(i)

                        fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${i.symbol}`)

                            .then(res =>  res.json())
                            .then(data => {
                                const companyLogoSRC = data.profile.image
                                let companyChangeRate = data.profile.changesPercentage
                                let color

                                if (companyChangeRate.includes('-')) {
                                    color = 'text-danger'

                                }

                                else {
                                    color = 'text-success'
                                    companyChangeRate = '+' + companyChangeRate
                                }

                                if (symbol.length > 0) {
                                   
                                    const HTML = `<div class=" list p-4 mt-1 d-flex align-items-center justify-content-between  bg-light">
                                        <div>
                                          <img width="30px" height="30px" src="${companyLogoSRC}" alt="" class="logo order-2">
                                          <a class="text-decoration-none order-2"  href="./pages/company.html?symbol=${i.symbol}"><span class="ms-3 fs-5">${i.name} ${(i.symbol)}</span></a>
                                          <span class="order-2 ${color} ms-3">${Number(companyChangeRate).toFixed(3)}</span>
                                          </div>
                                      </div>`

                                    listContainer.insertAdjacentHTML('beforeend', HTML)

                                }

                            })

                    }
                    spinner.classList.add('d-none')

                })

        })
    }

}




