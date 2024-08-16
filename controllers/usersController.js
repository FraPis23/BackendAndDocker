import {userModel} from '../models/userModel.js'


// Get User by Sub
export const searchUser = async (sub) => {
    try {
        return await userModel.findOne({sub: sub})
    } catch(error) {
        console.log(error);
    }
};

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
            picture: user.picture,
            nickname: user.nickname,
        }
        response.status(200).send(send);
    } catch (error) {
        console.log(error);
        response.status(500).send("Internal Server Error");
    }
}


export const searchUserByNameAndLastName = async (request, response) => {
    try {

        if (!request.query.name && !request.query.lastName) {
            return response.status(400).send({ error: "Fornire un nome e/o un cognome" });
        }

        let filter = {};
        if (request.query.name) {
            filter.name = new RegExp(request.query.name, 'i');
        }
        if (request.query.lastName) {
            filter.lastName = new RegExp(request.query.lastName, 'i');
        }

        const users = await User.find(filter);

        if (users.length === 0) {
            return response.status(404).send({ error: "Utente non trovato" });
        }

        return response.status(200).send(users);

    } catch (error) {
        console.error(error); // Usa console.error per loggare gli errori
        return response.status(500).send({ error: error.message });
    }
};


export const addWarehouseToList = async (request, response) => {
    try {
        const user = getUser(request.sub)

        if (user.lsWarehousesId.includes(request.body.warehouseId)) {
            return response.status(400).json({ error: "Il magazzino esiste già" });
        }


        user.lsWarehousesId.push(request.body.warehouseId);
        await user.save();

        return response.status(201).send({ message: "Magazzino aggiunto con successo", user});

    } catch (error) {
        console.log(error);
        response.status(500).send({ error: error.message });
    }
};


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