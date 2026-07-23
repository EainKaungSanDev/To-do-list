import {useState,useEffect,ChangeEvent,KeyboardEvent} from 'react'

interface FormList {
    text : string,
    id : number,
    completed : boolean
}

interface ChildProps {
    item : FormList,
    onToggle : (id:number) => void,
    onEdit : (id:number,text:string) => void,
    onSave : () => void,
    onDelete : (id:number) => void,
    editId : number | null,
    editText : string,
    setEditText : React.Dispatch<React.SetStateAction<string>>
}

const App = () => {

const [input,setInput] = useState<string>("")

const [array,setArray] = useState<FormList[]>(()=>{
    const saved  = localStorage.getItem("todos");
    
    return saved? JSON.parse(saved) as FormList[] : []
});

useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(array))
},[array])

const [editId,setEditId] = useState< number | null >(null)

const [editText,setEditText] = useState<string>("")

type FilterStatus = "all" | "active" | "completed"
    
const [filter,setFilter] = useState<FilterStatus>("all")

const [search,setSearch] = useState<string>("")

type SortType = "newest" | "oldest";

const [sort,setSort] = useState<SortType>("newest");

const filteredList = array.filter(item => {

const matchSearch = item.text.toLowerCase().includes(search.toLowerCase());
    if(filter === "active")
    return !item.completed && matchSearch;
    if(filter === "completed")
    return item.completed && matchSearch;
    return matchSearch;
})

const sorted = [...filteredList].sort((a,b)=>{
    if(sort === "newest")
    return b.id - a.id
    if(sort === "oldest")
    return a.id - b.id
})
   
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
        setArray(prev => [...prev,newList]);
        setInput("")
    } 
}

const Toggle = (id:number): void => {
    setArray(prev => prev.map(item => item.id === id? {...item, completed : !item.completed} : item))
} 

const Edit = (id:number,text:string): void => {
    setEditId(id);
    setEditText(text)
}

const Save = (): void => {
if(editId === null || editText.trim() === "") return;
    setArray(prev => prev.map(item => item.id === editId? {...item, text : editText} : item));
    setEditId(null);
    setEditText("");
}

const Delete = (id:number): void => {
    setArray(prev => prev.filter(item => item.id !== id))
}

    return(
        <>
        <h1>To Do List</h1>
         <input type="text" placeholder="search" value={search} onChange={(e)=> setSearch(e.target.value)} />
         <hr/>
        <input type="text" placeholder="To do List" value={input} onChange={Change} onKeyDown={KeyDown} />
        <hr/>
        <div>
          <button onClick={()=>setFilter("all")}>
            All
        </button> 
        <button onClick={()=>setFilter("completed")}>
           Completed 
        </button> 
        <button onClick={()=>setFilter("active")}>
            Active
        </button>
        </div>        
        
        <div>
            <button onClick={()=>setSort("newest")}>New</button>
            <button onClick={()=>setSort("oldest")}>Old</button>
        </div>
        
        <ul style={{
            listStyle : "none"
        }}>
            {sorted.map(item => (
                <Child key={item.id} 
item={item}
onToggle={Toggle}
onEdit={Edit}
onSave={Save}
onDelete={Delete}
editId={editId}
editText={editText}
setEditText={setEditText} />
            ))}
        </ul>
        </>
    )
}

const Child = ({item,onToggle,onEdit,onSave,onDelete,editId,editText,setEditText}: ChildProps) => {
    return(
        <>
        <div>
          {
         editId === item.id?
          <input autoFocus value={editText} onChange = { (e:ChangeEvent<HTMLInputElement>) => {
      setEditText(e.target.value)        
          }}/> :
          <span onClick={()=>onToggle(item.id)} style = {{
              textDecoration : 
              item.completed? "line-through" : "none",
              cursor : "pointer"
          }}>
              {item.text}
          </span>
         }
         
         {
         editId === item.id?
          <button onClick={()=>onSave()}>
              Save
          </button> :
          <button onClick={()=>onEdit(item.id,item.text)}>
              Edit
          </button>
         }
         
         <button onClick={()=>onDelete(item.id)}>
             Del
         </button>
        </div>
        </>
    )
}

export default App
