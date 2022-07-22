# immer

>불변성에 신경 쓰지 않는 것처럼 코드를 작성하되 불변성 관리는 제대로 해 주는 것

concat, map, fliter 등 상태를 관리하는 함수들이 있지만
불변성을 유지하는 코드가 복잡할 때는 immer의 push, splice를 사용하는 것을 권장.
onRemove의 경우는 filter를 사용한 코드가 더 깔끔하기 때문에 굳이 immer의 splice를 사용하지 않아도 됨.

useState의 함수형 업데이트를 활용하면 코드다 더 깔끔해진다.


```javascript
  // 함수형 업데이트 X
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setForm(
      produce(form, draft => {
        draft[name] = value;
      })
    );
  }, []);

  // 함수형 업데이트 O
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setForm(
      produce(draft => {
        draft[name] = value;
      })
    );
  }, []);
```
다른점은 크게 없다...

produce 안에 form을 사용하지 않아서 지워주는 느낌..

### 정리

immer는 컴포넌트의 상태 업데이트가 까다로울때, 복잡할 때 사용하면 좋다.
다만 immer는 편의를 위한 라이브러리일뿐 필수 라이브러리는 아니다.
편의성이 높아지면 생산성을 높일 수 있기 때문에 사용한다.
immer를 사용하는 것이 더 불편하다면 사용하지 않아도 된다.