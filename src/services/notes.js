import url from "url";
import axios from "axios";
import LectureNote from "../database/Models/lecture_notes";
import Student from "../database/Models/student";

export const getAttachment = async (req, res) => {
	try {
		// use req params later to check sub
		console.log("enter get");
		const { userId } = req.app.locals.authenticated;
		// const param = req.params;
		const proxy_url = url.format({
			protocol: req.protocol,
			host: req.get("host"),
			pathname: req.originalUrl,
		});
		console.log(proxy_url);
		const student = await Student.findOne({ user: userId });
		console.log("student", student);
		const note = await LectureNote.findOne({
			"noteAttachments.proxy_url": proxy_url,
		});
		// .populate("course");

		console.log("note", note);

		// change to sub check later by using level
		const rightCourse =
			student?.dept === note?.course.dept &&
			student?.level === note?.course.level;
		console.log("right", !rightCourse, !student, !student && !rightCourse);
		if (!student || !note || !rightCourse) {
			console.log("return");
			return res.status(401).send({
				message: "You are not authorized to access this resource !",
				value: false,
			});
		}

		const cloudAttachmentUrl = note.noteAttachments.find(
			(attachment) => attachment.proxy_url === proxy_url
		);
		const data = await axios.get(cloudAttachmentUrl.url).data;
		console.log("data", data);
		res.send(data);
	} catch (err) {
		console.log(err);
		// throw err;
	}
};