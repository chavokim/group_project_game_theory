import React, {createContext, useContext} from "react";
import {StoresContext} from "../../index";

export const useStores = () => {
    return useContext(StoresContext);
}