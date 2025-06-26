import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/companies', async (req, res) => {
  try {
    const { companyname, address, city, state, GSTNumber, contacts } = req.body;
    if (!companyname || !address || !city || !state || !GSTNumber) {
      return res.status(400).json({
        success: false,
        error: 'All company fields are required'
      });
    }
    if (!contacts || contacts.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'At least one contact is required'
      });
    }
    const company = await prisma.company.create({
      data: {
        companyName: companyname,
        address: address,
        city: city,
        state: state,
        gstNumber: GSTNumber,
        contacts: {
          create: contacts.map(contact => ({
            personName: contact.personName,
            phoneNumber: contact.phoneNumber,
            date: new Date(contact.date)
          }))
        }
      },
      include: {
        contacts: true
      }
    });
    res.status(201).json({ success: true, data: company });
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create company'
    });
  }
});

app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});