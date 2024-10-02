import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';

const app = express();
app.use(cors());

app.get('/api/cards', async (req, res) => {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'ElementalMastersCards.json');
    const data = await fs.readFile(filePath, 'utf8');
    const cards = JSON.parse(data);
    res.json(cards);
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ error: "Error fetching cards" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));