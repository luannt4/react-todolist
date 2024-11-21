import { useQuery } from "@tanstack/react-query";
import { Order } from "../../types/Product";
import { fetchOrder } from "../../api/fetchOrder";
import { IoCheckmarkCircle } from 'react-icons/io5';
import usePrice from "../product/use-price";
import OrderDetails from "./order-details";

interface Props {
    orderId?: number;
}
const CompleteOrderArea: React.FC<Props> = ({orderId= 1}) => {
    const { data, isLoading} = useQuery<Order>({
        queryKey: ['order', orderId],
        queryFn: () => fetchOrder(orderId),
        enabled: !!orderId, // Chỉ gọi API khi có từ khóa
    });
    const { price: total } = usePrice(
        data && {
          amount: data.shipping_fee ? data.total + data.shipping_fee : data.total,
          currencyCode: 'USD',
        },
      );


    if (isLoading)
        return (
          <div className="py-16 xl:px-32 2xl:px-44 3xl:px-56 lg:py-20">
            Loading...
          </div>
    );

    return (
        <div className="py-10 xl:px-32 ">
      <div className="flex items-center justify-start px-4 py-4 mb-6 text-sm border rounded-md border-border-base bg-slate-100 lg:px-5 text-brand-dark md:text-base lg:mb-8">
        <span className="flex items-center justify-center w-10 h-10 rounded-full ltr:mr-3 rtl:ml-3 lg:ltr:mr-4 lg:rtl:ml-4 bg-brand bg-opacity-20 shrink-0">
          <IoCheckmarkCircle className="w-5 h-5 text-brand" />
        </span>
        Thank you. Your order has been received
      </div>

      <ul className="flex flex-col border rounded-md border-border-base bg-slate-100 md:flex-row mb-7 lg:mb-8 xl:mb-10">
        <li className="px-4 py-4 text-base font-semibold border-b border-dashed text-brand-dark lg:text-lg md:border-b-0 md:border-r border-border-two lg:px-6 xl:px-8 md:py-5 lg:py-6 last:border-0">
          <span className="block text-xs font-normal leading-5 uppercase text-brand-muted">
            Order number:
          </span>
          {data?.tracking_number}
        </li>
        <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-lg md:border-b-0 md:border-r lg:px-6 xl:px-8 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-brand-muted font-normal leading-5">
            Date:
          </span>
          April 22, 2021
        </li>
        <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-lg md:border-b-0 md:border-r lg:px-6 xl:px-8 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-brand-muted font-normal leading-5">
            Email:
          </span>
          {data?.customer.email}
        </li>
        <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-lg md:border-b-0 md:border-r lg:px-6 xl:px-8 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-brand-muted font-normal leading-5">
            Total:
          </span>
          {total}
        </li>
        <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-lg md:border-b-0 md:border-r lg:px-6 xl:px-8 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-brand-muted font-normal leading-5">
            Payment method:
          </span>
          {data?.payment_gateway}
        </li>
      </ul>

      <p className="mb-8 text-sm text-brand-dark md:text-base">
        Pay with cash upon delivery.
      </p>

      <OrderDetails order= {data}/>
    </div>
    );
}
export default CompleteOrderArea;