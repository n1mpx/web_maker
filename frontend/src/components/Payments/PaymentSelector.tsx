import React, { useEffect, useState } from 'react';
import { IPaymentMethod } from '../../types/index';
import api from '../../api/axios';

interface PaymentSelectorProps {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const PaymentSelector: React.FC<PaymentSelectorProps> = ({ selectedId, onSelect }) => {
  const [methods, setMethods] = useState<IPaymentMethod[]>([]);

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const res = await api.get('/payment-methods/');
        setMethods(res.data.items || res.data || []);
      } catch (error) {
        console.error('Error loading payment methods:', error);
        setMethods([]);
      }
    };
    fetchMethods();
  }, []);

  if (methods.length === 0) return <p>Способы оплаты не найдены</p>;

  return (
    <div>
      <h2>Способ оплаты</h2>
      {methods.map((m) => (
        <div key={m.id}>
          <input
            type="radio"
            name="payment"
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

export default PaymentSelector;
