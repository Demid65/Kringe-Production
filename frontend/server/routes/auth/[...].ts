// file: ~/server/api/auth/[...].ts
import CredentialsProvider from 'next-auth/providers/credentials'
import {NuxtAuthHandler} from '#auth'
import bcrypt from 'bcrypt'
import {usePrisma} from "../../utils/usePrisma";

export default NuxtAuthHandler({
    // A secret string you define, to ensure correct encryption
    secret: 'amogus',
    callbacks: {
        session: async ({session, token}) => {
            session.id = token.id
            session.username = token.username

            return Promise.resolve(session);
        },
        jwt: async ({token, user}) => {
            const isSignIn = user ? true : false;
            if (isSignIn) {
                token.id = user ? user.id || '' : ''
                token.username = user ? user.username || '' : ''
            }
            return Promise.resolve(token);
        },
    },
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        CredentialsProvider.default({

            name: 'credentials',

            async authorize(credentials: any) {

                const prisma = usePrisma()

                const user = await prisma.user.findUnique({
                    where: {
                        username: credentials.username,
                    }
                })

                if (credentials.register === 'false' &&
                    user !== null &&
                    credentials.username == user.username &&
                    bcrypt.compareSync(credentials.password, user.password)) {

                    console.log(`login with ${user.username} (id: ${user.id})`)

                    return {
                        id: user.id,
                        username: user.username
                    }
                } else if (credentials.register === 'true' && user === null) {
                    const newUser = await prisma.user.create({
                        data: {
                            username: credentials.username,
                            password: bcrypt.hashSync(credentials.password, 10)
                        }
                    })

                    console.log(`register with ${newUser.username} (id: ${newUser.id})`)

                    return {
                        id: newUser.id,
                        username: newUser.username
                    }
                } else {
                    console.error(`login failed (id: ${user.id})`)
                    throw createError({
                        statusCode: 400,
                        statusMessage: 'Invalid credentials'
                    })
                }
            }
        })
    ]
})
