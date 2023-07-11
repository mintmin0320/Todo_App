import React, { Fragment, useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast, ToastContainer } from 'react-toastify';

// icon, css, dummy data
import 'react-toastify/dist/ReactToastify.css';
import { faCircleCheck, faPenToSquare, faRotateRight, faTrashCan, faFilePen, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import data from './../../data.json'

export default function TodoList() {
  const [todoList, setTodoList] = useState(data);
  const [title, setTitle] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [name, setName] = useState('');
  const nextId = useRef(7);

  const handleOnChange = useCallback((e, param) => {
    if (param === 'title') {
      setTitle(e.target.value);
    } else if (param === 'name') {
      setName(e.target.value);
    } else if (param === 'edit') {
      console.log(e.target.value);
      setEditTitle(e.target.value);
    };
  }, []);

  // 일정 등록
  const handleOnSubmit = () => {
    setTodoList([...todoList,
    {
      postId: nextId.current,
      name,
      postTitle: title,
      done: false,
      editStatus: false,
      date: new Date()
    }]);
    nextId.current += 1;

    setTitle('');
    setName('');

    toast.success(`${name}님의 Todo가 등록 되었습니다.`);
  };

  // 일정 완료 버튼
  const handleOnDoneTodo = useCallback((id, name, done) => {
    setTodoList(todoList.map((todo) =>
      todo.postId === id ? { ...todo, done: !todo.done } : todo
    ));

    if (done) {
      toast.error(`${name}님! Todo 달성을 취소했습니다.`);
    } else {
      toast.success(`${name}님! Todo 달성을 축하드립니다.`);
    };
  }, [todoList]);

  const handleOnEditBtn = useCallback((id, name) => {
    console.log("hi")
    setTodoList(todoList.map((todo) =>
      todo.postId === id ? { ...todo, editStatus: true } : todo
    ));

    toast.info(`이제 ${name}님의 Todo가 수정 가능합니다.`);
  }, [todoList])

  // 일정 수정
  const handleOnEditTodo = useCallback((id, name) => {
    setTodoList(todoList.map((todo) =>
      todo.postId === id ? { ...todo, postTitle: editTitle, editStatus: false } : todo
    ));

    setEditTitle('');

    toast.success(`${name}님의 Todo가 수정되었습니다.`);
  }, [todoList, editTitle]);

  // 일정 삭제 
  const handleOnRemoveTodo = useCallback((id) => {
    setTodoList(todoList.filter((todo) =>
      todo.postId !== id
    ));

    toast.success('Todo가 삭제 되었습니다.')
  }, [todoList]);

  // 완료된 일정만 조회
  const handleSelectDoneTodo = useCallback(() => {
    setTodoList(todoList.filter(({ done }) =>
      done === true
    ));

    toast.success('달성한 Todo 조회 성공!');
  }, [todoList]);

  // 리스트 초기화 
  const handleOnRefreshTodo = () => {
    setTodoList(data);

    toast.success('초기화 되었습니다.');
  };

  // todo 반복 출력 
  const Card = () => {
    return (
      <Fragment>
        {todoList.map((item) => {
          return (
            <PostBox key={item.postId}
              style={item.done ? { background: "#BDBDBD" } : { background: "#FFFF00" }}
            >
              {item.editStatus ?
                <PostEditTextarea
                  value={editTitle}
                  onChange={(e) => handleOnChange(e, 'edit')}
                />
                :
                <PostTitle>{item.postTitle}</PostTitle>
              }
              <PostBottomBox>
                <PostNameBox>{item.name}</PostNameBox>
                <PostBtnBox>
                  <PostBtn onClick={() => handleOnDoneTodo(item.postId, item.name, item.done)}>
                    <FontAwesomeIcon icon={faCircleCheck} color='green' />
                  </PostBtn>
                  {
                    item.editStatus ?
                      <PostBtn onClick={() => handleOnEditTodo(item.postId, item.name)}>
                        <FontAwesomeIcon icon={faClipboardCheck} />
                      </PostBtn>
                      :
                      <PostBtn onClick={() => handleOnEditBtn(item.postId, item.name)}>
                        <FontAwesomeIcon icon={faFilePen} />
                      </PostBtn>
                  }
                  <PostBtn onClick={() => handleOnRemoveTodo(item.postId)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </PostBtn>
                </PostBtnBox>
              </PostBottomBox>
            </PostBox>
          )
        }
        ).reverse()}
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
          <Form onSubmit={(e) => { handleOnSubmit(); e.preventDefault(); }}>
            <TopInputBox>
              <TitleInput
                onChange={(e) => handleOnChange(e, 'title')}
                value={title}
                placeholder='Todo를 입력해 주세요!'
                required
              />
            </TopInputBox>
            <BottomInputBox>
              <NameInput
                onChange={(e) => handleOnChange(e, 'name')}
                value={name}
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
          <SelectBtn onClick={() => handleSelectDoneTodo()}>
            <FontAwesomeIcon
              icon={faCircleCheck}
              color='green'
              size='2x'
            />
          </SelectBtn>
          <SelectBtn onClick={() => handleOnRefreshTodo()}>
            <FontAwesomeIcon
              icon={faRotateRight}
              color='blue'
              size='2x'
            />
          </SelectBtn>
        </SelectBox>
        <Content>
          <Card />
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
  background: url(../images/background.webp) center center / cover no-repeat;
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
`

// 일정 등록
const Form = styled.form`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const TitleInput = styled.input`
  width: 100%;
  height: 50%;
  border: solid 2px #CFCFCF;
`

// 이름 입력 input
const NameInput = styled.input`
  width: 90%;
  height: 50%;
  border-top: 0px;
  border-bottom: solid 2px #CFCFCF;
  border-left: solid 2px #CFCFCF;
  border-right: solid 2px #CFCFCF;
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
`

// 정렬, 초기화 버튼
const SelectBox = styled.div`
  width: 45%;
  height: 10%;
  display: flex;
  justify-content: space-around;
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
`

const PostBox = styled.div`
  width: 80%;
  height: 180px;
  background-color: #FFFF00;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 1px 1px rgba(0,0,0,0.11), 
              0 2px 2px rgba(0,0,0,0.11), 
              0 4px 4px rgba(0,0,0,0.11), 
              0 6px 8px rgba(0,0,0,0.11),
              0 8px 16px rgba(0,0,0,0.11);
`

const PostTitle = styled.div`
  width: 96%;
  height: 80%;
  padding-top: 8px;
`

const PostEditTextarea = styled.textarea`
  width: 100%;
  height: 80%;
  border: 0px;
  padding-top: 8px;
`

const PostBottomBox = styled.div`
  width: 96%;
  height: 20%;
  display: flex;
  justify-content: center;
  padding-bottom: 8px;
`

const PostNameBox = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
`

const PostBtnBox = styled.div`
  width: 76%;
  height: 100%;
  display : flex;
  justify-content: space-around;
  align-items: center;
`

const PostBtn = styled.div`
  width: 30%;
  height: 80%;
  border: solid 2px #CFCFCF;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
`
