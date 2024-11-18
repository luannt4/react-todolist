
import StripePaymentForm from '../common/form/stripe-inline-form';
import { useCart } from '../../contexts';

const StripeCheckoutInlineForm = () => {
  const { total } = useCart();
  return (
    <StripePaymentForm item={{ price: total, buttonText: 'Pay Now' }} />
  );
};

export default StripeCheckoutInlineForm;
