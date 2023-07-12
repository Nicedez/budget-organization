const express = require('express')
const app = express();
const port = 3000;
const cors = require('cors')
const bodyParser = require('body-parser')

let envelopes = [
    { id: 1, envelopes: 'Dining Out', budget: 100 },
    { id: 2, envelopes: 'Groceries', budget: 200 }
];
let currentId = 3;
app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*app.param('id', function (req, res, next, id) {
    console.log('CALLED ONLY ONCE');
    next();
});*/
/*app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
  })*/
  
app.get('/', (req, res)=>{
    res.send(envelopes)
})
app.get('/envelopes/:id', (req, res)=>{
    const id =  parseInt(req.params.id);
    const getEnvelopeById= envelopes.find(envelope => envelope.id === id);
    if (!getEnvelopeById) {
        return res.status(404).json({ error: 'Resource not found' });
      }
    
      return res.json(getEnvelopeById);
    })
app.post('/envelopes', (req, res, next)=>{
   const newId = currentId++;
    let newEnvelopes = {
        id: newId, 
        envelopes:req.body.envelopes,
        budget:req.body.budget
    };
    console.log(newEnvelopes);
    envelopes.push(newEnvelopes);
    res.status(200).send("<h1>Envelope add succesfully</h1>");
})
app.put('/envelopes/:id', (req, res)=>{
    const id =  parseInt(req.params.id);
    const EnvelopeIndex= envelopes.findIndex(envelope => envelope.id === id); 
    if (EnvelopeIndex === -1) {
        return res.status(404).json({ error: 'Envelope not found' });
      }
    const updatedEnvelope = { 
        id: req.body.id,
        envelopes:req.body.envelopes,
        budget:req.body.budget
    };
    console.log(updatedEnvelope);
    envelopes[EnvelopeIndex] = updatedEnvelope;
    return res.json(updatedEnvelope);
})

app.put('/envelopes/:id', (req, res)=>{
    const id =  parseInt(req.params.id);
    const EnvelopeIndex= envelopes.findIndex(envelope => envelope.id === id); 
    if (EnvelopeIndex === -1) {
        return res.status(404).json({ error: 'Envelope not found' });
      }
    const updatedEnvelope = { 
        id: req.body.id,
        envelopes:req.body.envelopes,
        budget:req.body.budget
    };
    console.log(updatedEnvelope);
    envelopes[EnvelopeIndex] = updatedEnvelope;
    return res.json(updatedEnvelope);
})

app.delete('/envelopes/:id', (req, res)=>{
    const id =  parseInt(req.params.id);
    const EnvelopeIndex= envelopes.findIndex(envelope => envelope.id === id); 
    if (EnvelopeIndex === -1) {
        return res.status(404).json({ error: 'Envelope not found' });
      }

      const deletedEnvelope = envelopes.splice(EnvelopeIndex, 1)[0];
      if (deletedEnvelope) {
        res.status(204);
      } else {
        res.status(500);
      }
      res.send();
})

app.post('/envelopes/transfer/:from/:to', (req, res) => {
    const fromEnvelopeId = parseInt(req.params.from);
    const toEnvelopeId = parseInt(req.params.to);
    const transferAmount = parseFloat(req.header('transfer-amount'));
  
    const fromEnvelopeIndex = envelopes.findIndex(e => e.id === fromEnvelopeId);
    const toEnvelopeIndex = envelopes.findIndex(e => e.id === toEnvelopeId);
  
    if (fromEnvelopeIndex === -1 || toEnvelopeIndex === -1) {
      return res.status(404).json({ error: 'Envelope not found' });
    }
  
    const fromEnvelope = envelopes[fromEnvelopeIndex];
    const toEnvelope = envelopes[toEnvelopeIndex];
  
    if (fromEnvelope.budget < transferAmount) {
      return res.status(400).json({ error: 'Insufficient funds in the source envelope' });
    }
  
    fromEnvelope.budget -= transferAmount;
    toEnvelope.budget += transferAmount;
  
    return res.json({ message: 'Transfer successful', envelopes });
  });

app.listen(port, ()=>{
    console.log(`API is listening to port ${port}`)
})