import React, { Fragment, useState, useCallback } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast, ToastContainer } from 'react-toastify';

import { todo } from '../../redux/slices/todoSlice';

// icon, css
import 'react-toastify/dist/ReactToastify.css';
import { faCircleCheck, faTrashCan, faFilePen, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

function TodoList() {
  const dispatch = useDispatch();
  const todoList = useSelector(state => state.todos.todoArr);
  const [editTitle, setEditTitle] = useState('');

  const handleOnChange = useCallback((e) => {
    setEditTitle(e.target.value);
  }, []);

  // todo 완료 버튼
  const handleOnDoneBtn = useCallback((id, name, done) => {
    dispatch(todo(todoList.map((todo) =>
      todo.postId === id ? { ...todo, done: !todo.done } : todo
    )));

    if (done) {
      toast.error(`${name}님! Todo 달성을 취소했습니다.`);
    } else {
      toast.success(`${name}님! Todo 달성을 축하드립니다.`);
    };
  }, [dispatch, todoList]);

  // 수정 버튼 클릭
  const handleOnEditBtn = useCallback((id, name) => {
    dispatch(todo(todoList.map((todo) =>
      todo.postId === id ? { ...todo, editStatus: true } : todo
    )));

    toast.info(`이제 ${name}님의 Todo가 수정 가능합니다.`);
  }, [dispatch, todoList]);

  // 수정 내용 저장
  const handleOnEditSaveBtn = useCallback((id, name) => {
    dispatch(todo(todoList.map((todo) =>
      todo.postId === id ? { ...todo, postTitle: editTitle, editStatus: false } : todo
    )));

    setEditTitle('');

    toast.success(`${name}님의 Todo가 수정되었습니다.`);
  }, [dispatch, editTitle, todoList]);

  // // 일정 삭제 
  const handleOnRemoveBtn = useCallback((id) => {
    dispatch(todo(todoList.filter((todo) =>
      todo.postId !== id
    )));

    toast.success('Todo가 삭제 되었습니다.');
  }, [dispatch, todoList]);

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
                onChange={(e) => handleOnChange(e)}
              />
              :
              <PostTitle>{item.postTitle}</PostTitle>
            }
            <PostBottomBox>
              <PostNameBox>{item.name}</PostNameBox>
              <PostBtnBox>
                <PostBtn onClick={() => handleOnDoneBtn(item.postId, item.name, item.done)}>
                  <FontAwesomeIcon icon={faCircleCheck} color='green' />
                </PostBtn>
                {
                  item.editStatus ?
                    <PostBtn onClick={() => handleOnEditSaveBtn(item.postId, item.name)}>
                      <FontAwesomeIcon icon={faClipboardCheck} />
                    </PostBtn>
                    :
                    <PostBtn onClick={() => handleOnEditBtn(item.postId, item.name)}>
                      <FontAwesomeIcon icon={faFilePen} />
                    </PostBtn>
                }
                <PostBtn onClick={() => handleOnRemoveBtn(item.postId)}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </PostBtn>
              </PostBtnBox>
            </PostBottomBox>
          </PostBox>
        )
      }
      ).reverse()}
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
    </Fragment>
  )
}

export default TodoList;

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
