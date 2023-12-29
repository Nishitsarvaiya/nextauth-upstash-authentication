'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const validationSchema = z
	.object({
		name: z.string().min(1, { message: 'Please enter your name' }),
		email: z.string().min(1, { message: 'Please enter your email' }).email({
			message: 'Must be a valid email',
		}),
		password: z.string().min(6, { message: 'Password must be atleast 6 characters' }),
		confirm_password: z.string().min(1, { message: 'Confirm Password is required' }),
	})
	.refine((data) => data.password === data.confirm_password, {
		path: ['confirm_password'],
		message: "Passwords don't match",
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

	const router = useRouter();

	const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
		try {
			const res = await fetch('/api/register', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					...data,
				}),
			});

			if (res.ok) {
				router.replace('/login');
			}
		} catch (error) {
			console.log(error);
		}
	};

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
										htmlFor='name'
										className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
									>
										Full Name
									</label>
									<input
										type='text'
										id='name'
										className='bg-slate-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 duration-200'
										placeholder='John Doe'
										{...register('name')}
									/>
									{errors.name && (
										<p className='text-sm text-red-400 mt-2'> {errors.name?.message}</p>
									)}
								</div>
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
								<div>
									<label
										htmlFor='confirm-password'
										className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
									>
										Confirm password
									</label>
									<input
										type='password'
										id='confirm_password'
										className='bg-slate-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 duration-200'
										{...register('confirm_password')}
									/>
									{errors.confirm_password && (
										<p className='text-sm text-red-400 mt-2'>{errors.confirm_password?.message}</p>
									)}
								</div>

								<button
									type='submit'
									className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base p-4 text-center dark:bg-white dark:hover:bg-indigo-600 dark:hover:text-white dark:focus:ring-primary-800 dark:text-slate-700 duration-200'
								>
									Create an account
								</button>
								<p className='text-sm font-light text-gray-500 dark:text-gray-400'>
									Already have an account?{' '}
									<Link
										href='/login'
										className='font-medium text-primary-600 hover:underline dark:text-primary-500'
									>
										Login here
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
