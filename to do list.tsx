import {useState,useEffect,ChangeEvent,KeyboardEvent} from "react"

import { MdDelete } from "react-icons/md";

interface FormofList {
    text : string,
    id : number,
    completed : boolean
}

interface ChildProps {
    item : FormofList,
    onDelete : (id:number) => void,
    onToggle : (id:number) => void
}   

const TodoList = () => {

type FilterStatus = "all" | "done" | "active"

const [input,setInput] = useState<string>("");

const [list,setList] = useState<FormofList[]>(()=>{
    const saved = 
    localStorage.getItem("todos");
    
    try{
        return saved ? JSON.parse(saved) : []
    }catch{
        return []
    }
    
});

useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(list))
},[list])

const Change = (e:ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value)
}

const KeyDown = (e:KeyboardEvent<HTMLInputElement>): void => {
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

const Delete = (id: number): void => {
    setList(prev => prev.filter(item => item.id !== id))
}

const Toggle = (id:number): void => {
 setList(prev => prev.map(item => item.id === id? {...item,completed :! item.completed} : item))   
}

const [filter,setFilter] = useState<FilterStatus>("all")

const filteredList = list.filter(item => {
    if(filter === "active")
    return !item.completed
    if(filter === "done")
    return item.completed
    return true
})

    return(
        <div>
            <div style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
            }}>
          <input type="text" placeholder="To do List" value={input} onChange={Change} onKeyDown={KeyDown}  style={{
           width : "250px",
           height : "40px",
           fontSize : "18px",
           paddingLeft : "10px"
            }}/>          
            </div>
                                
            <hr/>
            <h1 style={{textAlign : "center"}}>To Do List</h1>
            <div>            
            <button type="button" onClick={()=>setFilter("all")}>All</button>
            <button type="button" onClick={()=>setFilter("done")}>Done</button>
            <button type="button" onClick={()=>setFilter("active")}>Active</button>
                        
            </div>
            <ul style={{
                margin : "0",
                padding: "0"
            }}>
                {filteredList.map(item => (
      <TodoListChild key={item.id} item={item} onDelete={Delete} onToggle={Toggle}/>              
                ))}
                
            </ul>
        </div>
    )
}



const TodoListChild = ({item,onDelete,onToggle}:ChildProps) => {

return(
    <li onClick={()=>onToggle(item.id)} style={{
    textDecoration : item.completed? "line-through" : "none", 
    margin : "20px",
    listStyle : "none"}}>{item.text} <button type="button" onClick={(e)=>{
    e.stopPropagation()
        onDelete(item.id)              
    }}><MdDelete/></button></li>
)
    
}         

export default TodoList
