const formatPrice = (price: string) => {
    if(price){

        return parseFloat(price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }else{
        return (0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }
}

function percentProduct(valorProdutoStr: string, valorDescontoStr: string): number {
    const valorProduto = parseFloat(valorProdutoStr);
    const valorDesconto = parseFloat(valorDescontoStr);
  
    if (isNaN(valorProduto) || isNaN(valorDesconto) || valorProduto <= 0 || valorDesconto < 0) {
      return 0
    }
  
    const percentualDesconto = (valorDesconto / valorProduto) * 100;
    return Math.floor(percentualDesconto); // Arredonda para baixo para o número inteiro mais próximo
}

const parcelOptions = (value: string) => {
    const valor = parseFloat(value)

    return (valor / 10).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export { formatPrice, percentProduct, parcelOptions }