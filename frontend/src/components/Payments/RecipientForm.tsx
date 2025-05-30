import React from 'react';
import { IRecipient } from '../../types/index';

interface Props {
  recipient: IRecipient;
  setRecipient: (r: IRecipient) => void;
}

const RecipientForm: React.FC<Props> = ({ recipient, setRecipient }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecipient({ ...recipient, [name]: value });
  };

  return (
    <div>
      <h2>Получатель</h2>
      <div className='recipient-form-grid'>
        <input name="firstName" placeholder="Имя" value={recipient.firstName} onChange={handleChange} />
        <input name="lastName" placeholder="Фамилия" value={recipient.lastName} onChange={handleChange} />
        <input name="middleName" placeholder="Отчество" value={recipient.middleName} onChange={handleChange} />
        <input name="address" placeholder="Адрес" value={recipient.address} onChange={handleChange} />
        <input name="zipCode" placeholder="Индекс" value={recipient.zipCode} onChange={handleChange} />
        <input name="phone" placeholder="Телефон" value={recipient.phone} onChange={handleChange} />
      </div>
    </div>
  );
};

export default RecipientForm;