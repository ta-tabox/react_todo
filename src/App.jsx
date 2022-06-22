import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  // 入力した値
  const [todoText, setTodoText] = useState("");

  // 未完了のTODOを格納する配列
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  // 完了のTODOを格納する配列を定義
  const [completeTodos, setCompleteTodos] = useState([]);

  // inputに変更が生じるたびに中のvalueをtodoTextとして　setする
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  // 追加ボタンがクリックされた時の処理
  const onClickAdd = () => {
    // todoTextが空文字の場合は処理をリターン→空文字のTODOは作れない
    if (todoText === "") return;
    // 現在のincompleteTodos配列を展開して新しい配列を作る、最後に現在のtodoTextを追加する
    const newTodos = [...incompleteTodos, todoText];
    // incompleteTodosの配列を(newTodos)で更新する
    setIncompleteTodos(newTodos);
    // inputのtodoTextにから文字を設定する
    setTodoText("");
  };

  //　削除ボタンがクリックされた時の処理, map関数からindexで配列の順番を受け取る
  const onClickDelete = (index) => {
    // 現在のincompleteTodosを配列展開してnewTodosを作成
    const newTodos = [...incompleteTodos];
    //newTodosの中からクリックされたindexの要素を1つ削除(splice)
    newTodos.splice(index, 1);
    // setIncompleteTodosにnewTodos(削除済みの)を渡してIncompleteTodosを更新する
    setIncompleteTodos(newTodos);
  };

  //　完了ボタンがクリックされた時の処理
  const onClickComplete = (index) => {
    //　onClickDeleteと一緒
    // 現在のincompleteTodosを配列展開してnewIncompleteTodosを作成
    const newIncompleteTodos = [...incompleteTodos];
    //newIncompleteTodosの中からクリックされたindexの要素を1つ削除(splice)
    newIncompleteTodos.splice(index, 1);

    // newCompleteTodosは現在のcompleteTodosを配列展開してものの最後にincompleteTodosのクリックされたindexの要素を入れる
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];

    // stateの更新, incompleteTodosとcompleteTodos
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  // 戻すボタンがクリックされた時の処理
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];

    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
      />
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
