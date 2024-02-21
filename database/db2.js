import mongoose from 'mongoose'
const DB_Connection2 = async () => {
    const URL='mongodb://127.0.0.1:27017/innova';
        try {
            await mongoose.connect(URL,{ useNewUrlParser: true, useUnifiedTopology: true })
        } catch (error) {
        }
    }

export default DB_Connection2