import axios from "axios";

export async function createRoadmap(topic,duration,level,score,breakdown){
    try{
        const response=await axios.post("http://localhost:6001/api/roadmap/createRoadMap",{topic,duration,level,score,breakdown})
        console.log(response.data);
        return response.data;        
    }
    catch(error){
        console.log("error fetching the roadmap",error)
    }
}


