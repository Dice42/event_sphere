import { create } from 'zustand';

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  rating: number;
  status: 'active' | 'inactive';
  deliverables: Deliverable[];
}

export interface Deliverable {
  id: string;
  name: string;
  quantity: number;
  deliveryDate: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'delayed';
}

interface SupplierStore {
  suppliers: Supplier[];
  addSupplier: (supplier: Omit<Supplier, 'id'>) => void;
  updateSupplier: (id: string, supplier: Partial<Supplier>) => void;
  updateDeliverable: (
    supplierId: string,
    deliverableId: string,
    updates: Partial<Deliverable>
  ) => void;
}

export const useSupplierStore = create<SupplierStore>((set) => ({
  suppliers: [],
  addSupplier: (supplier) =>
    set((state) => ({
      suppliers: [
        ...state.suppliers,
        { ...supplier, id: Math.random().toString(36).slice(2) },
      ],
    })),
  updateSupplier: (id, updates) =>
    set((state) => ({
      suppliers: state.suppliers.map((supplier) =>
        supplier.id === id ? { ...supplier, ...updates } : supplier
      ),
    })),
  updateDeliverable: (supplierId, deliverableId, updates) =>
    set((state) => ({
      suppliers: state.suppliers.map((supplier) =>
        supplier.id === supplierId
          ? {
              ...supplier,
              deliverables: supplier.deliverables.map((deliverable) =>
                deliverable.id === deliverableId
                  ? { ...deliverable, ...updates }
                  : deliverable
              ),
            }
          : supplier
      ),
    })),
}));