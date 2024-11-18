import Heading from '../ui/heading';
import { Order, OrderItem } from "../../types/Product";
import usePrice from '../product/use-price';

interface Props {
  className?: string;
  order?: Order;
}

const OrderItemCard = ({ product }: { product: OrderItem }) => {
  const { price: itemTotal } = usePrice({
    amount: product.price * product.quantity,
    currencyCode: 'USD',
  });
  return (
    <tr
      className="font-normal border-b border-border-base last:border-b-0"
      key={product.id}
    >
      <td className="p-4">
        {product.name} * {product.quantity}
      </td>
      <td className="p-4">{itemTotal}</td>
    </tr>
  );
};

const OrderDetails: React.FC<Props> = ({className = 'pt-10 lg:pt-12',order}) => {
 
 // const { data: order, isLoading } = useOrderQuery('1');
  const { price: subtotal } = usePrice(
    order && {
      amount: order.total,
      currencyCode: 'USD',
    },
  );
  const { price: total } = usePrice(
    order && {
      amount: order.shipping_fee
        ? order.total + order.shipping_fee
        : order.total,
      currencyCode: 'USD',
    },
  );
  const { price: shipping } = usePrice(
    order && {
      amount: order.shipping_fee,
      currencyCode: 'USD',
    },
  );

  return (
    <div className={className}>
      <Heading variant="heading" className="mb-6 xl:mb-7">
        Order details:
      </Heading>
      <table className="w-full text-sm font-semibold text-brand-dark lg:text-base">
        <thead>
          <tr>
            <th className="w-1/2 p-4 bg-slate-100 text-left rtl:text-right first:rounded-tl-md rtl:first:rounded-tr-md">
              Product
            </th>
            <th className="w-1/2 p-4 bg-slate-100 text-left rtl:text-right last:rounded-tr-md rtl:last:rounded-tl-md">
             Total
            </th>
          </tr>
        </thead>
        <tbody>
          {order?.products.map((product, index) => (
            <OrderItemCard key={index} product={product} />
          ))}
        </tbody>
        <tfoot>
          <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">Subtotal:</td>
            <td className="p-4">{subtotal}</td>
          </tr>
          <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">Shipping:</td>
            <td className="p-4">
              {shipping}
              <span className="text-[13px] font-normal pl-1.5 inline-block">
                via Flat rate
              </span>
            </td>
          </tr>
          <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">Payment Method:</td>
            <td className="p-4">{order?.payment_gateway}</td>
          </tr>
          <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">Total:</td>
            <td className="p-4">{total}</td>
          </tr>
          <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">Note:</td>
            <td className="p-4">New order</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default OrderDetails;
