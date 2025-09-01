import express, {Request,Response} from 'express';
import cors from 'cors';
import Event from './models/Event';

const app = express ()

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response)=> {
  res.send('server running really fast')
})

//  Fetch events from MongoDB
app.get("/events", async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

export default app;