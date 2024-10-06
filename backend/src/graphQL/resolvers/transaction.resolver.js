import transactionModel from "../../DB/models/Transaction.mode.js";

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      const userId = context.getUser()._id;
      if (!userId) throw new Error("Not Authenticated");

      const transactions = await transactionModel.find({ userId });
      return transactions;
    },
    transaction: async (_, { transactionId},context) => {
      const userId = context.getUser()._id;
      if (!userId) throw new Error("Not Authenticated");

      const transaction = await transactionModel.findById(transactionId);

      if (!transaction) throw new Error("Cannot find transaction");

      return transaction;
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      const userId = context.getUser()._id;
      if (!userId) throw new Error("Not Authenticated");

      const transaction = await transactionModel.create({
        ...input,
        userId,
      });

      return transaction;
    },
    updateTransaction: async (_, { input }, context) => {
      const userId = context.getUser()._id;
      if (!userId) throw new Error("Not Authenticated");

      const transactionToUpdate = await transactionModel.findByIdAndUpdate(
        input._id,
        {
          ...input,
        },
        {
          new: true,
        }
      );

      return transactionToUpdate;
    },
    deleteTransaction: async (_, { transactionId }, context) => {
      const userId = context.getUser()._id;
      if (!userId) throw new Error("Not Authenticated");

      const transactionToDelete = await transactionModel.findByIdAndDelete(
        transactionId
      );

      if (!transactionToDelete) throw new Error("Cannot find transaction");

      return transactionToDelete;
    },
  },
};

export default transactionResolver;
