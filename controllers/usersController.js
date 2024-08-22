import {userModel} from '../models/userModel.js'

//IN USO
// Get User by Sub
export const searchUser = async (sub) => {
    try {
        return await userModel.findOne({sub: sub})
    } catch(error) {
        console.log(error);
    }
};

// Convert a Nickname into Sub
export const getSubByNickname = async (nickname) => {
    try {
        const user = await userModel.findOne({nickname: nickname});
        return user.sub
    } catch (error) {
        console.log(error);
    }
}

// Add new User
async function add(user) {
    const newUser = new userModel(user);
    await newUser.save();
}
export const addUser = async (request, response) => {
    searchUser(request.body.sub).then((exists) => {
        if (!exists) {
            try {
                add(request.body);
            } catch (error) {
                console.log(error);
            }

        }
        response.status(200).send("Ok");
    }).catch(error => {
        console.log(error);
        response.status(500).send("Internal Server Error");
    })
}

// Get User By Sub fot http
export const getUserBySub = async (request, response) => {
    try {
        const user = await searchUser(request.body.sub);
        const send = {
            sub: user.sub,
            picture: user.picture,
            nickname: user.nickname,
        }
        response.status(200).send(send);
    } catch (error) {
        console.log(error);
        response.status(500).send("Internal Server Error");
    }
}

// Get Id of all Wharehouses of the User
export const getWarehousesId = async (request, response) => {
    try {
        const user = await searchUser(request.body.sub);
        response.status(200).send(user.lsWarehousesId);
    } catch (error) {
        console.error(error);
        return response.status(500).send({error: error.message});
    }
};

// Search Users By Nickname
export const searchUserByNickname = async (request, response) => {
    try {
        const text = request.query.text;
        let filter =  { nickname: new RegExp(text, 'i') };

        const users = await userModel.find(filter).limit(10);

        const usersNicknames = [];

        users.forEach((user) => {
            usersNicknames.push(user.nickname);
        })

        return response.status(200).send(usersNicknames);

    } catch (error) {
        console.error(error); // Usa console.error per loggare gli errori
        return response.status(500).send({ error: error.message });
    }
};

//DA TESTARE
export const deleteWarehouseFromList = async (request, response) => {
    try {

        const user = await User.findById(request.body.userId);
        user.lsWarehousesId.splice(user.lsWarehousesId.indexOf(request.body.warehouseId), 1);
        await user.save();
        return response.status(200).send({ message: "Magazzino rimosso con successo" });

    } catch (error) {
        console.log(error);
        return response.status(500).send({ error: error.message });
    }
};