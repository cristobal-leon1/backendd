import express from 'express'
import 'dotenv/config'
import './database/connectdb.js'
import authRouter from './routes/auth.route.js'

const app = express();

app.use(express.json());
app.use('/api/v1/auth', authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log('Example app listening on port 5000!');
});