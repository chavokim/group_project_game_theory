import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import {Link} from "react-router-dom";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";


const useStyles = makeStyles(theme => ({
    paper: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.background.heavyLight,
        color: theme.palette.text.primary
    },
    loginForm: {
        backgroundColor: theme.palette.background.light,
    },
    box: {
        flexDirection: "column",
        backgroundColor: theme.palette.background.light,
        padding: theme.spacing(6),
        paddingTop: 0,
        borderRadius: 16,
        maxWidth: 400,
    },
    form: {
        borderRadius: "6px 6px 6px 6px",
        width: "100%",
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
        height: 50,
        fontSize: 16,
        width:"100%",
    },
    card: {
        minWidth: 100,
        maxWidth: 200,
        minHeight: 100,
        maxHeight: 200,
        boxShadow: "none",
        margin: "auto",
        overflow: "visible"
    },
    cardMedia: {
        width: null,
        backgroundColor: theme.palette.background.dark,
    },
    bottomBox: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems: "center",
    },

}));

export const LoginTemplate = ({ inputs, onChange, onKeyPress, onSubmit }) => {
    const classes = useStyles();

    return (
        <Box className={classes.paper}>
            <Box className={classes.loginForm}>
                <Card className={classes.card}>
                    <CardMedia
                        component="img"
                        image={`https://ichef.bbci.co.uk/news/640/cpsprodpb/4B38/production/_107365291_gettyimages-526191956.jpg`}
                        title="Concept Icon"
                        className={classes.cardMedia}
                    />
                </Card>
                <Box className={classes.box}>
                    <TextField
                        id="username"
                        label="아이디"
                        name="username"
                        value={inputs.username}
                        onChange={onChange}
                        margin="normal"
                        variant="outlined"
                        className={classes.form}
                    />
                    <TextField
                        id="password"
                        label="비밀번호"
                        name="password"
                        value={inputs.password}
                        type="password"
                        onChange={onChange}
                        margin="normal"
                        variant="outlined"
                        onKeyPress={onKeyPress}
                        className={classes.form}
                    />
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={onSubmit}
                        className={classes.submit}
                    >
                        로그인
                    </Button>
                    <Box className={classes.bottomBox}>
                        <Box>
                            <Button color='default' to={`/accounts/sign-up`} component={Link}>
                                회원가입
                            </Button>
                        </Box>
                        <Box>
                            <Button color='default' to={`/accounts/forgot-password`} component={Link}>
                                비밀번호 찾기
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
