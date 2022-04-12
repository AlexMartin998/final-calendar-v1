import moment from 'moment';

export const isDate = value => {
  // false indica a express-validator q hay un error
  if (!value) return false;

  const date = moment(value);
  if (!date.isValid()) return false;

  return true;
};
