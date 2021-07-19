import { useContext, useEffect } from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { consultarPorId } from '../../services/crud-services/crud-services';
import DesenvolvedorContext from '../../contexts/desenvolvedor-context';
import LoadingContext from '../../contexts/loading-context';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(0.5),
            width: '25ch',
        },
    }
}));

const CrudDevForm = (props) => {

    let loadingContext = useContext(LoadingContext);
    let desenvolvedorContext = useContext(DesenvolvedorContext);

    useEffect(() => {
        if (props.id) {
            loadingContext.updateLoading(true);
            desenvolvedorContext.updateId(props.id);
            consultarPorId(props.id).then((response) => {
                desenvolvedorContext.updateNome(response.data.nome);
                desenvolvedorContext.updateDataNascimento(response.data.dataNascimento?.substring(0, 10));
                desenvolvedorContext.updateSexo(response.data.sexo);
                desenvolvedorContext.updateHobby(response.data.hobby);
            });
            loadingContext.updateLoading(false);
        }

    }, []);

    const changeNomeHandler = (e) => {
        desenvolvedorContext.updateNome(e.target.value);
    };

    const changeDataNascimentoHandler = (e) => {
        desenvolvedorContext.updateDataNascimento(e.target.value);
    }

    const changeSexoHandler = (e) => {
        desenvolvedorContext.updateSexo(e.target.value);
    }

    const changeHobbyHandler = (e) => {
        desenvolvedorContext.updateHobby(e.target.value);
    }

    const opcoesSexo = [
        {
            value: 'F',
            label: "Feminino"
        },
        {
            value: 'M',
            label: "Masculino"
        },
        {
            value: null,
            label: null
        }
    ];

    const classes = useStyles();
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField error={desenvolvedorContext.nomeFieldError} onChange={changeNomeHandler} id="nome" label="Nome" value={desenvolvedorContext.nome} variant="filled" />
            <TextField error={desenvolvedorContext.dataNascimentoFieldError} onChange={changeDataNascimentoHandler} id="dataNascimento" type="date" label="Data de nascimento" value={desenvolvedorContext.dataNascimento} variant="filled" />
            <TextField error={desenvolvedorContext.sexoFieldError} onChange={changeSexoHandler} id="sexo" select label="Sexo" value={desenvolvedorContext.sexo} variant="filled">
                {opcoesSexo.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField onChange={changeHobbyHandler} id="hobby" label="Hobby" value={desenvolvedorContext.hobby} variant="filled" />
        </form>
    )
}

export default CrudDevForm;