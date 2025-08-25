export async function createLevelContent(req,res){
    try{
        res.status(200).json({"message":"level content created"})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}