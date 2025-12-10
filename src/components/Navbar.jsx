import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white flex items-center">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">


        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-700"> &lt;</span>

          Pass
          <span className="text-green-700">OP/ &gt;</span>

        </div>
        <div>
        <ul className="flex gap-6">
          <li><a className="hover:font-bold hover:text-gray-100" href="/">Home</a></li>
          <li><a className="hover:font-bold hover:text-gray-100" href="#">About</a></li>
          <li><a className="hover:font-bold hover:text-gray-100" href="#">Contact</a></li>
        </ul>
      </div>
     
        <button className="text-white bg-green-600 hover:bg-green-900 mx-2 rounded-full flex items-center">
          <i class="fa-brands fa-square-github"></i>
        <span className='font-bold px-2'> Github</span></button>
      </div>
    </nav>
  )
}

export default Navbar
