class CaixaDaLanchonete {
  
  calcularValorDaCompra(metodoDePagamento, itens) {
   
    const tabelaCodigoValores = {
      cafe: 3,
      chantily: 1.5,
      suco: 6.2,
      sanduiche: 6.5,
      queijo: 2,
      salgado: 7.25,
      combo1: 9.5,
      combo2: 7.5,
    };

    const metodosDePagamento = [
      'dinheiro',
      'debito',
      'credito',
    ]

    //carrinho existe
    //não há item no carrinho = "Não há itens no carrinho de compra!"

    if (itens.length == 0) { return "Não há itens no carrinho de compra!" }

    //validar item e quantidade
    //separar item da quantidade

    const tabelaCodigoQuantidade = {}

    itens.forEach(item => {
      const itemQuantidade = item.split(',')
      const codigo = itemQuantidade[0]
      const quantidade = parseInt(itemQuantidade[1])  
      tabelaCodigoQuantidade[codigo] = quantidade     
    });

    let mensagemDeErro

    //verificar se não está na lista = "Item inválido!"
    Object.keys(tabelaCodigoQuantidade).every((codigo) => {
      if(!tabelaCodigoValores.hasOwnProperty(codigo)) {
        mensagemDeErro = "Item inválido!"
        return false;
      }

    //quantidade >0 = ok ; =<0 = "Quantidade inválida!"
      if(tabelaCodigoQuantidade[codigo] <= 0) {
        mensagemDeErro = "Quantidade inválida!"
        return false;
      }

    //validar se é possível a compra do item
    //item extra tem item principal?
    // ('cafe,1','chantily,1') = seguir compra
    //('chantily,1') = "Item extra não pode ser pedido sem o principal"
    // ('sanduiche,1', 'queijo,1') = seguir compra
    //('queijo,1') = "Item extra não pode ser pedido sem o principal"
      if(codigo == 'chantily'){
        if(!tabelaCodigoQuantidade.hasOwnProperty('cafe')){
          mensagemDeErro = "Item extra não pode ser pedido sem o principal"
          return false;
        }
      }
      if(codigo == 'queijo'){
        if(!tabelaCodigoQuantidade.hasOwnProperty('sanduiche')){
          mensagemDeErro = "Item extra não pode ser pedido sem o principal"
          return false;
        }
      } 
      return true
    })  

   if(mensagemDeErro) {return mensagemDeErro}

    //validar opçoes de metodo de pagamento
    //debito
    //credito
    //dinheiro
    //se for outro metodo, apresentar msg erro "Forma de pagamento inválida!"
  if(!metodosDePagamento.includes(metodoDePagamento)){
    return "Forma de pagamento inválida!"
  }

  let somaRecibo = 0

    //buscar valores na tabela codigo e valores     
    //calcular valor da compra

  Object.keys(tabelaCodigoQuantidade).forEach((codigo) => {
    tabelaCodigoQuantidade[codigo] * tabelaCodigoValores[codigo]
    somaRecibo = somaRecibo + tabelaCodigoQuantidade[codigo] * tabelaCodigoValores[codigo]
  })

    //metodo de pagamento
    //dinheiro = 5% desconto
    //credito = 3% acrescimo
    //debito = segue igual
  if(metodoDePagamento == 'dinheiro'){
    somaRecibo = somaRecibo * 0.95
  } else if(metodoDePagamento == 'credito') {
    somaRecibo = somaRecibo * 1.03
  }

    //formatar valor total 
    //mostrar com R$ e casa decimal separada por ','
  return Number.parseFloat(somaRecibo.toFixed(2)).toLocaleString('pt-br',{style:'currency', currency: 'BRL'})
  }
}

export { CaixaDaLanchonete };
