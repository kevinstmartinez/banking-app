import axios from "axios"
import ContextProvider from "../context/index"
import {useEffect,useState,useContext} from "react"
import jwt_decode from "jwt-decode"
const Main = () =>{
  const [balance,setBalance] = useState(0)
  const [name, setName] = useState('')
  const [accNumber, setAccNumber] = useState('')
  const id = useContext(ContextProvider)

  const getUserBalance = async () => {
    try {
      const account = await axios.get(`http://localhost:4000/api/accounts/balance/${id}`)
      console.log("---->>>>",account)
      setBalance(account.data.balance.balance)
      setAccNumber(account.data.balance.account_number)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("id 2", id);
    const token = localStorage.getItem("loguedUser");
    const getToken = jwt_decode(token);
    console.log(getToken)
    setName(getToken.name)
    getUserBalance();
  }, []);

  return (
    <div className="w-full" style={{ gridArea: "main" }}>
      <div className="balance">
        <h2>Wellcome {name} </h2>
        <p>Your Current Balance</p>
        <p>$ {balance}</p>

        <p>Account Number {accNumber}</p>
      </div>
    </div>
  );
};

export default Main;
