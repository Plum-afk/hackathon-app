
import React from 'react';
import { type Veterinarian } from '../types';
import { PhoneIcon, LocationIcon } from './Icons';

interface VetCardProps {
  vet: Veterinarian;
}

const VetCard: React.FC<VetCardProps> = ({ vet }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-slate-200 hover:shadow-lg transition-shadow">
      <h3 className="font-bold text-lg text-slate-800">{vet.name}</h3>
      <div className="mt-2 space-y-2 text-slate-600">
        <div className="flex items-center">
          <LocationIcon className="w-4 h-4 mr-2 text-slate-400" />
          <span>{vet.address}</span>
        </div>
        <div className="flex items-center">
          <PhoneIcon className="w-4 h-4 mr-2 text-slate-400" />
          <a
            href={`tel:${vet.phone}`}
            className="text-brand-blue hover:underline"
          >
            {vet.phone}
          </a>
        </div>
      </div>
      <a
        href={`tel:${vet.phone}`}
        className="mt-4 inline-block w-full text-center bg-brand-green text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
      >
        Call Now
      </a>
    </div>
  );
};

export default VetCard;
