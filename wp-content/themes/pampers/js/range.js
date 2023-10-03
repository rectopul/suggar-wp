const rangeInput = document.querySelector('.rangeValue');



if(rangeInput) {
    const containerValue = document.querySelector('.valueSelected');
    rangeInput.addEventListener('input', function() {
        const valor = rangeInput.value
        const formatoReal = new Intl.NumberFormat('pt-BR', { style: `currency`, currency: `BRL`}).format(valor)

        containerValue.innerHTML = formatoReal
    }, false);
}