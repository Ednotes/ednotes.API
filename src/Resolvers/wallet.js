import { combineResolvers } from "graphql-resolvers";

// ========== Models ==============//
import Wallet from "../database/Models/wallet";

// ============= Services ===============//
import { isAuthenticated } from "./middleware";
import paystack from "../services/paystack";

export default {
	Query: {
		get_wallet: combineResolvers(isAuthenticated, async (_, __, { Id }) => {
			try {
				const wallet = await Wallet.findOne({ user: Id });
				if (!wallet)
					return {
						message: "Wallet fetched unsuccessfully !",
						value: false,
					};
				return {
					message: "Wallet fetched successfully !",
					value: true,
					wallet,
				};
			} catch (error) {
				throw error;
			}
		}),
	},

	Mutation: {
		fundWallet: combineResolvers(
			isAuthenticated,
			async (_, { amount }, { Id }) => {
				try {
					const wallet = await Wallet.findOne({ user: Id }).populate("user");
					if (!wallet)
						return {
							message: "No wallet is associated with this user",
							value: false,
						};

					const authorization_url = await paystack.initializeTransaction(
						wallet,
						amount
					);

					if (!authorization_url) {
						return {
							message: "Authorizing went wrong !",
							value: false,
						};
					}
					return {
						message: "Redirect to payment page",
						value: true,
						authorization_url,
					};
				} catch (error) {
					throw error;
				}
			}
		),
	},
};