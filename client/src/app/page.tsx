import ja from "@/shared/ja";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import InputForm from "./_home/inputForm";
import TodoList from "./_home/todoList";

export default function Home() {
  return (
    <main
      style={{
        width:"80%",
        margin:"150px auto",
        textAlign:"center",
      }}
    >
      <h1

      >
        {ja.home.title}
      </h1>
      <InputForm/>
      <TodoList/>
    </main>
  )
}
