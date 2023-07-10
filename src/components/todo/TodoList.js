import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

import data from './../../data.json'

export default function TodoList() {
  const [state, setState] = useState({
    todoList: data,
  });

  const Card = () => {
    return (
      <Fragment>
        {state.todoList.map((itme, index) => {
          return (
            <PostBox key={itme.postId}>
              dsd
            </PostBox>
          )
        }
        )}
      </Fragment>
    )
  };

  return (
    <Container>
      <Wrap>
        <Header>
          <LogoBox>
            <LinkItem to='/'>
              <LogoImg src='./images/home-postit.png' alt='' />
            </LinkItem>
          </LogoBox>
          <SearchBox>
            <SearchInput />
          </SearchBox>
        </Header>
        <SelectBox>
          <SelectBtn></SelectBtn>
          <SelectBtn></SelectBtn>
          <SelectBtn></SelectBtn>
        </SelectBox>
        <Content>
          <Card />
        </Content>
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  background: url(../images/background.webp) center center / cover no-repeat;
  padding: 0;
  margin: 0;
  overflow: hidden;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Wrap = styled.div`
  width: 70%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F0F0F0;
  border: solid 1px #F0F0F0;
  border-radius: 15px;
`

const Header = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  border-radius: 15px 15px 0px 0px;
`

const LogoBox = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-radius: 15px 0px 0px 0px;
`

const LinkItem = styled(Link)`
  width: 65%;
  height: 85%;
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
`

const SearchBox = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SearchInput = styled.input`
  width: 74%;
  height: 35%;
  display: flex;
  border: solid 2px #CFCFCF;
  border-radius: 10px;
`

// select btn 관련
const SelectBox = styled.div`
  width: 45%;
  height: 10%;
  display: flex;
  justify-content: space-between;
`

const SelectBtn = styled.div`
  width: 15%;
  height: 70%;
  border: solid 2px #CFCFCF;
  border-radius: 10px;
  background-color: #fff;
  cursor: pointer;
`

// todo-post 관련
const Content = styled.div`
  width: 98%;
  height: 65%;
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px 15px;
  /* align-content: start; */
  overflow-y: scroll;
  /* overflow: hidden; */
  /* border: solid 1px black; */
`

const PostBox = styled.div`
  width: 80%;
  height: 200px;
  background-color: #FFFF00;
  margin-top: 20px;
  box-shadow: 0 1px 1px rgba(0,0,0,0.11), 
              0 2px 2px rgba(0,0,0,0.11), 
              0 4px 4px rgba(0,0,0,0.11), 
              0 6px 8px rgba(0,0,0,0.11),
              0 8px 16px rgba(0,0,0,0.11);
`
