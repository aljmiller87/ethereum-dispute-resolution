import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";

export const StyledSideBar = styled.aside`
  background-color: #252525 !important;
  box-shadow: none;
  color: #a1a1a1 !important;
  display: none;
  flex-direction: column;
  flex-wrap: nowrap;
  max-width: 250px;
  min-width: 250px;
  min-height: 100vh;
  width: 250px;

  .SideBar-Mobile {
    background-color: #252525 !important;
    box-shadow: none;
    color: #a1a1a1 !important;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    max-width: 250px;
    min-height: 100vh;
    width: 250px;
  }

  ${breakpoint("lg")`
    display: flex;
  `}
`;
