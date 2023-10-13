import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const User = useSelector((state) => state.user)

    return (<>
        <div class="container text-center py-4">
        <h3>{User.name}</h3>

        <table class="table table-striped">
 
  <tbody>
    <tr>
      <td>Name</td>
      <td>{User.name}</td>
    </tr>
   
    
   
  </tbody>
</table>

        </div>
    </>

    )
}

export default Profile