
import StripePaymentForm from '../common/form/stripe-inline-form';

const StripeCheckoutInlineForm = () => {
  //const { total } = useCart();
  return (
    <StripePaymentForm item={{ price: 0, buttonText: 'Pay Now' }} />
  );
};

export default StripeCheckoutInlineForm;
