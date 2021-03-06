import { gql } from "apollo-server-express";

export default gql`
	type DataStatus {
		message: String!
		value: Boolean!
		data: Course
	}

	type PageInfo {
		hasNextPage: Boolean
		endCursor: Date
	}

	type FileType {
		"""
		_id: ID ---- commented
		Url reference for file mapping to cloud storage
		"""
		proxy_url: String
		"""
		Name of file Uploaded
		"""
		file_name: String
		mime_type: String
		"""
		Date file was uploaded..Can be used for file sorting or timestamps. The date is stored as UTC
		so client should convert date to users timezone before displaying
		"""
		date_uploaded: Date
	}
	type Transaction {
		_id: ID
		amount: String
		type: String!
		balance_after_transaction: String
		description: String
		date: Date!
		updatedAt: Date!
	}
`;
