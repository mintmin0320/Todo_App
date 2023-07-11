import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

export default function Home() {
  const [mousePosition, setMousePosition] = useState(false);
  const backFrameRef = useRef(null);
  const humanRef = useRef(null);
  const postItRef = useRef(null);
  const navigate = useNavigate(null);
  let x = 0;
  let mx = 0;

  const handleMouseOver = () => {
    setMousePosition(true);
  };

  const handleMouseOut = () => {
    setMousePosition(false);
  };

  const handleMouseMove = (e) => {
    x = e.clientX - window.innerWidth / 2;
  };

  const loop = () => {
    const shadow = backFrameRef.current;
    const human = humanRef.current;
    const text = postItRef.current;
    const speed = 0.7;

    mx += (x - mx) * speed;

    if (backFrameRef.current !== null) {
      shadow.style.transform = `translateX(${mx / 30}px)`;
      human.style.transform = `translateX(${-(mx / 15)}px)`;
      text.style.transform = `translate(${-(mx / 10)}px)`;
    }

    window.requestAnimationFrame(loop);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    if (backFrameRef.current !== null) {
      loop();
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  return (
    <Container>
      <h1 className="title">
        <div
          className='title-text'
          onClick={() => navigate('/todo')}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          {mousePosition ? 'Do It!' : 'Get Start?'}
        </div>
      </h1>
      <div className="contWrap">
        <div className="back-frame" >
          <img src="./images/home-frame.png" alt="" ref={backFrameRef} style={{}} />
        </div>
        <div className="human">
          <img src="./images/home-human.png" alt="" ref={humanRef} />
        </div>
        <div className="post-it">
          <img src="./images/home-postit.png" alt="" ref={postItRef} />
        </div>
      </div>
    </Container>
  )
};

const Container = styled.div`
  height: 100vh;
  background: url(../images/background.webp) center center / cover no-repeat;
  padding: 0;
  margin: 0;
  overflow: hidden;
  opacity: 0.8;

  img {
    width: 100%;
  }

  .title {
    margin: 0;
    padding: 0;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title-text {
    width: 15%;
    height: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    font-weight: 900;
    font-family: 'Merriweather Sans', sans-serif;
    cursor: pointer;
    border: solid 2px #FAAC58;
    border-radius: 50%;
    background-color: #F2F2F2;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      
    &:hover{  
      color : blue;
    }

    @media screen and (max-width: 1500px) {
      font-size: 35px;
      margin-top: 30px;
    }
  }

  .title img {
      width: 200px;
  }

  .contWrap {
    position: relative;
    width: 100vw;
    height: 100%;
  }

  .contWrap div {
    position: absolute;
  }

  .contWrap div img {
    transform-style: preserve-3d;
    transform-origin: 50% 50%;
  }

  .back-frame {
    width: 700px;
    left: 50%;
    transform: translateX(-50%);
  }

  .human {
    width: 1000px;
    left: 45%;
    bottom: 10%;
    transform: translateX(-50%);

    @media screen and (max-width: 1500px) {
      width: 900px;
    }
  }

  .post-it {
    width: 500px;
    left: 58%;
    top: 35%;
    transform: translateX(-10%);

    @media screen and (max-width: 1500px) {
      width: 450px;
    }
  }
`