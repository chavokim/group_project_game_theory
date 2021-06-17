import './App.css';
import {Route, Switch, BrowserRouter} from "react-router-dom";
import {Page404} from "./common/page/Page404";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from '@material-ui/core';
import {MainPage} from "./pages/Main/MainPage";
import {ThemeProvider} from "@material-ui/styles";
import CustomizedSnackbars from "./common/component/CustomizedSnackbars";
import React from "react";
import LoginPage from "./pages/Login/LoginPage";
import {SnackbarProvider} from "notistack";
import {CountdownHeader} from "./common/component/CountdownHeader";
import Box from "@material-ui/core/Box";

export const defaultTheme = createMuiTheme({
    palette: {
        default: {
            main: '#000000'
        },
        primary: {
            main: '#e09a10',
            contrastText: "#ffffff"
        },
        secondary: {
            extraLight : "#cfd8dc",
            light: '#88BEDA',
            main: '#456795',
            dark : '#252525'
        },
        background: {
            light: '#fff',
            heavyLight: '#ebeff1',
            main: '#fbfbfc',
            heavy: '#f5f5f5',
            dark: '#000000',
        },
        text: {
            extraLight: '#fff',
            light: '#b1b1b5',
            primary: '#1a1d24',
            secondary: '#2d3439'
        }
    },
    typography: {
        fontFamily: 'Spoqa Han Sans Neo, Roboto, Oxygen',
        title: {
            fontWeight: 700,
            fontSize: 40
        },
        h1: {
            fontWeight: 700,
            fontSize: 28
        },
        h2: {
            fontWeight: 700,
            fontSize: 24
        },
        h3: {
            fontWeight: 500,
            fontSize: 20
        },
        subtitle1: {
            fontWeight: 500,
            fontSize: 18
        },
        body1: {
            fontWeight: 400,
            fontSize: 16
        },
        caption: {
            fontWeight: 500,
            fontSize: 14
        },
        caption2: {
            fontWeight: 400,
            fontSize: 12
        }
    },
});

const Router = () => {
    // const {authStore} = useStores().rootStore;
    return (
        <BrowserRouter>
            <CssBaseline />
            <Switch>
                <Route
                    exact
                    path="/not-found"
                    render={() => <Page404 />}
                />
                <Route
                    path="/"
                    render={() => <MainPage />}
                />
            </Switch>
        </BrowserRouter>
    );
};

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
        <SnackbarProvider maxSnack={3}>
            {/*<CountdownHeader />*/}
            <Router />
        </SnackbarProvider>
    </ThemeProvider>

  );
}

export default App;
