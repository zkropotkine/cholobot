import mongoose, {
    Model
} from 'mongoose';
import config from 'config';
import Rule from '../model/rule.js';
import Morto from '../model/morto.js';

let db = null;

const connect = () => {
    if (!db) {
        const dbURL = process.env.db_url || config.get('db_url');
        mongoose.connect(dbURL);
        db = mongoose.connection;
    }
};

const getRules = () => {
    connect();
    return Rule.find();
};

const getMortos = () => {
    connect();
    return Morto.find();
};

const insertMorto = (name) => {
    connect();
    const newRow = new Morto({
        name: name,
    });
    return newRow.save();
};

const setCurrent = (name) => {
    connect();
    Morto.update({
            name: name
        }, {
            current: true
        }, {
            multi: true,
            strict: false
        },
        (error, object) => {} // TODO: Implement
    );
}

const removeCurrentMorto = () => {
    return Morto.findOne({
        current: true
    }, function(err, morto) {
        if (!err) {
            if (morto) {
                morto.current = true;
                morto.save(function(err) {
                    if (!err) {
                        console.log("Updated");
                    } else {
                        console.log("Error: could not update morto");
                    }
                });
            }
        }
    });

}

export {
    connect,
    getRules,
    getMortos,
    insertMorto,
    setCurrent,
    removeCurrentMorto
};