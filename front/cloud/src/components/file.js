import React from "react";
import { Grid } from "@mui/material";

class File extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 }>
                    { this.props.fileIcon }
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={12 }>
                    { this.props.fileText }
                </Grid>
            </div>
        )
    }
}

export default File;
