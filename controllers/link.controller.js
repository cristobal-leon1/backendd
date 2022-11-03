

export const getLinks = async (req, res) => {
    try {
        //const links = await Link.find({ uid: req.uid });

        return res.json({ ok: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error de servidor" });
    }
};