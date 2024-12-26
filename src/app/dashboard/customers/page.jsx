import { fetchFilteredCustomers } from '@/app/lib/data';
import CustomersTable from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
export const metadata = {
  title: 'Customers',
};

export default async function Customers(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  const customers = await fetchFilteredCustomers(query);

  return (
    <div className='w-full'>      
      <CustomersTable customers={customers} />
    </div>
  );
}

        
      