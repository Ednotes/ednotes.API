import { gql } from "apollo-server-express";

export default gql`
	extend type Query {
		"""
		Fetch logged in user wallet
		"""
		wallet: WalletStatus
		get_wallet_transactions(cursor: String, limit: Int): TransactionConnection
	}

	extend type Mutation {
		fundWallet(amount: Int): WalletStatus
	}

	type WalletStatus {
		message: String!
		value: Boolean!
		wallet: Wallet
		authorization_url: String
	}

	type Wallet {
		account_balance: String!
		currency: String
		updatedAt: Date
	}

	type TransactionConnection {
		edges: [Transaction]
		pageInfo: PageInfo
	}
`;
