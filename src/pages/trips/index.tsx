import * as React from 'react';
import Modal from '@/components/Modal';
import CreateTrip from '@/modules/trips/components/CreateTrip';
import Layout from '@/components/layout/Layout';
import { useWeb3React } from '@web3-react/core';
import { gql, useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';

export default function Trips() {
  const [newTripModalVisible, setNewTripModalVisible] = React.useState(false);
  const { account } = useWeb3React();

  const GET_ALL_TRIPS_QUERY = gql`
    {
      trips(where: { owner: "${account}" }) {
        id
        name
        totalAmount
        owner
      }
    }
  `;

  const [getData, { error, loading, data }] = useLazyQuery(GET_ALL_TRIPS_QUERY);

  React.useEffect(() => {
    if (getData && account) {
      getData();
    }
  }, [getData, account]);

  const router = useRouter();
  console.log({ account });
  const getTrips = () => {
    let returnArray = [];
    for (const trip of data?.trips || []) {
      if (trip.owner.toLowerCase() === account?.toLowerCase()) {
        console.log({
          wallet1: trip.owner.toLowerCase(),
          wallet2: account?.toLowerCase(),
        });
        returnArray.push(trip);
      }
    }
    return returnArray;
  };
  return (
    <Layout>
      <>
        <div className='flex flex-row'>
          <h1 className='mr-4 text-xl md:text-4xl'>My Trips</h1>
          <button
            className='btn btn-primary'
            onClick={() => {
              setNewTripModalVisible(true);
            }}
          >
            New Trip
          </button>
        </div>
        <Modal
          isOpen={newTripModalVisible}
          onClose={() => setNewTripModalVisible(false)}
          bodyContent={<CreateTrip />}
          bodyClassName='bg-base-300 max-w-md'
        />
        {!account ? (
          <div>Please sign to the platform to see your trips</div>
        ) : null}
        {error ? <div>error</div> : null}
        {loading ? <div>loading</div> : null}
        {account && data?.trips
          ? getTrips().map((item: any) => {
              return (
                <div
                  className='flex flex-col'
                  onClick={() => {
                    router.push(`/trips/${item.id}`);
                  }}
                >
                  <div
                    className='grid grid-cols-1 py-4 md:grid-cols-2 lg:grid-cols-3'
                    style={{ maxWidth: 800 }}
                  >
                    <div
                      className='align-center flex w-full flex-col justify-center rounded bg-white'
                      style={{ aspectRatio: '1 / 1' }}
                    >
                      <span className='btn btn-ghost'>{item.name}</span>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </>
    </Layout>
  );
}
