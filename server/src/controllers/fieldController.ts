import type { Request, Response } from 'express';
import prisma from '../config/db/db.js'; // Updated to match your db.ts location
import { getComputedStatus } from '../utils/fieldStatus.js'; // Using the new util
import { FieldStage } from '../types/index.js'; // Importing types for safety

export const getFields = async (req: any, res: Response) => {
  try {
    // req.user is now populated by your 'protect' middleware
    const { id, role } = req.user; 
    
    // Logic: Admin sees all, Agent sees only their assigned fields
    const fields = await prisma.field.findMany({
      where: role === 'ADMIN' ? {} : { agentId: id },
      include: { 
        observations: {
          orderBy: { createdAt: 'desc' } // Professional touch: latest notes first
        }, 
        assignedAgent: { 
          select: { email: true } 
        } 
      }
    });

    // Transform data: Attach the dynamically computed status
    const fieldsWithStatus = fields.map(field => ({
      ...field,
      // We cast field.currentStage to FieldStage to satisfy TypeScript
      computedStatus: getComputedStatus(field.currentStage as FieldStage, field.updatedAt)
    }));

    res.json(fieldsWithStatus);
  } catch (error) {
    console.error('Get Fields Error:', error);
    res.status(500).json({ message: 'Error fetching fields' });
  }
};

export const createField = async (req: Request, res: Response) => {
  try {
    const { name, cropType, plantingDate, agentId } = req.body;
    
    const newField = await prisma.field.create({
      data: {
        name,
        cropType,
        plantingDate: new Date(plantingDate),
        agentId,
        status: 'ACTIVE' // This satisfies the DB requirement, but we use computedStatus in the UI
      }
    });

    res.status(201).json(newField);
  } catch (error) {
    console.error('Create Field Error:', error);
    res.status(500).json({ message: 'Error creating field' });
  }
};