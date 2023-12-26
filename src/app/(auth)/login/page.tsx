'use client';

import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

const validationSchema = z.object({
	email: z.string().min(1, { message: 'Please enter your email' }).email({
		message: 'Must be a valid email',
	}),
	password: z.string().min(6, { message: 'Password must be atleast 6 characters' }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function page() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ValidationSchema>({
		resolver: zodResolver(validationSchema),
	});

	const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

	return (
		<main>
			<section>
				<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
					<div className='w-full rounded-3xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700'>
						<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
							<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
								Create an account
							</h1>
							<form className='space-y-4 md:space-y-6' onSubmit={handleSubmit(onSubmit)}>
								<div>
									<label
										htmlFor='email'
										className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
									>
										Email
									</label>
									<input
										type='email'
										id='email'
										className='bg-slate-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 duration-200'
										placeholder='john@doe.com'
										{...register('email')}
									/>
									{errors.email && (
										<p className='text-sm text-red-400 mt-2'> {errors.email?.message}</p>
									)}
								</div>
								<div>
									<label
										htmlFor='password'
										className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
									>
										Password
									</label>
									<input
										type='password'
										id='password'
										className='bg-slate-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 duration-200'
										{...register('password')}
									/>
									{errors.password && (
										<p className='text-sm text-red-400 mt-2'> {errors.password?.message}</p>
									)}
								</div>

								<button
									type='submit'
									className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base p-4 text-center dark:bg-white dark:hover:bg-indigo-600 dark:hover:text-white dark:focus:ring-primary-800 dark:text-slate-700 duration-200'
								>
									Login
								</button>
								<p className='text-sm font-light text-gray-500 dark:text-gray-400'>
									Don't have an account?{' '}
									<Link
										href='/register'
										className='font-medium text-primary-600 hover:underline dark:text-primary-500'
									>
										Create a new account here
									</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
