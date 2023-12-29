import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter';
import bcrypt from 'bcryptjs';
import { NextAuthOptions, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { db } from './db';

interface Credentials {
	email: string;
	password: string;
}

export const authOptions: NextAuthOptions = {
	adapter: UpstashRedisAdapter(db),
	providers: [
		Credentials({
			name: 'credentials',
			credentials: {},
			async authorize(credentials) {
				const { email, password } = credentials as Credentials;

				try {
					const dbUserID = (await db.get(`user:email:${email}`)) as string;
					// console.log(dbUserID);
					if (!dbUserID) {
						return null;
					}

					const dbUser = (await db.get(`user:${dbUserID}`)) as any;
					if (!dbUser) {
						return null;
					}

					const doesPasswordMatch = await bcrypt.compare(password, dbUser.password);
					if (!doesPasswordMatch) {
						return null;
					}

					return dbUser;
				} catch (error) {
					console.log(error);
				}
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/login',
	},
	callbacks: {
		async jwt({ token, user }) {
			const dbUser = (await db.get(`user:${token.id}`)) as User | null;

			if (!dbUser) {
				token.id = user!.id;
				return token;
			}

			return {
				id: dbUser.id,
				name: dbUser.name,
				email: dbUser.email,
			};
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id;
				session.user.name = token.name;
				session.user.email = token.email;
			}

			return session;
		},
	},
};
