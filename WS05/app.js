const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const Project = require('./models/Project');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Yhdistetty MongoDB:hen'))
  .catch(err => console.error('MongoDB-virhe:', err));

app.get('/', (req, res) => {
  res.send('Tervetuloa REST API -palvelimeen!');
});

app.get('/api/getall', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Virheellinen ID' });
  }

  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Ei löytynyt' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/add', async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ message: 'Title on pakollinen kenttä' });
  }

  const project = new Project(req.body);
  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/update/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Virheellinen ID' });
  }

  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Ei löytynyt' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/delete/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Virheellinen ID' });
  }

  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Ei löytynyt' });
    res.json({ message: 'Poistettu onnistuneesti' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Virheellinen ID-muoto' });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({ message: 'Palvelinvirhe' });
});

app.listen(PORT, () => {
  console.log(`Palvelin käynnissä osoitteessa http://localhost:${PORT}`);
});
