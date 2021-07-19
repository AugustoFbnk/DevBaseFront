import { useContext } from 'react'
import { consultarPorFiltro, inserir } from '../../services/crud-services/crud-services';
import { calcularQuantidadePaginas, montarQueryString, existeValor } from '../crud-dev-component/crud-dev-functions';
import {
  MENSAGEM_INCLUIDO_SUCESSO,
  MENSAGEM_ERRO_INSERIR,
  MENSAGEM_CAMPOS_OBRIGATORIOS,
  STATUS_CODE_CREATED,
  STATUS_CODE_OK,
  PAGINA_PADRAO,
  REGISTROS_POR_PAGINA
} from './crud-dev-constantes';
import LoadingContext from '../../contexts/loading-context';
import DesenvolvedorContext from '../../contexts/desenvolvedor-context';
import CrudDevForm from './crud-dev-form';
import CrudDevTable from './crud-dev-table';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
    alignContent: 'center'
  },
  buttonsDiv: {
    padding: "5px",

  },
  button: {
    padding: "5px",
    margin: "2.5px"
  },
  pagination: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
}));

const CrudDevComponent = () => {
  const classes = useStyles();

  let loadingContext = useContext(LoadingContext);
  let desenvolvedorContext = useContext(DesenvolvedorContext);

  const consultarHandler = (page) => {
    desenvolvedorContext.updateNomeFieldError(false);
    desenvolvedorContext.updateDataNascimentoFieldError(false);
    desenvolvedorContext.updateSexoFieldError(false);

    loadingContext.updateLoading(true);
    var queryString = montarQueryString(
      page,
      REGISTROS_POR_PAGINA,
      desenvolvedorContext.nome,
      desenvolvedorContext.dataNascimento,
      desenvolvedorContext.hobby,
      desenvolvedorContext.sexo);

    consultarPorFiltro(queryString).then((response) => {
      if (response.status == STATUS_CODE_OK) {
        desenvolvedorContext.updateListaDevs(response.data.data);
        desenvolvedorContext.updateQuantidadePaginas(calcularQuantidadePaginas(response.data.totalRegistros));
      }
      else {
        alert(JSON.stringify(response.data));
      }
      loadingContext.updateLoading(false);
    });
  }

  const inserirHandler = () => {
    desenvolvedorContext.updateNomeFieldError(false);
    desenvolvedorContext.updateDataNascimentoFieldError(false);
    desenvolvedorContext.updateSexoFieldError(false);

    if (validarCamposObrigatorios()) {
      loadingContext.updateLoading(true);
      let dev = {
        nome: desenvolvedorContext.nome,
        dataNascimento: desenvolvedorContext.dataNascimento,
        sexo: desenvolvedorContext.sexo,
        hobby: desenvolvedorContext.hobby
      }
      inserir(dev).then((response) => {
        if (response.status == STATUS_CODE_CREATED) {
          alert(MENSAGEM_INCLUIDO_SUCESSO);
        }
        else {
          alert(MENSAGEM_ERRO_INSERIR);
        }
        loadingContext.updateLoading(false);
      });
    }
  }

  const validarCamposObrigatorios = () => {
    if (!existeValor(desenvolvedorContext.nome) || !existeValor(desenvolvedorContext.dataNascimento) || !existeValor(desenvolvedorContext.sexo)) {
      if (!existeValor(desenvolvedorContext.nome)) {
        desenvolvedorContext.updateNomeFieldError(true);
      }
      if (!existeValor(desenvolvedorContext.dataNascimento)) {
        desenvolvedorContext.updateDataNascimentoFieldError(true);
      }
      if (!existeValor(desenvolvedorContext.sexo)) {
        desenvolvedorContext.updateSexoFieldError(true);
      }
      alert(MENSAGEM_CAMPOS_OBRIGATORIOS);
      return false;
    }
    return true;
  }

  const pageChangeHandler = (event, value) => {
    desenvolvedorContext.updatePage(value);
    consultarHandler(value);
  }

  return (
    <div className={classes.root}>
      <div className={classes.buttonsDiv}>
        <Button className={classes.button} variant="outlined" color="primary" onClick={() => { consultarHandler(PAGINA_PADRAO) }}>Consultar</Button>
        <Button className={classes.button} variant="outlined" color="primary" onClick={inserirHandler}>Inserir</Button>
        <CrudDevForm />
      </div>
      <CrudDevTable />
      <div className={classes.pagination}>
        <Pagination count={desenvolvedorContext.quantidadePaginas} variant="outlined" page={desenvolvedorContext.page} onChange={pageChangeHandler} />
      </div>
    </div>
  )
}

export default CrudDevComponent;