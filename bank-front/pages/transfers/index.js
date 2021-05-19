export default function Transfer() {
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

          <form className="w-full max-w-lg">
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
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6 mt-8">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block text-sm text-gray-00" for="cus_name">
                  Account Destiny
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                  id="amount"
                  name="amount"
                  type="text"
                  required=""
                  placeholder="origin"
                  aria-label="Name"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block text-sm text-gray-00" for="cus_name">
                  Account Origin
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                  id="amount"
                  name="amount"
                  type="text"
                  required=""
                  placeholder="destiny"
                  aria-label="Name"
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
