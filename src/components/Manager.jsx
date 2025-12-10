import React, { useEffect, useRef, useState } from "react";
import eye from "../assets/eye.png";
import eyeSlash from "../assets/eye-slash.png";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {


  const [show, setShow] = useState(false);
  const [passwordArray, setpasswordArray] = useState([]);
  const [form, setform] = useState({ site: "", username: "", password: "" });

  const inputRef = useRef();
  const imgRef = useRef();

  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords)); // ✅ Correct way
    }
  }, []);

  const savePassword = () => {
    if (!form.site || !form.username || !form.password) {
      alert("Please fill all fields!");
      return;
    }

    const updatedPasswords = [...passwordArray, { ...form, id: uuidv4() }];
    setpasswordArray(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    alert("Password saved successfully!");

    // Reset form
    setform({ site: "", username: "", password: "" });
  };

  const deletePassword = (id) => {
    console.log("Deleting password with id:", id);
    let confirmation = window.confirm("Are you sure you want to delete this password?");
    if (confirmation){
    const updatedPasswords = passwordArray.filter(item => item.id !== id);
    setpasswordArray(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    alert("Password Deleted successfully!");
    }
  };

  const editPassword = (id) => {
    console.log("Editing password with id:", id);
    setform(passwordArray.filter(item => item.id === id)[0]);
    // const updatedPasswords = [...passwordArray, { ...form, id: uuidv4() }];
    // setpasswordArray(updatedPasswords);
    // localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    // alert("Password Edited successfully!");
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setform({ ...form, [name]: value });
  };

  const showPassword = () => {
    alert("show password");
    setShow((prev) => !prev);

    if (inputRef.current) {
      inputRef.current.type = show ? "password" : "text";
    }

    if (imgRef.current) {
      imgRef.current.src = show ? eye : eyeSlash;
    }
  };

  const copytext = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
      transition: Bounce,
    });
  }

  return (
    <div className="relative">
      {/* Your components */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        pauseOnFocusLoss
        draggable
        theme="colored"
        transition="Bounce"
      />

      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

      <div className="mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700">&lt;</span>
          <span>Pass</span>
          <span className="text-green-700">OP/&gt;</span>
        </h1>

        <p className="text-green-900 text-lg text-center">
          Your own password manager
        </p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
          />
          <div className="flex w-full justify-between gap-7">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
            />
            <div className="relative">
              <input
                value={form.password}
                onChange={handleChange}
                ref={inputRef}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
              />
              <span
                className="absolute right-1 top-1 cursor-pointer"
                onClick={showPassword}
              >
                <img ref={imgRef} className="p-1" width={30} src={eye} alt="eye" />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-500 hover:bg-green-900 rounded-full px-4 py-2 w-fit text-white"
          >
            <i className="fa-solid fa-plus"></i>
            &nbsp;Add Password
          </button>
        </div>

        <div className="passwords">
          <h1 className="font-bold text-2xl py-4">Your Passwords</h1>

          {passwordArray.length === 0 && <div>No password to show</div>}

          {passwordArray.length > 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-500 text-white">
                <tr>
                  <th className="py-1">Website</th>
                  <th className="py-1">Username</th>
                  <th className="py-1">Password</th>
                  <th className="py-1">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center flex items-center justify-center ">
                      <div className="flex items-center justify-center gap-2">
                        <a href={item.site} target="_blank">{item.site}</a>
                        {/* <i className={"fa-solid fa-copy cursor-pointer text-green-600 hover:text-green-800 text-xl"}></i> */}
                        <div className="size-7 cursor-pointer" onClick={() => copytext(item.site)}>

                          <lord-icon style={{ width: "30px", height: "30px", "padding -top": "3px", "padding -left": "3px" }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" colors="primary:#121331,secondary:#08a88a" class="cursor-pointer" ></lord-icon>
                        </div>
                      </div>
                    </td>

                    <td className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        {item.username}
                        <div className="size-7 cursor-pointer" onClick={() => copytext(item.username)}>
                          <lord-icon style={{ width: "30px", height: "30px", "padding -top": "3px", "padding -left": "3px" }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" colors="primary:#121331,secondary:#08a88a" class="cursor-pointer" ></lord-icon>
                        </div>
                      </div>
                    </td>

                    <td className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        {item.password}
                        <div className="size-7 cursor-pointer" onClick={() => copytext(item.password)}>
                          <lord-icon style={{ width: "30px", height: "30px", "padding -top": "3px", "padding -left": "3px" }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" colors="primary:#121331,secondary:#08a88a" class="cursor-pointer" ></lord-icon>
                        </div>
                      </div>
                    </td>

                    <td className="text-center">
                      <div className="flex items-center justify-center gap-4">
                        <span className="cursor-pointer" onClick={() => editPassword(item.id)}>
                          <lord-icon style={{ width: "30px", height: "30px", "padding -top": "3px", "padding -left": "3px" }} src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" colors="primary:#121331,secondary:#08a88a" ></lord-icon>
                        </span>

                        <span className="cursor-pointer" onClick={() => deletePassword(item.id)}>
                          <lord-icon style={{ width: "30px", height: "30px", "padding -top": "3px", "padding -left": "3px" }} src="https://cdn.lordicon.com/skkahier.json" trigger="hover" colors="primary:#121331,secondary:#08a88a" ></lord-icon>
                        </span>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div >
  );
};

export default Manager;
