import type { Response } from 'express';
import prisma from '../config/db/db.js';
import type { CreateObservationDTO } from '../models/observationModel.js';

export const addObservation = async (req: any, res: Response) => {
  try {
    const { fieldId, note }: CreateObservationDTO = req.body;
    const authorId = req.user.id;

    const observation = await prisma.observation.create({
      data: {
        note,
        fieldId,
        authorId
      }
    });

    await prisma.field.update({
      where: { id: fieldId },
      data: { updatedAt: new Date() }
    });

    res.status(201).json(observation);
  } catch (error) {
    res.status(500).json({ message: 'Error adding observation' });
  }
};

export const getObservations = async (req: any, res: Response) => {
  try {
    const { id, role } = req.user;
    const observations = await prisma.observation.findMany({
      where: role === 'ADMIN' ? {} : { field: { agentId: id } },
      include: {
        author: { select: { email: true, role: true } },
        field: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(observations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching observations' });
  }
};

export const updateObservation = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { note } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    // 1. Validate that note exists
    if (!note) {
      return res.status(400).json({ message: 'Note content is required' });
    }

    // 2. Find existing
    const existingObs = await prisma.observation.findUnique({
      where: { id }
    });

    if (!existingObs) {
      return res.status(404).json({ message: 'Observation not found' });
    }

    // 3. Ownership check
    if (existingObs.authorId !== userId && userRole !== 'ADMIN') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // 4. Perform Update
    const updatedObs = await prisma.observation.update({
      where: { id: String(id) }, // Explicitly cast to string
      data: { note: String(note) }
    });

    return res.json(updatedObs);
  } catch (error: any) {
    // Professional Tip: Log the full error to your terminal so you can see the Prisma code (e.g., P2002)
    console.error("PRISMA ERROR:", error.message);
    return res.status(500).json({ 
      message: 'Error updating observation',
      details: error.message // Temporarily send this to Postman to debug
    });
  }
};

export const deleteObservation = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const existingObs = await prisma.observation.findUnique({ where: { id } });
    if (!existingObs) return res.status(404).json({ message: 'Not found' });

    if (existingObs.authorId !== userId && userRole !== 'ADMIN') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await prisma.observation.delete({ where: { id } });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting' });
  }
};