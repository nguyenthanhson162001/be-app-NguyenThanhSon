import { connect } from 'mongoose'

export const connectDB = async () => {
    try {
        await connect(process.env.MONGODB_URL as string);
        console.log('Connect Database successfully !!!')
    } catch (error) {
        console.log(error)
        console.log('Connect Database failuren  !!!')
    }
}
