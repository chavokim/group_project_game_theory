import React from 'react';

import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/styles";
import {LoginContainer} from "./LoginContainer";

const useStyles = makeStyles(theme => ({
    root: {
        height: "calc(100vh - 64px)",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "60px 0",
        backgroundColor: theme.palette.background.heavyLight,
    }
}));

function LoginPage() {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <LoginContainer />
        </Box>
    )
}

export default LoginPage;
