const sectionStyles = theme => (console.log(theme), {
    section: props => ({
        padding: '30px 0',
        [theme.breakpoints.up("sm")]: {
            padding: '40px 0',
        },
        [theme.breakpoints.up("md")]: {
            padding: '60px 0',
        },
        [theme.breakpoints.up("lg")]: {
            padding: '80px 0',
        },
        backgroundColor: props.theme === "dark" ? theme.palette.grey.A400 : 'transparent',
        color: props.theme === "dark" ? theme.palette.grey[50] : '#000',
    }),
});

export default sectionStyles;
