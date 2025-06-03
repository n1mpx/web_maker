import React, { useEffect, useState } from 'react';
import { IDeliveryMethod } from '../../types';
import api from '../../api/axios';

interface Props {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const DeliverySelector: React.FC<Props> = ({ selectedId, onSelect }) => {
  const [methods, setMethods] = useState<IDeliveryMethod[]>([]);

  useEffect(() => {
    const fetchMethods = async () => {
      const res = await api.get('/delivery-methods/');
      setMethods(res.data.items || []);
    };
    fetchMethods();
  }, []);

  if (methods.length === 0) return <p>Способы доставки не найдены</p>;

  return (
    <div>
      <h2>Способ доставки</h2>
      {methods.map((m) => (
        <div key={m.id}>
          <input
            type="radio"
            name="delivery"
            checked={m.id === selectedId}
            onChange={() => onSelect(m.id)}
          />
          {m.image && <img src={m.image} alt={m.title} width={32} />}
          <span>{m.title}</span>
        </div>
      ))}
    </div>
  );
};

export default DeliverySelector;
