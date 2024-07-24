import {mergeTypeDefs} from "@graphql-tools/merge"


import transactionTypeDef from "./transaction.typeDef.js"
import userTypeDef from "./user.typeDef.js"


const mergeTypeDefs = mergeTypeDefs([userTypeDef,transactionTypeDef])


export default mergeTypeDefs