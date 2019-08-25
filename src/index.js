import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ReactDOM from "react-dom";

import "./styles.css";

function Slidebox({ children, size = "", start = 0, isAutoplay = true }) {
  const [idx, setIdx] = useState(start);

  useEffect(
    function() {
      if (isAutoplay) {
        let timeout = setTimeout(inc, 2000);
        return () => clearTimeout(timeout);
      }
    },
    [idx]
  );

  const childrenArray = React.Children.toArray(children);
  const len = childrenArray.length;

  const inc = () => {
    if (len > 0) {
      setIdx((idx + 1 + len) % len);
    }
  };

  const dec = () => {
    if (len > 0) {
      setIdx((idx - 1 + len) % len);
    }
  };

  return (
    <div className={"slidebox" + (size ? " slidebox-" + size : "")}>
      <div className="slidebox-grid">
        <div className="slides-container">
          <TransitionGroup className="slidebox-anim-container">
            <CSSTransition key={idx} timeout={500} classNames="fade">
              {len > 0 ? childrenArray[idx] : "Please pass something in"}
            </CSSTransition>
          </TransitionGroup>
        </div>
        <div className="slidebox-btn prev-slide" onClick={dec}>
          &lt;
        </div>
        <div className="slidebox-btn next-slide" onClick={inc}>
          &gt;
        </div>
      </div>
      <div className="nav-layout">
        <nav className="nav-bullets">
          {childrenArray.map((val, sidx) => {
            return (
              <span
                onClick={() => setIdx(sidx)}
                className={`slide-bullet ${
                  sidx === idx ? "bullet-active" : ""
                }`}
              />
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Hello Slidebox</h1>
      <Slidebox start={2}>
        <button>supposedly the first slide</button>
        <p>And this is some paragram... lorem ipsum :)</p>
        <figure style={{ height: "100%", boxSizing: "border-box", padding: 0 }}>
          <img
            src="https://www.askideas.com/media/13/Girl-With-Mustache-Funny-Picture.jpg"
            alt=""
            xwidth="50%"
            height="100%"
          />
        </figure>
        <p>The last paragraph... allegedly...</p>
      </Slidebox>

      <div />

      <section>
        <Slidebox size="small" start={0} isAutoplay={false}>
          <button>supposedly the first slide</button>
          <p>
            And this is some paragram... lorem ipsum :) And this is some
            paragram... lorem ipsum :) And this is some paragram... lorem ipsum
            :) And this is some paragram... lorem ipsum :) And this is some
            paragram... lorem ipsum :) And this is some paragram... lorem ipsum
            :) And this is some paragram... lorem ipsum :) And this is some
            paragram... lorem ipsum :) And this is some paragram... lorem ipsum
            :) And this is some paragram... lorem ipsum :) And this is some
            paragram... lorem ipsum :) zzzzzzzzzzzzzzzzzzzzzzz
          </p>
          <figure
            style={{ height: "100%", boxSizing: "border-box", padding: 0 }}
          >
            <img
              src="https://www.askideas.com/media/13/Girl-With-Mustache-Funny-Picture.jpg"
              alt=""
              height="100%"
            />
          </figure>
          <p>The last paragraph... allegedly...</p>
          <p>HA HA HA.... NOT!</p>
        </Slidebox>
      </section>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
