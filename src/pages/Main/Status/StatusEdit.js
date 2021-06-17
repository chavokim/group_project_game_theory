import {ValidatorForm} from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import React, {createRef, useEffect, useState} from "react";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/styles";
import {SimpleCheckboxValidator, SimpleTextValidator} from "../../../common/component/form/SimpleValidator";

const useStyles = makeStyles( theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        flex: 1
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end"
    },
    button: {
        marginLeft: theme.spacing(1)
    },
    form: {
        display: "flex",
        flexDirection: "column"
    }
}));

export const StatusEditForm = ({initInputs, trunkId, submitRef, onSubmit}) => {
    const [inputs, setInputs] = useState(initInputs);

    const classes = useStyles();

    useEffect(() => {
        setInputs(initInputs);
    }, [initInputs]);

    const onChange = (e) => {
        const {name, value} = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    return(
        <ValidatorForm
            onSubmit={() => onSubmit(inputs)}
            onError={errors => console.log(errors)}
            className={classes.form}
        >
            <SimpleTextValidator name="label" value={inputs.label} onChange={onChange} type="text" fullWidth required/>
            <SimpleTextValidator name="order" value={inputs.order} onChange={onChange} type="text" fullWidth/>
            <SimpleTextValidator name="copy" value={inputs.copy} onChange={onChange} type="text" fullWidth/>
            <SimpleTextValidator name="description" value={inputs.description} onChange={onChange} type="text" multiline fullWidth/>
            <SimpleCheckboxValidator name="usable" value={inputs.usable} onChange={onChange} required/>
            <SimpleCheckboxValidator name="isPublic" value={inputs.isPublic} onChange={onChange} required/>
            <Button type="submit" style={{display:"none"}} ref={submitRef}>Submit</Button>
        </ValidatorForm>
    );
};

export const StatusEdit = ({selectedItem, handleConfirm, handleCancel}) => {
    const classes = useStyles();

    const submitRef = createRef();

    const validateAndConfirm = () => {
        submitRef.current.click();
    };

    const onSubmit = (inputs) => {
        handleConfirm(inputs);
    };

    return (
        <Box className={classes.root}>
            <StatusEditForm initInputs={selectedItem} trunkId={selectedItem.id} submitRef={submitRef} onSubmit={onSubmit} />
            <Box className={classes.buttons}>
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={validateAndConfirm}
                    className={classes.button}
                >
                    Confirm
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    color="default"
                    onClick={handleCancel}
                    className={classes.button}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};