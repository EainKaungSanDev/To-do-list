import {useState,useEffect,ChangeEvent,KeyboardEvent} from "react"

interface FormProps {
    text : string,
    id : number,
    completed : boolean
}

interface ChildProps {
    item : FormProps,
    onToggle : (id:number) => void,
    onDelete : (id:number) => void,
    onEdit : (id:number,text:string) => void,
    onSave : () => void,
    edit : number | null
}

const App = () => {

const [input,setInput] = useState<string>("")

const [edit, setEdit] = useState<number | null>(null);

const [array,setArray] = useState<FormProps[]>(()=>{
    const saved = localStorage.getItem("todos")
    
    return saved? JSON.parse(saved) as FormProps[] : [] 
})

useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(array))
},[array])

const Change = (e:ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value)
}

const KeyDown = (e:KeyboardEvent<HTMLInputElement>): void => {
  if(e.key === "Enter" && input.trim() !== ""){
  const newList = {
      text : input,
      id : Date.now(),
      completed : false
  }
      setArray(prev => [...prev,newList])      
      setInput("")
  }
}

const Toggle = (id:number): void => {
    setArray(prev => prev.map(item => item.id === id? {...item, completed : !item.completed} : item))
}

const Delete = (id:number): void => {
    setArray(prev => prev.filter(item => item.id !== id))
}

const Edit = (id:number,text:string): void => {
    setEdit(id);
    setInput(text)
}

const Save = (): void => {
if(edit === null) return;
    setArray(prev => prev.map(item => item.id === edit? {...item, text : input} : item))
    setEdit(null);
    setInput("")
}

    return(
        <div>
            <input type="text" value={input} onChange={Change} onKeyDown={KeyDown}/>
            <div>
                {array.map(item => (
<Child key={item.id} 
item={item} 
onToggle={Toggle} onDelete={Delete} 
onEdit={Edit} 
onSave={Save} 
edit={edit}/>
                ))}
            </div>
        </div>
    )
}

const Child = ({item,onToggle,onDelete,onEdit,onSave,edit} : ChildProps) => {
    return(
        <div onClick={()=>onToggle(item.id)} style={{
            textDecoration : 
            item.completed? "line-through" : "none",
            cursor : "pointer"
        }}>{item.text}
        {
         edit === item.id?  
         <button onClick={(e)=>{
    e.stopPropagation();
    onSave()         
         }}>Save</button> :
         <button onClick={(e)=>{
            e.stopPropagation(); onEdit(item.id,item.text)
         }}>Edit</button>
        }
        <button onClick={(e)=>{
            e.stopPropagation();
onDelete(item.id)}}>
Del
</button>
        </div>
    )
}

export default App
