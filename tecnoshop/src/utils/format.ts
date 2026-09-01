import type { OrderStatus } from '../types';

export function clp(amount: number): string {
  return amount.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  });
}

export const STATUS_LABELS: Record<OrderStatus, string> = {
  pendiente: 'Pendiente',
  confirmado: 'Confirmado',
  en_preparacion: 'En preparación',
  enviado: 'Enviado',
  entregado: 'Entregado',
  cancelado: 'Cancelado',
};

export const STATUS_ORDER: OrderStatus[] = [
  'pendiente',
  'confirmado',
  'en_preparacion',
  'enviado',
  'entregado',
];

export function statusStep(status: OrderStatus): number {
  const idx = STATUS_ORDER.indexOf(status);
  return idx === -1 ? -1 : idx;
}

export function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' });
}
