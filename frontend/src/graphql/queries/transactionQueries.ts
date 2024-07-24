import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    getTransactions {
			_id
			description
			paymentType
			category
			amount
			location
			date
    }
  }
`;

export const GET_TRANSACTION = gql`
  query GetTransaction($transactionId:ID!) {
    getTransaction(transactionId:$transactionId) {
			_id
			description
			paymentType
			category
			amount
			location
			date
    }
  }
`;
