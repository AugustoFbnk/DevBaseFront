import React, { useState } from 'react'

const DesenvolvedorContext = React.createContext({})

export const DesenvolvedorProvider = ({ children }) => {

    const [nome, setNome] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [sexo, setSexo] = useState("");
    const [hobby, setHobby] = useState("");
    const [id, setId] = useState("");
    const [listaDevs, setListaDevs] = useState([]);
    const [quantidadePaginas, setQuantidadePaginas] = useState(0);
    const [page, setPage] = useState(0);
    const [dataNascimentoFieldError, setDataNascimentoFieldError] = useState(false);
    const [nomeFieldError, setNomeFieldError] = useState(false);
    const [sexoFieldError, setSexoFieldError] = useState(false);

    const updateNome = (src) => {
        setNome(src);
    }
    const updateDataNascimento = (src) => {
        setDataNascimento(src);
    }
    const updateSexo = (src) => {
        setSexo(src);
    }
    const updateHobby = (src) => {
        setHobby(src);
    }
    const updateId = (src) => {
        setId(src);
    }
    const updateListaDevs = (src) => {
        setListaDevs(src);
    }
    const updatePage = (src) => {
        setPage(src);
    }

    const updateQuantidadePaginas = (src) => {
        setQuantidadePaginas(src);
    }

    const updateNomeFieldError = (src) => {
        setNomeFieldError(src);
    }

    const updateDataNascimentoFieldError = (src) => {
        setDataNascimentoFieldError(src);
    }

    const updateSexoFieldError = (src) => {
        setSexoFieldError(src);
    }
    return (
        <DesenvolvedorContext.Provider value={
            {
                nome,
                updateNome,
                dataNascimento,
                updateDataNascimento,
                sexo,
                updateSexo,
                hobby,
                updateHobby,
                id,
                updateId,
                listaDevs,
                updateListaDevs,
                quantidadePaginas,
                updateQuantidadePaginas,
                page,
                updatePage,
                nomeFieldError,
                updateNomeFieldError,
                dataNascimentoFieldError,
                updateDataNascimentoFieldError,
                sexoFieldError,
                updateSexoFieldError
            }
        }>
            {children}
        </DesenvolvedorContext.Provider>
    )
}

export default DesenvolvedorContext;