import axios from "axios"
import ContextProvider from "../context/index"
import {useEffect,useState,useContext} from "react"
import jwt_decode from "jwt-decode"
const Main = () =>{
  //const id=useContext(ContextProvider)
  const [balance,setBalance] = useState(0)
  const [id,setId] = useState("")
  console.log("id 1: ",id)
  useEffect (()=>{
    console.log("id 2",id)
    const token=localStorage.getItem("loguedUser")
    const getToken=jwt_decode(token)
    setId(getToken.id)
    getUserBalance()
    
  },[])
  const getUserBalance = async () => {
    try {
      const account = await axios.get(`http://localhost:4001/api/accounts/balance/${id}`)
      setBalance(account.data.balance.balance)
      console.log("->",account.data.balance.balance)
    } catch (error) {
      console.log(error)
    }
  }
  
  return(
    <div className="w-full" style={{gridArea:"main"}}>
      <div className="balance">
        <h2>Wellcome {id} </h2>
        <p>Your Current Balance</p>
        <p>$ {balance}</p>
      </div>

    </div>
  )
}

export default Main