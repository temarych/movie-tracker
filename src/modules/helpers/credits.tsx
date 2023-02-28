import { ICredit, IMergedCredit } from "@typings/moviedb/models";

export const mergeCredits = (credits: ICredit[]): IMergedCredit[] => {
  const creditIds = Array.from(new Set(credits.map(credit => credit.id)));
  return creditIds.map(creditId => {
    const currentCredits = credits.filter(credit => credit.id === creditId);
    const duties = currentCredits.map(credit => "character" in credit ? credit.character : credit.job);
    const currentCredit = currentCredits[0];
    return { ...currentCredit, duties };
  });
}