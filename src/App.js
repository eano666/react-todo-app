import React,{useState,useEffect} from "react";
import "./App.css";
function Hai(){
const [task,settask]=useState('')
const [tasks, settasks] = useState(() => {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
});
const [editind,seteditind]=useState(null)
const [edittext,setedittext]=useState('')
const [order,setorder]=useState('')
const [filter,setfilter]=useState('all')
useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
const handletext=()=>{
  if(task!==""){
const updd=[...tasks,{text:task,completed:false}]
settasks(updd)
settask('')}
else{
alert("Enter a Task");
}}
const del=(ind)=>{
    const upd= tasks.filter((_,index)=>index!==ind)
    settasks(upd)
    }
const togglecomp=(ind)=>{
  const upd=[...tasks]
  upd[ind].completed=!upd[ind].completed
  settasks(upd)
}
const edit=(ind,tex)=>{
  seteditind(ind)
  setedittext(tex)
}
const edittex=(ind)=>{
  const upd=[...tasks]
  upd[ind].text=edittext
  settasks(upd)
  setedittext('')
  seteditind(null)
}
const filterTasks=[...tasks].filter((t)=>{
if(filter==='pending') return !t.completed
if(filter==="completed") return t.completed
return true;
}
)
const sortedTasks = [...filterTasks].sort((a, b) => {
    if (order === "asc") return a.text.localeCompare(b.text);
    if (order === "desc") return b.text.localeCompare(a.text);
    return 0;
   }
  )
  return(
    <div className="bod">
      <h2>To-Do-List</h2>
    <>
    <input type="text" value={task} onChange={(e)=>settask(e.target.value)}  onKeyDown={(e) => e.key === "Enter" && handletext()}></input>
    <button className="add-btn" type="submit" onClick={handletext}>Add</button>
      <div className="controls">
        <div className="butt">
          <button onClick={() => setorder("asc")}>Sort A–Z</button>
          <button onClick={() => setorder("desc")}>Sort Z–A</button>
          <button onClick={() => setorder("")}>Clear Sort</button>
        </div>
        <select value={filter} onChange={(e) => setfilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
<div className="edit">
    <ul>
    {sortedTasks.map((t,index)=>{
       const ogind = tasks.findIndex((ta) => ta === t);
          return (
        <li key={ogind} style={{ textDecoration: t.completed ? 'line-through':'none'}}>
          
          <input type="checkbox" checked={t.completed} onChange={()=>togglecomp(ogind)}></input>
        {editind===ogind ? (
          <>
          <input type="text" value={edittext} onChange={(e)=>setedittext(e.target.value)}></input>
          <button type="submit" onClick={()=>edittex(ogind)}>Save</button>
          <button type="submit" onClick={()=>seteditind(null)}>Cancel</button>
          </>
        ):(
          <>
          {t.text}
          <button type="submit"onClick={()=>del(ogind)}>Delete</button>
        <button type="submit" onClick={()=>edit(ogind,t.text)}>Edit</button>
        </>
        )
        
} </li>
)})}
 
   </ul>
   </div>
    </>   
  </div>
  )
}
export default Hai;