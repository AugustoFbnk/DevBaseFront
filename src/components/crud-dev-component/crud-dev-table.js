import { excluir } from '../../services/crud-services/crud-services';
import DesenvolvedorContext from '../../contexts/desenvolvedor-context';
import LoadingContext from '../../contexts/loading-context';
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    MENSAGEM_DESEJA_EXCLUIR,
    MENSAGEM_EXCLUIDO_SUCESSO,
    MENSAGEM_ERRO_EXCLUIR,
    STATUS_CODE_NO_CONTENT
} from './crud-dev-constantes';

const CrudDevTable = () => {

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(0.5),
                width: '25ch',
            },
        }
    }));

    let desenvolvedorContext = useContext(DesenvolvedorContext);
    let loadingContext = useContext(LoadingContext);

    const excluirHandler = (id) => {
        if (window.confirm(MENSAGEM_DESEJA_EXCLUIR)) {
            loadingContext.updateLoading(true);
            excluir(id).then((response) => {
                if (response.status == STATUS_CODE_NO_CONTENT) {
                    alert(MENSAGEM_EXCLUIDO_SUCESSO)
                }
                else {
                    alert(MENSAGEM_ERRO_EXCLUIR)
                }
                loadingContext.updateLoading(false);
            })
        }
    }
    const classes = useStyles();

    return (
        <TableContainer>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell align="right">Idade</TableCell>
                        <TableCell align="right">Data de nascimento</TableCell>
                        <TableCell align="right">Sexo</TableCell>
                        <TableCell align="right">Hobby</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(desenvolvedorContext.listaDevs ?? []).map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">{row.nome}</TableCell>
                            <TableCell align="right">{row.idade}</TableCell>
                            <TableCell align="right">{row.dataNascimento?.substring(0, 10)}</TableCell>
                            <TableCell align="right">{row.sexo}</TableCell>
                            <TableCell align="right">{row.hobby}</TableCell>
                            <TableCell align="right">
                                <Link to={`/CrudAlterar/${row.id}`}>Alterar</Link>
                            </TableCell>
                            <TableCell align="right" onClick={() => { excluirHandler(row.id) }}>
                                Excluir
                                <DeleteIcon></DeleteIcon>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CrudDevTable;