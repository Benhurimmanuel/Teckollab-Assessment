import React from 'react';
import TransactionModal from '../../COMPONENTS/MODALS/transactionModal';

const Home = () => {
    return (
        <div>
            <div className="container mt-5">
                <TransactionsTable />
            </div>
        </div>
    );
};

export default Home;
