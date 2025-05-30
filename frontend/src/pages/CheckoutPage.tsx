import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliverySelector from '../components/Payments/DeliverySelector';
import PaymentSelector from '../components/Payments/PaymentSelector';
import RecipientForm from '../components/Payments/RecipientForm';
import BasketSummary from '../components/Basket/BasketSummary';
import { IRecipient } from '../types/index';
import api from '../api/axios';
import { useBasket } from '../components/BasketContext';
import '../styles/CheckoutPage.css'

const CheckoutPage = () => {
  const { items } = useBasket();
  const navigate = useNavigate();

  const [deliveryId, setDeliveryId] = useState<number | null>(null);
  const [paymentId, setPaymentId] = useState<number | null>(null);
  const [recipient, setRecipient] = useState<IRecipient>({
    firstName: '',
    lastName: '',
    middleName: '',
    address: '',
    zipCode: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (
      !deliveryId ||
      !paymentId ||
      !recipient.firstName ||
      !recipient.lastName ||
      !recipient.address ||
      !recipient.phone
    ) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    setLoading(true);

    try {
      const checkout = await api.post('/checkouts/', {
        deliveryMethod: deliveryId,
        paymentMethod: paymentId,
        recipient,
      });

      await api.post('/transactions/', {
        checkout: checkout.data.id,
      });

      alert('Заказ успешно оформлен!');
      navigate('/basket');
    } catch (error) {
      console.error(error);
      alert('Ошибка при оформлении заказа. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-left">
        <h1 className="checkout-title">Оформление заказа</h1>

        <div className="checkout-section delivery-section">
          <DeliverySelector selectedId={deliveryId} onSelect={setDeliveryId} />
        </div>
        <div className="checkout-section recipient-section ">
          <RecipientForm recipient={recipient} setRecipient={setRecipient} />
        </div>

        <div className="checkout-section basket-section">
          <BasketSummary items={items} />
        </div>

        <input type="checkbox" defaultChecked />
          <label >Соглашаясь, вы принимаете условия пользования торговой площадкой и правила возврата</label>
        
      </div>

      <div className="checkout-right">
        <div className="checkout-section payment-section">
          <PaymentSelector selectedId={paymentId} onSelect={setPaymentId} />
        </div>

        <div className="checkout-summary">
          <p className="checkout-items">{items.length} товаров</p>
          <p className="checkout-total-label">Итого:</p>
          <p className="checkout-total">
            {items.reduce((sum, item) => sum + item.price * item.quantity, 0)} ₽
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="checkout-submit-btn"
        >
          {loading ? 'Оформление...' : 'Оплатить'}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
