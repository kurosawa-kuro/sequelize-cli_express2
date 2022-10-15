const { Op } = require("sequelize");
const { sequelize, User } = require("../../db/models/index")

async function startUser() {
    console.log("start_user")

    // createUser()
    // readUsers()
    // readUsers2()
    // readUsers3()
    // readUser()
    // searchUsers()
    // updateUser()
    deleteUser()
    // truncateUsers()
}

const createUser = async () => {
    console.log("start createUser")
    try {
        // const body = req.body
        const body = {
            name: "abc",
            email: "abc@abc.com",
            password: "unhashed_password",
            role: "normal",
        }

        const foundUserWithEmail = await User.findOne({ where: { email: body.email } });
        // console.log({ foundUserWithId })

        if (foundUserWithEmail) {
            // res.statusCode = 404
            throw new Error('user already exists');
        }

        const user = await User.create(body)
        // console.log("user", JSON.stringify(user, null, 2))

        const msg = "Successfully created User"
        const data = user

        // return res.status(201).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const readUsers = async () => {
    console.log("start read_users")
    try {
        const users = await User.findAll({ include: 'posts' })
        // console.log("users", JSON.stringify(users, null, 2))

        const data = users
        const msg = users.length !== 0 ? "Successfully read Users" : "Successfully read Users but empty"

        // return res.status(200).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const readUsers2 = async () => {
    console.log("start readUsers2")
    try {
        const users = await User.findAll({ include: 'posts' })
        // console.log("users", JSON.stringify(users, null, 2))

        let arrangedResData = [];
        users.forEach(row => {
            arrangedResData.push(
                {
                    "id": row.id,
                    "name": row.name,
                    "email": row.email,
                    "password": row.password,
                    "role": row.role,
                    "avator": row.avator ? row.avator : "https://www.publicdomainpictures.net/pictures/300000/nahled/empty-white-room.jpg"
                }
            );
        });
        // console.log("arrangedResData", JSON.stringify(arrangedResData, null, 2))

        const data = arrangedResData
        const msg = users.length !== 0 ? "Successfully read Users" : "Successfully read Users but empty"

        // return res.status(200).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const readUsers3 = async () => {
    console.log("start readUsers3")
    try {
        const [results, metadata] = await sequelize.query("SELECT * FROM users");
        // console.log("users metadata", JSON.stringify(metadata, null, 2))
        const msg = "Successfully read User"
        const data = metadata

        // return res.status(200).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const readUser = async () => {
    console.log("start readUser")
    try {
        // const id = req.params.id
        const id = 1

        const user = await User.findOne({ where: { id }, include: 'posts' })
        // console.log("JSON.stringify(user, null, 2)", JSON.stringify(user, null, 2))

        const msg = user ? "Successfully found Users" : "Successfully found Users but empty"
        const data = user

        // return res.status(200).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const updateUser = async () => {
    console.log("start updateUser")
    try {
        // const id = req.params.id
        const id = 2

        // const body = req.body
        const body = {
            name: "updated name",
            role: "admin",
        }

        const foundUserWithId = await User.findByPk(id);
        // console.log({ foundUserWithId })

        if (!foundUserWithId) {
            // res.statusCode = 404
            throw new Error('user not found');
        }

        await User.update(body, {
            where: { id }
        });

        foundUserWithId.name = body.name
        foundUserWithId.role = body.role

        const msg = "Successfully updated User"
        const data = foundUserWithId

        // return res.status(201).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const deleteUser = async () => {
    console.log("start deleteUser")
    try {
        // const id = req.params.id
        const id = 2

        const foundUserWithId = await User.findByPk(id);
        // console.log({ foundUserWithId })

        if (!foundUserWithId) {
            // res.statusCode = 404
            throw new Error('user not found');
        }

        await User.destroy({
            where: { id }
        });
        const msg = "Successfully deleted User"
        const data = foundUserWithId

        // return res.status(201).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const searchUsers = async () => {
    console.log("start searchUsers")
    try {
        const keyword = "Doe"

        const users = await User.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.like]: '%' + keyword + '%'
                        }
                    },
                    {
                        email: {
                            [Op.like]: '%' + keyword + '%'
                        }
                    }
                ]
            }
        })

        const data = users
        const msg = users.length === 0 ? "Successfully searched Users but empty" : "Successfully searched Users"

        // return res.status(200).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const truncateUsers = async () => {
    console.log("start truncateUsers")

    try {
        await User.destroy({
            truncate: true
        });

        const data = []
        const msg = "Successfully truncate Users but"

        // return res.status(201).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

module.exports = {
    startUser
}
