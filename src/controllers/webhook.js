import crypto from "crypto";
import Transaction from "../database/Models/transaction";
import Wallet from "../database/Models/wallet";
import config from "../helper/config";
const { PAYSTACK_API_SECRET } = config;

export const getPaystackEvent = async (req, res) => {
	try {
		console.log("from web hook");
		console.log("event first", req.body);
		console.log("the secret", PAYSTACK_API_SECRET);

		const hash = crypto
			.createHmac("sha512", PAYSTACK_API_SECRET)
			.update(JSON.stringify(req.body))
			.digest("hex");

		if (hash === req.headers["x-paystack-signature"]) {
			// Retrieve the request's body

			const event = req.body;

			// Do something with event
			console.log("from paystack web hook", event);
			if (event.event === "charge.success") {
				const eventAmount = Number(event.data.amount) / 100;
				const transaction = await Transaction.findById(event.data.reference);
				const wallet = await Wallet.findById(
					transaction.wallet
					// {
					// 	$inc: {
					// 		account_balance: eventAmount,
					// 	},
					// },
					// { new: true }
				);
				const currentBalance = wallet.get("account_balance");
				const balance = currentBalance + eventAmount;
				wallet.account_balance = balance;
				await wallet.save();

				transaction.status = "success";
				transaction.balance_after_transaction = balance;
				await transaction.save();
			} else {
				console.log("not a charge.success");
			}
			// check for any case their is no transaction later and create
		}
		res.sendStatus(200);
	} catch (err) {
		console.log(err);
		throw err;
	}
};
