import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const OrderShow = ({ order }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  // Make sure to call `loadStripe` outside of a component’s render to avoid
  // recreating the `Stripe` object on every render.
  const stripePromise = loadStripe(
    'pk_test_51K434aAKZdXxPIkn5MtkvCa6PdfPOkMrA7Dmhem4egC9wX2TXRk4qqxfMq5mwOQOvIZzYrPxlhoVKZiLAXvl5aTO00dlz2xjZz'
  );

  const options = {
    amount: order.ticket.price,
  };

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      console.log('clean up');
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order expired</div>;
  }

  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <form>
          <CardElement />
          <button>pay:¥{order.ticket.price}</button>
        </form>
      </Elements>
      <div>{timeLeft}seconds until order expires</div>
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
