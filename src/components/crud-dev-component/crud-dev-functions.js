import { REGISTROS_POR_PAGINA } from '../crud-dev-component/crud-dev-constantes';

const calcularQuantidadePaginas = (quantidadeTotalRegistros) => {
    if (quantidadeTotalRegistros > 0) {
        return Math.ceil(quantidadeTotalRegistros / REGISTROS_POR_PAGINA);
    }
}

const montarQueryString = (numeroDaPagina, quantidadeDeRegistros, nome, dataNascimento, hobby, sexo) => {
    let queryString = `NumeroDaPagina=${numeroDaPagina}&QuantidadeDeRegistros=${quantidadeDeRegistros}`;
    if (existeValor(nome)) {
        queryString = `${queryString}&Nome=${nome}`;
    }
    if (existeValor(dataNascimento)) {
        queryString = `${queryString}&DataNascimento=${dataNascimento}`;
    }
    if (existeValor(hobby)) {
        queryString = `${queryString}&Hobby=${hobby}`;
    }
    if (existeValor(sexo)) {
        queryString = `${queryString}&Sexo=${sexo}`;
    }
    return queryString;
}

const existeValor = (arg) => {
    return arg != null && arg != ''
};

export { calcularQuantidadePaginas, montarQueryString, existeValor };