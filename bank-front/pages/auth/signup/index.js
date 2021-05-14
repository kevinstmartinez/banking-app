export default function Register() {
  return (
    <div class="flex flex-col h-screen bg-gray-100">
      <div class="grid place-items-center mx-2 my-20 sm:my-auto">
        <div class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg">

          <img
            className="mb-2 mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
            Sign Up
            </h2>

          <form class="mt-8" method="POST">

            <label for="dni" class="block text-xs font-semibold text-gray-600 uppercase">DNI</label>
            <input id="dni" type="text" name="dni" placeholder="DNI" autocomplete="dni"
              class="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required />

            <label for="email" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">E-mail</label>
            <input id="email" type="email" name="email" placeholder="e-mail address" autocomplete="email"
              class="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required />

            <label for="fullName" class="block mt-2  text-xs font-semibold text-gray-600 uppercase">Full Name</label>
            <input id="fullName" type="text" name="fullName" placeholder="full name" autocomplete="fullName"
              class="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required />

            <label for="username" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Username</label>
            <input id="username" type="text" name="username" placeholder="username" autocomplete="username"
              class="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required />

            <label for="password" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
            <input id="password" type="password" name="password" placeholder="password" autocomplete="password"
              class="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required />

            <label for="passwordConfirm" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password Confirm</label>
            <input id="passwordConfirm" type="password" name="passwordConfirm" placeholder="password confirm" autocomplete="current-passwordConfirm"
              class="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required />

            <button type="submit"
              class="w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none">
              Register
                </button>
          </form>
        </div>
      </div>
    </div>
  );
}
