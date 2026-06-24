import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import healthCheck from './routes/healthCheck.routes.js'
import character from './routes/character.routes.js'
import job from './utils/cron.js'

const PORT = process.env.PORT || 8000;
const app = express();

job.start();
app.use(express.json())
app.use(cors())

app.use('/api/v1',healthCheck)
app.use('/api/v1',character)

app.listen(PORT,()=>{
    console.log(`⚙️  Server listening on port: ${PORT}`)
})