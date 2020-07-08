import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";

export const MenuWrapper = styled.div`
  display: block;
  ${breakpoint("lg")`
    display: none;
  `}
`;

export const DesktopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
