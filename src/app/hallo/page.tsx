import Image from "next/image";
import React, { Children } from "react";

interface ButtonProps{
  label?: string
  children?: string
};

function Button({children = "devault", label = "devault"}: ButtonProps) {
    return (
      <div>
      <button type="submit" className="m-2 h-10 px-6 font-semibold rounded-md bg-blue-600 text-white">
        {children}
      </button>
        {label}
      </div>
    )
  };

interface FormProps{
  name?: string
  label?:string
  placeholder?: string
  children?: string
  type?: string
}

function Form({name = "devault", children = "devault", placeholder = "...", type = "text"}: FormProps) {
  return(
    <div>
      <form action="">
        <div className="mb-6">
        <label htmlFor={name} className="p-3">{children}</label>
        <input type={type} id={name} placeholder={placeholder} className="border"/>
        </div>
      </form>
    </div>
  )
}

function Loginform() {
  return(
  <div>
    <Form name="username" placeholder="Username">Username</Form>
    <Form name="pass" placeholder="masukkan password" type="password">Password</Form>
  </div>
  )
}

function Layouts({children, tittle = "???"}: {children?: React.ReactNode, tittle?: string}) {
  return(
  <div>
    <h1>{tittle}</h1>
    <br />
    {children}
  </div>
  )
}

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1>testing</h1>
      <div className="p-2 m-2">
      <Button label="tess" >hallo</Button>
      <Button label="cook" >geys</Button>
      <Button children="mkk" label="hah"></Button>
      <Button ></Button>
      <br />

      <Form name="tess" placeholder="hallo">ini tes</Form>
      <Form type="password" name="password" placeholder="masukkan password">tes Password</Form>

      <Form></Form>
      <br />

      <Layouts tittle="masukkan data diri anda"><Loginform /></Layouts>
      </div>
    </div>
  );
}
