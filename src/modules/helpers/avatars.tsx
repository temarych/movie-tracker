export const getAvatarImagePath = (path: string | null) => {
  if (path === null) return undefined;
  if (path.startsWith("/https")) return path.slice(1);
  return `https://image.tmdb.org/t/p/w500/${path}`;
}