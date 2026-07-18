import {useState,KeyboardEvent,ChangeEvent} from "react"

interface FormofList {
    text : string,
    id : number,
    completed : boolean
}

const TodoList = () => {

type FilterStatus = "all" | "completed" | "active"

const [list,setList] = useState<FormofList[]>([]);

const [input,setInput] = useState<string>("");

const [filter,setFilter] = useState<FilterStatus>("all");

const Change = (e:ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
}

const KeyDown = (e:KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter" && input.trim() !== ""){
   const newList: FormofList = {
       text : input,
       id : Date.now(),
       completed : false
   }
   setList(prev => [...prev,newList])
   
   setInput("")
   
    }
}

const Toggle = (id:number): void => {
    setList(prev => prev.map(item => item.id === id? {...item,completed : !item.completed}: item))
}

const filteredList = list.filter(item => {
    if(filter === "active")
    return !item.completed
    if(filter === "completed")
    return item.completed
    return true
})

    return(
        <div>
            <input type="text" placeholder="To do list" value={input} onChange={Change} onKeyDown={KeyDown}/>
            <h1>To do List</h1>
            
            <div>
      <button onClick={()=>setFilter("active")}>Active</button>
      <button onClick={()=>setFilter("completed")}>Completed</button>
      <button onClick={()=>setFilter("all")}>All</button>
            </div>
            <ul>
                {filteredList.map(item => (
                    <li key={item.id} onClick={()=>Toggle(item.id)} style={{textDecoration : item.completed? "line-through" : "none"}}>{item.text}</li>
                ))}
            </ul>
        </div>
    )
}
export default TodoList
