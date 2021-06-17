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

const useStyles = makeStyles(theme => ({
    root: {

    },
    log: {
        whiteSpace: 'pre'
    }
}))

const StudentIndicator = (props) => {
    const classes = useStyles();

    return (
        <Box>
            <Typography className={classes.log}>
                {props.log}
            </Typography>
        </Box>
    )
}

export const MainTemplate = ({editing}) => {
    const classes = useStyles();

    const [isStart, setIsStart] = useState(false);
    const { gameStore, playerStore } = useStores();
    const {start} = gameStore;
    const {finishSemester} = playerStore;

    useEffect(() => {
        if(!isStart)
            return;
        let semesterCnt = 0;
        let classCnt = 0;
        const interval = setInterval(() => {
            start(semesterCnt, classCnt);
            classCnt++;
            if(classCnt === MAX_CLASS){
                classCnt = 0;
                semesterCnt++;
                finishSemester();
            }
            if(semesterCnt === MAX_SEMESTER)
                clearInterval(interval)
        }, 500);
    }, [isStart])

    const handleStart = () => {
        setIsStart(true);
    }

    return useObserver(() => {
        const { playerGrid } = playerStore;
        const { debugLog } = gameStore;

        return (
            <Box>
                <Button variant='contained' onClick={handleStart}>
                    Run
                </Button>
                <Grid
                    data={playerGrid}
                    columns={['별명', '점수', '학점', '평판', '아낀 체력', '지능', '친화력', '체력', '전략타입', '전략상세']}
                    search
                    pagination={{
                        enabled: true,
                        limit: 10,
                    }}
                />
                <StudentIndicator log={debugLog} />
            </Box>
        )
    })


}