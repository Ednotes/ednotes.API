import { gql } from "apollo-server-express";

export default gql`
	extend type Query {
		"""
		Get logged in users profile
		"""
		user: User

		users: [User]
	}

	extend type Mutation {
		"""
		Create super admin account
		"""
		createSuperAdmin(input: signupInput!): UserStatus

		"""
		Create admin account
		"""
		createAdmin(input: signupInput!): UserStatus

		"""
		Regular users signup
		"""
		signup(input: signupInput!): UserStatus

		"""
		login for all user types
		"""
		login(input: loginInput!): UserStatus

		logout: GeneralStatus

		confirmEmail(code: String!, email: String!): GeneralStatus!
		resendCode(email: String!): GeneralStatus!

		"""
		Initiate forgot password process for all users
		"""
		forgotPassword(email: String!): UserStatus!

		"""
		User reset password from forgot password
		"""
		changePassword(
			pass_token: String!
			email: String!
			new_password: String!
			confirm_password: String!
		): UserStatus!

		"""
		User Change password from in app...For all user types
		"""
		resetPassword(old_password: String!, new_password: String!): UserStatus!

		"""
		Edit User details
		"""
		editUser(
			firstName: String
			lastName: String
			username: String
			phoneNumber: String
		): UserStatus!
		"""
		for dev only or admin use
		"""
		removeUserData(email: String!): GeneralStatus!

		makeSuperAdmin(userId: ID!): UserStatus!
	}

	input loginInput {
		email: String!
		password: String!
	}

	type Token {
		token: String!
	}

	input signupInput {
		firstName: String!
		lastName: String!
		username: String!
		phoneNumber: String!
		email: String!
		password: String!
	}

	type UserStatus {
		message: String!
		value: Boolean!
		user: User
	}
	type GeneralStatus {
		message: String!
		value: Boolean!
	}

	type User {
		_id: ID!
		firstName: String!
		lastName: String!
		username: String!
		email: String!
		phoneNumber: String!
		userType: String!
		isVerified: Boolean
		isActive: Boolean
		createdAt: Date!
		updatedAt: Date!
	}

	extend type Subscription {
		userCreated: User
	}
`;
