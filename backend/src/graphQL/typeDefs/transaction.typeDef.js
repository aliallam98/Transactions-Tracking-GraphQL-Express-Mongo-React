const transactionTypeDef = `#graphql


type Transaction {
    _id: ID!
    userId: ID!
    description: String!
    paymentType: String!
    category: String!
    amount:Float!
    date:Date
    location: String

    type Query {
        transactions:[Transaction!]
        transaction:(transactionId:ID!):Transaction
    }

    type Mutation {
        createTransaction:(input:CreateTransactionInput!):Transaction
        updateTransaction:(transactionId:UpdateTransactionInput!):Transaction
        deleteTransaction:(transactionId:ID!):Transaction
    }

input CreateTransactionInput {
    description: String!
    paymentType: String!
    category: String!
    amount:Float!
    date:Date
    location: String
}
input UpdateTransactionInput {
    transactionId:ID!
    description: String
    paymentType: String
    category: String
    amount:Float
    date:Date
    location: String
}
}

`;

export default transactionTypeDef;
