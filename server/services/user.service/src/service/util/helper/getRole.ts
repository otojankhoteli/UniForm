export default (email: string): string => {
  const prefix = email.split('@')[0];
  if (Number.isInteger(parseInt(prefix[prefix.length-1]))) {
    return 'student';
  }
  return 'admin';
};
