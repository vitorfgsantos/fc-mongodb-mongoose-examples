import database from '../database';
import User from './models/user.model';

(async () => {

    console.log('Connecting to MongoDB');    
    const connection = await database.connect();

    try {
        // CREATE

        let user = await User.create({
            email: 'vitor.santos@fcamara.com.br',
            password: '12345',
            basicInformation: {
                birthday: new Date(),
                name: 'Vitor',
                nationality: 'Brasileiro',
                gender: 'M'
            },
            tags: ['dev', 'fullstack', 'node'],
            geolocationCoordinates: [
                '-24.032425', '-46.528943'
            ]
        });




        // FIND

        user = await User.findById('ID_DO_USUARIO_AQUI');

        user = await User.findOne({
            _id: 'ID_DO_USUARIO_AQUI'
        });

        user = await User.findOne({
            email: 'vitor.santos@fcamara.com.br'
        });

        let users = await User.find({
            'basicInformation.name': 'Vitor'
        });

        users = await User.find({
            'tags.0': 'fullstack'
        });

        users = await User.find({
            'tags': 'fullstack'
        });

        users = await User.find({
            createdAt: {
                $gte: new Date(2005, 1, 1)
            }
        });

        users = await User.find({
            createdAt: {
                $lte: new Date(2005, 1, 1)
            }
        });

        users = await User.find({
            $or: [{
                'basicInformation.name': 'Vitor'
            }, {
                'basicInformation.name': 'Waldyr'
            }]
        });

        users = await User.find({
            'basicInformation.name': {
                $exists: false
            }
        });

        users = await User.find({
            geolocationCoordinates: {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: ['-24.029909', '-46.521838']
                    },
                    $maxDistance: 2 * 1000
                }
            }
        });

        users = await User.find()
            .select({
                email: 1,
                'basicInformation.gender': 1
            })
            .sort({
                'basicInformation.gender': 1 // ASC: a,b,c ... z
            });




        // UPDATE

        let results = await User.update({
            email: 'vitor.santos@fcamara.com.br'
        }, {
                $set: {
                    password: '12345'
                }
            });

        results = await User.update({
            'basicInformation.name': 'vitor.santos@fcamara.com.br'
        }, {
                password: 'dot.notation'
            });

        results = await User.update({
            'basicInformation.name': new RegExp('itor', 'i')
        }, {
                password: 'testando'
            });

        results = await User.update({
            email: 'vitor.santos@fcamara.com.br'
        }, {
                'tags.2': 'Alterou a tag'
            });

        results = await User.update({
            email: 'vitor.santos@fcamara.com.br'
        }, {
                'tags.1': 'Alterou a tag'
            });

        results = await User.update({
            email: 'vitor.santos@fcamara.com.br'
        }, {
                $push: {
                    'tags': 'testando'
                }
            });

        results = await User.update({
            email: 'vitor.santos@fcamara.com.br'
        }, {
                $pull: {
                    'tags': 'testando'
                }
            });

        results = await User.update({
            email: new RegExp('a', 'i')
        }, {
                gender: 'M'
            });

        results = await User.update({
            email: new RegExp('a', 'i')
        }, {
                gender: 'M'
            }, {
                multi: true
            });

        results = await User.update({
            email: 'ninguem@lalala.com'
        }, {
                email: 'test@123.com',
            }, {
                upsert: true,
                setDefaultsOnInsert: true,
                runValidators: true
            });




        // REMOVE

        results = await User.remove();




        // AGGREGATE

        let aggregate = await User.aggregate([{
            $group: {
                _id: '$basicInformation.gender',
                count: {
                    $sum: 1
                }
            }
        }]);

        aggregate = await User.aggregate([{
            $match: {
                email: new RegExp('santos', 'i')
            }
        }, {
            $group: {
                _id: '$basicInformation.gender',
                count: {
                    $sum: 1
                }
            }
        }]);

        console.log(user);
        console.log(users);
        console.log(aggregate);

    } catch (error) {
        console.log(error);
    } finally {
        process.exit();
    }
})();