'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
	return (
		<button
			onClick={() => signOut()}
			className='text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-2xl text-base py-4 px-8 text-center dark:bg-white dark:hover:bg-indigo-600 dark:hover:text-white dark:focus:ring-primary-800 dark:text-slate-700 duration-200'
		>
			Sign Out
		</button>
	);
}
