const Main = ({ name, balance }) =>{
  return(
    <div className="w-full border-8 border-indigo-600" style={{gridArea:"main"}}>
      <div className="balance">
        <h2>Wellcome {name} </h2>
        <p>Your Current Balance</p>
        <p>$ {balance}</p>
      </div>

    </div>
  )
}

export default Main