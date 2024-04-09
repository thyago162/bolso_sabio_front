const masks = {
    cpf: {mask: '###.###.###-##'},
    fone: {mask: '#####-####'},
    money: {mask: '###.###.###.###.###,##', reversed: true, tokens: "9:[0-9]:repeated", }
}

export default masks