class SearchForm {
    constructor(form) {
        this.form = form
    }

    createElements() {
        const input = document.createElement('input')
        const button = document.createElement('button')
        input.classList.add('form-control')
        input.setAttribute("id", "searchInput");
        button.classList.add('btn', 'btn-primary' , 'btn-sm' , 'ms-2')
        button.setAttribute("id", "searchButton");
        button.innerText = 'Search'
        this.form.append(input)
        this.form.append(button)
    }
}