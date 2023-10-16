export interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string,
  password: {
    type: string,
    allowNull: false,
  },  role: {
    type: string,
    allowNull: false,
    validate: {
      isIn: {
        args: [['admin', 'user']],
        msg: 'Invalid role',
      },
    }}};