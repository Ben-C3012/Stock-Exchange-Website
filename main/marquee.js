class Marquee {
    constructor(element) {
        this.element = element
        this.url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nasdaq`
    }

    async load() {
        const data = fetch(this.url)
        const res = await (await data).json()
        const company15Arr = res.splice(0, 1000)   
        let HTML = ''
        for (let i of company15Arr) {
            HTML = HTML + `<span> <span class = "fw-light">${i.symbol}</span> <span class = "text-success">${i.price}</span> &nbsp</span>`
        }
        this.element.innerHTML = HTML
    }
}