const express = require('express');
const app = express();

app.use(express.json());

function findFirstUniqueChar(str) {
  const charCount = {};
  
  for (let char of str){
    charCount[char]= (charCount[char] || 0) + 1;
  }
  console.log(charCount, "checking char count")

  for (let i = 0; i < str.length; i++) {
    if (charCount[str[i]] === 1) {
      return i;
    }
  }
  
  return -1;
}

app.post('/first-unique-character', (req, res) => {
    try {
      const { text_to_process } = req.body;
  
      // Validate input
      if (!text_to_process) {
        console.log(`[${new Date().toISOString()}] Invalid input: Missing 'text_to_process' key`);
        return res.status(400).json({ error: "Missing 'text_to_process' key" });
      }
  
      if (typeof text_to_process !== 'string') {
        console.log(`[${new Date().toISOString()}] Invalid input: 'text_to_process' must be a string`);
        return res.status(400).json({ error: "'text_to_process' must be a string" });
      }
  
      console.log(`[${new Date().toISOString()}] Endpoint /first-unique-character called with input: ${text_to_process}`);
  
      const index = findFirstUniqueChar(text_to_process);
  
      res.json({
        first_unique_char: index === -1 ? null : text_to_process[index],
        first_unique_char_index: index,
        timestamp: new Date().toISOString(),
      });
  
    } catch (error) {
      console.error(`[${new Date().toISOString()}] An error occurred: ${error.message}`);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
