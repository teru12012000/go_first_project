'use client'
import ja from "@/shared/ja";
import InputForm from "./_home/inputForm";
import TodoList from "./_home/todoList";
import { useState } from "react";

export default function Home() {
  const [postBox,setPostBox]=useState<boolean>(false);
  const [editBox,setEditBox]=useState<boolean>(false);
  return (
    <main
      style={{
        width:"80%",
        margin:"150px auto",
        textAlign:"center",
      }}
    >
      <h1>
        {ja.home.title}
      </h1>
      <InputForm
        editBox={editBox}
        postBox={postBox}
        setPostBox={setPostBox}
      />
      <TodoList/>
    </main>
  )
}
