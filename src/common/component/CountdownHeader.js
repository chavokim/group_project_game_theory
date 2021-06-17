import React from "react";
import {makeStyles, Toolbar} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Countdown from "react-countdown";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
    root: {

    }
}))

export const CountdownHeader = (props) => {
    const classes = useStyles();

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <Box> Tada! </Box>;
        } else {
            // Render a countdown
            return <Box>결과 발표까지 {days}일 {hours}시 {minutes}분 {seconds}초 남았습니다.</Box>;
        }
    };

    return (
        <AppBar>
            <Toolbar>
                <Countdown
                    date={new Date(2021, 5, 18)}
                    renderer={renderer}
                />
            </Toolbar>
        </AppBar>
    )
}