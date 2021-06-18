import React, {useEffect, useState} from "react";
import {Button, makeStyles, Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {StatusView} from "./Status/StatusView";
import {StatusEdit} from "./Status/StatusEdit";
import {useStores} from "../../common/modules/useStores";
import {SelectType, StrategyType} from "../../common/modules/player/PlayerModel";
import {useObserver} from "mobx-react-lite";
import {Grid} from "gridjs-react";

import "gridjs/dist/theme/mermaid.css";
import {MAX_CLASS, MAX_SEMESTER} from "../../common/modules/GameStore";
import {useSnackbar} from "notistack";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
    root: {

    },
    log: {
        whiteSpace: 'pre'
    },
    buttonBox: {
        display: 'flex',
        flexDirection: 'row',
        width: 250,
        justifyContent: 'space-between'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}))

const Logs = (props) => {
    const classes = useStyles();

    const [input, setInput] = useState("");

    const handleChange = e => {
        setInput(e.target.value);
    }

    const filteredLine = input ? props.log.split('\n').filter(
        item => item.includes('---') || item.includes(input)
    ).reduce((acc, curr) => acc + curr + '\n', "") : props.log;

    return (
        <Box>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="닉네임" value={input} onChange={handleChange} />
            </form>
            <Typography className={classes.log}>
                {filteredLine}
            </Typography>
        </Box>
    )
}


export const MainTemplate = ({editing}) => {
    const classes = useStyles();

    const [isStart, setIsStart] = useState(false);
    const [classCnt, setClassCnt] = useState(0);
    const [semesterCnt, setSemesterCnt] = useState(0);
    const [duration, setDuration] = useState(50);
    const { gameStore, playerStore } = useStores();

    const {enqueueSnackbar} = useSnackbar();


    useEffect(() => {
        const {start} = gameStore;
        const {finishSemester, finishClass} = playerStore;

        if(!isStart)
            return;
        if(semesterCnt === MAX_SEMESTER){
           enqueueSnackbar('시뮬레이션이 모두 끝났습니다.', { variant: 'success'});
           return;
        }
        if(classCnt === MAX_CLASS){
            setClassCnt(0);
            setSemesterCnt(semesterCnt + 1);
            finishSemester(semesterCnt + 1);
        }
        const timer = setTimeout(() => {
            start(semesterCnt, classCnt);
            finishClass();
            setClassCnt(classCnt + 1);
        }, duration);

        return () => {
            clearTimeout(timer)
        };
        // eslint-disable-next-line
    }, [isStart, classCnt, semesterCnt, duration])

    const handleStart = () => {
        setIsStart(true);
    }

    const handleClear = () => {
        setIsStart(false);
        setClassCnt(0);
        setSemesterCnt(0);
        gameStore.init();
        playerStore.init();
    }

    const handleChange = (event) => {
        setDuration(event.target.value);
    };

    return useObserver(() => {
        const { playerGrid } = playerStore;
        const { debugLog } = gameStore;

        return (
            <Box>
                <Box className={classes.header}>
                    <Typography>
                        {`${semesterCnt}학기 ${classCnt}번째 수업 진행중`}
                    </Typography>
                    <Box className={classes.buttonBox}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Speed</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={duration}
                                onChange={handleChange}
                            >
                                <MenuItem value={50}>빠르게</MenuItem>
                                <MenuItem value={200}>보통</MenuItem>
                                <MenuItem value={500}>느리게</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant='contained' onClick={handleStart}>
                            Run
                        </Button>
                        <Button variant='contained' onClick={handleClear}>
                            Clear
                        </Button>
                    </Box>
                </Box>
                <Grid
                    data={playerGrid}
                    columns={['별명', '점수', '학점', '평판', '아낀 체력', '지능', '친화력', '체력', '전략타입', '전략상세']}
                    search
                    pagination={{
                        enabled: true,
                        limit: 10,
                    }}
                />
                <Logs log={debugLog} />
            </Box>
        )
    })


}