import { connect } from 'mongoose'

export const connectDB = async () => {
    try {
        await connect('mongodb+srv://son:162001@cluster0.vch9y.mongodb.net/complaint?authSource=admin&replicaSet=atlas-p5bt1t-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true');
        console.log('Connect Database successfully !!!')
    } catch (error) {
        console.log(error)
        console.log('Connect Database failuren  !!!')
    }
}
