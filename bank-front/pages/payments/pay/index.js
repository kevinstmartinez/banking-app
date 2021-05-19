export default function Pay() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div>
          <form className="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
          <h3 className="font-semibold text-2xl lg:text-2xl text-gray-800">
            Service Information
            </h3>
            <div className="mt-3">
              <label className="block text-sm text-gray-00" for="cus_name">Invoice Amount</label>
              <input className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="amount" name="amount" type="text" required="" placeholder="amount" aria-label="Name" />
            </div>

            <div className="mt-3">
              <label className="block text-sm text-gray-00" for="cus_name">Number Payment References</label>
              <input className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="references" name="references" type="text" required="" placeholder="number references" aria-label="Name" />
            </div>

            <div className="mt-3 relative inline-block w-full text-gray-700">
            <label className="block text-sm text-gray-00" for="cus_name">Service</label>
              <select className="w-full h-8 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline" placeholder="id service">
                {
                  <option>Services</option>
                }
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
              </div>
            </div>

            <div className="mt-4">
              <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" type="submit">Pay</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
