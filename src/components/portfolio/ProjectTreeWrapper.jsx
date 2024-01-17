import styled from 'styled-components';

const ActiveWrapper = styled.div`
background: ${({ theme }) => theme.material};
.tree-button-area {
  display: flex;
  width: fit-content;
  padding: 0;
  padding-bottom: 1rem;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
.custom-tree-view details li[aria-selected="true"] span:nth-child(2){
  background-color: ${theme.headerBackground};
  color: #FFFFFF;
}
`;

const InactiveWrapper = styled.div`
background: ${({ theme }) => theme.material};
.tree-button-area {
  display: flex;
  width: fit-content;
  padding: 0;
  padding-bottom: 1rem;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
.custom-tree-view details li[aria-selected="true"] span:nth-child(2){
  background-color: #7f787f;
  color: #c6c6c6;
}
`;

export { ActiveWrapper, InactiveWrapper };