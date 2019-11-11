import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import styles from 'components/Section/styles';

const useStyles = makeStyles(styles);

const Section = (props) => {

    const classes = useStyles(props);
    console.log('classes', classes);
    return (
        <section theme={props.theme} className={classes.section}>
            {props.children}
        </section>
    )
}

export default Section;