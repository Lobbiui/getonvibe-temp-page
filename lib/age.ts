export function isAtLeastTwentyOne(dateOfBirth: string, now = new Date()) {
  const birthDate = new Date(`${dateOfBirth}T00:00:00.000Z`);

  if (Number.isNaN(birthDate.getTime())) {
    return false;
  }

  const threshold = new Date(Date.UTC(now.getUTCFullYear() - 21, now.getUTCMonth(), now.getUTCDate()));
  return birthDate <= threshold;
}
