import { Pagination, Typography, Grid, Card, CardContent } from '@mui/material';
import React,{useState,useEffect} from 'react'
import axios from 'axios'

import "./games.css"



function Games(){
    const [page,setPage]=useState(1);
    const [posts,setPosts]=useState([]);
    const [count,setCount]=useState(0);
    const  [search,setSearch]=useState("");

    async function fetchData(){
        const res = await axios.get(`https://rsd-games.onrender.com/getMovies?page=${page}&search=${search}`)
        setPosts(res.data.data)

    }
    async function getCount(){
      const res=await axios.get(`https://rsd-games.onrender.com/getCount?page=${page}&search=${search}`)
      setCount(res.data.data)
    }

    function defaultPage(){
      setPage(1)
      if(!search){
        window.location.reload(true)
      }
    }

    function downloadLink(url){
      window.open(url)
    }

    function topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }

    useEffect(()=>{
      getCount()
      console.log("count is ",count)
    },[posts])

    useEffect(()=>{
        fetchData()
    },[page])


    

    return (
        <div>
          <div>
              <input className="Search" value={search} onInput={(e) => {setSearch(e.target.value)}} type="text" name="searchBox" placeHolder="Enter Name of Game"/>
              <button className="SearchButton" onClick={()=>{
                defaultPage()
                console.log("called the function")
                fetchData()
              }}>Search</button>
          </div>

             <div className="divider">
      <Grid container  spacing={10} rowSpacing={1} columnSpacing={{  xs:30, sm:300, md:300, lg:10, xl:20 }}>
        {posts.map((post) => (
            <Grid item xs={600} className="girds"  lg={6} key={post._id} style={{paddingRight:"10px",justifyContent:"center",alignItems:"center"}}>
              <div className="myBad">
              {/* <Card class="mad"> */}
                <CardContent>
                  <Typography >
                  <div style={{display:"Flex",justifyContent:"center"}}>
                    <h4>{post.gameName}</h4>
                  </div>
                    <div style={{display:"Flex",justifyContent:"center"}}> 
                    <img style={{backgroundColor:"black", padding:"20px" , height:"200px",display:"Flex",justifyContent:"center"}} src={post.coverLink.replace("file/d/","uc?exprot=view&id=").replace("/view?usp=share_link","")}/>
                    </div>
                    <br/>
                    <div style={{display:"Flex",justifyContent:"center"}}>
                    <button onClick={()=>downloadLink(post.gameLink)}>Download Link</button>
                    </div>
                  </Typography>
                  <Typography variant="body1">{post.content}</Typography>
                </CardContent>
              {/* </Card> */}
              </div>
            </Grid>
        ))}
        </Grid>
        </div>
        <div style={{display:"Flex",justifyContent:"center", paddingTop:"20px"}}>
             <Pagination count={count} value={page} 
             variant="outlined" color="primary" 
             onChange={( event,value) => {
                setPage(value)
                topFunction()

        }} />
        </div>    
        </div>
    )


}
export default Games