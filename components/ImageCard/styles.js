import styled from "styled-components";
import { Paper, Fab } from "@material-ui/core";

export const ImgCard = styled(Paper)`
  background: #fff;
  background-image: ${props => `url(${props.image})`};
  background-position: 50%;
  background-size: cover;
  border: 0;
  border-radius: 6px;
  box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56),
    0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
  color: #fff !important;
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  height: 100%;
  margin-bottom: 0;
  position: relative;
  text-align: center;
  word-wrap: break-word;
  &::before {
    content: "";
    background-color: rgba(0, 0, 0, 0.56);
    border-radius: 6px;
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
  }
  p {
    margin-bottom: 0.5rem;
  }
`;

export const Content = styled.div`
  flex: 1 1 auto;
  margin: 0 auto;
  max-width: 440px;
  min-height: 280px;
  padding: 40px 30px;
  position: relative;
  z-index: 2;
`;

export const Btn = styled(Fab)`
  margin-top: 0.5rem;
  svg {
    height: 1rem;
    width: 1rem;
  }
`;

// const imageCardStyle = {
//   imageCard: {
//     backround: "#fff",
//     backgroundImage: props => `url(${props.image})`,
//     backgroudPosition: "50%",
//     backgroundSize: "cover",
//     border: "0",
//     borderRadius: "6px",
//     boxShadow:
//       "0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
//     color: "#fff",
//     display: "flex",
//     flexDirection: "column",
//     fontSize: "0.875rem",
//     marginBottom: "30px",
//     position: "relative",
//     textAlign: "center",
//     wordWrap: "break-word",
//     "&::before": {
//       content: "''",
//       top: "0",
//       left: "0",
//       width: "100%",
//       height: "100%",
//       display: "block",
//       zIndex: "1",
//       position: "absolute",
//       borderRadius: "6px",
//       backgroundColor: "rgba(0, 0, 0, 0.56)"
//     }
//   },
//   content: {
//     flex: "1 1 auto",
//     padding: "40px 30px",
//     margin: "0 auto",
//     maxWidth: "440px",
//     minHeight: "280px",
//     position: "relative",
//     zIndex: "2"
//   },
//   btn: {
//     marginTop: "0.5rem",
//     "& *:first-child": {
//       marginRight: "0.5rem"
//     },
//     "& svg": {
//       height: "1rem",
//       width: "1rem"
//     }
//   }
// };

// export default imageCardStyle;
