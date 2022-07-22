import React, { useRef, useCallback, useState } from "react";
import produce from 'immer';

const App = () => {
  const nextId = useRef(1);
  const [form, setForm] = useState({
    name: "",
    username: "",
  });
  const [data, setData] = useState({
    array: [],
    uselessValue: null,
  });

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setForm(
        produce(draft => {
          draft[name] = value;
        })
      );
    },
    [form]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username,
      };
      setData(
        produce(draft => {
          draft.array.push(info);
        })
      );
      setForm({
        name: "",
        username: "",
      });
      nextId += 1; // nextId가 const여서 띄어주는 경고. ES2015가 아닌 환경에서는 무시해도 됨.
    },
    [data, form.name, form.username]
  );

  const onRemove = useCallback(
    (id) => {
      setData(
        produce(draft => {
          // splice(A, B) - A: 본 배열(조건), 제거할 요소의 수 
          // onRemove가 실행될 때 인자로 받는 id와 info.id가 같은 배열의 요소 1개를 제거한다.
          draft.array.splice(draft.array.findIndex(info => info.id === id),1)
        })
      );
    },
    [data]
  );

  return (
    <div>
      <form onSubmit={onSubmit}>
      <input
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={onChange}
        />
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <div>
        <ul>
          {data.array.map(info => (
            <li key={info.id} onClick={() => onRemove(info.id)}>
              {info.username}({info.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
