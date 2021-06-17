import {ValidatorComponent, ValidatorForm} from "react-material-ui-form-validator";
import Input from "@material-ui/core/Input/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import React, {useEffect} from "react";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Box from "@material-ui/core/Box";


const LabelWithAsterisk = ({label, name, required}) => {
    return (
        <>
            {required && <Box component='span' style={{color: 'red'}}> * </Box>}
            {label || name.charAt(0).toUpperCase() + name.slice(1)}
        </>
    );
};

class TextValidator extends ValidatorComponent {
    render() {
        /* eslint-disable no-unused-vars */
        const {
            error,
            errorMessages,
            validators,
            requiredError,
            helperText,
            validatorListener,
            withRequiredValidator,
            ...rest
        } = this.props;
        const { isValid } = this.state;
        return (
            <TextField
                {...rest}
                error={!isValid || error}
                helperText={(!isValid && this.getErrorMessage()) || helperText}
            />
        );
    }
}

class SelectValidator extends ValidatorComponent {
    render() {
        /* eslint-disable no-unused-vars */
        const {
            error,
            errorMessages,
            validators,
            requiredError,
            helperText,
            validatorListener,
            withRequiredValidator,
            ...rest
        } = this.props;
        const {name, label, required} = rest;
        const { isValid } = this.state;
        return (
            <>
                <InputLabel id="originId-label" error={!isValid || error}>
                    <LabelWithAsterisk label={label} name={name} required={required} />
                </InputLabel>
                <Select
                    {...rest}
                    error={!isValid || error}
                />
                <FormHelperText error={!isValid || error}>{(!isValid && this.getErrorMessage()) || helperText}</FormHelperText>
            </>
        );
    }
}

export const SimpleTextValidator = ({name, label, value, required, validators=[], errorMessages=[], onChange, type, ...props}) => {
    const _validators = !required ? validators : validators.concat('required');
    const _errorMessages = !required ? errorMessages : errorMessages.concat('this field is required');
    const validatorProps = {
        margin: "dense",
        id: name,
        name: name,
        value: value,
        onChange: onChange,
        label: <LabelWithAsterisk label={label} name={name} required={required} />,
        type: type,
        validators: _validators,
        errorMessages: _errorMessages,
        ...props
    };

    useEffect(() => {
        // custom rule will have name 'isValidFileName'
        ValidatorForm.addValidationRule('isValidFileName', (value) => {
            const badChars = ' $/\\';
            return [...badChars].every(char => {
                return value.indexOf(char) === -1;
            });
        });

        ValidatorForm.addValidationRule('isValidPath', (value) => {
            const badChars = ' $\\';
            return [...badChars].every(char => {
                return value.indexOf(char) === -1;
            });
        });

        return () => {
            // remove rule when it is not needed
            ValidatorForm.removeValidationRule('isValidFileName');
            ValidatorForm.removeValidationRule('isValidPath');
        }
    }, []);

    return (
        <TextValidator {...validatorProps}/>
    );
};

export const SimpleCheckboxValidator = ({...props}) => {
    const boolItems = [
        {id: true, name: 'True'},
        {id: false, name: 'False'}
    ];
    return <SimpleSelectValidator items={boolItems} itemKey={'id'} itemValue={'name'} {...props}/>
};

export const SimpleSelectValidator = ({name, label, value, required, validators=[], errorMessages=[], onChange, input=<Input/>, items, itemKey, itemValue, ...props}) => {
    const _validators = !required ? validators : validators.concat('required');
    const _errorMessages = !required ? errorMessages : errorMessages.concat('this field is required');
    const validatorProps = {
        id: name,
        name: name,
        value: value,
        onChange: onChange,
        input: input,
        validators: _validators,
        errorMessages: _errorMessages,
        label: label,
        required: required,
        ...props
    };

    return (
        <FormControl margin="dense">
            <SelectValidator {...validatorProps}>
                {items.map(item => (
                    <MenuItem key={item[itemKey]} value={item[itemKey]}>
                        {item[itemValue]}
                    </MenuItem>
                ))}
            </SelectValidator>
        </FormControl>
    )
};