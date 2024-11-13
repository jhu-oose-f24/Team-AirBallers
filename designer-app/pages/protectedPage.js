import { getServerAuthSession } from '@/auth'; // Adjust path as necessary
import { redirect } from 'next/navigation';
import Header from '@/components/Header';

export default async function ProtectedPage() {
  const session = await getServerAuthSession();

  // Redirect to the login page if the user is not authenticated
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  return (
    <div> d
      <Header />
      <h1>This is the Protected Page!</h1>
    </div>
  );
}
