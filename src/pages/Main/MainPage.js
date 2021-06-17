import React from "react";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/styles";
import {MainContainer} from "./MainContainer";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "60px 0",
        backgroundColor: theme.palette.background.heavyLight,
    }
}));

export const MainPage = (props) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <MainContainer />
        </Box>
    )
}