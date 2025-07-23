import React,{useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
export default function ResetPassword(){
  const { token } = useParams()
  const [p,err,suc]=[useState(''),useState(''),useState('')]
  const rp=async i=>{
    i.preventDefault(),setErr(''),setSuc('')
    try{const r=await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`,{ password:p })
      setSuc(r.data.message),setP('')
    }catch(x){setErr(x.response?.data?.message||x.message)}
  }
  return(
    <form onSubmit={rp} style={{maxWidth:400,margin:'auto'}}>
      <h2>Reset Password</h2>
      {err&&<p style={{color:'red'}}>{err}</p>}
      {suc&&<p style={{color:'green'}}>{suc}</p>}
      <input type="password" placeholder="New Password" value={p} onChange={i=>setP(i.target.value)} required/>
      <button type="submit">Reset Password</button>
    </form>
  )
}
