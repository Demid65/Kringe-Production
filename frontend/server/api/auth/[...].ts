// file: ~/server/api/auth/[...].ts
import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'
import {PrismaClient} from "@prisma/client";
import bcrypt from 'bcrypt'

export default NuxtAuthHandler({
    // A secret string you define, to ensure correct encryption
    secret: 'amogus',
    callbacks: {
        session: async ({session, token}) => {
            session.id = token.id;
            session.username = token.username;
            return Promise.resolve(session);
        },
        jwt: async ({token, user}) => {
            const isSignIn = user ? true : false;
            if (isSignIn) {
                token.id = user ? user.id || '' : '';
                token.username = user ? user.username || '' : '';
            }
            return Promise.resolve(token);
        },
    },
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        CredentialsProvider.default({

            name: 'credentials',

            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "password", type: "password" }
            },

            async authorize (credentials: any) {
                console.log(credentials)

                const prisma = new PrismaClient()

                const user = await prisma.user.findUnique({
                    where: {
                        username: credentials.username,
                    }
                })


                if (credentials.register === 'false' &&
                    user !== null &&
                    credentials.username == user.username &&
                    bcrypt.compareSync(credentials.password, user.password)) {

                    console.log(`login with ${credentials.username}`)

                    return {
                        id: user.id,
                        username: user.username
                    }
                } else if (credentials.register === 'true' && user === null) {
                    console.log(`register with ${credentials.username}`)
                    const newUser = await prisma.user.create({
                        data: {
                            username: credentials.username,
                            password: bcrypt.hashSync(credentials.password, 10)
                        }
                    })

                    return {
                        id: newUser.id,
                        username: newUser.username
                    }
                } else {
                    console.error('Warning: Malicious login attempt registered, bad credentials provided')
                    throw createError({
                        statusCode: 400,
                        statusMessage: 'Invalid credentials'
                    })
                }
            }
        })
    ]
})
