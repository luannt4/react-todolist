import { useForm } from 'react-hook-form';
import TextArea from '../ui/form/text-area';

interface ContactFormValues {
  instructionNote: string;
  default: boolean;
}

const DeliveryNotes: React.FC<{ data?: any; }> = ({
  data,
}) => {
  const {
    register,
    handleSubmit,

  } = useForm<ContactFormValues>({
    defaultValues: {
      instructionNote: data || '',
      default: data || false,
    },
  });

  function onSubmit(values: ContactFormValues) {
    console.log(values, 'Delivery Note');
  }

  return (
    <div className="w-full">
      <div className="w-full mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-6">
            <TextArea
              variant="normal"
              inputClassName="focus:border-2 focus:outline-none focus:border-brand"
              label="Delivery Instructions Note"
              {...register('instructionNote')}
            />
          </div>
          <div className="mb-6">
            <input
              id="default-type"
              type="checkbox"
              className="w-5 h-5 transition duration-500 ease-in-out border border-gray-300 rounded cursor-pointer form-checkbox focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none focus:checked:bg-brand hover:checked:bg-brand checked:bg-brand"
              {...register('default', { required: 'Confirm the policy' })}
            />
            <label
              htmlFor="default-type"
              className="font-medium align-middle ml-3  text-15px"
            >
              Leave at my door if I am not around
            </label>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeliveryNotes;
