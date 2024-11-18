import { useState } from "react";
import { useIsMounted } from "../../utils/use-is-mounted";
import AddressPage from "./address";
import Heading from "../ui/heading";
import Button from "../ui/button";
import { DeliverySchedule } from "./schedule";
import StripeCheckoutInlineForm from "./stripe-checkout-inline-form";
import DeliveryNotes from "./delivery-instruction";

const CheckoutDetails: React.FC = () => {
  const mounted = useIsMounted();
  const [bindIndex, setBindIndex] = useState(0);
  const data = [
    {
      id: 1,
      title: 'Shipping Address',
      component: <AddressPage />,
    },
    {
        id: 2,
        title: 'Delivery Schedule',
        component: <DeliverySchedule />,
    },
    {
        id: 3,
        title: 'Payment Option',
        component: <StripeCheckoutInlineForm />,
    },
    {
        id: 4,
        title: 'Delivery Instructions',
        component: <DeliveryNotes  />,
      },
   
  ];
  const changeItem = (itemIndex: any) => {
    if (itemIndex !== bindIndex) {
      setBindIndex(itemIndex);
    }
  };
    return (
        <div className="border rounded-md border-border-base text-brand-light">
      {mounted &&
        data?.map((item, index) => {
          return (
            <div
              key={index}
              className={`accordion__panel ${
                !(data?.length - 1 === index)
                  ? 'border-b border-border-base'
                  : ''
              } ${bindIndex !== index ? 'collapsed' : 'expanded'}
            `}
              onClick={() => changeItem(index)}
            >
              <div
                id={`index_${index}`}
                className="flex items-center p-4 pb-6 cursor-pointer sm:p-8 accordion__button"
              >
                <span className="flex items-center justify-center font-semibold border-2 border-brand-dark rounded-full h-9 w-9 text-brand-dark mr-3 ">
                  {index + 1}
                </span>
                <Heading>{item?.title}</Heading>
              </div>

              <div
                data-aria-label={`index_${index}`}
                className="pb-6 pl-5  sm:pl-9 lg:pl-20  sm:pr-9  pr-5  accordion__content"
              >
                <div className="mb-6">{item?.component}</div>
                {!(data?.length - 1 === index) ? (
                  <div className="text-right">
                    <Button
                      onClick={() => changeItem(index + 1)}
                      variant="formButton"
                      className="px-4 py-3 text-sm font-semibold rounded "
                    >
                      Next Steps
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        })}
    </div>
      );
}
export default CheckoutDetails;