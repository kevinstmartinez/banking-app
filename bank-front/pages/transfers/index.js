import axios from "axios";
import ContextProvider from "../../context/index";
import { useState, useEffect, useContext } from "react";

export default function Transfer() {
  const id = useContext(ContextProvider);
  const [accNumber, setAccNumber] = useState("");
  const [fieldState, setFieldState] = useState({
    amount: 0,
    destiny_account_number: "",
    origin_account_number: accNumber,
  });

  const handleFieldChange = (e) => {
    setFieldState({
      ...fieldState,
      [e.target.name]: e.target.value,
    });
  };


  console.log("field >>", fieldState);
console.log("accN", accNumber)
  const handleTransaction = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('loguedUser')
    await axios({
      method: "POST",
      url: 'http://localhost:4001/api/transfers/transfer',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        "amount": parseInt(fieldState.amount),
        "destiny_account_number": fieldState.destiny_account_number,
        "origin_account_number": fieldState.origin_account_number
        
      }
    });

    // await fetch("http://localhost:4000/api/transfers/transfer", {
    //   method: "POST",
    //   headers: {
    //     Authorization:
    //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksInVzZXJuYW1lIjoiZGpyZWdnYWUiLCJpYXQiOjE2MjE1NTYzNjcsImV4cCI6MTYyOTMzMjM2N30.h6x9wTocrF40uWTjejnpwYbI5MIWehP2LKs_arxDY4U",
    //   },
    //   data: { fieldState },
    // });
  };

  async function getAccount() {
    try {
      const data = await axios.get(
        `http://localhost:4001/api/accounts/balance/${id}`
      );
      console.log("accountN", data.data.balance.account_number)
      setAccNumber(data.data.balance.account_number)
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg"
        >
          <h3 className="font-semibold text-2xl lg:text-2xl text-gray-800">
            Transfer Information
          </h3>

          <form className="w-full max-w-lg" onSubmit={handleTransaction}>
            <div className="mt-3">
              <label className="block text-sm text-gray-00" for="cus_name">
                Amount
              </label>
              <input
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="amount"
                name="amount"
                type="text"
                required=""
                placeholder="amount"
                aria-label="Name"
                onChange={handleFieldChange}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6 mt-8">
              <div className="w-full md:w-1/2 px-3">
                <label className="block text-sm text-gray-00" for="cus_name">
                  Account Origin
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                  id="origin_account_number"
                  name="origin_account_number"
                  type="text"
                  required="" 
                  placeholder="Origin"
                  aria-label="Name"
                  onChange={handleFieldChange}
                  
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block text-sm text-gray-00" for="cus_name">
                  Destination Account
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                  id="destiny_account_number"
                  name="destiny_account_number"
                  type="text"
                  required=""
                  placeholder="Destination"
                  aria-label="Name"
                  onChange={handleFieldChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
            >
              Transfer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
