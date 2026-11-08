import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search-bar">
      <Search size={20} className="search-icon" />
      <input
        type="text"
        placeholder="Search jobs, companies, or skills..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}