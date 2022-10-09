import * as React from 'react';
import Modal from '@/components/Modal';
import CreateTrip from '@/modules/trips/components/CreateTrip';
import Layout from '@/components/layout/Layout';
import { useWeb3React } from '@web3-react/core';
import { gql, useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import RequestWithdraw from '@/modules/trips/components/RequestWithdraw';
import AddMember from '@/modules/trips/components/AddMember';
import ApproveWithdraw from '@/modules/trips/components/ApproveWithdraw';

const GET_ALL_TRIPS_QUERY = gql`
  {
    withdraws(first: 5) {
      id
      approvals
      done
      amount
    }
    trips {
      id
      name
      totalAmount
      totalExpend
      totalObtained
      owner
      withdrawsIds
      members
    }
  }
`;

export default function Trips() {
  const [newWithdrawModal, setNewWithdrawModal] = React.useState(false);
  const [newMemberModal, setNewMemberModal] = React.useState(false);
  const { account } = useWeb3React();
  const router = useRouter();

  const GET_ALL_TRIP_INFO = gql`
  {
    withdraws(where: { tripId: ${parseInt(router.query.slug || '0', 16)} }) {
      id
      approvals
      done
      amount
      receipt
    }
    trips(where: { id: "${router.query.slug}" }) {
      id
      name
      totalAmount
      totalExpend
      totalObtained
      owner
      withdrawsIds
      members
    }
  }
`;

  const [getData, { error, loading, data }] = useLazyQuery(GET_ALL_TRIP_INFO);
  React.useEffect(() => {
    if (getData && router.query.slug) {
      getData();
    }
  }, [getData, router]);

  return (
    <Layout>
      <>
        <div className='grid grid-cols-1 px-8 md:grid-cols-2'>
          <div>
            <h1 className='text-xl md:text-4xl'>
              Resume of my trip to {data?.trips?.[0].name}
            </h1>
            <Modal
              isOpen={newWithdrawModal}
              onClose={() => setNewWithdrawModal(false)}
              bodyContent={<RequestWithdraw tripId={router.query.slug} />}
              bodyClassName='bg-base-300 max-w-md'
            />
            <Modal
              isOpen={newMemberModal}
              onClose={() => setNewMemberModal(false)}
              bodyContent={<AddMember tripId={router.query.slug} />}
              bodyClassName='bg-base-300 max-w-md'
            />
            {error ? <div>error</div> : null}
            {loading ? <div>loading</div> : null}
            {!loading && !error && !data ? (
              <h1>Nothing to show in this trip</h1>
            ) : null}
            {data ? (
              <div>
                <h3 className='text-xl'>
                  Balance: {data?.trips?.[0].totalObtained || 0}
                </h3>
                <h3 className='text-xl'>
                  Goal: {data?.trips?.[0].totalAmount || 0}
                </h3>
                <h3 className='text-xl'>
                  Members:{' '}
                  {data?.trips?.[0].members?.length
                    ? data?.trips?.[0].members?.length + 1
                    : 1}
                </h3>

                <div className='flex flex-row'>
                  <h1 className='mt-12'>List of members</h1>
                  <button
                    className='btn btn-primary mt-12 ml-4 mb-2'
                    onClick={() => setNewMemberModal(true)}
                  >
                    Add Member
                  </button>
                </div>
                <span>{data?.trips?.[0].owner?.toString()}</span>
                {data?.trips?.[0].members?.length ? (
                  <div className='flex flex-col'>
                    {' '}
                    {data?.trips?.[0].members?.map((member) => {
                      return <span>{member}</span>;
                    })}
                  </div>
                ) : undefined}
              </div>
            ) : null}
          </div>
          <div>
            <div className='align-center flex flex-row'>
              <h1 className='mt-12 text-3xl'>Withdraws</h1>
              <button
                className='btn btn-primary mt-11 ml-4'
                onClick={() => setNewWithdrawModal(true)}
              >
                Withdraw Request
              </button>
            </div>
            {data?.withdraws?.map((withdraw) => {
              return (
                <div className='mt-8 flex flex-col'>
                  <span>Amount: {withdraw.amount}</span>
                  <span>
                    Withdraw status: {withdraw.done ? 'Done' : 'Pending'}
                  </span>
                  <span>
                    {withdraw.approvals?.length || 0} approvals of{' '}
                    {data?.trips?.[0].members?.length
                      ? data?.trips?.[0].members?.length + 1
                      : 1}
                  </span>
                  {!withdraw.done ? (
                    <ApproveWithdraw
                      withdrawId={withdraw.id}
                      shouldApprove={
                        !Boolean(withdraw.approvals?.includes(account))
                      }
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </>
    </Layout>
  );
}
