import React, { useEffect, useState } from 'react'
import DataTable from './Table/DataTable'
import { useSelector } from 'react-redux'
import AddModal from "../components/AddModal";



const DashTable = ({heading, TableColums, api,tableParams,delApi,updataApi,AddApi}) => {
  const [Tdata, setTdata] = useState([])
  const id = useSelector((state) => state.user.id)

  const fetchData=async()=>{
    const data = {"user_id":id}
    try {
      const dataFetch = await fetch(
        api,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const jsonRes =await dataFetch.json()
      if(jsonRes.code==200){
        setTdata(jsonRes.data)
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  

  return (
    <div className="card mb-4">
    <div className="card-header d-flex justify-content-between">
        <AddModal  tableParams={tableParams} title={heading} AddApi={AddApi} fetchData={fetchData} id={id}/>
    </div>
   
    <div className="card-body overflow-x-auto">
       <DataTable Tdata={Tdata} tableParams={tableParams} updataApi={updataApi} TableColums={TableColums} delApi={delApi} fetchData={fetchData}/>
    </div>
</div>
  )
}

export default DashTable