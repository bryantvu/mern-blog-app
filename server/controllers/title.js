import Title from "../models/title.js"

/** READ */
export const getTitle = async (req, res) => {
    try {
        const title = await Title.findOne();
        res.status(200).json(title);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

/** UPDATE */
export const updateTitleHeader = async (req, res) => {
    try {
        var { title, picturePath } = req.body;
        const oldTitle = await Title.findOne();
        if (!title) title = oldTitle.title;
        if (!picturePath) picturePath = oldTitle.picturePath;

        const updatedTitle = await Title.findOneAndUpdate(
            { _id: oldTitle._id },
            {
                $set: {
                    title: title,
                    picturePath: picturePath
                }
            },
        );
        res.status(200).json(updatedTitle);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};