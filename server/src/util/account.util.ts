import { Account, IAccount } from '..//app/model/index'
export const getAccountByEmailPassword = async (email: string, password: string): Promise<IAccount | null> => {
    return await Account.findOne({ email, password });
}
