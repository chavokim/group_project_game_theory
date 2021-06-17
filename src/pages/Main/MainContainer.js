import React, {useState} from "react";
import {makeStyles} from "@material-ui/core";
import {MainTemplate} from "./MainTemplate";

const useStyles = makeStyles(theme => ({

}));

export const MainContainer = (props) => {
    const classes = useStyles();

    const [ editing, setEditing ] = useState(false);

    const handleEdit = () => {
        setEditing(true);
    }

    const handleCancel = () => {
        setEditing(false);
    }

    return (
        <MainTemplate editing={editing} handleEdit={handleEdit} handleCancel={handleCancel}/>
    )
}