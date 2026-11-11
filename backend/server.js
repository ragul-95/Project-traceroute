const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic Route
app.get('/', (req, res) => {
  res.send('Talent Route Backend Running');
});

// POST: Analyze Profile
app.post('/analyze-profile', (req, res) => {
  const { age, qualification, experience, country, jobRole, budget } = req.body;

  // Logic for Eligibility Score
  let score = 40;
  const exp = parseInt(experience) || 0;
  if (exp > 2) score += 10;
  if (exp > 5) score += 15;
  
  const parsedAge = parseInt(age) || 25;
  if (parsedAge >= 21 && parsedAge <= 30) score += 15;
  if (parsedAge > 30 && parsedAge <= 40) score += 5;
  
  if (qualification === 'Masters' || qualification === 'PhD') score += 20;
  if (qualification === 'Bachelors') score += 10;
  
  // Ensure score doesn't exceed 98%
  score = Math.min(score, 98);

  const countryData = {
    'Germany': { symbol: '€', baseSalary: 60000, baseCost: 1500, visaFee: '€75', visaCategory: 'Skilled Worker / Blue Card' },
    'Canada': { symbol: 'CAD ', baseSalary: 80000, baseCost: 2500, visaFee: 'CAD 155', visaCategory: 'Express Entry' },
    'Australia': { symbol: 'AUD ', baseSalary: 90000, baseCost: 3000, visaFee: 'AUD 400', visaCategory: 'Subclass 189/190' },
    'USA': { symbol: '$', baseSalary: 100000, baseCost: 3500, visaFee: '$160', visaCategory: 'H-1B Visa' },
    'UK': { symbol: '£', baseSalary: 50000, baseCost: 1800, visaFee: '£230', visaCategory: 'Skilled Worker Visa' },
  };

  const selectedCountry = countryData[country] || { symbol: '$', baseSalary: 60000, baseCost: 2000, visaFee: '$100', visaCategory: 'Work Permit' };

  // Adjust salary and cost based on experience
  const expMultiplier = 1 + (exp * 0.05);
  const finalSalary = Math.round(selectedCountry.baseSalary * expMultiplier);
  const finalCost = selectedCountry.baseCost + Math.floor(Math.random() * 500);

  const formattedSalary = `${selectedCountry.symbol}${finalSalary.toLocaleString()}`;
  const formattedCost = `${selectedCountry.symbol}${finalCost.toLocaleString()}/month`;

  const safeJobRole = jobRole || 'Professional';

  let roles = [];
  if (exp > 5) {
    roles = [`Lead ${safeJobRole}`, `Principal ${safeJobRole}`, `Director of ${safeJobRole}s`];
  } else if (exp > 2) {
    roles = [`Senior ${safeJobRole}`, `Lead ${safeJobRole}`, `${safeJobRole} Consultant`];
  } else {
    roles = [`Junior ${safeJobRole}`, `${safeJobRole}`, `Associate ${safeJobRole}`];
  }

  const demandLevel = exp > 3 ? 'Very High' : (exp > 0 ? 'High' : 'Moderate');
  const baseOpenings = country ? country.length * 500 : 3000;
  const activeOpenings = `${baseOpenings + Math.floor(Math.random() * 2000)}+`;

  const results = {
    score: score,
    salary: formattedSalary,
    cost: formattedCost,
    visa: selectedCountry.visaFee,
    roles: roles,
    demandLevel: demandLevel,
    activeOpenings: activeOpenings,
    visaCategory: selectedCountry.visaCategory,
    currencySymbol: selectedCountry.symbol
  };

  console.log(`Analyzing profile for: ${safeJobRole} in ${country}`);
  res.json(results);
});

// GET: Analyze Profile (for browser testing)
app.get('/analyze-profile', (req, res) => {
  const sampleData = {
    score: 70,
    salary: "€50,000",
    cost: "€1,500/month",
    visa: "€75"
  };
  res.json(sampleData);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access at http://localhost:${PORT}`);
});
