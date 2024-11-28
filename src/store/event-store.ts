import { create } from 'zustand';

export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  status: 'upcoming' | 'in_progress' | 'completed';
  budget: number;
  description: string;
  suppliers: string[]; // supplier IDs
}

interface EventStore {
  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
}

export const useEventStore = create<EventStore>((set) => ({
  events: [],
  addEvent: (event) =>
    set((state) => ({
      events: [
        ...state.events,
        { ...event, id: Math.random().toString(36).slice(2) },
      ],
    })),
  updateEvent: (id, updates) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === id ? { ...event, ...updates } : event
      ),
    })),
  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    })),
}));