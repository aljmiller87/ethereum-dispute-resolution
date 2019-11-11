import React from 'react';
import Link from "next/link";
import { Paper, Fab } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import BuildIcon from '@material-ui/icons/Build';
import NotesIcon from '@material-ui/icons/Notes';

import styles from "components/ImageCard/styles.js";
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(styles);
const icons = {
    blockchain: AccountTreeIcon,
    build: BuildIcon,
    notes: NotesIcon
}

const IconButton = ({ variant }, { ...rest }) => {
    const Component = icons[variant];
    return <Component {...rest} />;
};

const index = (props) => {
    const classes = useStyles(props);
    return (
        <Paper className={classes.imageCard}>
            <div className={classes.content}>
                <Typography variant="body2" component="span">{props.subCopy}</Typography>
                <Typography variant="h4" component="h2">{props.title}</Typography>
                <Typography variant="body1" >{props.copy}</Typography>
                <Link href={props.buttonLink}>
                    <a>
                        <Fab variant="extended" aria-label="like" className={classes.btn}>
                            <IconButton variant={props.buttonIcon} />
                            {props.buttonText}
                        </Fab>
                    </a>
                </Link>
            </div>
        </Paper>
    )
}

export default index;