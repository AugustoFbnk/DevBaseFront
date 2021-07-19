import { useContext } from 'react'
import { useParams } from "react-router-dom";
import { atualizar } from '../../services/crud-services/crud-services';
import DesenvolvedorContext from '../../contexts/desenvolvedor-context';
import LoadingContext from '../../contexts/loading-context';
import CrudDevForm from './crud-dev-form';
import Button from '@material-ui/core/Button';
import { MENSAGEM_ALTERADO_SUCESSO, MENSAGEM_ALTERAR, STATUS_CODE_OK } from '../crud-dev-component/crud-dev-constantes';

const CrudAlterar = () => {

    let desenvolvedorContext = useContext(DesenvolvedorContext);
    let loadingContext = useContext(LoadingContext);

    let { id } = useParams();

    const alterar = () => {
        loadingContext.updateLoading(true);
        let devAlterado = {
            nome: desenvolvedorContext.nome,
            dataNascimento: desenvolvedorContext.dataNascimento,
            sexo: desenvolvedorContext.sexo,
            hobby: desenvolvedorContext.hobby
        }
        atualizar(id, devAlterado).then((response) => {
            if (response.status == STATUS_CODE_OK) {
                alert(MENSAGEM_ALTERADO_SUCESSO);
            }
            else {
                alert(MENSAGEM_ALTERAR);
            }
            loadingContext.updateLoading(false);
        });
    }

    return (
        <div>
            <CrudDevForm id={id} />
            <Button variant="filled-basic" color="primary" onClick={alterar}>Alterar</Button>
        </div>
    )
}

export default CrudAlterar;