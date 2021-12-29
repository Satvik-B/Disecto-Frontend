import { Box } from "@mui/system";
import React from "react";
import useStorage from "../hooks/useStorage";

const ProgressBar = ({detail, setDetail}) => {
    const {url, progress, error} = useStorage(detail);
    console.log(url);
    console.log(progress);
    console.log(error);
    return (
        <Box sx={{ width : progress + '%', height:'10vh', backgroundColor:'blue' }} />
    )
}

export default ProgressBar;