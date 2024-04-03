const PORT = process.env.PORT || 5000
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.listen(PORT, ()=> console.log('Your server is running on PORT '+PORT));

const API_KEY = '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';
app.post('/completions', async (req, res)=>{
    const options ={
        method:"POST",
        headers:{"Authorization": `Bearer ${API_KEY}`,
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        model:'gpt-3.5-turbo',
        messages:[{role:"user", content:req.body.message}],
        max_tokens:100,
    })
    }
    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        console.log(data);
        res.send(data);
    }
    catch(error){
        console.log(error);
    }
})
