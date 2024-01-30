import Tile from '~/core/ui/Tile';
import Trans from '~/core/ui/Trans';

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
        <Tile.Heading>
          <Trans i18nKey={'admin:userTab'} />
        </Tile.Heading>

        <Tile.Body>
          <div className={'flex justify-between'}>
            <Tile.Figure>{data.usersCount}</Tile.Figure>
          </div>
        </Tile.Body>
      </Tile>

      <Tile>
        <Tile.Heading>
          <Trans i18nKey={'admin:organizationTab'} />
        </Tile.Heading>

        <Tile.Body>
          <div className={'flex justify-between'}>
            <Tile.Figure>{data.organizationsCount}</Tile.Figure>
          </div>
        </Tile.Body>
      </Tile>

      <Tile>
        <Tile.Heading>
          <Trans i18nKey={'admin:payingCustomerTab'} />
        </Tile.Heading>

        <Tile.Body>
          <div className={'flex justify-between'}>
            <Tile.Figure>{data.activeSubscriptions}</Tile.Figure>
          </div>
        </Tile.Body>
      </Tile>

      <Tile>
        <Tile.Heading>
          <Trans i18nKey={'admin:trialTab'} />
        </Tile.Heading>

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
