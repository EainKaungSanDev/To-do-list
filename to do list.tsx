interface FormofList {
    text : string,
    id : number,
    isDone : boolean 
}

interface Childprops {
    item : FormofList,
    onDelete : (id:number) => void,
    onToggle : (id:number) => void 
}

import {useState,ChangeEvent,KeyboardEvent} from "react"

const Parent = () => {

const [input,setInput] = useState<string>("")

const [array,setArray] = useState<FormofList[]>([])

const Change = (e:ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value)
}

const Keyboard = (e:KeyboardEvent<HTMLInputElement>): void => {
    if(e.key === "Enter" && input.trim() !== ""){
        const newList: FormofList = {
            text : input,
            id : Date.now(),
            isDone : false
        }
        setArray(prev=> [...prev,newList])
        setInput("")
    }
}

const Delete = (id:number): void => {
    setArray(prev => prev.filter(item => item.id !== id))
}

const Toggle = (id:number): void => {
    setArray(prev => prev.map(item => item.id === id? {...item,isDone : !item.isDone} : item))
}

    return(
        <div>
            <input type="text" placeholder="List" value={input} onChange={Change} onKeyDown={Keyboard}/>
            <ul>
                {array.map(item => <Child 
          key={item.id}
          item={item} 
          onDelete={Delete} 
          onToggle={Toggle}/>)}
            </ul>
        </div>
    )
}

const Child = ({item,onDelete,onToggle}:Childprops) => {
    return(
        <li onClick={()=>onToggle(item.id)} style={{textDecoration : item.isDone? "line-through" : "none",listStyle : "none"}}>{item.text} <button onClick={(e)=>{
      e.stopPropagation();
      onDelete(item.id)      
        }}>Delete</button></li>
    )
}

export default Parent
