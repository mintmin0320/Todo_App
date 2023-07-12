import React, { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import TodoList from './TodoList';
import { todo } from '../../redux/slices/todoSlice';

// icon, css, dummy data
import 'react-toastify/dist/ReactToastify.css';
import { faCircleCheck, faPenToSquare, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import data from '../../data.json'

export default function Todo() {
  const dispatch = useDispatch();
  const todoList = useSelector(state => state.todos.todoArr);
  const nextId = useRef(7);
  const [state, setState] = useState({
    title: '',
    name: ''
  });

  const handleOnChange = useCallback((e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }, [state]);

  // 일정 등록
  const handleOnSubmit = useCallback(() => {
    dispatch(todo([...todoList,
    {
      postId: nextId.current,
      name: state.name,
      postTitle: state.title,
      done: false,
      editStatus: false
    }]));
    setState({
      ...state,
      title: '',
      name: ''
    });
    nextId.current += 1;

    toast.success(`${state.name}님의 Todo가 등록 되었습니다.`);
  }, [dispatch, state, todoList]);

  // 완료된 일정만 조회
  const handleOnSelectDoneBtn = useCallback(() => {
    dispatch(todo(
      todoList.filter(({ done }) =>
        done === true
      )
    ));
    setState({
      ...state,
      title: '',
      name: ''
    });

    toast.success('달성한 Todo 조회 성공!');
  }, [dispatch, state, todoList]);

  // 리스트 초기화 
  const handleOnRefreshBtn = useCallback(() => {
    dispatch(todo(data));
    setState({
      ...state,
      title: '',
      name: ''
    });

    toast.success('초기화 되었습니다.');
  }, [dispatch, state]);

  return (
    <Container>
      <Wrap>
        <Header>
          <LogoBox>
            <LinkItem to='/'>
              <LogoImg src='./images/home-postit.png' alt='' />
            </LinkItem>
          </LogoBox>
          <Form onSubmit={(e) => { handleOnSubmit(); e.preventDefault(); }}>
            <TopInputBox>
              <TitleInput
                onChange={(e) => handleOnChange(e, 'title')}
                value={state.title}
                name='title'
                placeholder='Todo를 입력해 주세요!'
                required
              />
            </TopInputBox>
            <BottomInputBox>
              <NameInput
                onChange={(e) => handleOnChange(e, 'name')}
                value={state.name}
                name='name'
                placeholder='성함을 입력해 주세요!'
                required
              />
              <InsertBtn >
                <FontAwesomeIcon icon={faPenToSquare} />
              </InsertBtn>
            </BottomInputBox>
          </Form>
        </Header>
        <SelectBox>
          <SelectBtn onClick={() => handleOnSelectDoneBtn()}>
            <FontAwesomeIcon
              icon={faCircleCheck}
              color='green'
              size='2x'
            />
          </SelectBtn>
          <SelectBtn onClick={() => handleOnRefreshBtn()}>
            <FontAwesomeIcon
              icon={faRotateRight}
              color='blue'
              size='2x'
            />
          </SelectBtn>
        </SelectBox>
        <Content>
          <TodoList />
        </Content>
      </Wrap>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  background: url(./images/background.webp) center center / cover no-repeat;
  padding: 0;
  margin: 0;
  overflow: hidden;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
  
  input {
    font-size: 18px;
  }

  input::placeholder {
    font-size: 17px;
  }

  textarea {
    font-size: 18px;
    resize: none;
  }

  textarea::placeholder {
    font-size: 17px;
  }
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
  box-shadow: 0 1px 1px rgba(0,0,0,0.11), 
              0 2px 2px rgba(0,0,0,0.11), 
              0 4px 4px rgba(0,0,0,0.11), 
              0 6px 8px rgba(0,0,0,0.11),
              0 8px 16px rgba(0,0,0,0.11);

  @media screen and (max-width: 1400px) {
    height: 85%;
  }
`

const Header = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  border-radius: 15px 15px 0px 0px;
`

// logo 
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
  width: 65%;
  height: 85%;

  @media screen and (max-width: 450px) {
    width: 100%;
    height: 100%;
  }
`

// todo form
const Form = styled.form`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 450px) {
    width: 95%;
  }
`

const TopInputBox = styled.div`
  width: 70%;
  height: 50%;
  display: flex;
  align-items: flex-end;
`

const BottomInputBox = styled.div`
  width: 70%;
  height: 50%;
  display: flex;
`

// 제목, 이름 입력 input
const TitleInput = styled.input`
  width: 100%;
  height: 50%;
  border: solid 2px #CFCFCF;
`

const NameInput = styled.input`
  width: 90%;
  height: 50%;
  border-top: 0px;
  border-bottom: solid 2px #CFCFCF;
  border-left: solid 2px #CFCFCF;
  border-right: solid 2px #CFCFCF;

  @media screen and (max-width: 450px) {
    width: 80%;
  }
`

// 작성 버튼
const InsertBtn = styled.button`
  width: 10%;
  height: 55%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: solid 2px #CFCFCF;
  border-right: solid 2px #CFCFCF;
  border-top: 0px;
  border-left: 0px;
  font-size: 22px;
  cursor: pointer;

  @media screen and (max-width: 450px) {
    width: 20%;
    font-size: 14px;
  }
`

// 정렬, 초기화 버튼
const SelectBox = styled.div`
  width: 45%;
  height: 10%;
  display: flex;
  justify-content: space-around;

  @media screen and (max-width: 450px) {
    width: 100%;
    height: 8%;
    font-size: 11px;
  }
`

const SelectBtn = styled.div`
  width: 10%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 2px #CFCFCF;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
`

// todo-post 관련
const Content = styled.div`
  width: 98%;
  height: 65%;
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 15px 15px;
  align-content: start;
  overflow-y: scroll;
  background-color: #fff;
  box-shadow: 0 1px 1px rgba(0,0,0,0.11), 
              0 2px 2px rgba(0,0,0,0.11), 
              0 4px 4px rgba(0,0,0,0.11), 
              0 6px 8px rgba(0,0,0,0.11),
              0 8px 16px rgba(0,0,0,0.11);

  @media screen and (max-width: 450px) {
    display: flex;
    flex-direction: column;
  }
`
