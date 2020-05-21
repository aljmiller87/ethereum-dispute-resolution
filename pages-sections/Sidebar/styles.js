import styled from "styled-components";

export const StyledSideBar = styled.aside`
  background-color: #252525 !important;
  box-shadow: none;
  color: #a1a1a1 !important;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  max-width: 250px;
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

  @media (max-width: 991px) {
    display: none;
  }
`;
