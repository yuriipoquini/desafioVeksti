const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Por favor, informe um nome!'
          },
          notNull: {
            msg: 'Por favor, informe um nome!'
          },
          len: {
            args: [3, 10],
            msg: 'Por favor, informe um nome válido!'
          },
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Ow, parece que já existe uma conta com esse e-mail!.'
        },
        validate: {
          notEmpty: {
            msg: 'Por favor, informe um e-mail!'
          },
          notNull: {
            msg: 'Por favor, informe um e-mail!'
          },
          isEmail: {
            msg: 'Por favor, informe um e-mail válido!'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Por favor, informe uma senha!'
          },
          notNull: {
            msg: 'Por favor, informe uma senha!'
          },
          len: {
            args: [6, 20],
            msg: 'Por favor, informe uma senha com no mínimo 6 caracteres!'
          }
        }
      },
      confirmPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Por favor, confirme sua senha!'
          },
          notNull: {
            msg: 'Por favor, confirme sua senha!'
          },
          passwordMatch(value) {
            if (value !== this.password) {
              throw new Error('Senhas inseridas são diferentes!');
            }
          }
        }
      }
    }
  );

  User.addHook('beforeCreate', async user => {
    const hashPass = await bcrypt.hash(user.password, 10);
    user.password = hashPass;
    user.confirmPassword = hashPass;
  });

  return User;
};


// const { Model, DataTypes } = require("sequelize");

// class User extends Model {
//   static init(sequelize) {
//     super.init(
//       {
//         name: {
//           type: DataTypes.STRING,
//           allowNull: false,
//           validate: {
//             notEmpty: {
//               msg: "Por favor, informe um nome!"
//             },
//             notNull: {
//               msg: "Por favor, informe um nome!"
//             }
//           }
//         },
//         email: {
//           type: DataTypes.STRING,
//           allowNull: false,
//           unique: {
//             msg: "Ow, parece que já existe uma conta com esse e-mail!."
//           },
//           validate: {
//             notEmpty: {
//               msg: "Por favor, informe um e-mail!"
//             },
//             notNull: {
//               msg: "Por favor, informe um e-mail!"
//             },
//             isEmail: {
//               msg: "Por favor, informe um e-mail válido!"
//             }
//           }
//         },
//         password: {
//           type: DataTypes.STRING,
//           allowNull: false,
//           validate: {
//             notEmpty: {
//               msg: "Por favor, informe uma senha!"
//             },
//             notNull: {
//               msg: "Por favor, informe uma senha!"
//             },
//             len: {
//               args: [6, 20],
//               msg: "Por favor, informe uma senha com no mínimo 6 caracteres!"
//             }
//           }
//         },
//         confirmPassword: {
//           type: DataTypes.STRING,
//           allowNull: false,
//           validate: {
//             notEmpty: {
//               msg: "Por favor, confirme sua senha!"
//             },
//             notNull: {
//               msg: "Por favor, confirme sua senha!"
//             },
//             passwordMatch(value) {
//               if (value !== this.password) {
//                 throw new Error("Senhas diferentes!");
//               }
//             }
//           }
//         }
//       },
//       { sequelize }
//     );
//     User.addHook("beforeCreate", async user => {
//       const encryptedPassword = await bcrypt.hash(user.password, 12);
//       user.password = encryptedPassword;
//       user.confirmPassword = encryptedPassword;
//     });
//   }
// }

// module.exports = User;

