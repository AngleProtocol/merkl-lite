import { Text } from "dappkit";
import { useMemo } from "react";
import { LeaderboardTable } from "./LeaderboardTable";
import LeaderboardTableRow from "./LeaderboardTableRow";
import type { IRewards } from "src/api/services/reward.service";

export type IProps = {
  leaderboard: IRewards[];
};

export default function LeaderboardLibrary(props: IProps) {
  const { leaderboard } = props;

  const rows = useMemo(() => {
    return leaderboard?.map((row, index) => (
      <LeaderboardTableRow key={row.recipient} row={row} rank={index} />
    ));
  }, [leaderboard]);

  return (
    <LeaderboardTable
      header={<Text className="w-full">Leaderboard</Text>}
      footer={"Something"}
    >
      {!!rows.length ? rows : <Text>No rewarded users</Text>}
    </LeaderboardTable>
  );
}
