import React, {FunctionComponent} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
    },
    description: {
        fontSize: "2rem"
    },
    goBack: {
        display: "flex",
        justifyContent: "center",
        marginTop: "1rem",
        fontWeight: 700,
        border: "1px solid white",
        borderRadius: "2px",
        cursor: "pointer",
        userSelect: "none",
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}));

export const Page404 = ({backLink, backName}) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box className={classes.description}>
                <Typography variant="h5">
                    <Box fontWeight="fontWeightBold">
                        페이지를 찾을 수 없습니다.
                    </Box>
                </Typography>
                <Typography variant="subtitle2">
                    잘못된 페이지로 접근하였습니다.
                </Typography>
                <Box className={classes.goBack}><Link href={`${backLink || '/'}`}>{backName || "처음으로 돌아가기"}</Link></Box>
            </Box>
        </Box>
    );
};
