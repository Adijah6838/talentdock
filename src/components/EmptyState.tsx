import { SearchX } from 'lucide-react';

export function EmptyState({ title, message }: { title: string, message: string }) {
  return (
    <div className="empty-state">
      <SearchX size={48} className="empty-icon" />
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}