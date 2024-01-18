import Tile from '~/core/ui/Tile';

interface Data {
  usersCount: number;
  organizationsCount: number;
  activeSubscriptions: number;
  trialSubscriptions: number;
}

function AdminDashboard({
  data,
}: React.PropsWithChildren<{
  data: Data;
}>) {
  return (
    <div
      className={
        'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3' +
        ' xl:grid-cols-4'
      }
    >
      <Tile>
        <Tile.Heading>Users</Tile.Heading>

        <Tile.Body>
          <div className={'flex justify-between'}>
            <Tile.Figure>{data.usersCount}</Tile.Figure>
          </div>
        </Tile.Body>
      </Tile>

      <Tile>
        <Tile.Heading>Organizations</Tile.Heading>

        <Tile.Body>
          <div className={'flex justify-between'}>
            <Tile.Figure>{data.organizationsCount}</Tile.Figure>
          </div>
        </Tile.Body>
      </Tile>

      <Tile>
        <Tile.Heading>Paying Customers</Tile.Heading>

        <Tile.Body>
          <div className={'flex justify-between'}>
            <Tile.Figure>{data.activeSubscriptions}</Tile.Figure>
          </div>
        </Tile.Body>
      </Tile>

      <Tile>
        <Tile.Heading>Trials</Tile.Heading>

        <Tile.Body>
          <div className={'flex justify-between'}>
            <Tile.Figure>{data.trialSubscriptions}</Tile.Figure>
          </div>
        </Tile.Body>
      </Tile>
    </div>
  );
}

export default AdminDashboard;
