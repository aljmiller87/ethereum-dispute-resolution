import styled from "styled-components";

export const Wrapper = styled.div`
  align-items: center;
  background-color: #1d1d1d;
  box-shadow: none;
  display: flex;
  padding: 13px 20px;
  position: relative;
  z-index: 2;

  .fa-ethereum {
    font-size: 44px;
    line-height: 44px;
  }
`;

export const ConnectionDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Connected = styled.h4`
  color: #fff;
  /* cursor: pointer; */
  font-size: 0.875rem;
  font-size: 1rem;
  font-weight: 400;
  margin: 0 0 2px;
  text-transform: capitalize;
  white-space: nowrap;
`;

export const Network = styled.span`
  color: #fff;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 0.75rem;
  margin: 0;
  text-transform: uppercase;
  white-space: nowrap;
`;
