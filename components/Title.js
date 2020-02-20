import React from "react";
import styled from "styled-components";

// material components
import Box from "@material-ui/core/Box";

const Title = ({ children, type }) => {
  type = type ? type : "h1";
  return <StyledTitle as={type}>{children}</StyledTitle>;
};

const StyledTitle = styled(Box)`
  color: #3c4858;
  margin: 1.75rem 0 0.875rem;
  margin-top: 30px;
  min-height: 32px;
  font-family: "Roboto Slab", "Times New Roman", serif;
  font-weight: 700;
  margin-bottom: 1rem;
  text-decoration: none;
`;

export default Title;
