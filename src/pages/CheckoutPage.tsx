import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliverySelector from '../components/Payments/DeliverySelector';
import PaymentSelector from '../components/Payments/PaymentSelector';
import RecipientForm from '../components/Payments/RecipientForm';
import BasketSummary from '../components/Basket/BasketSummary';
import { IRecipient } from '../types/index';
import api from '../api/axios';
import { useBasket } from '../components/BasketContext';
import '../styles/CheckoutPage.css';

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
      !recipient.phone ||
      !recipient.zipCode
    ) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    setLoading(true);

    try {
      const toSnakeCaseRecipient = (recipient: IRecipient) => ({
        first_name: recipient.firstName,
        last_name: recipient.lastName,
        middle_name: recipient.middleName,
        address: recipient.address,
        zip_code: recipient.zipCode,
        phone: recipient.phone,
      });

      // 1. Создание получателя
      const recipientResponse = await api.post('/recipients/', toSnakeCaseRecipient(recipient));
      const recipientId = recipientResponse.data.id;

      // 2. Считаем итоговую сумму
      const paymentTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      // 3. Создание чекаута
      const checkoutPayload = {
        deliveryMethodId: deliveryId,
        paymentMethodId: paymentId,
        recipientId: recipientId,
        payment_total: paymentTotal,
      };

      const checkoutResponse = await api.post('/checkouts/', checkoutPayload);
      const checkoutId = checkoutResponse.data.id;

      // 4. Создание транзакции
      const transactionResponse = await api.post('/transactions/', {
        checkoutId: checkoutId,
        amount: paymentTotal,
      });

      // 5. Перенаправляем на URL оплаты, если есть
      const paymentUrl = transactionResponse.data.payment_url;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        alert('Заказ успешно оформлен!');
        navigate('/basket');
      }
    } catch (error: any) {
      if (error.response) {
        console.error('Ошибка от сервера:', error.response.data);
        alert('Ошибка при оформлении заказа:\n' + JSON.stringify(error.response.data, null, 2));
      } else {
        console.error(error);
        alert('Неизвестная ошибка. Попробуйте позже.');
      }
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

        <div className="checkout-section recipient-section">
          <RecipientForm recipient={recipient} setRecipient={setRecipient} />
        </div>

        <div className="checkout-section basket-section">
          <BasketSummary items={items} />
        </div>

        <input type="checkbox" defaultChecked />
        <label>
          Соглашаясь, вы принимаете условия пользования торговой площадкой и правила возврата
        </label>
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
