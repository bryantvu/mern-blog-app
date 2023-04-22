import mongoose from "mongoose";

const titleSchema = mongoose.Schema(
    {
        title: String,
        picturePath: String,
    },
    {timestamps: true}
);

const Title = mongoose.model("Title", titleSchema);

export default Title;