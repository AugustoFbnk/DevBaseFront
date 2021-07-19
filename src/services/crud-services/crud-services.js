import wrapper from '../wrapper'

const consultarPorId = async (id) => {

     try {
         var resp = await wrapper({
             method: 'get',
             url: `api/Developers/${id}`
             
         });
         return resp;
     } catch (error) {
        console.log('erro:' + error);
        return error;
     }
}

const consultarPorFiltro = async (filtro) => {
    try {
        var resp = await wrapper({
            method: 'get',
            url: `api/Developers?${filtro}`
            
        });
        return resp;
    } catch (error) {
         console.log('erro:' + error);
         return error;
    }
}

const consultarTodos = async () => {
    try {
        var resp = await wrapper({
            method: 'get',
            url: `api/Developers`
            
        });
        return resp;
    } catch (error) {
         console.log('erro:' + error);
         return error;
    }
}

const inserir = async (src) => {
    try {
        var resp = await wrapper({
            method: 'post',
            url: 'api/Developers',
            data: src,
        });
        return resp;
    } catch (error) {
         console.log('erro:' + error);
         return error;
    }
}

const atualizar = async (id, src) => {
    try {
        var resp = await wrapper({
            method: 'put',
            url: `api/Developers/${id}`,
            data: src,
        });
        return resp;
    } catch (error) {
         console.log('erro:' + error);
         return error;
    }
}

const excluir = async (id) => {
    try {
        var resp = await wrapper({
            method: 'delete',
            url: `api/Developers/${id}`
        });
        return resp;
    } catch (error) {
         console.log('erro:' + error);
         return error;
    }
}

export { consultarPorId, consultarPorFiltro, consultarTodos, inserir, atualizar, excluir };