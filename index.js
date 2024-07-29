const express = require('express');
const { getChatResponse } = require('./openai');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/generate', async (req, res) => {
  const { requirement } = req.body;

  try {
    const prompt = `Create a simple website based on the following requirement: ${requirement}`;
    const code = await getChatResponse(prompt);

    // Save the generated code to an HTML file
    const filePath = path.join(__dirname, 'generated', 'index.html');
    fs.writeFileSync(filePath, code);

    res.json({ message: 'Website generated successfully!', filePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating website' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
