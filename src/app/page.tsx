import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SignOutButton from './SignOutButton';

export default async function Home() {
	const session = await getServerSession(authOptions);

	if (!session) redirect('/login');
	return (
		<main className='h-screen'>
			<div className='h-full'>
				<div className='w-full h-full flex flex-col items-center justify-center'>
					<h1 className='font-semibold text-6xl mb-4'>{session.user?.name}</h1>
					<h3 className='text-xl mb-4'>{session.user?.email}</h3>
					<SignOutButton />
				</div>
			</div>
		</main>
	);
}
