const form = document.querySelector("form");

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const searchInputs = form.querySelectorAll("input[type=search]");
    
    searchInputs.forEach(search => {
        const datalistId = search.getAttribute("list");
        const datalist = document.getElementById(datalistId);
        if (datalist) {
            const option = datalist.querySelector(`option[value="${search.value}"]`);
            const optionId = option?.getAttribute("data-id");
            if (optionId) {
                createHiddenInput(search.id + "_id", optionId);
            }
        }
    });

    form.submit();
});

function createHiddenInput(name, value) {
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = name;
    hiddenInput.value = value;
    form.appendChild(hiddenInput);
}