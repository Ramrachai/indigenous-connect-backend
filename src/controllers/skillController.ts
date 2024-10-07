
// server/src/controllers/skillController.ts
import { Request, Response } from 'express';
import Skill, { ISkill } from '../models/Skill';

export const getSkills = async (req: Request, res: Response) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skills', error });
  }
};

export const createSkill = async (req: Request, res: Response) => {
  try {
    const skill: ISkill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ message: 'Error creating skill', error });
  }
};

export const updateSkill = async (req: Request, res: Response) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    res.status(400).json({ message: 'Error updating skill', error });
  }
};

export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting skill', error });
  }
};
