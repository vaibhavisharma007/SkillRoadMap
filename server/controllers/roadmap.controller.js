import { generateText } from "../services/geminiService.js";
import { tryParseJSON } from "../utils/parser.js";
export async function getRoadmap(req,res){
    const {name}=req.body;
    const data= {
        name:name,
        happy:"no",
    };
    return res.status(200).json(data);
}