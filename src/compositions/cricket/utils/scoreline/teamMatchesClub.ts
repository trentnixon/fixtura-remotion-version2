export const teamMatchesClub = (
  teamName: string | undefined,
  clubName: string | undefined,
): boolean => {
  if (!teamName || !clubName) {
    return false;
  }

  const team = teamName.trim().toLowerCase();
  const club = clubName.trim().toLowerCase();

  return team.includes(club) || club.includes(team);
};
