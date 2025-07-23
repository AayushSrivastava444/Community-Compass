import React,{useState} from 'react'
import axios from 'axios'
export default function ForgotPassword(){
  const [e,err,suc]=[useState(''),useState(''),useState('')]
  const fp=async i=>{
    i.preventDefault(),setErr(''),setSuc('')
    try{const r=await axios.post('http://localhost:5000/api/auth/forgot-password',{ email:e })
      setSuc(r.data.message),setE('')
    }catch(x){setErr(x.response?.data?.message||x.message)}
  }
  return(
    <form onSubmit={fp} style={{maxWidth:400,margin:'auto'}}>
      <h2>Forgot Password</h2>
      {err&&<p style={{color:'red'}}>{err}</p>}
      {suc&&<p style={{color:'green'}}>{suc}</p>}
      <input placeholder="Email" value={e} onChange={i=>setE(i.target.value)} required/>
      <button type="submit">Send Reset Link</button>
    </form>
  )
}
