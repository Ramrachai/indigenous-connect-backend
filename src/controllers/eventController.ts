// server/src/controllers/eventController.ts
import { Request, Response } from 'express';
import Event, { EventModelType } from '../models/Event'; 

export const getEvents = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;

    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { location: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const totalEvents = await Event.countDocuments(query);
    const totalPages = Math.ceil(totalEvents / limit);

    const events = await Event.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('createdBy', 'username email') 
      .populate('attendees', 'username email'); 

    res.json({
      events,
      currentPage: page,
      totalPages,
      totalEvents,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const event: EventModelType = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: 'Error creating event', error });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: 'Error updating event', error });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting event', error });
  }
};
