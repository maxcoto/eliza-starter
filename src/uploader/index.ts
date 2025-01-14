import express from 'express';
import fs from 'fs';
import path from 'path';

const run = () => {
  const uploadDir = path.join(path.resolve('./'), 'characters');
  const app = express();
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('hello world computer');
  });

  // List all stored JSON files
  app.get('/files', async (req, res) => {
    try {
        const files = await fs.promises.readdir(uploadDir);
        res.json({ files });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  });

  // Endpoint for receiving JSON object
  app.post('/upload', async (req, res) => {
    try {
        const jsonData = req.body;
        const filename = `json-${Date.now()}-${Math.round(Math.random() * 1E9)}.json`;
        const filepath = path.join(uploadDir, filename);

        await fs.promises.writeFile(filepath, JSON.stringify(jsonData, null, 2));

        res.json({ 
            message: 'JSON object saved successfully',
            filename: filename
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  });

  const PORT = 3001;
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  });
}

export default run;
