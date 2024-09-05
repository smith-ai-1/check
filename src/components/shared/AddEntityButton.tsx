import React from 'react';
import { Plus } from 'lucide-react';

interface AddEntityButtonProps {
  onClick: () => void;
  entityType: string;
}

const AddEntityButton: React.FC<AddEntityButtonProps> = ({ onClick, entityType }) => (
  <button
    onClick={onClick}
    className="w-full bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center space-x-2 mb-4"
  >
    <Plus className="h-5 w-5" />
    <span>Add {entityType}</span>
  </button>
);

export default AddEntityButton;
