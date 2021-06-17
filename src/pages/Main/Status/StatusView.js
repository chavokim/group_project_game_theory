import {makeStyles} from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import React, {Fragment} from "react";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
const useStyles = makeStyles( theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        flex: 1
    },
    description: {
        whiteSpace: 'pre-line'
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end"
    },
    button: {
        marginLeft: theme.spacing(1)
    },
    card: {
        padding: theme.spacing(3)
    },
    title: {
        wordWrap: "break-word",
        width: "40vw",
    },
    table: {}
}));

export const chunkArray = (arr, chunkSize) =>{
    let myArray = arr.slice(0);
    let results = [];

    while (myArray.length) {
        results.push(myArray.splice(0, chunkSize));
    }

    return results;
};

const SimpleTable = ({data, cellsPerRow=1, ratio=[1, 1], cellClass}) => {
    const {title, cells} = data;
    const rows = chunkArray(cells, cellsPerRow);
    const classes = useStyles();

    return (
        <Box className={classes.card}>
            <Box>
                <Typography variant="h5" className={classes.title}>
                    {title}
                </Typography>
            </Box>
            <Table className={classes.table} aria-label="table">
                <colgroup>
                    {rows.map((row, rIndex) => (
                        ['name', 'value'].map((name, cIndex) => (
                            <col key={`${rIndex}-${cIndex}`} style={{width:`${100 / cellsPerRow * ratio[cIndex] / (ratio[0] + ratio[1])}%`}}/>
                        ))
                    ))}
                </colgroup>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            {row.map((cell, index) => (
                                <Fragment key={index}>
                                    <TableCell component="th" scope="row">
                                        {cell.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box className={cellClass}>{cell.value}</Box>
                                    </TableCell>
                                </Fragment>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
};

export const StatusView = ({selectedItem, handleEdit}) => {
    const classes = useStyles();

    const data = {
        title: "참가자 정보",
        cells: [
            {name: '별명', value: ""},
            {name: '전략', value: ""},
            {name: '능력치', value: <Box component="span" className={classes.description}>하이하</Box>},
        ]
    };

    return (
        <Box className={classes.root}>
            <SimpleTable classes={classes} data={data} />
            <Box className={classes.buttons}>
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={handleEdit}
                    className={classes.button}
                >
                    Edit
                </Button>
            </Box>
        </Box>
    );
};

