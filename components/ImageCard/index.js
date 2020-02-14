import React from "react";
import Link from "next/link";
import { Paper, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import BuildIcon from "@material-ui/icons/Build";
import NotesIcon from "@material-ui/icons/Notes";

// import styles from "components/ImageCard/styles.js";
import { ImgCard, Content, Btn } from "components/ImageCard/styles.js";
import { Typography } from "@material-ui/core";

const icons = {
  blockchain: AccountTreeIcon,
  build: BuildIcon,
  notes: NotesIcon
};

const IconButton = ({ variant }, { ...rest }) => {
  const Component = icons[variant];
  return <Component {...rest} />;
};

const index = props => {
  return (
    <ImgCard image={props.image}>
      <Content>
        <Typography variant="body2" component="span">
          {props.subCopy}
        </Typography>
        <Typography variant="h4" component="h2">
          {props.title}
        </Typography>
        <Typography variant="body1">{props.copy}</Typography>
        <Link href={props.buttonLink}>
          <a>
            <Btn variant="extended" aria-label="like">
              <IconButton variant={props.buttonIcon} />
              {props.buttonText}
            </Btn>
          </a>
        </Link>
      </Content>
    </ImgCard>
  );
};

export default index;
